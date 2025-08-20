import React from 'react';

interface Step {
  label: string;
  step: number;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  const totalSteps = steps.length;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`; // dynamic width calculation
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6">
      <div className="relative flex justify-between before:absolute before:top-1/2 before:left-0 before:h-1 before:w-full before:bg-gray-200">
        {steps.map(({ step, label }) => (
          <div className="relative z-10 flex flex-col items-center" key={step}>
            <div className={`
              flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white 
              ${activeStep >= step ? 'border-blue-500' : 'border-gray-300'}
            `}>
              {activeStep > step ? (
                <span className="text-blue-500 text-xl">✔</span>
              ) : (
                <span className="text-gray-500 font-medium">{step}</span>
              )}
            </div>
            <span className="mt-2 text-sm text-gray-600">{label}</span>
          </div>
        ))}
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-500 transition-all duration-300"
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default Stepper;
