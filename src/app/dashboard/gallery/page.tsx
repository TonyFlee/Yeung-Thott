"use client";
import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Plus, UploadCloud, X } from "lucide-react";
import { createClientComponentClient } from "@/supabase/client";
import DashboardNavbar from "@/components/dashboard-navbar";

type GalleryItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
};

const emptyForm: Omit<GalleryItem, "id"> = {
  category: "",
  title: "",
  description: "",
  image_url: "",
};

const categories = [
  { id: "project", name: "Project" },
  { id: "team", name: "Team" },
  { id: "events", name: "Events" },
  { id: "sport", name: "Sport" },
];

export default function GalleryAdmin() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<GalleryItem, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });
    setItems(data || []);
    if (error) setMessage("Failed to fetch gallery: " + error.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  // Form handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (
      !form.category ||
      !form.title ||
      !form.description ||
      !form.image_url
    ) {
      setMessage("All fields are required.");
      return;
    }
    if (editId) {
      const { error } = await supabase
        .from("gallery")
        .update(form)
        .eq("id", editId);
      if (error) setMessage("Failed to update: " + error.message);
      else {
        setMessage("Gallery item updated!");
        setEditId(null);
        setForm(emptyForm);
        fetchItems();
      }
    } else {
      const { error } = await supabase.from("gallery").insert([form]);
      if (error) setMessage("Failed to add: " + error.message);
      else {
        setMessage("Gallery item added!");
        setForm(emptyForm);
        fetchItems();
      }
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setForm({
      category: item.category,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
    });
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) setMessage("Failed to delete: " + error.message);
    else {
      setMessage("Deleted!");
      fetchItems();
    }
  };

  // Category select handler (for clarity, but you can just use handleChange)
  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };

  // Image Upload
  const handleImageSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    const ext = file.name.split(".").pop();
    const filePath = `gallery-images/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("gallery-images")
      .upload(filePath, file, { upsert: false });
    if (error) {
      setMessage("Failed to upload image: " + error.message);
      setUploading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(filePath);
    if (publicUrlData?.publicUrl)
      setForm((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
    else setMessage("Failed to get image URL.");
    setUploading(false);
  };

  return (
    <>
    <DashboardNavbar />
    <div className="max-w-5xl mx-auto py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gallery Admin</h1>
      {message && (
        <div className="mb-4 flex items-center bg-blue-900 text-blue-200 px-4 py-2 rounded">
          <span className="flex-1">{message}</span>
          <button onClick={() => setMessage(null)} className="ml-2 p-1">
            <X size={16} />
          </button>
        </div>
      )}
      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-900 p-6 rounded-lg shadow flex flex-wrap gap-4"
      >
        <select
          name="category"
          value={form.category}
          onChange={handleCategorySelect}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 min-w-[120px]"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 flex-1 min-w-[140px]"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 flex-1 min-w-[140px]"
          required
        />
        <input
          type="text"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Paste image URL"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700 flex-1"
          required
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageSelect}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-700 hover:bg-gray-600 text-white rounded px-3 py-2 flex items-center"
          disabled={uploading}
        >
          <UploadCloud className="w-5 h-5 mr-1" />
          {uploading ? "Uploading..." : "Select Image"}
        </button>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {editId ? (
            <span className="flex items-center">
              <Pencil className="mr-1 w-4 h-4" /> Update
            </span>
          ) : (
            <span className="flex items-center">
              <Plus className="mr-1 w-4 h-4" /> Add
            </span>
          )}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm(emptyForm);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>
      {/* Gallery List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-lg shadow p-4 flex flex-col"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <div className="font-semibold text-white">{item.title}</div>
            <div className="text-sm text-gray-300 mb-2">{item.description}</div>
            <div className="text-xs text-gray-400 mb-2">
              {categories.find((c) => c.id === item.category)?.name}
            </div>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleEdit(item)}
                className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded"
                title="Edit"
              >
                <Pencil className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 px-2 py-1 rounded"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}