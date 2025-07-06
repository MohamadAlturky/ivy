export interface Doctor {
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

export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  medicalHistory?: string;
}

export interface Booking {
  id: string;
  doctorId: string;
  doctor?: Doctor;
  patientInfo?: PatientInfo;
  selectedDate?: Date;
  selectedTime?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface BookingContextType {
  booking: Booking | null;
  updateBooking: (updates: Partial<Booking>) => void;
  resetBooking: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
