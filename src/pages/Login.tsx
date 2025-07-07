import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PanelRightDashed, Stethoscope, Activity, Pill, Syringe, Thermometer, Microscope, Clipboard, LogIn, Cross, Dna } from 'lucide-react';
import '@/styles/medical-animations.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await auth.login(username, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        {/* Medical Background Animation */}
        <div className="medical-background">
          {/* Horizontal Moving PanelRightDasheds */}
          <PanelRightDashed className="floating-icon move-right speed-1 text-red-500/20" style={{ top: '15%', width: '64px', height: '64px' }} />
          <PanelRightDashed className="floating-icon move-left speed-2 delay-2 text-pink-500/20" style={{ top: '35%', width: '56px', height: '56px' }} />
          <PanelRightDashed className="floating-icon move-right speed-3 delay-4 text-rose-500/20" style={{ top: '55%', width: '48px', height: '48px' }} />
          <PanelRightDashed className="floating-icon move-left speed-4 delay-6 text-red-400/20" style={{ top: '75%', width: '52px', height: '52px' }} />

          {/* DNA Animation */}
          <Dna className="floating-icon rotate-dna speed-2 text-blue-600/30" style={{ left: '5%', top: '20%', width: '72px', height: '72px' }} />
          <Dna className="floating-icon rotate-dna-reverse speed-3 delay-2 text-cyan-600/30" style={{ right: '5%', top: '60%', width: '72px', height: '72px' }} />

          {/* Medical Crosses */}
          <Cross className="floating-icon pulse-fade speed-2 text-green-500/30" style={{ left: '15%', top: '30%', width: '48px', height: '48px' }} />
          <Cross className="floating-icon pulse-fade speed-3 delay-3 text-emerald-500/30" style={{ right: '15%', top: '70%', width: '48px', height: '48px' }} />

          {/* Floating Medical Icons */}
          <Stethoscope className="floating-icon move-diagonal-right speed-1 text-blue-500/20" style={{ left: '10%', top: '10%', width: '48px', height: '48px' }} />
          <Pill className="floating-icon move-diagonal-left speed-3 delay-2 text-green-500/20" style={{ left: '30%', top: '40%', width: '42px', height: '42px' }} />
          <Syringe className="floating-icon move-diagonal-right speed-4 delay-3 text-purple-500/20" style={{ left: '70%', top: '60%', width: '40px', height: '40px' }} />
          <Clipboard className="floating-icon move-diagonal-left speed-5 delay-4 text-red-500/20" style={{ left: '85%', top: '80%', width: '44px', height: '44px' }} />
          <Activity className="floating-icon move-diagonal-right speed-3 delay-1 text-cyan-500/20" style={{ left: '80%', top: '30%', width: '40px', height: '40px' }} />

          {/* Pulsing Circles */}
          <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse-ring"></div>
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-cyan-500/10 rounded-full animate-pulse-ring delay-1000"></div>

          {/* Microscope and Thermometer */}
          <Microscope className="floating-icon bounce-subtle speed-2 text-indigo-500/30" style={{ left: '25%', top: '85%', width: '56px', height: '56px' }} />
          <Thermometer className="floating-icon bounce-subtle speed-3 delay-2 text-red-500/30" style={{ right: '25%', top: '15%', width: '56px', height: '56px' }} />
        </div>

        {/* Enhanced Background Shapes with New Animations */}
        <div className="medical-shape medical-shape-1 animate-float bg-gradient-to-br from-blue-200/30 to-cyan-200/30" />
        <div className="medical-shape medical-shape-2 animate-pulse-slow bg-gradient-to-br from-cyan-200/30 to-blue-200/30" />
        <div className="medical-shape medical-shape-3 animate-float bg-gradient-to-br from-blue-300/20 to-cyan-300/20" style={{ animationDelay: '2s' }} />
        <div className="medical-shape medical-shape-4 animate-spin-slow bg-gradient-to-br from-purple-200/20 to-blue-200/20" style={{ animationDelay: '3s' }} />

        <div className="max-w-md w-full space-y-8 relative">
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 animate-slide-up group hover:shadow-3xl transition-all duration-700">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <LogIn className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                تسجيل الدخول
              </h2>
              <p className="text-gray-600 mb-8">
                قم بتسجيل الدخول للوصول إلى حسابك
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-3">
                    اسم المستخدم
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="أدخل اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                    كلمة المرور
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>

                    <span className="m-4">
                      جاري تسجيل الدخول...
                    </span>
                  </div>
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
            </form>
          </div>

          {/* PanelRightDashedbeat Animation */}
          <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2">
            <svg
              className="w-32 h-20"
              viewBox="0 0 100 30"
              fill="none"
            >
              <defs>
                <linearGradient id="heartbeat-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 L 20 15 L 25 5 L 30 25 L 35 15 L 50 15 L 55 10 L 60 20 L 65 15 L 100 15"
                className="heartbeat-path"
                stroke="url(#heartbeat-gradient)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 