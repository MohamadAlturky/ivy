import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBooking } from '@/contexts/BookingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingFlow from '@/components/BookingFlow';

const BookingCheckout = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const [formData, setFormData] = useState({
    patientName: booking?.patientName || '',
    patientPhone: booking?.patientPhone || '',
    patientEmail: booking?.patientEmail || '',
    notes: booking?.notes || ''
  });

  // Ensure we have a booking with date and time
  if (!booking?.date || !booking?.time) {
    navigate(`/booking/${doctorId}/time`);
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBooking({
      ...booking,
      ...formData
    });
    navigate(`/booking/${doctorId}/review`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <BookingFlow currentStep="checkout" />
        
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              معلومات المريض
            </h1>
            
            <div className="mb-8 text-center text-gray-600">
              <p>موعد مع {booking.doctor?.name}</p>
              <p>
                {format(booking.date, 'dd MMMM yyyy', { locale: ar })} - {booking.time}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">الاسم الكامل</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل اسمك الكامل"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone">رقم الجوال</Label>
                <Input
                  id="patientPhone"
                  name="patientPhone"
                  type="tel"
                  value={formData.patientPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="05xxxxxxxx"
                  className="text-right"
                  pattern="^05[0-9]{8}$"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientEmail">البريد الإلكتروني</Label>
                <Input
                  id="patientEmail"
                  name="patientEmail"
                  type="email"
                  value={formData.patientEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="example@domain.com"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="أي معلومات إضافية ترغب في إضافتها..."
                  className="text-right h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                التالي
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BookingCheckout;
