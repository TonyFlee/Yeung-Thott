"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Plus, Image as ImageIcon, X } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type GalleryImage = {
  id: number;
  url: string;
  title: string;
  category: string;
};

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1581600140682-79c5fe8828d3?w=800&q=80",
      title: "Wedding Photography",
      category: "Wedding",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1533854775446-95c8a5b7a101?w=800&q=80",
      title: "Portrait Session",
      category: "Portrait",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      title: "Corporate Event",
      category: "Event",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      title: "Family Portrait",
      category: "Portrait",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      title: "Landscape Photography",
      category: "Landscape",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      title: "Wedding Ceremony",
      category: "Wedding",
    },
  ]);

  const [newImage, setNewImage] = useState({
    url: "",
    title: "",
    category: "",
  });

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const categories = ["All", "Wedding", "Portrait", "Event", "Landscape"];

  const handleDelete = (id: number) => {
    setIsDeleting(id);
    // Simulate API call
    setTimeout(() => {
      setImages(images.filter((image) => image.id !== id));
      setIsDeleting(null);
    }, 500);
  };

  const handleAdd = () => {
    if (newImage.url && newImage.title && newImage.category) {
      setIsAdding(true);
      // Simulate API call
      setTimeout(() => {
        const newId = Math.max(...images.map((img) => img.id), 0) + 1;
        setImages([
          ...images,
          {
            id: newId,
            ...newImage,
          },
        ]);
        setNewImage({ url: "", title: "", category: "" });
        setIsAdding(false);
      }, 500);
    }
  };

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNavbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <h1 className="text-3xl font-bold text-[#468e83] dark:text-[#e3e7d7]">
            Gallery Management
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <Plus size={16} />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[#468e83] dark:text-[#e3e7d7]">
                  Add New Image
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={newImage.url}
                    onChange={(e) =>
                      setNewImage({ ...newImage, url: e.target.value })
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image-title">Title</Label>
                  <Input
                    id="image-title"
                    placeholder="Wedding Photography"
                    value={newImage.title}
                    onChange={(e) =>
                      setNewImage({ ...newImage, title: e.target.value })
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image-category">Category</Label>
                  <select
                    id="image-category"
                    value={newImage.category}
                    onChange={(e) =>
                      setNewImage({ ...newImage, category: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-[#468e83] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#468e83] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories
                      .filter((c) => c !== "All")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
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
                    disabled={
                      !newImage.url ||
                      !newImage.title ||
                      !newImage.category ||
                      isAdding
                    }
                  >
                    {isAdding ? (
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
                        Adding...
                      </>
                    ) : (
                      <>Add Image</>
                    )}
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`${filter === category ? "bg-[#468e83] text-white" : "border-[#468e83] text-[#468e83]"} hover:bg-[#468e83]/10 transition-all duration-300`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={item}
                layout
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
                      className="rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#468e83] dark:text-[#e3e7d7] mb-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {image.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
              No images found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filter !== "All"
                ? `No images in the ${filter} category. Try another category or add new images.`
                : "Get started by adding some images to your gallery."}
            </p>
          </motion.div>
        )}

        <Dialog>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {selectedImage && (
              <div className="relative">
                <DialogClose className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-black/40 text-white"
                  >
                    <X size={18} />
                  </Button>
                </DialogClose>
                <div className="relative aspect-video">
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h2 className="text-xl font-semibold text-[#468e83] dark:text-[#e3e7d7]">
                    {selectedImage.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedImage.category}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
