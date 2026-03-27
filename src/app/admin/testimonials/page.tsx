"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  content: string;
  rating: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    content: "",
    rating: 5,
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
      }
    } catch {
      // Error fetching
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location || "",
      content: testimonial.content,
      rating: testimonial.rating,
      isFeatured: testimonial.isFeatured,
      isActive: testimonial.isActive,
    });
    setIsCreating(false);
  };

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setFormData({
      name: "",
      location: "",
      content: "",
      rating: 5,
      isFeatured: false,
      isActive: true,
    });
    setIsCreating(true);
  };

  const closeModal = () => {
    setEditingTestimonial(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const testimonialData = {
      name: formData.name,
      location: formData.location || null,
      content: formData.content,
      rating: formData.rating,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    try {
      if (editingTestimonial) {
        const response = await fetch(`/api/admin/testimonials/${editingTestimonial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialData),
        });

        if (response.ok) {
          const updatedTestimonial = await response.json();
          setTestimonials((prev) =>
            prev.map((t) =>
              t.id === editingTestimonial.id ? updatedTestimonial : t
            )
          );
        }
      } else {
        const response = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialData),
        });

        if (response.ok) {
          const newTestimonial = await response.json();
          setTestimonials((prev) => [newTestimonial, ...prev]);
        }
      }
    } catch {
      // Error saving
    }

    setSaving(false);
    closeModal();
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      // Error deleting
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    const newStatus = !testimonial.isActive;

    try {
      const response = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (response.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === testimonial.id ? { ...t, isActive: newStatus } : t
          )
        );
      }
    } catch {
      // Error updating
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    const newStatus = !testimonial.isFeatured;

    try {
      const response = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newStatus }),
      });

      if (response.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === testimonial.id ? { ...t, isFeatured: newStatus } : t
          )
        );
      }
    } catch {
      // Error updating
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={
              interactive
                ? () => setFormData((prev) => ({ ...prev, rating: star }))
                : undefined
            }
            className={interactive ? "cursor-pointer" : "cursor-default"}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? "text-amber-500 fill-amber-500"
                  : "text-stone-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-stone-900">TESTIMONIALS</h1>
          <p className="text-stone-500 mt-1">
            Manage customer testimonials and reviews
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-stone-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-stone-400 mx-auto" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <Quote className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500">No testimonials yet</p>
          <Button onClick={openCreateModal} className="mt-4">
            Add Your First Testimonial
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layout
              className={`bg-white rounded-xl border p-6 ${
                !testimonial.isActive
                  ? "border-stone-200 opacity-60"
                  : testimonial.isFeatured
                  ? "border-amber-300 ring-1 ring-amber-200"
                  : "border-stone-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 font-display text-lg">
                    {testimonial.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900">
                      {testimonial.name}
                    </h3>
                    {testimonial.location && (
                      <p className="text-stone-500 text-sm">
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                </div>
                {testimonial.isFeatured && (
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                )}
              </div>

              {renderStars(testimonial.rating)}

              <p className="text-stone-600 mt-4 line-clamp-4">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFeatured(testimonial)}
                    title={testimonial.isFeatured ? "Unfeature" : "Feature"}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        testimonial.isFeatured
                          ? "text-amber-500 fill-amber-500"
                          : "text-stone-400"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive(testimonial)}
                    title={testimonial.isActive ? "Hide" : "Show"}
                  >
                    {testimonial.isActive ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-stone-400" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(testimonial)}
                  >
                    <Pencil className="w-4 h-4 text-stone-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingTestimonial || isCreating) && (
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
                  {editingTestimonial ? "EDIT TESTIMONIAL" : "ADD TESTIMONIAL"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-stone-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="e.g., John Smith"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="e.g., Atlanta, GA"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label>Rating</Label>
                  <div className="mt-2">{renderStars(formData.rating, true)}</div>
                </div>

                <div>
                  <Label htmlFor="content">Testimonial</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="What did the customer say about your service?"
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isFeatured: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded border-stone-300"
                    />
                    <span className="text-stone-700">Featured</span>
                  </label>
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
                    <span className="text-stone-700">Active (Visible)</span>
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-stone-200 flex justify-end gap-3">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !formData.name || !formData.content}
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
                      Save Testimonial
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
