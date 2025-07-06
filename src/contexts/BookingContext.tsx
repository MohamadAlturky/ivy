import { createContext, useContext, useState, ReactNode } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  price: number;
  image: string;
  bio: string;
  availableDays: string[];
  timeSlots: string[];
  location: string;
}

export interface Booking {
  doctorId: string;
  doctor?: Doctor;
  date?: Date;
  time?: string;
  totalPrice: number;
  patientName?: string;
  patientPhone?: string;
  patientEmail?: string;
  notes?: string;
}

interface BookingContextType {
  booking: Booking | null;
  updateBooking: (updates: Partial<Booking>) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<Booking | null>(null);

  const updateBooking = (updates: Partial<Booking>) => {
    setBooking((prev) => {
      if (!prev && !updates.doctorId) {
        return null;
      }
      return { ...prev, ...updates } as Booking;
    });
  };

  const clearBooking = () => {
    setBooking(null);
  };

  return (
    <BookingContext.Provider value={{ booking, updateBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
