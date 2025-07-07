import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient();

const BookingLayout = () => (
  <BookingProvider>
    <Outlet />
  </BookingProvider>
);

// Example protected component
function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p>This is a protected route. You can only see this if you're authenticated.</p>
        </div>
      </div>
    </div>
  );
}

const AppLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

// Create router with Data Router API
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="doctors" element={<Doctors />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
        {/* Protected Booking routes */}
        <Route element={<BookingLayout />}>
          <Route path="booking/:doctorId" element={<BookingFlow />} />
          <Route path="booking/:doctorId/date" element={<BookingFlow />} />
          <Route path="booking/:doctorId/time" element={<BookingTime />} />
          <Route path="booking/:doctorId/checkout" element={<BookingCheckout />} />
          <Route path="booking/:doctorId/review" element={<BookingReview />} />
          <Route path="booking/:doctorId/confirmation" element={<BookingConfirmation />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    basename: "/ivy"
  }
);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
