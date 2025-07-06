import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookingConfirmation = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { booking, clearBooking } = useBooking();

  useEffect(() => {
    // If no booking data, redirect to home
    if (!booking?.date || !booking?.time || !booking?.patientName) {
      navigate('/');
      return;
    }
  }, [booking, navigate]);

  const handleDone = () => {
    clearBooking();
    navigate('/');
  };

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  تم تأكيد الحجز بنجاح
                </h1>
                <p className="text-gray-600">
                  سيتم إرسال تفاصيل الموعد إلى بريدك الإلكتروني ورقم جوالك
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img
                    src={booking.doctor?.image}
                    alt={booking.doctor?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{booking.doctor?.name}</h2>
                    <p className="text-blue-600">{booking.doctor?.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <p className="text-gray-600">التاريخ</p>
                    <p className="font-medium">
                      {format(booking.date, 'dd MMMM yyyy', { locale: ar })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">الوقت</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">المكان</p>
                    <p className="font-medium">{booking.doctor?.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">رسوم الكشف</p>
                    <p className="font-medium text-blue-600">{booking.totalPrice} ر.س</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <Button
                  onClick={handleDone}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  العودة للرئيسية
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="w-full"
                >
                  طباعة التفاصيل
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
