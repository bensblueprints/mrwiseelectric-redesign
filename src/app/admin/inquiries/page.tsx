"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  notes: string | null;
  respondedAt: string | null;
  createdAt: string;
}

const statusOptions = [
  { value: "NEW", label: "New", color: "bg-blue-100 text-blue-700" },
  { value: "CONTACTED", label: "Contacted", color: "bg-yellow-100 text-yellow-700" },
  { value: "SCHEDULED", label: "Scheduled", color: "bg-purple-100 text-purple-700" },
  { value: "COMPLETED", label: "Completed", color: "bg-green-100 text-green-700" },
  { value: "SPAM", label: "Spam", color: "bg-red-100 text-red-700" },
];

function StatusBadge({ status }: { status: string }) {
  const option = statusOptions.find((s) => s.value === status);
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
        option?.color || "bg-stone-100 text-stone-700"
      }`}
    >
      {status.toLowerCase()}
    </span>
  );
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/admin/inquiries");
      const data = await response.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      }
    } catch {
      // Error fetching
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedInquiry = await response.json();
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? updatedInquiry : i))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(updatedInquiry);
        }
      }
    } catch {
      // Error updating
    } finally {
      setUpdating(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch {
      // Error deleting
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-stone-900">INQUIRIES</h1>
        <p className="text-stone-500 mt-1">
          Manage customer inquiries and contact requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <Input
            placeholder="Search by name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            className={statusFilter === "all" ? "bg-stone-900" : ""}
          >
            All
          </Button>
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              onClick={() => setStatusFilter(option.value)}
              className={statusFilter === option.value ? "bg-stone-900" : ""}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inquiries List */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-stone-400 mx-auto" />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500">No inquiries found</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredInquiries.map((inquiry) => (
                <button
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`w-full flex items-start gap-4 px-6 py-4 hover:bg-stone-50 transition-colors text-left ${
                    selectedInquiry?.id === inquiry.id ? "bg-amber-50" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 font-medium flex-shrink-0">
                    {inquiry.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-stone-900 truncate">
                        {inquiry.name}
                      </p>
                      <StatusBadge status={inquiry.status} />
                    </div>
                    <p className="text-stone-500 text-sm truncate mt-1">
                      {inquiry.service || "General Inquiry"}
                    </p>
                    <p className="text-stone-400 text-xs mt-1">
                      {new Date(inquiry.createdAt).toLocaleDateString()} at{" "}
                      {new Date(inquiry.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Inquiry Detail */}
        <AnimatePresence mode="wait">
          {selectedInquiry ? (
            <motion.div
              key={selectedInquiry.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <h2 className="text-lg font-display text-stone-900">
                  INQUIRY DETAILS
                </h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 hover:bg-stone-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div>
                  <h3 className="text-sm font-medium text-stone-500 mb-3">
                    CONTACT INFO
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <p className="text-stone-900 font-medium">
                          {selectedInquiry.name}
                        </p>
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-amber-500 hover:text-amber-600 text-sm"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                    </div>

                    {selectedInquiry.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-stone-600" />
                        </div>
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-stone-900 hover:text-amber-500"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-stone-600" />
                      </div>
                      <p className="text-stone-600 text-sm">
                        Submitted on{" "}
                        {new Date(selectedInquiry.createdAt).toLocaleDateString()}{" "}
                        at{" "}
                        {new Date(selectedInquiry.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service */}
                {selectedInquiry.service && (
                  <div>
                    <h3 className="text-sm font-medium text-stone-500 mb-2">
                      SERVICE REQUESTED
                    </h3>
                    <p className="text-stone-900">{selectedInquiry.service}</p>
                  </div>
                )}

                {/* Message */}
                <div>
                  <h3 className="text-sm font-medium text-stone-500 mb-2">
                    MESSAGE
                  </h3>
                  <p className="text-stone-700 bg-stone-50 p-4 rounded-lg">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-sm font-medium text-stone-500 mb-3">
                    STATUS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          updateStatus(selectedInquiry.id, option.value)
                        }
                        disabled={updating}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedInquiry.status === option.value
                            ? option.color + " ring-2 ring-offset-2 ring-stone-300"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {updating &&
                        selectedInquiry.status !== option.value ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          option.label
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-stone-200">
                  <Button
                    asChild
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-900"
                  >
                    <a href={`mailto:${selectedInquiry.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                  {selectedInquiry.phone && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`tel:${selectedInquiry.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-stone-200 flex items-center justify-center min-h-[400px]"
            >
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-500">Select an inquiry to view details</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
