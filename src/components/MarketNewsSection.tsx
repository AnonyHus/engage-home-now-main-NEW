import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { fetchMarketNews } from "../services/fetchMarketNews";

const CARD_WIDTH = 300 + 24; // 324, matches min-w and gap

const MarketNewsSection = () => {
  const [allMarketNews, setMarketNews] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shouldCenter, setShouldCenter] = useState(false);


  useEffect(() => {
    const load = async () => {
      const data = await fetchMarketNews();
      setMarketNews(Array.isArray(data) ? data : []);
    };
    load();
  }, []);

  // Check scroll availability
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      setShouldCenter(scrollWidth <= clientWidth);

    }
  };

  useEffect(() => {
    updateScrollButtons();
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, [allMarketNews]);
  

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
    }
  };
  if (allMarketNews.length > 0) {
    return (
      <section className="py-10 bg-gradient-to-br from-slate-50 to-slate-100 relative">
        <div className="max-w-[1500px] mx-auto px-4 relative">
  
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Latest Insights</h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              Stay updated with the latest trends, insights, and best practices in digital technology, 
              design, and business growth.
            </p>
          </div>
  
          {/* Left Arrow */}
          {canScrollLeft && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md bg-white/80 hover:bg-white"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </Button>
            </div>
          )}
  
          {/* Right Arrow */}
          {canScrollRight && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md bg-white/80 hover:bg-white"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </Button>
            </div>
          )}
  
          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className={`flex flex-nowrap gap-6 overflow-x-hidden scroll-smooth pb-4 px-2
              ${ shouldCenter ? "justify-center" : "justify-start"}`} >
            
            {allMarketNews.map((post) => (
              <Link
                key={post.id}
                to={`/MarketNews/${post.id}`}
                className="min-w-[300px] max-w-[300px] flex-shrink-0"
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gray-300 flex items-center justify-center">
                      <span className="text-white font-bold text-xl text-center px-4">
                        {post.title.split(" ").slice(0, 3).join(" ")}...
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Admin</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.event_date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-800 line-clamp-2 mb-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-slate-600 text-sm line-clamp-3 flex-grow">
                      {post.desc}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
  
                      </span>
                      <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Read More →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
 
};

export default MarketNewsSection;
