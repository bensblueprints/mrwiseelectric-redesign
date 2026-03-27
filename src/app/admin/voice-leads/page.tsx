"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneCall,
  Clock,
  User,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Play,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceCall {
  id: string;
  conversationId: string;
  agentId: string;
  callStatus: "IN_PROGRESS" | "COMPLETED" | "FAILED" | "ABANDONED";
  callDurationSeconds: number | null;
  startedAt: string | null;
  endedAt: string | null;
  customerType: "NEW" | "EXISTING" | "UNKNOWN";
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  serviceStreet: string | null;
  serviceCity: string | null;
  serviceZip: string | null;
  serviceType: string | null;
  issueDescription: string | null;
  isEmergency: boolean;
  preferredDate: string | null;
  preferredTime: string | null;
  referralSource: string | null;
  transcript: string | null;
  summary: string | null;
  sentiment: string | null;
  audioUrl: string | null;
  followUpStatus: "PENDING" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "NO_ACTION";
  notes: string | null;
  createdAt: string;
  contactInquiry: {
    id: string;
    status: string;
  } | null;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
    ABANDONED: "bg-stone-100 text-stone-700",
    PENDING: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-purple-100 text-purple-700",
    SCHEDULED: "bg-indigo-100 text-indigo-700",
    NO_ACTION: "bg-stone-100 text-stone-500",
  };

  const icons: Record<string, React.ReactNode> = {
    IN_PROGRESS: <Phone className="w-3 h-3" />,
    COMPLETED: <CheckCircle2 className="w-3 h-3" />,
    FAILED: <XCircle className="w-3 h-3" />,
    ABANDONED: <PhoneCall className="w-3 h-3" />,
    PENDING: <Clock className="w-3 h-3" />,
    CONTACTED: <Phone className="w-3 h-3" />,
    SCHEDULED: <Calendar className="w-3 h-3" />,
    NO_ACTION: <XCircle className="w-3 h-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-stone-100 text-stone-700"
      }`}
    >
      {icons[status]}
      {status.replace("_", " ")}
    </span>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string | null }) {
  if (!sentiment) return null;

  const styles: Record<string, string> = {
    positive: "bg-green-100 text-green-700",
    negative: "bg-red-100 text-red-700",
    neutral: "bg-stone-100 text-stone-600",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[sentiment] || styles.neutral}`}>
      {sentiment}
    </span>
  );
}

function VoiceCallCard({
  call,
  onUpdateStatus,
}: {
  call: VoiceCall;
  onUpdateStatus: (id: string, status: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      await fetch(`/api/admin/voice-calls/${call.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followUpStatus: newStatus }),
      });
      onUpdateStatus(call.id, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
    setUpdating(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border ${
        call.isEmergency ? "border-red-300 ring-2 ring-red-100" : "border-stone-200"
      } overflow-hidden`}
    >
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer hover:bg-stone-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              call.isEmergency
                ? "bg-red-100 text-red-600"
                : call.callStatus === "COMPLETED"
                ? "bg-green-100 text-green-600"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            <Phone className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-stone-900">
                {call.customerName || "Unknown Caller"}
              </h3>
              {call.isEmergency && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                  <AlertCircle className="w-3 h-3" />
                  EMERGENCY
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
              {call.customerPhone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {call.customerPhone}
                </span>
              )}
              {call.serviceType && (
                <span className="flex items-center gap-1">
                  <span className="font-medium text-stone-700">{call.serviceType}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(call.callDurationSeconds)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <StatusBadge status={call.callStatus} />
              <StatusBadge status={call.followUpStatus} />
            </div>
            <span className="text-xs text-stone-400">
              {new Date(call.createdAt).toLocaleDateString()}{" "}
              {new Date(call.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <button className="p-1 hover:bg-stone-100 rounded transition-colors">
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-stone-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-stone-400" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-stone-100">
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-medium text-stone-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Information
                  </h4>

                  <div className="space-y-2 text-sm">
                    {call.customerName && (
                      <p>
                        <span className="text-stone-500">Name:</span>{" "}
                        <span className="text-stone-900">{call.customerName}</span>
                      </p>
                    )}
                    {call.customerPhone && (
                      <p>
                        <span className="text-stone-500">Phone:</span>{" "}
                        <a
                          href={`tel:${call.customerPhone}`}
                          className="text-amber-600 hover:underline"
                        >
                          {call.customerPhone}
                        </a>
                      </p>
                    )}
                    {call.customerEmail && (
                      <p>
                        <span className="text-stone-500">Email:</span>{" "}
                        <a
                          href={`mailto:${call.customerEmail}`}
                          className="text-amber-600 hover:underline"
                        >
                          {call.customerEmail}
                        </a>
                      </p>
                    )}
                    {(call.serviceStreet || call.serviceCity || call.serviceZip) && (
                      <p className="flex items-start gap-1">
                        <MapPin className="w-4 h-4 text-stone-400 mt-0.5" />
                        <span>
                          {[call.serviceStreet, call.serviceCity, call.serviceZip]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </p>
                    )}
                    <p>
                      <span className="text-stone-500">Customer Type:</span>{" "}
                      <span className="text-stone-900">{call.customerType}</span>
                    </p>
                    {call.referralSource && (
                      <p>
                        <span className="text-stone-500">Referral:</span>{" "}
                        <span className="text-stone-900">{call.referralSource}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-stone-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Service Details
                  </h4>

                  <div className="space-y-2 text-sm">
                    {call.serviceType && (
                      <p>
                        <span className="text-stone-500">Service:</span>{" "}
                        <span className="text-stone-900">{call.serviceType}</span>
                      </p>
                    )}
                    {call.issueDescription && (
                      <p>
                        <span className="text-stone-500">Issue:</span>{" "}
                        <span className="text-stone-900">{call.issueDescription}</span>
                      </p>
                    )}
                    {call.preferredDate && (
                      <p>
                        <span className="text-stone-500">Preferred Date:</span>{" "}
                        <span className="text-stone-900">{call.preferredDate}</span>
                      </p>
                    )}
                    {call.preferredTime && (
                      <p>
                        <span className="text-stone-500">Preferred Time:</span>{" "}
                        <span className="text-stone-900">{call.preferredTime}</span>
                      </p>
                    )}
                    {call.sentiment && (
                      <p className="flex items-center gap-2">
                        <span className="text-stone-500">Sentiment:</span>
                        <SentimentBadge sentiment={call.sentiment} />
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {call.summary && (
                <div className="mt-4 p-3 bg-stone-50 rounded-lg">
                  <h4 className="font-medium text-stone-900 mb-2">Call Summary</h4>
                  <p className="text-sm text-stone-600">{call.summary}</p>
                </div>
              )}

              {/* Transcript */}
              {call.transcript && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-amber-600 hover:text-amber-700">
                    View Full Transcript
                  </summary>
                  <div className="mt-2 p-3 bg-stone-50 rounded-lg max-h-48 overflow-y-auto">
                    <p className="text-sm text-stone-600 whitespace-pre-wrap">
                      {call.transcript}
                    </p>
                  </div>
                </details>
              )}

              {/* Audio Player */}
              {call.audioUrl && (
                <div className="mt-4">
                  <h4 className="font-medium text-stone-900 mb-2 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Call Recording
                  </h4>
                  <audio controls className="w-full" src={call.audioUrl}>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <span className="text-sm text-stone-500">Update Status:</span>
                {["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "NO_ACTION"].map(
                  (status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={call.followUpStatus === status ? "default" : "outline"}
                      className={
                        call.followUpStatus === status
                          ? "bg-amber-500 hover:bg-amber-600"
                          : ""
                      }
                      onClick={() => handleStatusChange(status)}
                      disabled={updating}
                    >
                      {updating && call.followUpStatus !== status ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : null}
                      {status.replace("_", " ")}
                    </Button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function VoiceLeadsPage() {
  const [calls, setCalls] = useState<VoiceCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchCalls = async () => {
    try {
      const response = await fetch("/api/admin/voice-calls");
      const data = await response.json();
      setCalls(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch voice calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setCalls((prev) =>
      prev.map((call) =>
        call.id === id ? { ...call, followUpStatus: newStatus as VoiceCall["followUpStatus"] } : call
      )
    );
  };

  const filteredCalls = calls.filter((call) => {
    if (filter === "all") return true;
    if (filter === "emergency") return call.isEmergency;
    if (filter === "pending") return call.followUpStatus === "PENDING";
    if (filter === "completed") return call.callStatus === "COMPLETED";
    return true;
  });

  const stats = {
    total: calls.length,
    pending: calls.filter((c) => c.followUpStatus === "PENDING").length,
    emergencies: calls.filter((c) => c.isEmergency).length,
    completed: calls.filter((c) => c.followUpStatus === "COMPLETED").length,
  };

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-stone-900">VOICE LEADS</h1>
          <p className="text-stone-500 mt-1">
            Manage calls from the AI voice assistant
          </p>
        </div>
        <Button onClick={fetchCalls} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <p className="text-stone-500 text-sm">Total Calls</p>
          <p className="text-2xl font-display text-stone-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <p className="text-stone-500 text-sm">Pending Follow-up</p>
          <p className="text-2xl font-display text-blue-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <p className="text-stone-500 text-sm">Emergencies</p>
          <p className="text-2xl font-display text-red-600">{stats.emergencies}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200">
          <p className="text-stone-500 text-sm">Completed</p>
          <p className="text-2xl font-display text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "All Calls" },
          { value: "pending", label: "Pending" },
          { value: "emergency", label: "Emergencies" },
          { value: "completed", label: "Completed" },
        ].map((f) => (
          <Button
            key={f.value}
            size="sm"
            variant={filter === f.value ? "default" : "outline"}
            className={filter === f.value ? "bg-amber-500 hover:bg-amber-600" : ""}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Call List */}
      {filteredCalls.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <Phone className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500">No voice calls yet</p>
          <p className="text-stone-400 text-sm mt-1">
            Voice calls from the AI assistant will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCalls.map((call) => (
            <VoiceCallCard
              key={call.id}
              call={call}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
