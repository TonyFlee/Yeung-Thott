"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, LineChart, PieChart, Calendar, Download, RefreshCw, Users, Eye, Clock, MousePointer } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("last7days");

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Mock data for charts
  const pageViewsData = [
    { date: "Mon", views: 120 },
    { date: "Tue", views: 150 },
    { date: "Wed", views: 180 },
    { date: "Thu", views: 220 },
    { date: "Fri", views: 250 },
    { date: "Sat", views: 280 },
    { date: "Sun", views: 200 },
  ];

  const visitorSourcesData = [
    { source: "Direct", percentage: 35 },
    { source: "Social Media", percentage: 25 },
    { source: "Search", percentage: 30 },
    { source: "Referral", percentage: 10 },
  ];

  const popularPagesData = [
    { page: "Home", views: 1250 },
    { page: "Gallery", views: 980 },
    { page: "About", views: 750 },
    { page: "Contact", views: 520 },
  ];

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
            Analytics Dashboard
          </h1>

          <div className="flex flex-wrap gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border border-[#468e83] bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#468e83]"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>

            <Button
              onClick={refreshData}
              disabled={isLoading}
              className="bg-[#468e83] hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>

            <Button
              variant="outline"
              className="border-[#468e83] text-[#468e83] hover:bg-[#468e83]/10 flex items-center gap-2 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            variants={item}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Visitors</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">2,845</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span>↑ 12.5%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Page Views</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">10,482</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span>↑ 8.2%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Session</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">2m 45s</h3>
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span>↓ 3.1%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex items-center gap-4"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <MousePointer className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">42.8%</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span>↑ 1.2%</span>
                <span className="text-gray-500 dark:text-gray-400">vs last period</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="visitors" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              Visitors
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Overview content */}
            </motion.div>
          </TabsContent>

          <TabsContent value="visitors">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            >
              {/* Visitors content */}
            </motion.div>
          </TabsContent>

          <TabsContent value="content">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            >
              {/* Content section */}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
