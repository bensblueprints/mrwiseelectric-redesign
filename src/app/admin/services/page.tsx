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
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  icon: string;
  features: string[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

const iconOptions = [
  "Home",
  "Building",
  "Zap",
  "Cable",
  "Lightbulb",
  "Search",
  "Shield",
  "Gauge",
  "Plug",
  "Power",
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    icon: "Zap",
    features: [] as string[],
    isFeatured: false,
    isActive: true,
  });
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      const data = await response.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch {
      // Error fetching
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      longDescription: service.longDescription || "",
      icon: service.icon,
      features: service.features || [],
      isFeatured: service.isFeatured,
      isActive: service.isActive,
    });
    setIsCreating(false);
  };

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      icon: "Zap",
      features: [],
      isFeatured: false,
      isActive: true,
    });
    setIsCreating(true);
  };

  const closeModal = () => {
    setEditingService(null);
    setIsCreating(false);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    const serviceData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      description: formData.description,
      longDescription: formData.longDescription || null,
      icon: formData.icon,
      features: formData.features,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
      sortOrder: editingService ? editingService.sortOrder : services.length,
    };

    try {
      if (editingService) {
        const response = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });

        if (response.ok) {
          const updatedService = await response.json();
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? updatedService : s))
          );
        }
      } else {
        const response = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        });

        if (response.ok) {
          const newService = await response.json();
          setServices((prev) => [...prev, newService]);
        }
      }
    } catch {
      // Error saving
    }

    setSaving(false);
    closeModal();
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      // Error deleting
    }
  };

  const toggleActive = async (service: Service) => {
    const newStatus = !service.isActive;

    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      if (response.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, isActive: newStatus } : s))
        );
      }
    } catch {
      // Error updating
    }
  };

  const toggleFeatured = async (service: Service) => {
    const newStatus = !service.isFeatured;

    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newStatus }),
      });

      if (response.ok) {
        setServices((prev) =>
          prev.map((s) =>
            s.id === service.id ? { ...s, isFeatured: newStatus } : s
          )
        );
      }
    } catch {
      // Error updating
    }
  };

  const handleReorder = async (newOrder: Service[]) => {
    setServices(newOrder);

    // Update sort order for all items
    for (let i = 0; i < newOrder.length; i++) {
      try {
        await fetch(`/api/admin/services/${newOrder[i].id}`, {
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
          <h1 className="text-3xl font-display text-stone-900">SERVICES</h1>
          <p className="text-stone-500 mt-1">
            Manage your electrical services
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-stone-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-stone-400 mx-auto" />
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-stone-500">No services yet</p>
            <Button onClick={openCreateModal} className="mt-4">
              Add Your First Service
            </Button>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={services}
            onReorder={handleReorder}
            className="divide-y divide-stone-100"
          >
            {services.map((service) => (
              <Reorder.Item
                key={service.id}
                value={service}
                className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-stone-50"
              >
                <GripVertical className="w-5 h-5 text-stone-400 cursor-grab active:cursor-grabbing" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-stone-900">{service.title}</h3>
                    {service.isFeatured && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                    {!service.isActive && (
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-xs rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-sm truncate mt-1">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFeatured(service)}
                    title={service.isFeatured ? "Unfeature" : "Feature"}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        service.isFeatured
                          ? "text-amber-500 fill-amber-500"
                          : "text-stone-400"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActive(service)}
                    title={service.isActive ? "Hide" : "Show"}
                  >
                    {service.isActive ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-stone-400" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(service)}
                  >
                    <Pencil className="w-4 h-4 text-stone-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteService(service.id)}
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
        {(editingService || isCreating) && (
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
              className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-display text-stone-900">
                  {editingService ? "EDIT SERVICE" : "ADD SERVICE"}
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
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                          slug: generateSlug(e.target.value),
                        }));
                      }}
                      placeholder="e.g., Residential Electrical"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="e.g., residential-electrical"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Brief description for service cards..."
                    rows={2}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Full Description</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        longDescription: e.target.value,
                      }))
                    }
                    placeholder="Detailed description for service page..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, icon }))
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          formData.icon === icon
                            ? "bg-amber-500 text-stone-900"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Features</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature..."
                      onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button type="button" onClick={addFeature}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 rounded-full text-sm"
                      >
                        {feature}
                        <button
                          onClick={() => removeFeature(index)}
                          className="p-0.5 hover:bg-stone-200 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
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
                    <span className="text-stone-700">Featured Service</span>
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

              <div className="px-6 py-4 border-t border-stone-200 flex justify-end gap-3 sticky bottom-0 bg-white">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !formData.title || !formData.description}
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
                      Save Service
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
