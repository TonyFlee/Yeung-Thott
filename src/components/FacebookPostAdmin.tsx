
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@/supabase/client-component";

export default function FacebookPostsAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("facebook_posts")
        .select("*")
        .order("post_date", { ascending: false });
      setPosts(data || []);
      if (error) console.log("Fetch error:", error);
      else console.log("Fetched posts:", data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      {loading ? "Loading..." : null}
      {posts.length === 0 && !loading ? "No posts found." : null}
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #fff", margin: "8px", padding: "8px" }}>
            <img src={post.image_url} style={{ width: 200 }} alt="" />
            <div>{post.description}</div>
            <div>{post.post_date}</div>
            <a href={post.href} target="_blank" rel="noopener noreferrer">Link</a>
          </div>
        ))}
      </div>
    </div>
  );
}