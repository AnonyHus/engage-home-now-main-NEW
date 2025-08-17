import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navigation from "./components/Navigation";
import { useAuth } from "./components/AuthContext";

import AdminNav from "./components/AdminNavbar";
import { AuthProvider } from "./components/AuthContext";
import { AdminProtectedRoute } from "./components/ProtectedRoute";

import ServiceDetail from "./pages/services/ServiceDetail";
import CreateMarketNews from "./pages/admin/CreateMarketNews";
import ManageMarketNews from "./pages/admin/ManageMarketNews";


const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const MarketNews = lazy(() => import("./pages/MarketNews"));
const MarketNewsPost = lazy(() => import("./pages/MarketNewsPost"));
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

const NavbarWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Determine if we're on an admin page (excluding login)
  const isAdminPage = location.pathname.startsWith("/admin") && 
                      !location.pathname.includes("/login");
  
  // Determine if we should show the main navigation
  const shouldShowMainNav = !location.pathname.startsWith("/admin");
  
  return (
    <>
      {isAdminPage && <AdminNav />}
      {shouldShowMainNav && <Navigation />}
    </>
  );
};

const App = () => {

  return  (
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />         
          <div className="pt-0">
          <Suspense fallback={<div className="w-full flex justify-center items-center py-5 text-xl text-gray-600">Loading...</div>}>
            <Routes>
            <Route element={<><NavbarWrapper /></>}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/services/outdoor-advertising" element={<OutdoorAdvertising />} />
              <Route path="/our-locations/:type" element={<OurLocations />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/MarketNews" element={<MarketNews />} />
              <Route path="/MarketNews/:id" element={<MarketNewsPost />} />
            </Route>


              <Route path="/admin" element={<AdminProtectedRoute />}>
              <Route index element={<Navigate to="upload" replace />} />
                <Route path="upload" element={ <><NavbarWrapper /> <ImageUploadPage /></>} />
                <Route path="OutdoorImageUploadPage" element={ <><NavbarWrapper /> <OutdoorImageUploadPage /></>} />
                <Route path="OutdoorOrderManagement" element={ <><NavbarWrapper /> <OutdoorOrderPage /></>} />
                <Route path="outdoorDisplay" element={ <><NavbarWrapper /> <OutdoorDisplayPage /></>} />
                <Route path="CreateMarketNews" element={ <><NavbarWrapper /> <CreateMarketNews /></>} />
                <Route path="ManageMarketNews" element={ <><NavbarWrapper /> <ManageMarketNews /></>} />
              </Route>

              {/* leave login outside */}
              <Route path="/admin/login" element={<AdminLoginPage />} />




              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Navigate to="/notfound" replace />} />
              <Route path="/" element={<NotFound />} />

            </Routes>
          </Suspense>
        </div>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>

);
};

export default App;
