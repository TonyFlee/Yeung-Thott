"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@/supabase/client-component";
import { Pencil, Trash2, Plus, X } from "lucide-react";

type FacebookPost = {
  id: string;
  image_url: string;
  description: string;
  post_date: string;
  href: string;
};

const emptyForm: Omit<FacebookPost, "id"> = {
  image_url: "",
  description: "",
  post_date: "",
  href: "",
};

export default function FacebookPostsAdmin() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<FacebookPost, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClientComponentClient();

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase
      .from("facebook_posts")
      .select("*")
      .order("post_date", { ascending: false });
    setPosts(data || []);
    if (error) setMessage("Failed to fetch posts: " + error.message);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!form.image_url || !form.description || !form.post_date || !form.href) {
      setMessage("All fields are required.");
      return;
    }

    if (editId) {
      // Update post
      const { error } = await supabase.from("facebook_posts").update(form).eq("id", editId);
      if (error) {
        setMessage("Failed to update post: " + error.message);
      } else {
        setMessage("Post updated successfully!");
        setEditId(null);
        setForm(emptyForm);
        fetchPosts();
      }
    } else {
      // Add post
      const { error } = await supabase.from("facebook_posts").insert([form]);
      if (error) {
        setMessage("Failed to add post: " + error.message);
      } else {
        setMessage("Post added successfully!");
        setForm(emptyForm);
        fetchPosts();
      }
    }
  };

  const handleEdit = (post: FacebookPost) => {
    setEditId(post.id);
    setForm({
      image_url: post.image_url,
      description: post.description,
      post_date: post.post_date,
      href: post.href,
    });
    setMessage(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const { error } = await supabase.from("facebook_posts").delete().eq("id", id);
    if (error) {
      setMessage("Failed to delete post: " + error.message);
    } else {
      setMessage("Post deleted successfully!");
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-white">Facebook Posts Admin</h1>
        <p className="mb-8 text-gray-400">Add, edit, or delete Facebook posts below.</p>

        {/* Notification */}
        {message && (
          <div className="mb-6 flex items-center bg-blue-900 text-blue-200 px-4 py-2 rounded">
            <span className="flex-1">{message}</span>
            <button onClick={() => setMessage(null)} className="ml-2 p-1">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Add/Edit form */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-gray-900 rounded-lg shadow p-6 flex flex-wrap gap-4"
        >
          <div className="flex-1 min-w-[220px]">
            <label className="block text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Paste image URL"
              required
            />
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-gray-300 mb-1">Post Date</label>
            <input
              type="date"
              name="post_date"
              value={form.post_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              required
            />
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-gray-300 mb-1">Facebook Link</label>
            <input
              type="url"
              name="href"
              value={form.href}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="https://facebook.com/..."
              required
            />
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Post description..."
              required
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              {editId ? (
                <span className="flex items-center">
                  <Pencil className="mr-1 w-4 h-4" /> Update
                </span>
              ) : (
                <span className="flex items-center">
                  <Plus className="mr-1 w-4 h-4" /> Add Post
                </span>
              )}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Posts table/grid */}
        <div className="bg-gray-900 rounded-lg shadow p-4">
          {loading ? (
            <div className="text-gray-400">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-400">No posts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-2 px-2">Image</th>
                    <th className="py-2 px-2">Description</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Facebook Link</th>
                    <th className="py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800 group">
                      <td className="py-2 px-2">
                        <img
                          src={post.image_url}
                          alt="Post"
                          className="w-28 h-16 object-cover bg-gray-700 rounded"
                        />
                      </td>
                      <td className="py-2 px-2 max-w-xs">
                        <span className="block text-white truncate">{post.description}</span>
                      </td>
                      <td className="py-2 px-2">
                        <span className="text-gray-300">
                          {new Date(post.post_date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <a
                          href={post.href}
                          className="text-blue-400 underline hover:text-blue-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(post)}
                          className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 px-2 py-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}