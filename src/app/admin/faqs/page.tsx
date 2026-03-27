"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

const categories = [
  { value: "general", label: "General" },
  { value: "services", label: "Services" },
  { value: "pricing", label: "Pricing" },
  { value: "credentials", label: "Credentials" },
  { value: "emergency", label: "Emergency" },
];

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    isActive: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch("/api/admin/faqs");
      const data = await response.json();
      if (Array.isArray(data)) {
        setFaqs(data);
      }
    } catch {
      // Error fetching
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isActive: faq.isActive,
    });
    setIsCreating(false);
  };

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      category: "general",
      isActive: true,
    });
    setIsCreating(true);
  };

  const closeModal = () => {
    setEditingFaq(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const faqData = {
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      isActive: formData.isActive,
      sortOrder: editingFaq ? editingFaq.sortOrder : faqs.length,
    };

    try {
      if (editingFaq) {
        const response = await fetch(`/api/admin/faqs/${editingFaq.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(faqData),
        });

        if (response.ok) {
          const updatedFaq = await response.json();
          setFaqs((prev) =>
            prev.map((f) => (f.id === editingFaq.id ? updatedFaq : f))
          );
        }
      } else {
        const response = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(faqData),
        });

        if (response.ok) {
          const newFaq = await response.json();
          setFaqs((prev) => [...prev, newFaq]);
        }
      }
    } catch {
      // Error saving
    }

    setSaving(false);
    closeModal();
  };

  const deleteFaq = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const response = await fetch(`/api/admin/faqs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      // Error deleting
    }
  };

  const toggleActive = async (faq: FAQ) => {
    const newStatus = !faq.isActive;

    try {
      const response = await fetch(`/api/admin/faqs/${faq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (response.ok) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === faq.id ? { ...f, isActive: newStatus } : f))
        );
      }
    } catch {
      // Error updating
    }
  };

  const handleReorder = async (newOrder: FAQ[]) => {
    setFaqs(newOrder);

    // Update sort order for all items
    for (let i = 0; i < newOrder.length; i++) {
      try {
        await fetch(`/api/admin/faqs/${newOrder[i].id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sortOrder: i }),
        });
      } catch {
        // Error updating order
      }
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-stone-900">FAQs</h1>
          <p className="text-stone-500 mt-1">
            Manage frequently asked questions
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-stone-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-stone-400 mx-auto" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No FAQs yet</p>
            <Button onClick={openCreateModal} className="mt-4">
              Add Your First FAQ
            </Button>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={faqs}
            onReorder={handleReorder}
            className="divide-y divide-stone-100"
          >
            {faqs.map((faq) => (
              <Reorder.Item
                key={faq.id}
                value={faq}
                className="flex items-start gap-4 px-6 py-4 bg-white hover:bg-stone-50"
              >
                <GripVertical className="w-5 h-5 text-stone-400 cursor-grab active:cursor-grabbing mt-1" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-stone-900">{faq.question}</h3>
                    {!faq.isActive && (
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-sm line-clamp-2 mt-1">
                    {faq.answer}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded capitalize">
                    {faq.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive(faq)}
                    title={faq.isActive ? "Hide" : "Show"}
                  >
                    {faq.isActive ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-stone-400" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(faq)}
                  >
                    <Pencil className="w-4 h-4 text-stone-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteFaq(faq.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingFaq || isCreating) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <h2 className="text-lg font-display text-stone-900">
                  {editingFaq ? "EDIT FAQ" : "ADD FAQ"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-stone-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    placeholder="e.g., How quickly can you respond?"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    placeholder="Provide a helpful answer..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, category: cat.value }))
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          formData.category === cat.value
                            ? "bg-amber-500 text-stone-900"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded border-stone-300"
                  />
                  <span className="text-stone-700">Active (Visible on site)</span>
                </label>
              </div>

              <div className="px-6 py-4 border-t border-stone-200 flex justify-end gap-3">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !formData.question || !formData.answer}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-900"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save FAQ
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
