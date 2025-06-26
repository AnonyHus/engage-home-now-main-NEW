import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, User, Search, Filter, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt: "Explore the latest trends and technologies that are shaping the future of web development, from AI integration to advanced frameworks.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      image: "bg-gradient-to-br from-[#C30010] to-[#D40011]"
    },
    {
      id: 2,
      title: "Designing for User Experience: Best Practices",
      excerpt: "Learn the essential principles of UX design that can transform your digital products and improve user engagement.",
      author: "Mike Johnson",
      date: "March 12, 2024",
      category: "Design",
      readTime: "7 min read",
      image: "bg-gradient-to-br from-[#D40011] to-[#E50012]"
    },
    {
      id: 3,
      title: "Digital Marketing Strategies That Drive Results",
      excerpt: "Discover proven digital marketing strategies that can help your business grow and reach new audiences effectively.",
      author: "Emma Davis",
      date: "March 10, 2024",
      category: "Marketing",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-[#E50012] to-[#F60013]"
    },
    {
      id: 4,
      title: "Building Scalable Web Applications",
      excerpt: "Learn the best practices for building web applications that can scale with your business growth and user demands.",
      author: "Alex Thompson",
      date: "March 8, 2024",
      category: "Technology",
      readTime: "8 min read",
      image: "bg-gradient-to-br from-[#F60013] to-[#FF0014]"
    },
    {
      id: 5,
      title: "The Psychology of Color in Web Design",
      excerpt: "Understanding how color choices impact user behavior and perception in web design and digital interfaces.",
      author: "Lisa Wang",
      date: "March 5, 2024",
      category: "Design",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-[#B2000F] to-[#C30010]"
    },
    {
      id: 6,
      title: "SEO Strategies for 2024 and Beyond",
      excerpt: "Stay ahead of the competition with the latest SEO strategies and techniques for better search engine rankings.",
      author: "David Kim",
      date: "March 3, 2024",
      category: "Marketing",
      readTime: "9 min read",
      image: "bg-gradient-to-br from-[#A1000E] to-[#B2000F]"
    }
  ];

  const categories = ["All", "Technology", "Design", "Marketing"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Icon */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C30010]/10 via-white to-[#A1000E]/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#D40011]/10 to-[#E50012]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-8 group text-gray-600 hover:text-[#C30010]"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C30010]/10 to-[#D40011]/10 border border-[#C30010]/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#C30010]" />
              <span className="text-sm font-medium text-[#C30010]">Our Blog</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#C30010] via-[#D40011] to-[#E50012] bg-clip-text text-transparent mb-8 leading-tight">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Insights, tips, and stories from our team of experts in technology, design, and digital marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C30010]"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-12 ${
                    selectedCategory === category 
                      ? "bg-[#C30010] hover:bg-[#D40011] text-white" 
                      : "border-gray-300 text-gray-700 hover:text-[#C30010] hover:border-[#C30010] bg-white"
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-200 bg-white hover:bg-gray-50">
                    <CardHeader className="p-0">
                      <div className={`h-48 ${post.image} flex items-center justify-center`}>
                        <div className="text-center text-gray-900">
                          <div className="text-sm font-medium opacity-90 mb-2">{post.category}</div>
                          <div className="text-2xl font-bold">{post.title.split(' ').slice(0, 3).join(' ')}...</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <span className="text-[#C30010] hover:text-[#D40011] text-sm font-medium">
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

      <Footer />
    </div>
  );
};

export default Blog; 