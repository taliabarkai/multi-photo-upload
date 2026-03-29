import React from 'react';

export type NavigationLeaveVariant = 'upload' | 'unsaved';

interface NavigationLeaveModalProps {
  open: boolean;
  variant?: NavigationLeaveVariant;
  /** Primary: stay on current page — closes the dialog only. */
  onStayOnPage: () => void;
  /** Secondary: closes the dialog only (prototype — no navigation). */
  onLeaveAnyway: () => void;
}

const TITLE = 'Uploading in progress';
const BODY =
  'Your images are still uploading. If you leave this page, your uploads will be cancelled and your progress will be lost.';

export default function NavigationLeaveModal({
  open,
  onStayOnPage,
  onLeaveAnyway,
}: NavigationLeaveModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-[16px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-leave-title"
    >
      <div className="w-full max-w-[480px] rounded-[8px] bg-white p-[24px] shadow-xl">
        <h2 id="nav-leave-title" className="text-center font-semibold text-[18px] leading-[24px] text-black">
          {TITLE}
        </h2>
        <p className="mt-[16px] text-center text-[14px] leading-[22px] text-black">{BODY}</p>
        <div className="mt-[24px] flex flex-col gap-[12px] min-[480px]:flex-row min-[480px]:justify-center">
          <button
            type="button"
            onClick={onLeaveAnyway}
            className="min-[480px]:flex-1 font-semibold text-[14px] uppercase tracking-[0.5px] text-black bg-white border border-black px-[20px] py-[14px] hover:bg-[#fafafa] transition-colors rounded-none"
          >
            Leave anyway
          </button>
          <button
            type="button"
            onClick={onStayOnPage}
            className="min-[480px]:flex-1 font-semibold text-[14px] uppercase tracking-[0.5px] text-white bg-black px-[20px] py-[14px] hover:bg-[#333] transition-colors rounded-none"
          >
            Stay on page
          </button>
        </div>
      </div>
    </div>
  );
}
