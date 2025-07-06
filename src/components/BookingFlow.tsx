import { Check } from 'lucide-react';

interface BookingFlowProps {
  currentStep: 'date' | 'time' | 'checkout' | 'review';
}

const BookingFlow = ({ currentStep }: BookingFlowProps) => {
  const steps = [
    { id: 'date', label: 'التاريخ' },
    { id: 'time', label: 'الوقت' },
    { id: 'checkout', label: 'المعلومات' },
    { id: 'review', label: 'المراجعة' },
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = steps.findIndex(s => s.id === stepId);
    const currentStepOrder = steps.findIndex(s => s.id === currentStep);
    
    if (stepOrder < currentStepOrder) return 'completed';
    if (stepOrder === currentStepOrder) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${status === 'completed' ? 'bg-blue-500 border-blue-500' : 
                    status === 'current' ? 'border-blue-500 bg-white' : 
                    'border-gray-300 bg-white'}`}
              >
                {status === 'completed' ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={`text-sm font-medium
                    ${status === 'current' ? 'text-blue-500' : 'text-gray-400'}`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium
                ${status === 'completed' ? 'text-blue-500' : 
                  status === 'current' ? 'text-blue-500' : 
                  'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
        
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200 -z-10">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
            style={{
              width: `${(steps.findIndex(s => s.id === currentStep)) / (steps.length - 1) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingFlow; 