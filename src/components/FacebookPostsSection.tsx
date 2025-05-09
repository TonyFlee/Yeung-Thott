import { useEffect, useState } from "react";
import { createClientComponentClient } from "@/supabase/client-component";
import { motion } from "framer-motion";
import { Facebook, ArrowUpRight } from "lucide-react";

const fadeUpVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const fadeInVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } };

type Props = {
  t: (k: string) => string;
};

export default function FacebookPostsSection({ t }: Props) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase
        .from("facebook_posts")
        .select("*")
        .order("post_date", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <motion.section
      id="facebook-posts"
      className="py-24 bg-[#e1e9e7]/30 dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <h2 className="text-3xl font-bold mb-4">{t("latestUpdates")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("updatesSubtitle") || "Stay updated with our latest news and events."}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No posts found.</div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                className="dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                variants={fadeUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#468e83] dark:from-[#e3e7d7] dark:to-[#468e83]">
                        យើងថត • Yeung Thott
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(post.post_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description.split(" ").map((word: string, index: number) =>
                      word.startsWith("#") ? (
                        <span
                          key={index}
                          className="text-blue-600 underline cursor-pointer"
                        >
                          {word}{" "}
                        </span>
                      ) : (
                        word + " "
                      )
                    )}
                  </p>
                  <motion.div
                    className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={post.image_url}
                      alt="Facebook Post"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="text-right">
                    <motion.a
                      href={post.href}
                      target="_blank"
                      className="text-blue-600 underline cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t("readMore")}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <motion.a
            href="https://facebook.com/yeungthott"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-white bg-[#468e83] rounded-lg hover:bg-[#32645d] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("visitFacebook") || "Visit our Facebook Page"}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}