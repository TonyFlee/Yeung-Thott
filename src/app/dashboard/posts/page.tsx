"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Trash2, Plus, ExternalLink, Edit, Save } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type FacebookPost = {
  id: number;
  embedCode: string;
  title: string;
  description: string;
  isEditing?: boolean;
};

export default function FacebookPostsManagement() {
  const [posts, setPosts] = useState<FacebookPost[]>([
    {
      id: 1,
      embedCode:
        '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fposts%2F10153231379946729&width=500" width="500" height="594" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
      title: "Our Latest Wedding Shoot",
      description:
        "Check out highlights from our recent wedding photography session.",
    },
    {
      id: 2,
      embedCode:
        '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fposts%2F10153231379946729&width=500" width="500" height="594" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
      title: "New Photography Equipment",
      description:
        "We've upgraded our equipment to bring you even better quality photos!",
    },
  ]);

  const [newPost, setNewPost] = useState({
    embedCode: "",
    title: "",
    description: "",
  });
  const [isSaving, setIsSaving] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleAdd = () => {
    if (newPost.embedCode && newPost.title) {
      const newId = Math.max(...posts.map((post) => post.id), 0) + 1;
      setPosts([
        ...posts,
        {
          id: newId,
          ...newPost,
        },
      ]);
      setNewPost({ embedCode: "", title: "", description: "" });
    }
  };

  const handleEdit = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, isEditing: true } : post,
      ),
    );
  };

  const handleSave = (id: number) => {
    setIsSaving(id);
    // Simulate API call
    setTimeout(() => {
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, isEditing: false } : post,
        ),
      );
      setIsSaving(null);
    }, 800);
  };

  const handleChange = (
    id: number,
    field: keyof FacebookPost,
    value: string,
  ) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, [field]: value } : post,
      ),
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-[#468e83] dark:text-[#e3e7d7]">
            Facebook Posts Management
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <Plus size={16} />
                Add Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[#468e83] dark:text-[#e3e7d7]">
                  Add New Facebook Post
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="post-title">Title</Label>
                  <Input
                    id="post-title"
                    placeholder="Our Latest Wedding Shoot"
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="post-description">Description</Label>
                  <Textarea
                    id="post-description"
                    placeholder="Brief description of the post"
                    value={newPost.description}
                    onChange={(e) =>
                      setNewPost({ ...newPost, description: e.target.value })
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="post-embed">Facebook Embed Code</Label>
                  <Textarea
                    id="post-embed"
                    placeholder='<iframe src="https://www.facebook.com/plugins/post.php?href=..." width="500" height="594" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>'
                    value={newPost.embedCode}
                    onChange={(e) =>
                      setNewPost({ ...newPost, embedCode: e.target.value })
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83] font-mono text-xs"
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleAdd}
                    className="bg-[#468e83] hover:bg-[#468e83]/90 text-white"
                    disabled={!newPost.embedCode || !newPost.title}
                  >
                    Add Post
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6"
        >
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                exit={{ opacity: 0, height: 0 }}
                layout
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                {post.isEditing ? (
                  <div className="p-6 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-title-${post.id}`}>Title</Label>
                      <Input
                        id={`edit-title-${post.id}`}
                        value={post.title}
                        onChange={(e) =>
                          handleChange(post.id, "title", e.target.value)
                        }
                        className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-description-${post.id}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`edit-description-${post.id}`}
                        value={post.description}
                        onChange={(e) =>
                          handleChange(post.id, "description", e.target.value)
                        }
                        className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`edit-embed-${post.id}`}>
                        Embed Code
                      </Label>
                      <Textarea
                        id={`edit-embed-${post.id}`}
                        value={post.embedCode}
                        onChange={(e) =>
                          handleChange(post.id, "embedCode", e.target.value)
                        }
                        className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83] font-mono text-xs"
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleSave(post.id)}
                        className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2"
                        disabled={isSaving === post.id}
                      >
                        {isSaving === post.id ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden">
                      <div
                        className="transform transition-transform duration-500 hover:scale-105"
                        dangerouslySetInnerHTML={{ __html: post.embedCode }}
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-[#468e83] dark:text-[#e3e7d7] mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          onClick={() => handleEdit(post.id)}
                          variant="outline"
                          className="border-[#468e83] text-[#468e83] hover:bg-[#468e83]/10 flex items-center gap-2 transition-all duration-300"
                        >
                          <Edit size={16} />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(post.id)}
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-all duration-300"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Facebook className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
              No Facebook posts yet
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by adding some Facebook posts to your website.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
