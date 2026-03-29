import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export default function Stepper({ currentStep, totalSteps, onStepClick }: StepperProps) {
  // Responsive spacing based on step count
  // Desktop (500px+): 72px for 1-4 steps, 48px for 5-6 steps
  // Mobile (375-500px): 32px for 5-6 steps to fit narrow screens
  const gapSize = totalSteps >= 5 ? 48 : 72;
  const lineMargin = totalSteps >= 5 ? 8 : 16;
  const totalWidth = totalSteps >= 5 ? (totalSteps - 1) * 80 : (totalSteps - 1) * 104;
  
  return (
    <>
      <style>{`
        .stepper-container-${totalSteps} {
          gap: ${gapSize}px;
        }
        .stepper-lines-${totalSteps} {
          width: ${totalWidth}px;
        }
        .stepper-line-${totalSteps} {
          margin-left: ${lineMargin}px;
          margin-right: ${lineMargin}px;
        }
        
        @media (max-width: 500px) {
          .stepper-container-${totalSteps} {
            gap: ${totalSteps >= 5 ? '32px' : '48px'} !important;
          }
          .stepper-lines-${totalSteps} {
            width: ${totalSteps >= 5 ? (totalSteps - 1) * 64 : (totalSteps - 1) * 80}px !important;
          }
          .stepper-line-${totalSteps} {
            margin-left: ${totalSteps >= 5 ? '4px' : '8px'} !important;
            margin-right: ${totalSteps >= 5 ? '4px' : '8px'} !important;
          }
        }
      `}</style>
      
      <div className={`stepper-container-${totalSteps} relative flex items-center justify-center`}>
        {/* Connecting lines - rendered behind circles */}
        {totalSteps > 1 && (
          <div className={`stepper-lines-${totalSteps} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center`}>
            {Array.from({ length: totalSteps - 1 }).map((_, index) => {
              const lineStartStep = index + 1;
              const lineEndStep = index + 2;
              // Line is black only if both connected steps are completed
              const isBlackLine = lineStartStep < currentStep && lineEndStep <= currentStep;
              
              return (
                <div 
                  key={index} 
                  className={`stepper-line-${totalSteps} h-[1px] flex-1 transition-colors duration-300`}
                  style={{
                    backgroundColor: isBlackLine ? '#000000' : '#E3E3E3'
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Step circles */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isIncomplete = stepNumber > currentStep;
          
          return (
            <button
              key={stepNumber}
              onClick={() => onStepClick?.(stepNumber)}
              className={`relative rounded-[100px] shrink-0 size-[32px] z-10 transition-all duration-300 ${
                isIncomplete 
                  ? 'bg-white border border-[#e3e3e3] border-solid' 
                  : 'bg-black'
              } ${onStepClick ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'}`}
              aria-label={`Go to step ${stepNumber}`}
            >
              <div className="content-stretch flex flex-col items-center justify-center relative size-full">
                <p className={`font-normal leading-[16px] not-italic text-[14px] text-center transition-colors duration-300 ${
                  isIncomplete ? 'text-black' : 'text-white'
                }`}>
                  {stepNumber}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}