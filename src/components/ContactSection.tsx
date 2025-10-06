import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import saveContactRequest from "../services/saveContactRequest";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const ContactSection = ({ onSuccess ,hideVisitCard = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await saveContactRequest(name, email, message);
    setLoading(false);
    if (!error) {
      confetti();
      Swal.fire("Success", "Message sent!", "success");
    } else {
      Swal.fire("Success", "Message sent!", "success");
      setName(""); setEmail(""); setMessage("");
      if (onSuccess) onSuccess();
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="max-w-100% mx-auto px-4">
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>
        </div>
  
        <div className={`grid gap-6 md:gap-12 ${hideVisitCard ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
          {/* Contact Form */}
          <motion.div
            className="h-full" // Ensure full height
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1"> {/* Grow to fill space */}
                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="flex-1 space-y-4"> {/* Form fields container */}
                    {/* Name */}
                    <div>
                      <label className="text-sm md:text-base text-left block text-gray-800 mb-1" htmlFor="name">
                        Your Name
                      </label>
                      <input 
                        className="w-full px-3 py-1.5 md:px-4 md:py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                        placeholder="Enter your name" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        type="text" 
                      />
                    </div>
              
                    {/* Email */}
                    <div>
                      <label className="text-sm md:text-base text-left block text-gray-800 mb-1">
                        Your Email
                      </label>
                      <input 
                        className="w-full px-3 py-1.5 md:px-4 md:py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}  
                        required
                        type="email"
                      />
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label className="text-sm md:text-base text-left block text-gray-800 mb-1" htmlFor="message">
                        Your Message
                      </label>
                      <textarea 
                        className="w-full px-3 py-1.5 md:px-4 md:py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300" 
                        rows={7}
                        placeholder="Enter your message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}          
                        required 
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-9 md:h-11 text-base md:text-lg bg-primary hover:bg-zinc-600 mt-auto" // Push to bottom
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message" }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
  
          {/* Visit Us */}
          {!hideVisitCard && (
            <motion.div
              className="h-full" // Ensure full height
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-900">
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col"> {/* Grow to fill space */}
                  {/* Map */}
                  <div className="flex-1 min-h-[16rem] mb-4 md:mb-6"> {/* Flexible height */}
                   
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11469.256805175171!2d31.450448266389717!3d30.019684563949557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822d82cb89ffb%3A0xedd5abb09d3399a!2s2F94%2BHX%2C%20New%20Cairo%201%2C%20Cairo%20Governorate%204724213!5e0!3m2!1sen!2seg!4v1756294355599!5m2!1sen!2seg"
                    width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  
                  {/* Address and Hours */}
                  <div className="space-y-4 mt-auto"> {/* Push to bottom */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-700">
                        34 Beram El Tunsi From 90th South, New Cairo <br />
                        Cairo, Egypt
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Office Hours</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                        <p>Friday - Saturday: off</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
