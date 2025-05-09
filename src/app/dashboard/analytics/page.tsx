"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@/supabase/client";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components (needed for Chart.js v3+)
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const categories = [
  { id: "project", name: "Project" },
  { id: "team", name: "Team" },
  { id: "events", name: "Events" },
  { id: "sport", name: "Sport" },
];

type GalleryItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
};

export default function AnalyticsPage() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      setItems(data || []);
      setLoading(false);
    };

    fetchAnalytics();
    // eslint-disable-next-line
  }, []);

  // Stats
  const total = items.length;
  const perCategory = categories.map((cat) => ({
    ...cat,
    count: items.filter((item) => item.category === cat.id).length,
  }));
  const mostRecent = items[0];

  // Chart data
  const chartData = {
    labels: categories.map((c) => c.name),
    datasets: [
      {
        label: "Items per Category",
        data: perCategory.map((c) => c.count),
        backgroundColor: [
          "#468e83",
          "#6d9b7b",
          "#e3e7d7",
          "#b7d1c2",
        ],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gallery Analytics</h1>
      {loading ? (
        <div className="text-gray-400">Loading analytics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-400">{total}</div>
              <div className="mt-2 text-gray-300">Total Items</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {perCategory.map((c) => (
                  <div key={c.id}>
                    {c.name}: <span className="text-white">{c.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-gray-300">Items per Category</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              {mostRecent ? (
                <>
                  <div className="text-sm text-gray-400 mb-1">Most Recent</div>
                  <img
                    src={mostRecent.image_url}
                    alt={mostRecent.title}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <div className="font-semibold text-white">{mostRecent.title}</div>
                  <div className="text-xs text-gray-400">{mostRecent.created_at?.slice(0, 10)}</div>
                </>
              ) : (
                <div className="text-gray-400">No items</div>
              )}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="mb-4 font-semibold text-gray-100">Category Chart</div>
            {/* Chart.js Bar Chart */}
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: "#e3e7d7" } },
                  y: { ticks: { color: "#e3e7d7" }, beginAtZero: true },
                },
              }}
              height={180}
            />
          </div>
        </>
      )}
    </div>
  );
}