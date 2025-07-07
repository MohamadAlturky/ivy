import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet
} from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BookingFlow from "./pages/BookingFlow";
import BookingTime from "./pages/BookingTime";
import BookingCheckout from "./pages/BookingCheckout";
import BookingReview from "./pages/BookingReview";
import BookingConfirmation from "./pages/BookingConfirmation";

const queryClient = new QueryClient();

const BookingLayout = () => (
  <BookingProvider>
    <Outlet />
  </BookingProvider>
);

// Create router with Data Router API
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/contact" element={<Contact />} />

      {/* Wrap all booking routes in BookingLayout */}
      <Route element={<BookingLayout />}>
        <Route path="/booking/:doctorId" element={<BookingFlow />} />
        <Route path="/booking/:doctorId/date" element={<BookingFlow />} />
        <Route path="/booking/:doctorId/time" element={<BookingTime />} />
        <Route path="/booking/:doctorId/checkout" element={<BookingCheckout />} />
        <Route path="/booking/:doctorId/review" element={<BookingReview />} />
        <Route path="/booking/:doctorId/confirmation" element={<BookingConfirmation />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    basename: "/ivy"
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
