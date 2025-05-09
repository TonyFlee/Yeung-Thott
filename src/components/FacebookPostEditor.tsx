

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@/supabase/client-component";
import { motion } from "framer-motion";
import { Facebook, ArrowUpRight, Pencil, Trash2, Plus, X } from "lucide-react";

const fadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const fadeInVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };

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

export default function FacebookPostsEditor() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<FacebookPost, "id">>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClientComponentClient();

  const fetchPosts = async () => {
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase
      .from("facebook_posts")
      .select("*")
      .order("post_date", { ascending: false });
    if (error) {
      setPosts([]);
      setMessage("Error fetching posts: " + error.message);
    } else {
      setPosts(data as FacebookPost[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url || !form.description || !form.post_date || !form.href) {
      setMessage("All fields are required.");
      return;
    }
    setMessage(null);
    setLoading(true);
    if (editId) {
      const { error } = await supabase
        .from("facebook_posts")
        .update(form)
        .eq("id", editId);
      if (error) {
        setMessage("Update failed: " + error.message);
      } else {
        setMessage("Post updated!");
        setEditId(null);
        setForm(emptyForm);
        await fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from("facebook_posts")
        .insert([form]);
      if (error) {
        setMessage("Add failed: " + error.message);
      } else {
        setMessage("Post added!");
        setForm(emptyForm);
        await fetchPosts();
      }
    }
    setLoading(false);
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.from("facebook_posts").delete().eq("id", id);
    if (error) {
      setMessage("Delete failed: " + error.message);
    } else {
      setMessage("Post deleted!");
      if (editId === id) {
        setEditId(null);
        setForm(emptyForm);
      }
      await fetchPosts();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm);
    setMessage(null);
  };

  return (
    <motion.section
      id="facebook-posts"
      className="py-24 bg-[#e1e9e7]/30 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Manage Facebook Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Add, edit, or delete posts below.
          </p>
        </motion.div>

        {/* Form */}
        <div className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow max-w-2xl mx-auto">
          <h3 className="font-bold mb-2 flex items-center">
            {editId ? (
              <>
                <Pencil className="mr-2" /> Edit Post
                <button
                  className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1"
                  onClick={handleCancel}
                  type="button"
                  title="Cancel edit"
                >
                  <X />
                </button>
              </>
            ) : (
              <>
                <Plus className="mr-2" /> Add New Post
              </>
            )}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Image URL"
                className="p-2 rounded border"
              />
              <input
                name="post_date"
                value={form.post_date}
                onChange={handleChange}
                type="date"
                className="p-2 rounded border"
                placeholder="Date"
              />
              <input
                name="href"
                value={form.href}
                onChange={handleChange}
                placeholder="Facebook Link"
                className="p-2 rounded border"
                type="url"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="p-2 rounded border"
                rows={1}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {editId ? "Update Post" : "Add Post"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {message && (
            <div className="mt-2 p-2 rounded bg-yellow-100 text-yellow-800">{message}</div>
          )}
        </div>

        {/* Posts List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No posts found.</div>
          ) : (
            posts.map((post) =>
              editId === post.id ? null :
              (
                <motion.div
                  key={post.id}
                  className="dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative"
                  variants={fadeUpVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <Facebook className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#468e83] dark:from-[#e3e7d7] dark:to-[#468e83]">
                          យើងថត • Yeung Thott
                        </h4>
                        <p className="text-xs text-gray-500">
                          {new Date(post.post_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.description.split(" ").map((word, i) =>
                        word.startsWith("#") ? (
                          <span
                            key={i}
                            className="text-blue-600 underline cursor-pointer"
                          >
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )
                      )}
                    </p>
                    <motion.div
                      className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={post.image_url}
                        alt="Facebook Post"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="text-right">
                      <motion.a
                        href={post.href}
                        target="_blank"
                        className="text-blue-600 underline cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read More <ArrowUpRight className="inline ml-1 w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )
            )
          )}
        </div>
      </div>
    </motion.section>
  );
}