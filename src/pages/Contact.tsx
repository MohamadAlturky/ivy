
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تواصل معنا</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن هنا للإجابة على استفساراتك وتقديم المساعدة التي تحتاجها
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
