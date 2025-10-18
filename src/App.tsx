
import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { ProductProvider } from "./contexts/ProductContext";
import Navigation from "./components/Navigation";
import { Footer } from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollRestoration from "./components/ScrollRestoration";
import BookingModal from "./components/BookingModal";

const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
          <ProductProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="flex flex-col min-h-screen">
              <ScrollRestoration />
              <Navigation onBookingOpen={() => setIsBookingOpen(true)} />
              <main className="flex-grow pt-20">
                <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
              </main>
              <Footer />
              <ScrollToTop />
              <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            </div>
          </BrowserRouter>
            </CartProvider>
          </ProductProvider>
        </FavoriteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
