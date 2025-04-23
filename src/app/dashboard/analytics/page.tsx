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
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#468e83] dark:text-[#e3e7d7]">Page Views</h3>
                  <LineChart className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {pageViewsData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-12 bg-[#468e83]/80 dark:bg-[#468e83]/60 rounded-t-md transition-all duration-500 ease-in-out hover:bg-[#468e83]" 
                        style={{ height: `${(item.views / 300) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-[#468e83] dark:text-[#e3e7d7]">Visitor Sources</h3>
                  <PieChart className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {visitorSourcesData.map((item, index) => {
                        const startAngle = visitorSourcesData
                          .slice(0, index)
                          .reduce((sum, curr) => sum + curr.percentage, 0);
                        const endAngle = startAngle + item.percentage;
                        
                        const startAngleRad = (startAngle / 100) * 2 * Math.PI - Math.PI / 2;
                        const endAngleRad = (endAngle / 100) * 2 * Math.PI - Math.PI / 2;
                        
                        const x1 = 50 + 40 * Math.cos(startAngleRad);
                        const y1 = 50 + 40 * Math.sin(startAngleRad);
                        const x2 = 50 + 40 * Math.cos(endAngleRad);
                        const y2 = 50 + 40 * Math.sin(endAngleRad);
                        
                        const largeArcFlag = item.percentage > 50 ? 1 : 0;
                        
                        const colors = ["#468e83", "#6eb5a5", "#96ccc0", "#bee3db"];
                        
                        return (
                          <path
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={colors[index % colors.length]}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#468e83] dark:text-[#e3e7d7]">
                          {visitorSourcesData.length}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Sources</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {visitorSourcesData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: ["#468e83", "#6eb5a5", "#96ccc0", "#bee3db"][index % 4] }}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.source}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="visitors">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#468e83] dark:text-[#e3e7d7]">Visitor Demographics</h3>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Age Groups</h4>
                  <div className="space-y-4">
                    {[
                      { group: "18-24", percentage: 15 },
                      { group: "25-34", percentage: 32 },
                      { group: "35-44", percentage: 28 },
                      { group: "45-54", percentage: 18 },
                      { group: "55+", percentage: 7 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.group}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="bg-[#468e83] h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Devices</h4>
                  <div className="space-y-4">
                    {[
                      { device: "Mobile", percentage: 58 },
                      { device: "Desktop", percentage: 32 },
                      { device: "Tablet", percentage: 10 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.device}</span>
                          <span className="text-gray-700 dark:text-gray-300">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="bg-[#468e83] h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Top Countries</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { country: "Cambodia", visits: 1245 },
                    { country: "United States", visits: 865 },
                    { country: "Thailand", visits: 432 },
                    { country: "Vietnam", visits: 321 },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.country}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.visits}</span>
                    </div>
                  ))}
                </div>
              </div>
                </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
      }