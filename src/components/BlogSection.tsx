import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends and technologies that are shaping the future of web development, from AI integration to advanced frameworks.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      image: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Designing for User Experience: Best Practices",
      excerpt: "Learn the essential principles of UX design that can transform your digital products and improve user engagement.",
      author: "Mike Johnson",
      date: "March 12, 2024",
      category: "Design",
      readTime: "7 min read",
      image: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Digital Marketing Strategies That Drive Results",
      excerpt: "Discover proven digital marketing strategies that can help your business grow and reach new audiences effectively.",
      author: "Emma Davis",
      date: "March 10, 2024",
      category: "Marketing",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and best practices in digital technology, 
            design, and business growth.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <CardHeader className="p-0">
                  <div className={`h-48 ${post.image} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <div className="text-sm font-medium opacity-90 mb-2">{post.category}</div>
                      <div className="text-2xl font-bold">{post.title.split(' ').slice(0, 3).join(' ')}...</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{post.readTime}</span>
                    <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read More →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#C30010] to-[#D40011] hover:from-[#D40011] hover:to-[#E50012] text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 