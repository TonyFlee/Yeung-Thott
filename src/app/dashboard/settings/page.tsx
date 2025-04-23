"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Save, RefreshCw, Upload, Check } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "YEUNG THOTT",
    tagline: "Professional Photography Team",
    email: "yeungthott@gmail.com",
    phone: "+855 69 895 443",
    address: "123 Main Street, Phnom Penh, Cambodia",
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://www.facebook.com/yeungthott",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#468e83",
    secondaryColor: "#e3e7d7",
    darkModeDefault: false,
    showLanguageSwitcher: true,
    defaultLanguage: "en",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralSettings({ ...generalSettings, [field]: value });
  };

  const handleSocialChange = (field: string, value: string) => {
    setSocialSettings({ ...socialSettings, [field]: value });
  };

  const handleAppearanceChange = (field: string, value: any) => {
    setAppearanceSettings({ ...appearanceSettings, [field]: value });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
            Settings
          </h1>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className={`${saveSuccess ? "bg-green-500" : "bg-[#468e83]"} hover:bg-[#468e83]/90 text-white flex items-center gap-2 transition-all duration-300 transform hover:scale-105`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <Check className="h-4 w-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </motion.div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white"
            >
              Social Media
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white"
            >
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 space-y-6"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      handleGeneralChange("siteName", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={generalSettings.tagline}
                    onChange={(e) =>
                      handleGeneralChange("tagline", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) =>
                      handleGeneralChange("email", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={generalSettings.phone}
                    onChange={(e) =>
                      handleGeneralChange("phone", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) =>
                      handleGeneralChange("address", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="social">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 space-y-6"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    value={socialSettings.facebook}
                    onChange={(e) =>
                      handleSocialChange("facebook", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={socialSettings.instagram}
                    onChange={(e) =>
                      handleSocialChange("instagram", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={socialSettings.twitter}
                    onChange={(e) =>
                      handleSocialChange("twitter", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input
                    id="youtube"
                    value={socialSettings.youtube}
                    onChange={(e) =>
                      handleSocialChange("youtube", e.target.value)
                    }
                    className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 space-y-6"
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="primary-color"
                      type="color"
                      value={appearanceSettings.primaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("primaryColor", e.target.value)
                      }
                      className="w-16 h-10 p-1 border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                    />
                    <Input
                      value={appearanceSettings.primaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("primaryColor", e.target.value)
                      }
                      className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="w-16 h-10 p-1 border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                    />
                    <Input
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("secondaryColor", e.target.value)
                      }
                      className="border-[#468e83] focus:border-[#468e83] focus:ring-[#468e83]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode-default" className="cursor-pointer">
                    Dark Mode as Default
                  </Label>
                  <Switch
                    id="dark-mode-default"
                    checked={appearanceSettings.darkModeDefault}
                    onCheckedChange={(checked) =>
                      handleAppearanceChange("darkModeDefault", checked)
                    }
                    className="data-[state=checked]:bg-[#468e83]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="show-language-switcher"
                    className="cursor-pointer"
                  >
                    Show Language Switcher
                  </Label>
                  <Switch
                    id="show-language-switcher"
                    checked={appearanceSettings.showLanguageSwitcher}
                    onCheckedChange={(checked) =>
                      handleAppearanceChange("showLanguageSwitcher", checked)
                    }
                    className="data-[state=checked]:bg-[#468e83]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <select
                    id="default-language"
                    value={appearanceSettings.defaultLanguage}
                    onChange={(e) =>
                      handleAppearanceChange("defaultLanguage", e.target.value)
                    }
                    className="flex h-10 w-full rounded-md border border-[#468e83] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#468e83] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="en">English</option>
                    <option value="km">Khmer</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="logo-upload">Upload Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/64?text=Logo";
                        }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#468e83] text-[#468e83] hover:bg-[#468e83]/10 flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Upload New Logo
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Recommended size: 200x200px. Max file size: 2MB.
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
