import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getMarketNewsById } from "../services/fetchMarketNews"; // Import your fetch function
import Breadcrumb from "../components/Breadcrumb";
import LoadingComp from "../components/Loading"


const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log("Fetching post with ID:", id);
        
        // Convert id to number
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          setError("Invalid post ID");
          setLoading(false);
          return;
        }
        
        const data = await getMarketNewsById(numericId);
        console.log("Fetched post data:", data);
        
        if (data) {
          setPost(data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="col-span-full text-center py-10">
          <LoadingComp/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex it;ems-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{error}</h1>
          <Link to="/MarketNews">
            <Button variant="ghost" className="text-gray-700 hover:text-[#C30010]">
              Back to MarketNews
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
              <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Market News", to:"/MarketNews" }, 
          { label: post?.title  }, 
        ]}
      />
      {/* Header */}
      <section className="pt-10 bg-white">
        
        <div className="max-w-4xl mx-auto px-4">          
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C30010]/20 text-[#C30010] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#C30010]/30">
              <Tag className="h-4 w-4 inline mr-2" />
                Opz-Optimize
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-700 mb-6">
             
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.event_date).toLocaleDateString()}</span>
              </div>
             
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-xl border border-gray-200 bg-white/50">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.desc }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
   
      <Footer />
    </div>
  );
};

export default BlogPost;
