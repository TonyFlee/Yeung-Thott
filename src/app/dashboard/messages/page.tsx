"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Star, StarOff, Eye, Archive, Reply } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
};

export default function MessagesManagement() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      subject: "Wedding Photography Inquiry",
      message:
        "Hello, I'm interested in booking your services for my wedding on June 15th next year. Could you please send me your packages and availability? Thank you!",
      date: "2023-11-15T10:30:00",
      read: true,
      starred: true,
      archived: false,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      subject: "Family Portrait Session",
      message:
        "Hi there, I'd like to book a family portrait session for my family of 5. We're looking for outdoor photos in a natural setting. What are your available dates in December? Thanks!",
      date: "2023-11-14T15:45:00",
      read: false,
      starred: false,
      archived: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      subject: "Corporate Event Photography",
      message:
        "We're hosting a corporate event on January 10th and need professional photography services. The event will run from 6pm to 10pm. Please let me know your availability and rates for corporate events.",
      date: "2023-11-12T09:15:00",
      read: true,
      starred: false,
      archived: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      subject: "Graduation Photos",
      message:
        "I'm graduating next month and looking for a photographer to capture this special moment. Do you offer graduation photo packages? I'd appreciate any information you can provide.",
      date: "2023-11-10T14:20:00",
      read: true,
      starred: false,
      archived: true,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<
    "all" | "unread" | "starred" | "archived"
  >("all");

  const handleDelete = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleToggleRead = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, read: !message.read } : message,
      ),
    );
  };

  const handleToggleStarred = (id: number) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, starred: !message.starred } : message,
      ),
    );
  };

  const handleToggleArchived = (id: number) => {
    setProcessingAction({ id, action: "archive" });
    setTimeout(() => {
      setMessages(
        messages.map((message) =>
          message.id === id
            ? { ...message, archived: !message.archived }
            : message,
        ),
      );
      setProcessingAction(null);
    }, 500); // Simulate a delay for the loading state
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "unread") return !message.read && !message.archived;
    if (filter === "starred") return message.starred && !message.archived;
    if (filter === "archived") return message.archived;
    return !message.archived; // "all" filter shows non-archived messages
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
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

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={`${filter === "all" ? "bg-[#468e83] text-white" : "border-[#468e83] text-[#468e83]"} hover:bg-[#468e83]/10 transition-all duration-300`}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className={`${filter === "unread" ? "bg-[#468e83] text-white" : "border-[#468e83] text-[#468e83]"} hover:bg-[#468e83]/10 transition-all duration-300`}
            >
              Unread
            </Button>
            <Button
              variant={filter === "starred" ? "default" : "outline"}
              onClick={() => setFilter("starred")}
              className={`${filter === "starred" ? "bg-[#468e83] text-white" : "border-[#468e83] text-[#468e83]"} hover:bg-[#468e83]/10 transition-all duration-300`}
            >
              Starred
            </Button>
            <Button
              variant={filter === "archived" ? "default" : "outline"}
              onClick={() => setFilter("archived")}
              className={`${filter === "archived" ? "bg-[#468e83] text-white" : "border-[#468e83] text-[#468e83]"} hover:bg-[#468e83]/10 transition-all duration-300`}
            >
              Archived
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
        >
          <AnimatePresence>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={item}
                  exit={{ opacity: 0, height: 0 }}
                  layout
                  className={`border-b border-gray-100 dark:border-gray-700 ${!message.read ? "bg-blue-50 dark:bg-blue-900/10" : ""} hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200`}
                >
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0 mr-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStarred(message.id)}
                        className="text-yellow-400 hover:text-yellow-500 dark:text-yellow-300 dark:hover:text-yellow-200"
                      >
                        {message.starred ? (
                          <Star className="h-5 w-5 fill-current" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <div
                      className="flex-grow cursor-pointer"
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) {
                          handleToggleRead(message.id);
                        }
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="font-semibold text-[#468e83] dark:text-[#e3e7d7]">
                          {message.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(message.date)}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                        {message.subject}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                        {message.message}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4 flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleRead(message.id)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleArchived(message.id)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                        disabled={processingAction?.id === message.id}
                      >
                        {processingAction?.id === message.id &&
                        processingAction?.action === "archive" ? (
                          <svg
                            className="animate-spin h-5 w-5 text-gray-400"
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
                        ) : (
                          <Archive className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(message.id)}
                        className="text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  No messages
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {filter === "all"
                    ? "You have no messages in your inbox."
                    : filter === "unread"
                      ? "You have no unread messages."
                      : filter === "starred"
                        ? "You have no starred messages."
                        : "You have no archived messages."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Dialog
          open={!!selectedMessage}
          onOpenChange={(open) => !open && setSelectedMessage(null)}
        >
          <DialogContent className="max-w-3xl">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#468e83] dark:text-[#e3e7d7]">
                    {selectedMessage.subject}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      From:
                    </span>{" "}
                    {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </div>
                  <div>{formatDate(selectedMessage.date)}</div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleToggleStarred(selectedMessage.id)}
                      className="flex items-center gap-2"
                    >
                      {selectedMessage.starred ? (
                        <>
                          <StarOff size={16} />
                          Unstar
                        </>
                      ) : (
                        <>
                          <Star size={16} />
                          Star
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleToggleArchived(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Archive size={16} />
                      {selectedMessage.archived ? "Unarchive" : "Archive"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2">
                      <Reply size={16} />
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleDelete(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
