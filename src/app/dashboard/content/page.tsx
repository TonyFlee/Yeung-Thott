"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Edit, Save, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";

export default function ContentManagement() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Welcome to YEUNG THOTT",
      content:
        "A professional team dedicated to excellence and innovation. Discover our services and see how we can help you achieve your goals.",
      isEditing: false,
    },
    {
      id: 2,
      title: "About YEUNG THOTT",
      content:
        "We are a dedicated team committed to excellence and innovation in everything we do. Our mission is to deliver exceptional results that exceed expectations.",
      isEditing: false,
    },
    {
      id: 3,
      title: "Our Gallery",
      content:
        "Explore our portfolio of work and see the quality and creativity we bring to every project.",
      isEditing: false,
    },
  ]);
  const [isSaving, setIsSaving] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, isEditing: true } : section,
      ),
    );
  };

  const handleSave = (id: number) => {
    setIsSaving(id);
    // Simulate API call
    setTimeout(() => {
      setSections(
        sections.map((section) =>
          section.id === id ? { ...section, isEditing: false } : section,
        ),
      );
      setIsSaving(null);
    }, 800);
  };

  const handleDelete = (id: number) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(...sections.map((s) => s.id), 0) + 1;
    setSections([
      ...sections,
      {
        id: newId,
        title: "New Section",
        content: "Add your content here",
        isEditing: true,
      },
    ]);
  };

  const handleChange = (
    id: number,
    field: "title" | "content",
    value: string,
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
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
            Content Management
          </h1>
          <Button
            onClick={handleAdd}
            className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={16} />
            Add Section
          </Button>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6"
        >
          {sections.map((section) => (
            <motion.div
              key={section.id}
              variants={item}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              {section.isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      handleChange(section.id, "title", e.target.value)
                    }
                    className="text-xl font-semibold mb-2 border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                  <Textarea
                    value={section.content}
                    onChange={(e) =>
                      handleChange(section.id, "content", e.target.value)
                    }
                    className="text-gray-600 dark:text-gray-300 border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      onClick={() => handleSave(section.id)}
                      className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300"
                      disabled={isSaving === section.id}
                    >
                      {isSaving === section.id ? (
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
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-[#468e83] dark:text-[#e3e7d7]">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.content}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      onClick={() => handleEdit(section.id)}
                      variant="outline"
                      className="border-[#468e83] text-[#468e83] hover:bg-[#468e83]/10 flex items-center gap-2 transition-all duration-300"
                    >
                      <Edit size={16} />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(section.id)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
