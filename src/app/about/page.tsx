import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - YEUNG THOTT",
  description: "Learn more about YEUNG THOTT team and our mission.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                About YEUNG THOTT
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A professional team dedicated to excellence and innovation
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Our Mission & Vision
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  At YEUNG THOTT, our mission is to deliver exceptional results
                  that exceed expectations. We are committed to innovation,
                  quality, and customer satisfaction in everything we do.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our vision is to become a leading team recognized for our
                  expertise, reliability, and the positive impact we make for
                  our clients and community.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      Excellence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We strive for excellence in all our endeavors
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      Innovation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We embrace creative solutions and new ideas
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      Integrity
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We act with honesty and transparency
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                      Teamwork
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We collaborate to achieve common goals
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                    alt="Our Team"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  Founded with a vision to make a difference, YEUNG THOTT has
                  grown from a small team to a thriving organization. We believe
                  in the power of collaboration, creativity, and commitment.
                </p>
                <p>
                  Our journey began with a simple idea: to create a team that
                  combines expertise with passion. Over the years, we've
                  expanded our capabilities while staying true to our core
                  values.
                </p>
                <p>
                  Today, we're proud to serve clients across various sectors,
                  bringing our unique approach and dedication to every project
                  we undertake.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                  Our Growth Timeline
                </h3>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      <div className="h-full w-0.5 bg-blue-600 dark:bg-blue-400 opacity-30"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        2018: The Beginning
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        YEUNG THOTT was founded with a small team of dedicated
                        professionals.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      <div className="h-full w-0.5 bg-blue-600 dark:bg-blue-400 opacity-30"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        2020: Expansion
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        We expanded our team and services to meet growing
                        demand.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      <div className="h-full w-0.5 bg-blue-600 dark:bg-blue-400 opacity-30"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        2022: Innovation
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        We introduced new innovative approaches and technologies
                        to our work.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Today: Looking Forward
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        We continue to grow and evolve, always focused on
                        delivering excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  role: "Team Leader",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
                },
                {
                  name: "Jane Smith",
                  role: "Senior Member",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                },
                {
                  name: "David Chen",
                  role: "Team Member",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Dedicated professional with expertise in their field,
                      committed to delivering exceptional results.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
