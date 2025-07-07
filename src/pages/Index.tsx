import { useState } from 'react';
import { Calendar, Clock, Users, Award, ArrowLeft, Play, CheckCircle, Star, Stethoscope, Heart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeService, setActiveService] = useState(0);

  const stats = [
    { icon: Users, value: '10,000+', label: 'مريض سعيد' },
    { icon: Stethoscope, value: '500+', label: 'طبيب متخصص' },
    { icon: Award, value: '15+', label: 'سنة خبرة' },
    { icon: Heart, value: '24/7', label: 'خدمة متواصلة' },
  ];

  const services = [
    {
      title: 'استشارات عامة',
      description: 'استشارات طبية شاملة مع أفضل الأطباء',
      icon: Stethoscope,
    },
    {
      title: 'فحوصات دورية',
      description: 'فحوصات شاملة للوقاية والاكتشاف المبكر',
      icon: Activity,
    },
    {
      title: 'خدمات الطوارئ',
      description: 'خدمات طوارئ متaحة على مدار الساعة',
      icon: Heart,
    },
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      rating: 5,
      comment: 'خدمة ممتازة وأطباء على أعلى مستوى من الكفاءة والمهنية',
    },
    {
      name: 'فاطمة أحمد',
      rating: 5,
      comment: 'سهولة في الحجز ومتابعة مستمرة للحالة الصحية',
    },
    {
      name: 'محمد علي',
      rating: 5,
      comment: 'تجربة رائعة مع فريق طبي متميز ومتفهم',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Background Shapes */}
        <div className="medical-shape medical-shape-1 animate-float bg-gradient-to-br from-blue-200/30 to-cyan-200/30" />
        <div className="medical-shape medical-shape-2 animate-pulse-slow bg-gradient-to-br from-cyan-200/30 to-blue-200/30" />
        <div className="medical-shape medical-shape-3 animate-float bg-gradient-to-br from-blue-300/20 to-cyan-300/20" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">صحتك</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent animate-gradient">
                  أولويتنا
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                احجز موعدك مع أفضل الأطباء واحصل على رعاية صحية متميزة في بيئة آمنة ومريحة
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  احجز موعدك الآن
                  <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
                
                {/* <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  شاهد الفيديو
                </Button> */}
              </div>
              
              <div className="flex items-center space-x-6 space-x-reverse pt-8">
                <div className="flex items-center">
                  <div className="flex -space-x-2 space-x-reverse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-4 border-white shadow-md animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <div className="mr-4">
                    <p className="text-sm text-gray-600">أكثر من 10,000 مريض</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                      <span className="text-sm text-gray-600 mr-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 animate-float shadow-2xl transition-all duration-700 group-hover:shadow-3xl">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src="home-page-image.jpg" 
                    alt="Healthcare Professional" 
                    className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              {/* Medical Achievement Badges */}
              <Card className="absolute -top-4 right-4 bg-white/95 backdrop-blur-sm shadow-xl animate-float border-0 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-full shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">مركز معتمد</p>
                      <p className="text-xs text-gray-500">معايير الجودة العالمية</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="absolute -bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow-xl animate-float border-0 transition-all duration-500 hover:shadow-2xl hover:scale-105" style={{ animationDelay: '1s' }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-full shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">خدمة 24/7</p>
                      <p className="text-xs text-gray-500">رعاية طبية متواصلة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up group cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  <stat.icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-cyan-300 rounded-full animate-bounce" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا الطبية</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأعلى معايير الجودة والرعاية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer animate-slide-up border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveService(index)}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      <service.icon className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-blue-600 hover:text-blue-700 group-hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                    >
                      اعرف المزيد
                      <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">آراء مرضانا</h2>
            <p className="text-xl text-gray-600">شهادات حقيقية من مرضانا الأعزاء</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-slide-up group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-blue-50/30 hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">"{testimonial.comment}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">مريض</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mb-24 animate-bounce" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد لتجربة أفضل؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            احجز موعدك الآن واحصل على أفضل رعاية صحية من فريق طبي متخصص
          </p>
          <Button 
            size="lg"
            className="group bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            احجز موعدك الآن
            <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
