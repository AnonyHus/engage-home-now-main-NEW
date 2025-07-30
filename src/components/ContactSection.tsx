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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div className={`grid gap-12 ${hideVisitCard ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
            {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
             {/*Message*/}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/*name*/}

                <div className="mb-4">
              <label className="text-left block text-gray-800 mb-1" htmlFor="name">Your Name</label>
              <input className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
               placeholder="Enter your name" 
               value={name}
               onChange={e => setName(e.target.value)}
               required
               type="text" />
            </div>
        
              {/*email*/}
              <div className="mb-4">
              <label className="text-left block text-gray-800 mb-1" >Your Email</label>
              <input className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300" 
              placeholder="Enter your email" name="email" id="email" type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}  
              required                  
            />
            </div>
              
              {/*Message*/}
              <div className="mb-4">
              <label className="text-left block text-gray-800 mb-1" htmlFor="message">Your Message</label>
              <textarea className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300" 
              rows={4} 
              placeholder="Enter your message"
               name="message" 
               id="message" 
               value={message}
               onChange={e => setMessage(e.target.value)}          
               required />
              </div>


                <Button 
                  type="submit" 
                  className="w-full h-11 text-lg bg-primary hover:bg-zinc-600"
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Visit our office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-700 font-medium">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6908.761179008308!2d31.44023917104557!3d30.025937311320078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822d3598ade7b%3A0x4c2aa11b0b3f4c38!2sKSC%20%E2%80%A2%20Katameya%20Petrosport%20Sporting%20Club!5e0!3m2!1sen!2seg!4v1753592917373!5m2!1sen!2seg" width="100%" height="100%"   style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-700">
                  34 Beram El Tunsi from 90th South, New Cairo <br />
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

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                  <div className="text-gray-700 space-y-2">
                  <a> Phone: 0226418097 </a> <br/>
                  <a href="https://api.whatsapp.com/send?phone=%2B201113331265&context=Afc79WKv_aLQvXevbnXMy0keflIiNOW6TpQhpUG6qQuDUOCaRLWOTb5gi9Te_3NQbi3YWdY9SPNLDQ0sCoaMWWSzTX6tHq1wKq194VuD_ytAUP3Qe8uxhU8pEf2Q3Rh3A07KmS7yYtFzT0vaTFpqa1Zuqw&source=FB_Page&app=facebook&entry_point=page_cta"> Moblie: (+20)11 13331265</a> <br/>
                  <a> Email: info@optimize-eg.com</a>
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
