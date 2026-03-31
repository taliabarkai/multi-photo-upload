import React from 'react';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export default function Stepper({ currentStep, totalSteps, onStepClick }: StepperProps) {
  const LINE_GAP_PX = 4; // gap between circle edge and connector

  // Padding rule from the previous design:
  // - when there are 6 steps, remove side padding to appear full-width
  // - otherwise keep 24px side padding
  const paddingX = totalSteps >= 6 ? 0 : 24;

  return (
    <div className="w-full">
      <div
        className="w-full"
        style={{ paddingLeft: paddingX, paddingRight: paddingX }}
      >
        <div className="flex w-full items-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isIncomplete = stepNumber > currentStep;
            const isClickable = !!onStepClick;

            const circle = (
              <button
                key={`step-${stepNumber}`}
                type="button"
                onClick={() => onStepClick?.(stepNumber)}
                className={`flex items-center justify-center rounded-[100px] size-[24px] shrink-0 transition-colors ${
                  isIncomplete ? 'bg-[#E3E3E3]' : 'bg-black'
                } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                aria-label={`Go to step ${stepNumber}`}
              >
                {isCompleted ? (
                  <svg className="block" width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M13 5L7 11L3.5 7.5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="text-[12px] leading-[14px] font-semibold text-white">
                    {stepNumber}
                  </span>
                )}
              </button>
            );

            if (index === totalSteps - 1) return circle;

            const isCompletedSegment = stepNumber < currentStep;

            return (
              <React.Fragment key={`wrap-${stepNumber}`}>
                {circle}
                <div
                  aria-hidden="true"
                  className="h-[1.5px] flex-1"
                  style={{
                    marginLeft: LINE_GAP_PX,
                    marginRight: LINE_GAP_PX,
                    backgroundColor: isCompletedSegment ? '#000000' : '#E3E3E3',
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}