import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookingProvider, useBooking } from '@/contexts/BookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingFlow from '@/components/BookingFlow';
import { cwd } from 'process';

const TimeSlot = ({ time, selected, onClick }: { time: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`
      p-4 rounded-lg text-center transition-all duration-200
      ${selected
        ? 'bg-blue-500 text-white shadow-lg scale-105'
        : 'bg-white hover:bg-blue-50 text-gray-700 border border-gray-200'
      }
    `}
  >
    {time}
  </button>
);

const BookingTimeComponent = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { updateBooking, booking } = useBooking();
  const [selectedTime, setSelectedTime] = useState<string | undefined>(booking?.time);

  useEffect(() => {
    if (!booking || !booking.date) {
      console.log('booking', booking);
      navigate(`/booking/${doctorId}/date`);
      return;
    }
  }, [booking, doctorId, navigate]);

  const timeSlots = [
    '09:00 ص',
    '10:00 ص',
    '11:00 ص',
    '12:00 م',
    '01:00 م',
    '02:00 م',
    '03:00 م',
    '04:00 م',
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBooking({
      ...booking,
      time,
      doctorId: doctorId || ''
    });
  };

  const handleContinue = () => {
    if (selectedTime && booking) {
      updateBooking({
        ...booking,
        time: selectedTime,
        doctorId: doctorId || ''
      });
      navigate(`/booking/${doctorId}/checkout`);
    }
  };

  if (!booking || !booking.date) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <BookingFlow currentStep="time" />

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              اختر وقت الموعد
            </h1>

            <p className="text-center text-gray-600 mb-8">
              التاريخ المختار: {booking?.date ? format(booking.date, 'dd MMMM yyyy', { locale: ar }) : 'لم يتم اختيار تاريخ'}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {timeSlots.map((time) => (
                <TimeSlot
                  key={time}
                  time={time}
                  selected={time === selectedTime}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedTime}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              التالي
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

const BookingTime = () => {
  return (
    <BookingTimeComponent />
  );
};

export default BookingTime;

