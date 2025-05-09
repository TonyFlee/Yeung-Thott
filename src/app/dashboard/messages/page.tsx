"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw, Trash2 } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { createClientComponentClient } from "@/supabase/client";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  created_at: string;
};

export default function MessagesPage() {
  const supabase = createClientComponentClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError("Failed to fetch messages: " + error.message);
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      setError("Failed to delete: " + error.message);
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
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
            Messages
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300"
            >
              {refreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </motion.div>

        {error && (
          <div className="mb-4 text-red-500 bg-red-100 dark:bg-red-900/40 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-400">No messages found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-xs text-gray-600 dark:text-gray-400 uppercase border-b dark:border-gray-700">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Message</th>
                    <th className="p-2">Date</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id} className="border-b dark:border-gray-700">
                      <td className="p-2">{msg.name}</td>
                      <td className="p-2">{msg.email}</td>
                      <td className="p-2">{msg.subject}</td>
                      <td className="p-2">{msg.content}</td>
                      <td className="p-2 text-xs text-gray-500">
                        {new Date(msg.created_at).toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" })}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="text-red-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
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