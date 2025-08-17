import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,        // ⬅️ IMPORTANT
} from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navigation from "./components/Navigation";
import { useAuth, AuthProvider } from "./components/AuthContext";
import AdminNav from "./components/AdminNavbar";
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

// ScrollToTop on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Shows AdminNav on /admin/* (except /admin/login) and shows main Navigation elsewhere
const NavbarWrapper = () => {
  const location = useLocation();
  // const { user } = useAuth(); // not used, remove if unnecessary

  const isAdminPage =
    location.pathname.startsWith("/admin") &&
    !location.pathname.includes("/login");

  const isMainSite = !location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage && <AdminNav />}
      {isMainSite && <Navigation />}
    </>
  );
};


const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <NavbarWrapper/>
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center py-5 text-xl text-gray-600">
                  Loading...
                </div>
              }
            >
              <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/services/outdoor-advertising" element={<OutdoorAdvertising />} />
                  <Route path="/our-locations/:type" element={<OurLocations />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/MarketNews" element={<MarketNews />} />
                  <Route path="/MarketNews/:id" element={<MarketNewsPost />} />

                <Route path="/admin" element={<AdminProtectedRoute />}>
                    <Route index element={<Navigate to="upload" replace />} />
                    <Route path="upload" element={<ImageUploadPage />} />
                    <Route path="OutdoorImageUploadPage" element={<OutdoorImageUploadPage />} />
                    <Route path="OutdoorOrderManagement" element={<OutdoorOrderPage />} />
                    <Route path="outdoorDisplay" element={<OutdoorDisplayPage />} />
                    <Route path="CreateMarketNews" element={<CreateMarketNews />} />
                    <Route path="ManageMarketNews" element={<ManageMarketNews />} />
                </Route>

                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route path="/notfound" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/notfound" replace />} />
              </Routes>
            </Suspense>
            <Analytics />
            <SpeedInsights />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
