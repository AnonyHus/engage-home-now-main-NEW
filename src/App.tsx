import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navigation from "./components/Navigation";
import { RequireAuth } from "./components/RequireAuth";
import ServiceDetail from "./pages/services/ServiceDetail";


const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WebDevelopment = lazy(() => import("./pages/services/ServiceDetail"));
const OutdoorAdvertising = lazy(() => import("./pages/services/OutdoorAdvertising"));
const OurLocations = lazy(() => import("./pages/OurLocations"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ImageUploadPage = lazy(() => import("./pages/admin/ImageUploadPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const OutdoorImageUploadPage = lazy(() => import("./pages/admin/OutdoorImageUploadPage"));
const OutdoorDisplayPage = lazy(() => import("./pages/admin/outdoorDisplayPage"));
const OutdoorOrderPage = lazy(() => import("./pages/admin/SortableImage"));



const queryClient = new QueryClient();

// ScrollToTop component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <div className="pt-16">
          <Suspense fallback={<div className="w-full flex justify-center items-center py-20 text-xl text-gray-600">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/services/Outdoor-Advertising" element={<OutdoorAdvertising />} />
              <Route path="/our-locations" element={<OurLocations />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/upload" element={<RequireAuth><ImageUploadPage /></RequireAuth> }/>
              <Route path="/admin/OutdoorImageUploadPage" element={<OutdoorImageUploadPage/>} />
              <Route path="/admin/OutdoorOrderManagement" element={<OutdoorOrderPage/>} />
              <Route path="/admin/outdoorDisplay" element={<OutdoorDisplayPage/>} />



              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
