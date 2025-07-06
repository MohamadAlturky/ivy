import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Calendar, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  location: string;
}

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [experienceRange, setExperienceRange] = useState([0, 20]);
  const [rating, setRating] = useState(0);
  const [visibleDoctors, setVisibleDoctors] = useState(6);

  const doctors: Doctor[] = [
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
      location: 'مستشفى الملك فيصل'
    },
    {
      id: '2',
      name: 'د. فاطمة علي حسن',
      specialty: 'طب الأطفال',
      experience: 12,
      rating: 4.8,
      price: 250,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      bio: 'استشارية طب الأطفال متخصصة في رعاية الأطفال حديثي الولادة والرضع',
      availableDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء'],
      location: 'مستشفى الأطفال التخصصي'
    },
    {
      id: '3',
      name: 'د. محمد عبدالله',
      specialty: 'جراحة العظام',
      experience: 18,
      rating: 4.7,
      price: 400,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
      bio: 'استشاري جراحة العظام والمفاصل مع تخصص في الإصابات الرياضية',
      availableDays: ['الأحد', 'الثلاثاء', 'الخميس'],
      location: 'مستشفى الملك عبدالعزيز'
    },
    {
      id: '4',
      name: 'د. سارة أحمد',
      specialty: 'طب النساء والولادة',
      experience: 10,
      rating: 4.9,
      price: 350,
      image: 'https://images.unsplash.com/photo-1594824408625-29f0c9c5635c?auto=format&fit=crop&w=400&q=80',
      bio: 'استشارية طب النساء والولادة مع خبرة في الحمل عالي الخطورة',
      availableDays: ['السبت', 'الاثنين', 'الأربعاء', 'الخميس'],
      location: 'مستشفى السلام'
    },
    {
      id: '5',
      name: 'د. خالد محمود',
      specialty: 'طب الأسنان',
      experience: 8,
      rating: 4.6,
      price: 200,
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=400&q=80',
      bio: 'طبيب أسنان متخصص في تجميل الأسنان والزراعة',
      availableDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'],
      location: 'عيادة الأسنان المتقدمة'
    },
    {
      id: '6',
      name: 'د. نورا عبدالرحمن',
      specialty: 'طب الجلدية',
      experience: 14,
      rating: 4.8,
      price: 280,
      image: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?auto=format&fit=crop&w=400&q=80',
      bio: 'استشارية الأمراض الجلدية والتناسلية مع تخصص في الليزر التجميلي',
      availableDays: ['الأحد', 'الثلاثاء', 'الخميس'],
      location: 'مركز الجلدية المتقدم'
    }
  ];

  const specialties = [
    'all',
    'طب القلب',
    'طب الأطفال',
    'جراحة العظام',
    'طب النساء والولادة',
    'طب الأسنان',
    'طب الجلدية'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesPrice = doctor.price >= priceRange[0] && doctor.price <= priceRange[1];
    const matchesExperience = doctor.experience >= experienceRange[0] && doctor.experience <= experienceRange[1];
    const matchesRating = rating === 0 || doctor.rating >= rating;
    return matchesSearch && matchesSpecialty && matchesPrice && matchesExperience && matchesRating;
  });

  const handleLoadMore = () => {
    setVisibleDoctors(prev => Math.min(prev + 6, filteredDoctors.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الأطباء المتاحون</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من بين أفضل الأطباء المتخصصين واحجز موعدك بسهولة
          </p>
        </div>

        {/* Search and Collapsible Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="ابحث عن طبيب أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-6 pr-12 pl-4 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:bg-white transition-all duration-300 text-right"
                dir="rtl"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="flex items-center gap-2 py-6 px-6 bg-white/80 backdrop-blur-sm border-0 hover:bg-white transition-all duration-300"
            >
              <Filter className="h-5 w-5 ml-2" />
              تصفية النتائج
              {isFilterOpen ? (
                <ChevronUp className="h-4 w-4 mr-2" />
              ) : (
                <ChevronDown className="h-4 w-4 mr-2" />
              )}
            </Button>
          </div>

          <Collapsible open={isFilterOpen} className="space-y-6">
            <CollapsibleContent className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Specialty Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">التخصص</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <Button
                        key={specialty}
                        variant={selectedSpecialty === specialty ? "default" : "outline"}
                        onClick={() => setSelectedSpecialty(specialty)}
                        className={`rounded-full ${selectedSpecialty === specialty
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-blue-50"
                          }`}
                      >
                        {specialty === "all" ? "جميع التخصصات" : specialty}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">نطاق السعر</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={50}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{priceRange[0]} ر.س</span>
                      <span>{priceRange[1]} ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Experience Range Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">سنوات الخبرة</h3>
                  <div className="px-2">
                    <Slider
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                      max={20}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{experienceRange[0]} سنة</span>
                      <span>{experienceRange[1]} سنة</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-4 lg:col-span-3">
                  <h3 className="font-semibold text-gray-900">التقييم</h3>
                  <div className="flex flex-wrap gap-2">
                    {[0, 3, 3.5, 4, 4.5].map((rate) => (
                      <Button
                        key={rate}
                        variant={rating === rate ? "default" : "outline"}
                        onClick={() => setRating(rate)}
                        className={`rounded-full ${rating === rate
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-blue-50"
                          }`}
                      >
                        {rate === 0 ? (
                          "الكل"
                        ) : (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{rate}+</span>
                          </div>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.slice(0, visibleDoctors).map((doctor, index) => (
            <Card
              key={doctor.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer animate-slide-up border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">{doctor.price} ر.س</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {doctor.name}
                  </h3>

                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>

                  <div className="flex items-center text-gray-600 text-sm">
                    <Award className="h-4 w-4 ml-2" />
                    <span>{doctor.experience} سنة خبرة</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 ml-2" />
                    <span>{doctor.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {doctor.availableDays.slice(0, 3).map(day => (
                      <span key={day} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                        {day}
                      </span>
                    ))}
                    {doctor.availableDays.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        +{doctor.availableDays.length - 3}
                      </span>
                    )}
                  </div>

                  <Link to={`/booking/${doctor.id}`}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105">
                      <Calendar className="ml-2 h-4 w-4" />
                      احجز موعد
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لم يتم العثور على أطباء</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث</p>
          </div>
        ) : visibleDoctors < filteredDoctors.length && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="px-8 py-4 text-lg hover:bg-blue-50"
            >
              المزيد من الأطباء
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Doctors;
