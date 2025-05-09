"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Save, RefreshCw, Check } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { createClientComponentClient } from "@/supabase/client-component";

const SETTINGS_ROW_ID = 1;

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
  });

  const [socialSettings, setSocialSettings] = useState({
    facebook: "",
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

  // Load from Supabase
  useEffect(() => {
    async function loadSettings() {
      const supabase = createClientComponentClient();
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", SETTINGS_ROW_ID)
        .single();
      if (data) {
        setGeneralSettings({
          siteName: data.site_name || "",
          tagline: data.tagline || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setSocialSettings({
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
          youtube: data.youtube || "",
        });
        setAppearanceSettings({
          primaryColor: data.primary_color || "#468e83",
          secondaryColor: data.secondary_color || "#e3e7d7",
          darkModeDefault: !!data.dark_mode_default,
          showLanguageSwitcher: !!data.show_language_switcher,
          defaultLanguage: data.default_language || "en",
        });
      }
    }
    loadSettings();
  }, []);

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralSettings({ ...generalSettings, [field]: value });
  };

  const handleSocialChange = (field: string, value: string) => {
    setSocialSettings({ ...socialSettings, [field]: value });
  };

  const handleAppearanceChange = (field: string, value: any) => {
    setAppearanceSettings({ ...appearanceSettings, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const supabase = createClientComponentClient();
    const { error } = await supabase.from("site_settings").upsert([
      {
        id: SETTINGS_ROW_ID,
        site_name: generalSettings.siteName,
        tagline: generalSettings.tagline,
        email: generalSettings.email,
        phone: generalSettings.phone,
        address: generalSettings.address,
        facebook: socialSettings.facebook,
        instagram: socialSettings.instagram,
        twitter: socialSettings.twitter,
        youtube: socialSettings.youtube,
        primary_color: appearanceSettings.primaryColor,
        secondary_color: appearanceSettings.secondaryColor,
        dark_mode_default: appearanceSettings.darkModeDefault,
        show_language_switcher: appearanceSettings.showLanguageSwitcher,
        default_language: appearanceSettings.defaultLanguage,
      },
    ]);
    setIsSaving(false);
    setSaveSuccess(!error);
    setTimeout(() => setSaveSuccess(false), 3000);
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
            <TabsTrigger value="general" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              Social Media
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-[#468e83] data-[state=active]:text-white">
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
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
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Social Tab */}
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
                  />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Appearance Tab */}
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
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={appearanceSettings.primaryColor}
                      onChange={(e) =>
                        handleAppearanceChange("primaryColor", e.target.value)
                      }
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
                        handleAppearanceChange(
                          "secondaryColor",
                          e.target.value
                        )
                      }
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) =>
                        handleAppearanceChange(
                          "secondaryColor",
                          e.target.value
                        )
                      }
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
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <select
                    id="default-language"
                    value={appearanceSettings.defaultLanguage}
                    onChange={(e) =>
                      handleAppearanceChange(
                        "defaultLanguage",
                        e.target.value
                      )
                    }
                  >
                    <option value="en">English</option>
                    <option value="km">Khmer</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}