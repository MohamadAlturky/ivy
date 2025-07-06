import { useEffect, useState } from 'react';
import { useParams, useNavigate, UNSAFE_DataRouterStateContext, UNSAFE_NavigationContext } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookingProvider, useBooking } from '@/contexts/BookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Enable v7 router flags
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const mockDoctors = [
  {
    id: '1',
    name: 'د. أحمد محمد السيد',
    specialty: 'طب القلب',
    experience: 15,
    rating: 4.9,
    price: 300,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    bio: 'استشاري أمراض القلب والأوعية الدموية مع خبرة واسعة في علاج أمراض القلب',
    availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
    timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    location: 'مستشفى الملك فيصل'
  },
  // Add other doctors here as needed
];

const DatePicker = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(booking?.date);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    updateBooking({ 
      ...booking, 
      date,
      doctorId: doctorId || '' 
    });
  };

  const handleContinue = () => {
    if (selectedDate) {
      updateBooking({ 
        ...booking,
        date: selectedDate,
        doctorId: doctorId || '' 
      });
      navigate(`/booking/${doctorId}/time`);
    }
  };

  const nextMonth = () => {
    const nextDate = addMonths(currentMonth, 1);
    setCurrentMonth(nextDate);
  };

  const prevMonth = () => {
    const prevDate = addMonths(currentMonth, -1);
    const today = new Date();
    if (prevDate >= startOfMonth(today)) {
      setCurrentMonth(prevDate);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    return date < today;
  };

  const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className=" mx-auto">
      <div className='flex justify-evenly'>
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        اختر تاريخ الموعد
      </h1>

      {/* Calendar Header */}
      <div className="flex items-center justify-center mb-8">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={currentMonth <= new Date()}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-medium text-gray-600 mx-6">
          {format(currentMonth, 'MMMM yyyy', { locale: ar })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-4 gap-4">
        {days.map((day) => {
          const isDisabled = isDateDisabled(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrent = isToday(day);
          const isThisMonth = isSameMonth(day, currentMonth);

          if (!isThisMonth) return null;

          return (
            <button
              key={day.toString()}
              onClick={() => !isDisabled && handleDateSelect(day)}
              disabled={isDisabled}
              className={`
                p-4 rounded-lg text-center transition-all duration-200
                ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                ${isSelected
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-blue-50 text-gray-700 border border-gray-200'
                }
              `}
            >
              <div className="text-lg font-medium">
                {format(day, 'd')}
              </div>
              <div className="text-sm mt-1">
                {format(day, 'EEEE', { locale: ar })}
              </div>
            </button>
          );
        })}
      </div>
      <Button
        onClick={handleContinue}
        disabled={!selectedDate}
        className={`
          w-full mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
          ${!selectedDate && 'opacity-50 cursor-not-allowed'}
        `}
      >
        التالي
      </Button>
    </div>
  );
};

const BookingFlowContent = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { updateBooking, booking } = useBooking();

  const doctor = mockDoctors.find(d => d.id === doctorId);

  useEffect(() => {
    // Immediately navigate if no doctorId or doctor not found
    if (!doctorId || !doctor) {
      navigate('/doctors');
      return;
    }

    // Only update booking if it doesn't exist or has a different doctor
    if (!booking || booking.doctorId !== doctor.id) {
      updateBooking({
        doctorId: doctor.id,
        doctor: doctor,
        totalPrice: doctor.price
      });
    }
  }, [doctor, doctorId, navigate, updateBooking, booking]);

  // Return early if no doctor - this prevents any rendering before navigation
  if (!doctorId || !doctor) {
    return null;
  }

  const steps = [
    { number: 1, title: 'اختيار التاريخ', path: `/booking/${doctorId}/date` },
    { number: 2, title: 'اختيار الوقت', path: `/booking/${doctorId}/time` },
    { number: 3, title: 'معلومات المريض', path: `/booking/${doctorId}/checkout` },
    { number: 4, title: 'مراجعة الحجز', path: `/booking/${doctorId}/review` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${index < 1 ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 text-gray-400'}
                `}>
                  {index < 1 ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <div className="mr-3 hidden sm:block">
                  <p className={`text-sm font-medium ${index < 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${index < 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Info Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm">{doctor.location}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold text-blue-600">{doctor.price} ر.س</span>
                  <span className="text-gray-500 text-sm mr-2">رسوم الكشف</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Picker */}
        <Card className="text-center">
          <CardContent className="p-12">
            <DatePicker />
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

const BookingFlow = () => {
  return (
    <BookingFlowContent />
  );
};

export default BookingFlow;
