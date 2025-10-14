import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Search, Filter, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { fetchMarketNews, fetchMarketNewsPG } from "../services/fetchMarketNews";
import { useEffect, useState } from "react";
import LoadingComp from "../components/Loading"

const Blog = () => {
  const [allMarketNews, setMarketNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarketNews = async () => {
      try {
        setLoading(true);
        console.log("Starting to load market news..."); // Debug log
        const data = await fetchMarketNewsPG();
        console.log("Fetched market news data:", data); // Debug log
        setMarketNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading market news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMarketNews();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Market News" }, // no "to" means it's the current page
        ]}
      />

      {/* Header with Icon */}
      <section className="relative py-8 md:py-0 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F5] to-[#FDF6F6]">
        <div className="absolute inset-0 pointer-events-none">
                </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-4 md:px-5 py-2 mb-4 md:mb-7 shadow-md">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-[#C30010] drop-shadow" />
              <span className="text-sm md:text-base font-semibold text-[#C30010] tracking-wide">Our Market News</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-4 md:mb-7 leading-tight drop-shadow-lg">
              Market News
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Unleash creativity and drive results with the latest insights in advertising. Transform your brand's story today!
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
                    <div className="col-span-full text-center py-10">
                    <LoadingComp/>
                </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Error: {error}</h3>
            </div>
          ) : allMarketNews.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {allMarketNews.map((post) => (
                <Link key={post.id} to={`/MarketNews/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-200 bg-white hover:bg-gray-100 rounded-2xl">
                    <CardHeader className="p-0">
                      <div className={`h-40 md:h-48 ${post.image} flex items-center justify-center rounded-t-2xl`}>
                        <div className="text-center text-white drop-shadow-lg px-4">
                          <div className="text-xs md:text-sm font-medium opacity-90 mb-2">{post.category}</div>
                          <div className="text-lg md:text-2xl font-bold">{post.title.split(' ').slice(0, 3).join(' ')}...</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-7">
                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                     
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{new Date(post.event_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-gray-700 mb-3 md:mb-4 line-clamp-3 text-sm md:text-base">
                        {post.desc || ""}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-gray-500">{post.readTime || ""}</span>
                        <span className="text-[#C30010] hover:text-[#D40011] text-xs md:text-sm font-semibold transition-colors duration-200">
                          Read More →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
