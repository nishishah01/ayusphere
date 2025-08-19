
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DoctorEnlistment from "./pages/DoctorEnlistment";
import Notifications from "./components/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/history" element={<Index section="history" />} />
              <Route path="/appointments" element={<Index section="appointments" />} />
              <Route path="/medications" element={<Index section="medications" />} />
              <Route path="/doctor-enlistment" element={<DoctorEnlistment />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
