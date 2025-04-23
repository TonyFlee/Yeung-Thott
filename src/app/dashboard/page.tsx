import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - YEUNG THOTT",
  description: "Admin dashboard for YEUNG THOTT website management.",
};

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in?redirect=/dashboard");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="bg-secondary/50 dark:bg-gray-800 text-sm p-3 px-4 rounded-lg text-muted-foreground dark:text-gray-300 flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome to the YEUNG THOTT admin dashboard. Manage your website
                content here.
              </span>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-card dark:bg-gray-800 rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle
                size={48}
                className="text-primary dark:text-blue-400"
              />
              <div>
                <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
                  Admin Profile
                </h2>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="bg-muted/50 dark:bg-gray-700 rounded-lg p-4 overflow-hidden">
              <pre className="text-xs font-mono max-h-48 overflow-auto text-gray-700 dark:text-gray-300">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </section>

          {/* Dashboard Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Content Management */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Content Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Update website content, images, and text.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Manage Content
              </button>
            </div>

            {/* Gallery Management */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Gallery Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload, organize, and delete gallery images.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Manage Gallery
              </button>
            </div>

            {/* Facebook Posts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Facebook Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Embed and manage Facebook posts on your website.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Manage Posts
              </button>
            </div>

            {/* Contact Messages */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Messages
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View and respond to messages from the contact form.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Messages
              </button>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Configure website settings and preferences.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Manage Settings
              </button>
            </div>

            {/* Analytics */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View website traffic and user engagement data.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
