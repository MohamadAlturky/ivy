import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingFlow from '@/components/BookingFlow';

const BookingReview = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { booking } = useBooking();

  // Ensure we have all required booking information
  if (!booking?.date || !booking?.time || !booking?.patientName) {
    navigate(`/booking/${doctorId}/checkout`);
    return null;
  }

  const handleConfirm = () => {
    // Here you would typically make an API call to save the booking
    // For now, we'll just navigate to the confirmation page
    navigate(`/booking/${doctorId}/confirmation`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <BookingFlow currentStep="review" />
        
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              مراجعة الحجز
            </h1>

            <div className="space-y-8">
              {/* Doctor Information */}
              <div className="flex items-center space-x-4 space-x-reverse border-b pb-6">
                <img
                  src={booking.doctor?.image}
                  alt={booking.doctor?.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{booking.doctor?.name}</h2>
                  <p className="text-blue-600">{booking.doctor?.specialty}</p>
                  <p className="text-gray-600">{booking.doctor?.location}</p>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold">تفاصيل الموعد</h3>
                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <p className="text-gray-600">التاريخ</p>
                    <p className="font-medium">{format(booking.date, 'dd MMMM yyyy', { locale: ar })}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">الوقت</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="space-y-4 border-b pb-6">
                <h3 className="text-lg font-semibold">معلومات المريض</h3>
                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <p className="text-gray-600">الاسم</p>
                    <p className="font-medium">{booking.patientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">رقم الجوال</p>
                    <p className="font-medium">{booking.patientPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">البريد الإلكتروني</p>
                    <p className="font-medium">{booking.patientEmail}</p>
                  </div>
                  {booking.notes && (
                    <div className="col-span-2">
                      <p className="text-gray-600">ملاحظات إضافية</p>
                      <p className="font-medium">{booking.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ملخص الدفع</h3>
                <div className="flex justify-between items-center text-lg">
                  <span>رسوم الكشف</span>
                  <span className="font-bold text-blue-600">{booking.totalPrice} ر.س</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 pt-6">
                <Button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  تأكيد الحجز
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/booking/${doctorId}/checkout`)}
                >
                  تعديل المعلومات
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

export default BookingReview;
