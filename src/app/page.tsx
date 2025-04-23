"use client";

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar-client-wrapper";
import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Facebook,
  MessageSquare,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleImages, setVisibleImages] = useState(8);
  const [activeCategory, setActiveCategory] = useState("all");
  const [autoplay, setAutoplay] = useState<NodeJS.Timeout | null>(null);

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      category: "projects",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=1",
      alt: "Project Image 1",
    },
    {
      id: 2,
      category: "projects",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=2",
      alt: "Project Image 2",
    },
    {
      id: 3,
      category: "team",
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      alt: "Team Image 1",
    },
    {
      id: 4,
      category: "events",
      src: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80",
      alt: "Event Image 1",
    },
    {
      id: 5,
      category: "projects",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=3",
      alt: "Project Image 3",
    },
    {
      id: 6,
      category: "team",
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      alt: "Team Image 2",
    },
    {
      id: 7,
      category: "events",
      src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80",
      alt: "Event Image 2",
    },
    {
      id: 8,
      category: "projects",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=4",
      alt: "Project Image 4",
    },
    {
      id: 9,
      category: "team",
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
      alt: "Team Image 3",
    },
    {
      id: 10,
      category: "events",
      src: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=800&q=80&random=1",
      alt: "Event Image 3",
    },
    {
      id: 11,
      category: "projects",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=5",
      alt: "Project Image 5",
    },
    {
      id: 12,
      category: "team",
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      alt: "Team Image 4",
    },
  ];

  // Filter categories
  const categories = [
    { id: "all", name: t("all") || "All" },
    { id: "projects", name: t("projects") || "Projects" },
    { id: "team", name: t("team") || "Team" },
    { id: "events", name: t("events") || "Events" },
  ];

  // Filter images based on active category
  const filteredImages = galleryImages.filter(
    (image) => activeCategory === "all" || image.category === activeCategory,
  );

  // Handle show more button click
  const handleShowMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleImages(Math.min(filteredImages.length, visibleImages + 4));
      setIsLoading(false);
    }, 1000);
  };

  // Set up autoplay for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      const carouselNext = document.querySelector("[data-carousel-next]");
      if (carouselNext) {
        (carouselNext as HTMLButtonElement).click();
      }
    }, 5000);

    setAutoplay(timer);

    return () => {
      if (autoplay) clearInterval(autoplay);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("aboutTitle")}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t("aboutSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Team Photo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">{t("ourStory")}</h3>
              <p className="text-gray-600 mb-6">
                {t("foundedWithVision") ||
                  "Founded with a vision to make a difference, YEUNG THOTT has grown from a small team to a thriving organization. We believe in the power of collaboration, creativity, and commitment."}
              </p>
              <p className="text-gray-600 mb-6">
                {t("diverseTalents") ||
                  "Our team brings together diverse talents and perspectives, united by a shared passion for excellence and innovation."}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("learnMore")}
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("whatWeOffer")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("comprehensiveRange") ||
                "Discover our comprehensive range of services designed to meet your needs and exceed your expectations."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: t("professionalService"),
                description:
                  "Dedicated support and expertise for all your requirements",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: t("teamCollaboration") || "Team Collaboration",
                description: "Working together to achieve exceptional results",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: t("fastDelivery") || "Fast Delivery",
                description: "Efficient and timely completion of all projects",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: t("qualityAssurance"),
                description: "Commitment to excellence in everything we do",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: t("clearCommunication") || "Clear Communication",
                description:
                  "Open and transparent dialogue throughout the process",
              },
              {
                icon: <Camera className="w-6 h-6" />,
                title: t("creativeSolutions") || "Creative Solutions",
                description: "Innovative approaches to meet your unique needs",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("ourGallery")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("gallerySubtitle")}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${category.id === activeCategory ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Carousel */}
          <div className="max-w-5xl mx-auto mb-12">
            <Carousel className="relative">
              <CarouselContent>
                {filteredImages.slice(0, 5).map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl aspect-video">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="left-2 bg-white/80 hover:bg-white"
                data-carousel-prev
              />
              <CarouselNext
                className="right-2 bg-white/80 hover:bg-white"
                data-carousel-next
              />

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {filteredImages.slice(0, 5).map((_, index) => (
                  <span
                    key={index}
                    className={`block h-2 w-2 rounded-full ${index === 0 ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.slice(0, visibleImages).map((image) => (
              <div
                key={image.id}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visibleImages < filteredImages.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleShowMore}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    {t("loading") || "Loading..."}
                  </>
                ) : (
                  t("showMore") || "Show More"
                )}
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("viewFullGallery")}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Facebook Posts Section */}
      <section
        id="facebook-posts"
        className="py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("latestUpdates")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("updatesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Facebook Posts */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">YEUNG THOTT</h4>
                    <p className="text-xs text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  We're excited to announce our new project launching next
                  month! Stay tuned for more updates.
                </p>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&random=10"
                    alt="Facebook post image"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>❤️ 124 {t("likes") || "Likes"}</span>
                  <span>💬 38 {t("comments") || "Comments"}</span>
                  <span>🔄 17 {t("shares") || "Shares"}</span>
                </div>
              </div>
            </div>

            {/* Embedded Facebook Post */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden col-span-1 md:col-span-2 lg:col-span-2">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">YEUNG THOTT</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(
                        Date.now() - 3 * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="aspect-auto bg-white rounded-lg mb-4 overflow-hidden">
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fyeungthott%2Fposts%2Fpfbid02onDeZKWvt2xMBTqHf7S2AURmt2FzBHw1oV2SjWZt6xvmGCW4p698Pc1dEXojePeSl&show_text=true&width=500"
                    width="100%"
                    height="250"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>❤️ 287 {t("likes") || "Likes"}</span>
                  <span>💬 92 {t("comments") || "Comments"}</span>
                  <span>🔄 45 {t("shares") || "Shares"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("visitFacebook")}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("getInTouch")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("contactSubtitle")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-600 text-white p-6">
                <h3 className="text-xl font-bold mb-4">{t("contactInfo")}</h3>
                <div className="space-y-4">
                  <p>{t("address") || "123 Main Street"}</p>
                  <p>Phnom Penh, Cambodia</p>
                  <p>{t("emailAddress") || "info@yeungthott.com"}</p>
                  <p>{t("phone") || "+855 12 345 678"}</p>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("subject")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("message")}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t("sendMessage")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
