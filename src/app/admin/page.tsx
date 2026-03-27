"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Wrench,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface Inquiry {
  id: string;
  name: string;
  service: string | null;
  status: string;
  createdAt: string;
}

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalServices: number;
  totalTestimonials: number;
  totalVoiceCalls: number;
  pendingVoiceCalls: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  href,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-display text-stone-900 mt-2">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-yellow-100 text-yellow-700",
    SCHEDULED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-green-100 text-green-700",
    SPAM: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
        styles[status] || "bg-stone-100 text-stone-700"
      }`}
    >
      {status.toLowerCase()}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalServices: 0,
    totalTestimonials: 0,
    totalVoiceCalls: 0,
    pendingVoiceCalls: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inquiriesRes, servicesRes, testimonialsRes, voiceCallsRes] = await Promise.all([
          fetch("/api/admin/inquiries"),
          fetch("/api/admin/services"),
          fetch("/api/admin/testimonials"),
          fetch("/api/admin/voice-calls"),
        ]);

        const inquiries = await inquiriesRes.json();
        const services = await servicesRes.json();
        const testimonials = await testimonialsRes.json();
        const voiceCalls = await voiceCallsRes.json();

        const inquiriesList = Array.isArray(inquiries) ? inquiries : [];
        const servicesList = Array.isArray(services) ? services : [];
        const testimonialsList = Array.isArray(testimonials) ? testimonials : [];
        const voiceCallsList = Array.isArray(voiceCalls) ? voiceCalls : [];

        setStats({
          totalInquiries: inquiriesList.length,
          newInquiries: inquiriesList.filter((i: Inquiry) => i.status === "NEW").length,
          totalServices: servicesList.filter((s: { isActive: boolean }) => s.isActive).length,
          totalTestimonials: testimonialsList.filter((t: { isActive: boolean }) => t.isActive).length,
          totalVoiceCalls: voiceCallsList.length,
          pendingVoiceCalls: voiceCallsList.filter((v: { followUpStatus: string }) => v.followUpStatus === "PENDING").length,
        });

        setRecentInquiries(inquiriesList.slice(0, 5));
      } catch {
        // Error fetching data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-stone-900">DASHBOARD</h1>
        <p className="text-stone-500 mt-1">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Voice Leads"
          value={stats.pendingVoiceCalls}
          icon={Phone}
          color="bg-red-500"
          href="/admin/voice-leads"
        />
        <StatCard
          title="New Inquiries"
          value={stats.newInquiries}
          icon={MessageSquare}
          color="bg-blue-500"
          href="/admin/inquiries"
        />
        <StatCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          icon={TrendingUp}
          color="bg-green-500"
          href="/admin/inquiries"
        />
        <StatCard
          title="Active Services"
          value={stats.totalServices}
          icon={Wrench}
          color="bg-amber-500"
          href="/admin/services"
        />
        <StatCard
          title="Testimonials"
          value={stats.totalTestimonials}
          icon={Star}
          color="bg-purple-500"
          href="/admin/testimonials"
        />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-lg font-display text-stone-900">
            RECENT INQUIRIES
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-amber-500 hover:text-amber-600 font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No inquiries yet</p>
            <p className="text-stone-400 text-sm mt-1">
              When customers submit the contact form, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 font-medium">
                  {inquiry.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-900 truncate">
                    {inquiry.name}
                  </p>
                  <p className="text-stone-500 text-sm truncate">
                    {inquiry.service || "General Inquiry"}
                  </p>
                </div>
                <StatusBadge status={inquiry.status} />
                <span className="text-stone-400 text-sm">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-stone-900">
          <Clock className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-display mb-2">RESPONSE TIME</h3>
          <p className="text-stone-800 text-sm">
            Aim to respond to inquiries within 2 hours during business hours.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <CheckCircle className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-display mb-2">FOLLOW UP</h3>
          <p className="text-green-100 text-sm">
            Mark inquiries as "contacted" after reaching out to keep track.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <AlertCircle className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-display mb-2">STAY UPDATED</h3>
          <p className="text-blue-100 text-sm">
            Check the dashboard regularly for new customer inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
