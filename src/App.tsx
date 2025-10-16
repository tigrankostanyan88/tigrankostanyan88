
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import Navigation from "./components/Navigation";
import { Footer } from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";
import BookingModal from "./components/BookingModal";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (isBookingOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isBookingOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoriteProvider>
          <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <ScrollRestoration />
              <Navigation onBookingOpen={() => setIsBookingOpen(true)} />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<Home onBookingOpen={() => setIsBookingOpen(true)} />} />
                  <Route path="/menu" element={<Menu onBookingOpen={() => setIsBookingOpen(true)} />} />
                  <Route path="/about" element={<About onBookingOpen={() => setIsBookingOpen(true)} />} />
                  <Route path="/contact" element={<Contact onBookingOpen={() => setIsBookingOpen(true)} />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/favorites" element={<Favorites />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <ScrollToTop />
              <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            </div>
          </BrowserRouter>
          </CartProvider>
        </FavoriteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
