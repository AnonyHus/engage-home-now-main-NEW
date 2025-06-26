import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams();

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      content: `
        <p>The landscape of web development is evolving at an unprecedented pace, driven by emerging technologies and changing user expectations. As we move through 2024, several key trends are shaping the future of how we build and deploy web applications.</p>
        
        <h2>Artificial Intelligence Integration</h2>
        <p>AI is no longer just a buzzword—it's becoming an integral part of web development workflows. From automated testing and code generation to intelligent user interfaces and personalized experiences, AI is transforming how developers work and how users interact with web applications.</p>
        
        <p>Modern frameworks are increasingly incorporating AI capabilities, making it easier for developers to implement machine learning features without deep expertise in the field. This democratization of AI is opening up new possibilities for creating more intelligent and responsive web applications.</p>
        
        <h2>Progressive Web Apps (PWAs)</h2>
        <p>PWAs continue to gain momentum as they bridge the gap between web and native applications. With improved performance, offline capabilities, and native-like user experiences, PWAs are becoming the preferred choice for many businesses looking to provide consistent experiences across all devices.</p>
        
        <p>The adoption of service workers and modern web APIs has made it easier than ever to create PWAs that rival native applications in terms of functionality and user experience.</p>
        
        <h2>WebAssembly (WASM)</h2>
        <p>WebAssembly is revolutionizing web performance by allowing developers to run code written in languages like C++, Rust, and Go directly in the browser. This technology is enabling complex applications that were previously only possible as desktop software to run smoothly in web browsers.</p>
        
        <p>As WASM matures and gains broader browser support, we're seeing more sophisticated applications being built for the web, from video editing tools to 3D modeling software.</p>
        
        <h2>Conclusion</h2>
        <p>The future of web development is bright and full of possibilities. By staying current with these trends and embracing new technologies, developers can create more powerful, efficient, and user-friendly web applications that meet the evolving needs of users and businesses alike.</p>
      `,
      author: "Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      image: "bg-gradient-to-br from-[#C30010] to-[#D40011]"
    },
    {
      id: 2,
      title: "Designing for User Experience: Best Practices",
      content: `
        <p>User experience (UX) design is more than just making things look pretty—it's about creating meaningful, accessible, and enjoyable interactions that help users achieve their goals efficiently and effectively.</p>
        
        <h2>Understanding User Needs</h2>
        <p>The foundation of great UX design lies in understanding your users. This involves conducting thorough research to identify user personas, their goals, pain points, and behaviors. Only by truly understanding your users can you design experiences that truly serve their needs.</p>
        
        <p>User research methods like interviews, surveys, and usability testing provide valuable insights that inform design decisions and help create more user-centered solutions.</p>
        
        <h2>Information Architecture</h2>
        <p>Good information architecture is crucial for helping users find what they're looking for quickly and easily. This involves organizing content in a logical, intuitive way and creating clear navigation paths that guide users through your application.</p>
        
        <p>Card sorting exercises and user flow mapping are effective techniques for developing information architectures that align with user mental models and expectations.</p>
        
        <h2>Accessibility and Inclusion</h2>
        <p>Designing for accessibility isn't just about compliance—it's about creating experiences that work for everyone. This includes users with disabilities, those using assistive technologies, and people in various environmental conditions.</p>
        
        <p>Following WCAG guidelines and testing with real users who have disabilities helps ensure that your designs are truly inclusive and accessible to all users.</p>
      `,
      author: "Mike Johnson",
      date: "March 12, 2024",
      category: "Design",
      readTime: "7 min read",
      image: "bg-gradient-to-br from-[#D40011] to-[#E50012]"
    },
    {
      id: 3,
      title: "Digital Marketing Strategies That Drive Results",
      content: `
        <p>In today's digital landscape, having a solid marketing strategy is essential for business growth and success. With so many channels and tactics available, it's important to focus on strategies that deliver measurable results and align with your business objectives.</p>
        
        <h2>Content Marketing Excellence</h2>
        <p>Content marketing remains one of the most effective ways to attract, engage, and convert your target audience. By creating valuable, relevant content that addresses your audience's needs and pain points, you can establish authority in your industry and build trust with potential customers.</p>
        
        <p>The key to successful content marketing is consistency and quality. Regular publishing of high-quality content helps maintain audience engagement and improves search engine rankings over time.</p>
        
        <h2>Data-Driven Decision Making</h2>
        <p>Modern marketing is increasingly data-driven, with analytics and insights playing a crucial role in strategy development and optimization. By tracking key metrics and analyzing user behavior, you can make informed decisions about where to allocate resources and how to improve campaign performance.</p>
        
        <p>Tools like Google Analytics, social media insights, and marketing automation platforms provide valuable data that can help you understand your audience better and optimize your marketing efforts.</p>
        
        <h2>Personalization and Automation</h2>
        <p>Personalization is no longer a nice-to-have—it's expected by consumers. By leveraging data and automation tools, you can deliver personalized experiences that resonate with individual users and drive higher engagement and conversion rates.</p>
        
        <p>Marketing automation allows you to scale personalization efforts efficiently, ensuring that each user receives relevant content and offers based on their behavior and preferences.</p>
      `,
      author: "Emma Davis",
      date: "March 10, 2024",
      category: "Marketing",
      readTime: "6 min read",
      image: "bg-gradient-to-br from-[#E50012] to-[#F60013]"
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || "1"));

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="bg-[#C30010] hover:bg-[#D40011]">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 text-gray-300 hover:text-[#C30010]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-block bg-[#C30010]/20 text-[#C30010] px-4 py-2 rounded-full text-sm font-medium mb-4 border border-[#C30010]/30">
              <Tag className="h-4 w-4 inline mr-2" />
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="shadow-xl border border-gray-800 bg-gray-900/50">
            <CardContent className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#C30010]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-800 bg-gray-800/50 hover:bg-gray-800/80">
                    <CardContent className="p-6">
                      <div className={`h-32 ${relatedPost.image} rounded-lg mb-4 flex items-center justify-center`}>
                        <div className="text-center text-white">
                          <div className="text-sm font-medium opacity-90">{relatedPost.category}</div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost; 