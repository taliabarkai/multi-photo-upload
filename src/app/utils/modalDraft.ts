import type { PhotoData } from '../contexts/UploadContext';

export function clonePhotoDataList(photos: PhotoData[]): PhotoData[] {
  return photos.map((p) => ({ ...p }));
}

/** First pendant index (0-based) with no image in the IE, or -1 if every slot has an image. */
export function getFirstEmptySlotIndex(photos: PhotoData[], totalPhotos: number): number {
  for (let i = 0; i < totalPhotos; i++) {
    if (!photos[i]?.image) return i;
  }
  return -1;
}

/**
 * True when `next` differs from the current IE row `prev` such that a new simulated upload should run.
 * Skips re-upload for slots unchanged on a later Save & Close or Confirm (cumulative save).
 */
export function slotNeedsSimulatedUpload(prev: PhotoData | undefined, next: PhotoData | undefined): boolean {
  if (!next?.image) return false;
  if (!prev?.image) return true;
  return (
    prev.image !== next.image ||
    (prev.name ?? '') !== (next.name ?? '') ||
    (prev.photoTitle ?? '') !== (next.photoTitle ?? '') ||
    (prev.colorSwatchId ?? '') !== (next.colorSwatchId ?? '') ||
    (prev.frameSizeXL ?? '') !== (next.frameSizeXL ?? '')
  );
}

/** True if the user has any in-progress work worth restoring when reopening the modal. */
export function draftHasContent(draft: PhotoData[] | null | undefined, totalPhotos: number): boolean {
  if (!draft || draft.length === 0) return false;
  return draft.slice(0, totalPhotos).some(
    (p) =>
      p.image != null ||
      (p.name && p.name.trim() !== '') ||
      (p.photoTitle && p.photoTitle.trim() !== '')
  );
}

/** V6: step complete when image + title + color + frame are set. */
export function isStepCompleteV6(p: PhotoData | undefined): boolean {
  return !!(
    p?.image &&
    p.photoTitle?.trim() &&
    p.colorSwatchId &&
    p.frameSizeXL
  );
}

export function getCompletedPrefixLengthV6(draft: PhotoData[], totalPhotos: number): number {
  let k = 0;
  for (let i = 0; i < totalPhotos; i++) {
    if (isStepCompleteV6(draft[i])) k++;
    else break;
  }
  return k;
}

export function getFirstIncompleteStepV6(draft: PhotoData[], totalPhotos: number): number {
  for (let i = 0; i < totalPhotos; i++) {
    if (!isStepCompleteV6(draft[i])) return i + 1;
  }
  return Math.max(1, totalPhotos);
}

/** V5 B modal (image-only): step complete when an image is set. */
export function isStepCompleteImageOnly(p: PhotoData | undefined): boolean {
  return !!p?.image;
}

export function getCompletedPrefixLengthImageOnly(draft: PhotoData[], totalPhotos: number): number {
  let k = 0;
  for (let i = 0; i < totalPhotos; i++) {
    if (isStepCompleteImageOnly(draft[i])) k++;
    else break;
  }
  return k;
}

export function getFirstIncompleteStepImageOnly(draft: PhotoData[], totalPhotos: number): number {
  for (let i = 0; i < totalPhotos; i++) {
    if (!isStepCompleteImageOnly(draft[i])) return i + 1;
  }
  return Math.max(1, totalPhotos);
}

/** Merge gallery picks into empty slots (same rules as existing modals). */
export function mergePendingImagesIntoDraft(
  base: PhotoData[],
  pendingDraftImages: string[],
  isEditMode: boolean
): PhotoData[] {
  const currentPhotos = clonePhotoDataList(base);
  if (pendingDraftImages.length > 0 && !isEditMode) {
    let insertIndex = currentPhotos.findIndex((p) => !p.image);
    if (insertIndex === -1) insertIndex = 0;
    pendingDraftImages.forEach((imageUrl, i) => {
      const targetIndex = insertIndex + i;
      if (targetIndex < currentPhotos.length) {
        currentPhotos[targetIndex] = {
          ...currentPhotos[targetIndex],
          image: imageUrl,
          name: currentPhotos[targetIndex]?.name || '',
        };
      }
    });
  }
  return currentPhotos;
}

export function flushCurrentStepToDraft(
  draftPhotos: PhotoData[],
  currentStep: number,
  patch: Partial<PhotoData>
): PhotoData[] {
  const updated = [...draftPhotos];
  updated[currentStep - 1] = { ...updated[currentStep - 1], ...patch };
  return updated;
}

/** V2: current step complete when image + non-empty name. */
export function isStepCompleteV2(p: PhotoData | undefined): boolean {
  return !!(p?.image && p.name?.trim());
}

/** V2: consecutive completed steps from Image 1 (image + non-empty name). */
export function getCompletedPrefixLengthV2(draft: PhotoData[], totalPhotos: number): number {
  let k = 0;
  for (let i = 0; i < totalPhotos; i++) {
    if (isStepCompleteV2(draft[i])) {
      k++;
    } else {
      break;
    }
  }
  return k;
}

/** V2: 1-based step index of the first slot missing image or name (sequential). */
export function getFirstIncompleteStepV2(draft: PhotoData[], totalPhotos: number): number {
  for (let i = 0; i < totalPhotos; i++) {
    if (!isStepCompleteV2(draft[i])) {
      return i + 1;
    }
  }
  return Math.max(1, totalPhotos);
}

/**
 * Build modal draft: IE rows win when they have a committed image; otherwise use persisted snapshot
 * (in-progress slots that are not yet on the IE).
 */
export function mergeIeWithPersistedDraft(
  photos: PhotoData[],
  persistedDraft: PhotoData[] | null | undefined,
  totalPhotos: number
): PhotoData[] {
  const out: PhotoData[] = [];
  for (let i = 0; i < totalPhotos; i++) {
    const ie = photos[i];
    const snap = persistedDraft?.[i];
    if (ie?.image) {
      out.push({ ...ie });
    } else if (snap && (snap.image != null || (snap.name && snap.name.trim() !== ''))) {
      out.push({ ...ie, ...snap });
    } else {
      out.push({ ...ie });
    }
  }
  return out;
}
