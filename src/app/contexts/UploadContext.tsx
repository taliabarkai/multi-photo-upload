import React, { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';

/** Simulated upload duration per image (ms). */
export const SIMULATED_UPLOAD_MS_PER_IMAGE = 4000;

/** Display progress in coarse steps (e.g. 0, 24, 48, …) to avoid digit flicker. */
export const UPLOAD_PROGRESS_STEP = 0.24;

function snapUploadProgress(t: number): number {
  const raw = Math.min(1, Math.max(0, t));
  if (raw >= 1) return 1;
  return Math.floor(raw / UPLOAD_PROGRESS_STEP) * UPLOAD_PROGRESS_STEP;
}

export type UploadMode =
  | 'personalization-bulk'
  | 'personalization-bulk-regular'
  /** V5 A: stepper modal, multi-personalization per pendant */
  | 'v5a-bulk-multi'
  | 'photo-only'
  | 'image-only'
  /** V5 B: gallery = images only; personalization per pendant on the product page (inline IE) */
  | 'v5b-inline-multi';

export type PhotoFrameSizeXL = 'S' | 'M' | 'L' | 'XL';

export interface PhotoData {
  id: number;
  image: string | null;
  name: string;
  hasWarning?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  /** Multi-personalization modal (V5 A) */
  photoTitle?: string;
  colorSwatchId?: string;
  frameSizeXL?: PhotoFrameSizeXL;
}

interface UploadContextType {
  totalPhotos: number;
  setTotalPhotos: (num: number) => void;
  photos: PhotoData[];
  updatePhoto: (index: number, data: Partial<PhotoData>) => void;
  bulkUpdatePhotos: (images: string[], markFirstPendantWarning?: boolean, markSecondAsError?: boolean) => number;
  deletePhoto: (index: number) => void;
  reorderPhotos: (fromIndex: number, toIndex: number) => void;
  uploadMode: UploadMode;
  setUploadMode: (mode: UploadMode) => void;
  resetUpload: () => void;
  /** True while any simulated upload is running (sequential queue). */
  isAnyUploading: boolean;
  /** Slot index currently uploading, or null when idle. */
  activeUploadSlot: number | null;
  /** Progress 0–1 for the active slot only. */
  activeUploadProgress: number;
  /** True while this slot is still in the simulated upload queue (no IE preview until complete). */
  isSlotPendingSimulatedUpload: (slotIndex: number) => boolean;
  /** Start simulated uploads (~4s each, sequential). Indices are pendant slots (0-based). */
  beginSimulatedUpload: (slotIndices: number[]) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [totalPhotos, setTotalPhotos] = useState(1);
  const [uploadMode, setUploadMode] = useState<UploadMode>('personalization-bulk');
  const [isAnyUploading, setIsAnyUploading] = useState(false);
  const [activeUploadSlot, setActiveUploadSlot] = useState<number | null>(null);
  const [activeUploadProgress, setActiveUploadProgress] = useState(0);
  const [uploadBatchSlots, setUploadBatchSlots] = useState<number[] | null>(null);
  const [uploadCompletedInBatch, setUploadCompletedInBatch] = useState<number[]>([]);
  const uploadAbortRef = useRef<AbortController | null>(null);
  /** Apply `hasError` after simulated upload completes for that slot (demo: V4 skip editor). */
  const deferredErrorAfterUploadRef = useRef<Map<number, string>>(new Map());

  const isSlotPendingSimulatedUpload = useCallback(
    (slotIndex: number) =>
      uploadBatchSlots !== null &&
      uploadBatchSlots.includes(slotIndex) &&
      !uploadCompletedInBatch.includes(slotIndex),
    [uploadBatchSlots, uploadCompletedInBatch]
  );
  const [photos, setPhotos] = useState<PhotoData[]>([
    { id: 1, image: null, name: '' },
    { id: 2, image: null, name: '' },
    { id: 3, image: null, name: '' },
    { id: 4, image: null, name: '' },
    { id: 5, image: null, name: '' },
    { id: 6, image: null, name: '' },
  ]);

  const updatePhoto = (index: number, data: Partial<PhotoData>) => {
    if (data.hasError === false) {
      deferredErrorAfterUploadRef.current.delete(index);
    }
    setPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = { ...newPhotos[index], ...data };
      return newPhotos;
    });
  };

  const bulkUpdatePhotos = (images: string[], markFirstPendantWarning?: boolean, markSecondAsError?: boolean) => {
    const emptySlots: number[] = [];
    for (let i = 0; i < totalPhotos; i++) {
      if (photos[i].image === null) {
        emptySlots.push(i);
      }
    }

    const errorMsg =
      "This photo has low resolution. Please upload one that's at least 600 x 600 pixels.";

    setPhotos((prev) => {
      const newPhotos = [...prev];
      images.forEach((image, idx) => {
        if (idx < emptySlots.length) {
          const slotIndex = emptySlots[idx];
          const deferSecondPendantError = markSecondAsError && slotIndex === 1;
          if (deferSecondPendantError) {
            deferredErrorAfterUploadRef.current.set(1, errorMsg);
          }
          newPhotos[slotIndex] = {
            ...newPhotos[slotIndex],
            image,
            hasWarning: markFirstPendantWarning && slotIndex === 0 && !deferSecondPendantError,
            hasError: false,
            errorMessage: undefined,
          };
        }
      });
      return newPhotos;
    });

    return images.length > 0 && emptySlots.length > 0 ? emptySlots[images.length - 1] : -1;
  };

  const deletePhoto = (index: number) => {
    deferredErrorAfterUploadRef.current.delete(index);
    setPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = {
        ...newPhotos[index],
        image: null,
        name: '',
        photoTitle: undefined,
        colorSwatchId: undefined,
        frameSizeXL: undefined,
        hasWarning: false,
        hasError: false,
        errorMessage: undefined,
      };
      return newPhotos;
    });
  };

  const resetUpload = () => {
    uploadAbortRef.current?.abort();
    uploadAbortRef.current = null;
    deferredErrorAfterUploadRef.current.clear();
    setIsAnyUploading(false);
    setActiveUploadSlot(null);
    setActiveUploadProgress(0);
    setUploadBatchSlots(null);
    setUploadCompletedInBatch([]);
    setPhotos([
      { id: 1, image: null, name: '' },
      { id: 2, image: null, name: '' },
      { id: 3, image: null, name: '' },
      { id: 4, image: null, name: '' },
      { id: 5, image: null, name: '' },
      { id: 6, image: null, name: '' },
    ]);
  };

  const beginSimulatedUpload = useCallback(
    (slotIndices: number[]) => {
      const q = [...new Set(slotIndices)]
        .sort((a, b) => a - b)
        .filter((i) => i >= 0 && i < totalPhotos);
      if (q.length === 0) return;

      uploadAbortRef.current?.abort();
      const ac = new AbortController();
      uploadAbortRef.current = ac;

      const run = async () => {
        setIsAnyUploading(true);
        setUploadBatchSlots(q);
        setUploadCompletedInBatch([]);
        try {
          for (const idx of q) {
            if (ac.signal.aborted) break;
            setActiveUploadSlot(idx);
            setActiveUploadProgress(0);

            await new Promise<void>((resolve) => {
              const start = performance.now();
              let lastSnapped = -1;
              const tick = (now: number) => {
                if (ac.signal.aborted) {
                  resolve();
                  return;
                }
                const t = Math.min(1, (now - start) / SIMULATED_UPLOAD_MS_PER_IMAGE);
                const snapped = snapUploadProgress(t);
                if (snapped !== lastSnapped) {
                  lastSnapped = snapped;
                  setActiveUploadProgress(snapped);
                }
                if (t < 1) {
                  requestAnimationFrame(tick);
                } else {
                  setActiveUploadProgress(1);
                  resolve();
                }
              };
              requestAnimationFrame(tick);
            });

            if (ac.signal.aborted) break;
            const deferredMsg = deferredErrorAfterUploadRef.current.get(idx);
            if (deferredMsg !== undefined) {
              deferredErrorAfterUploadRef.current.delete(idx);
              setPhotos((prev) => {
                const next = [...prev];
                next[idx] = {
                  ...next[idx],
                  hasError: true,
                  errorMessage: deferredMsg,
                };
                return next;
              });
            }
            setUploadCompletedInBatch((prev) =>
              prev.includes(idx) ? prev : [...prev, idx].sort((a, b) => a - b)
            );
          }
        } finally {
          setActiveUploadSlot(null);
          setActiveUploadProgress(0);
          setIsAnyUploading(false);
          setUploadBatchSlots(null);
          setUploadCompletedInBatch([]);
        }
      };

      void run();
    },
    [totalPhotos]
  );

  const reorderPhotos = (fromIndex: number, toIndex: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      if (fromIndex < totalPhotos && toIndex < totalPhotos) {
        const [movedPhoto] = newPhotos.splice(fromIndex, 1);
        newPhotos.splice(toIndex, 0, movedPhoto);
      }
      return newPhotos;
    });
  };

  return (
    <UploadContext.Provider
      value={{
        totalPhotos,
        setTotalPhotos,
        photos,
        updatePhoto,
        bulkUpdatePhotos,
        deletePhoto,
        reorderPhotos,
        uploadMode,
        setUploadMode,
        resetUpload,
        isAnyUploading,
        activeUploadSlot,
        activeUploadProgress,
        uploadBatchSlots,
        uploadCompletedInBatch,
        isSlotPendingSimulatedUpload,
        beginSimulatedUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within UploadProvider');
  }
  return context;
}
