import { useEffect, useState } from "react";
import { fetchServices } from "../services/fetchServices";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, X, Smartphone } from "lucide-react";
import styled from 'styled-components';

const Footer = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Clients", path: "/clients" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
  ];

  const [services, setServices] = useState([]);
  useEffect(() => {
    fetchServices().then((data) => setServices(Array.isArray(data) ? data : []));
  }, []);




  return (
    <footer className="bg-[#d1c2c2] text-foreground border-t">
      <div className="max-w-100% mx-10 px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
            <img src="/Opz-logo.png" alt="Opz Logo" className="w-100% h-16" />
            </div>
            
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@optimize-eg.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Smartphone className="h-4 w-4 text-primary" />
                <a href="https://api.whatsapp.com/send?phone=%2B201113331265&context=Afc79WKv_aLQvXevbnXMy0keflIiNOW6TpQhpUG6qQuDUOCaRLWOTb5gi9Te_3NQbi3YWdY9SPNLDQ0sCoaMWWSzTX6tHq1wKq194VuD_ytAUP3Qe8uxhU8pEf2Q3Rh3A07KmS7yYtFzT0vaTFpqa1Zuqw&source=FB_Page&app=facebook&entry_point=page_cta">(+20)1113331265</a> 
              
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <p> 0226418097</p>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span> 34 Beram El Tunsi from 90th South ,New Cairo </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-0 text-foreground">Follow Us</h3>
           
        <StyledWrapper>
      <div className="card">
        < a className="social-link1 mt-2 me-2" href="https://www.facebook.com/people/Opz-Optimize/100087362694828/">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
        </a>
        <a className="social-link2 mt-2 me-2" href="https://www.instagram.com/opz.optimize/">
        <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" style={{color: 'white'}}> <path fill="white" d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /> </svg>

        </a>
        <a className="social-link3 mt-2 me-2" href="https://www.linkedin.com/company/opz-optimize-advertising-agancy">
           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
         </a>
        <a className="social-link4 mt-2 me-2" href="https://api.whatsapp.com/send?phone=%2B201113331265&context=Afc79WKv_aLQvXevbnXMy0keflIiNOW6TpQhpUG6qQuDUOCaRLWOTb5gi9Te_3NQbi3YWdY9SPNLDQ0sCoaMWWSzTX6tHq1wKq194VuD_ytAUP3Qe8uxhU8pEf2Q3Rh3A07KmS7yYtFzT0vaTFpqa1Zuqw&source=FB_Page&app=facebook&entry_point=page_cta">
          <svg viewBox="0 0 16 16" className="bi bi-whatsapp" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" style={{color: 'white'}}> <path fill="white" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /> </svg>
        </a>
      </div>
    </StyledWrapper>
                        
            {/* Newsletter */}
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Opz. All rights reserved.
            </p>
            <div className="flex space-x-2 mt-4 md:mt-0">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
const StyledWrapper = styled.div`
  .card {
    display: flex;
    height: 70px;
    width: 270px;
  }

  .card svg {
    position: relative;
    display: flex;
    width: 24px;
    height: 24px;
    font-size: 24px;
    font-weight: 700;
    opacity: 1;
    transition: opacity 0.25s;
    z-index: 2;
    cursor: pointer;
  }

  .card .social-link1,.card .social-link2,.card .social-link3,.card .social-link4 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    color: whitesmoke;
    font-size: 24px;
    text-decoration: none;
    transition: 0.25s;
    border-radius: 50%;
  }



  
.card .social-link1 {
    background-color: #1d4292;
    animation: bounce_613 0.4s linear;
  }
.card .social-link2 {
  background: #f09433;
  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  animation: bounce_613 0.4s linear;
}

  .card .social-link3 {
    background-color: #0059f7;
    animation: bounce_613 0.4s linear;
  }
    
  .card .social-link4 {
    background-color: #12a50b;
    animation: bounce_613 0.4s linear;
  }

  @keyframes bounce_613 {
    40% {
      transform: scale(1.4);
    }

    60% {
      transform: scale(0.8);
    }

    80% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }`;


export default Footer; 