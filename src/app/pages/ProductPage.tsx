import React, { useState, useEffect, useCallback } from 'react';
import { useBlocker, useNavigate } from 'react-router';
import { useUpload } from '../contexts/UploadContext';
import HeaderMb from '../components/HeaderMb';
import HeaderDt from '../components/HeaderDt';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import PhotoList from '../components/PhotoList';
import BulkUploadOption from '../components/BulkUploadOption';
import MaterialSelector from '../components/MaterialSelector';
import Subtotal from '../components/Subtotal';
import MaskedUploadModal from './MaskedUploadModal';
import BulkPhotoUploadModal from './BulkPhotoUploadModal';
import BulkPhotoMultiPersonalizationModal from './BulkPhotoMultiPersonalizationModal';
import SvgPhotoOnlyModal from './SvgPhotoOnlyModal';
import ImagePhotoOnlyModal from './ImagePhotoOnlyModal';
import GalleryModal from '../components/GalleryModal';
import Row3Description from '../../imports/Row3Description';
import Frame1223 from '../../imports/Frame1223';
import type { PhotoData, UploadMode } from '../contexts/UploadContext';
import InlineEditorV5B from '../components/InlineEditorV5B';
import NavigationLeaveModal, { type NavigationLeaveVariant } from '../components/NavigationLeaveModal';
import {
  clonePhotoDataList,
  draftHasContent,
  getCompletedPrefixLengthV2,
  getCompletedPrefixLengthV6,
  getCompletedPrefixLengthImageOnly,
  getFirstIncompleteStepV2,
  getFirstIncompleteStepV6,
  isStepCompleteV6,
  getFirstEmptySlotIndex,
  mergeIeWithPersistedDraft,
  mergePendingImagesIntoDraft,
  slotNeedsSimulatedUpload,
} from '../utils/modalDraft';

export default function ProductPage() {
  const {
    photos,
    uploadMode,
    setUploadMode,
    totalPhotos,
    setTotalPhotos,
    resetUpload,
    bulkUpdatePhotos,
    updatePhoto,
    isAnyUploading,
    beginSimulatedUpload,
  } = useUpload();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMountKey, setModalMountKey] = useState(0);
  /** In-memory wizard state when the user closes via Save & Close / backdrop / X without committing to the IE. */
  const [modalPersistedDraft, setModalPersistedDraft] = useState<PhotoData[] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  /** 1-based; updated on step navigation so reopening the wizard can resume the last viewed image. */
  const [lastInteractedStep, setLastInteractedStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replacePhotoIndex, setReplacePhotoIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isGalleryFromModal, setIsGalleryFromModal] = useState(false);
  const [pendingImageForModal, setPendingImageForModal] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: number]: { image?: string; name?: string; combined?: string; title?: string };
  }>({});
  const [pendingDraftImages, setPendingDraftImages] = useState<string[]>([]); // Hold images until modal closes
  const [sharedName, setSharedName] = useState(''); // Shared name for V3 (image w/ editor) & V4 (skip editor)
  const [pendingNavHref, setPendingNavHref] = useState<string | null>(null);
  const [leaveModalVariant, setLeaveModalVariant] = useState<NavigationLeaveVariant>('unsaved');
  const uploadedCount = photos.filter(p => p.image !== null).length;
  const hasAnyUploads = uploadedCount > 0;

  // Clear validation errors when photos change or totalPhotos changes
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [photos, totalPhotos, sharedName]);

  const shouldBlockNavigation =
    isAnyUploading ||
    isModalOpen ||
    pendingDraftImages.length > 0 ||
    (modalPersistedDraft != null && draftHasContent(modalPersistedDraft, totalPhotos));

  const blocker = useBlocker(shouldBlockNavigation);

  useEffect(() => {
    if (!shouldBlockNavigation) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [shouldBlockNavigation]);

  /** Prototype: any in-document nav link opens the warning (upload state only affects copy). */
  useEffect(() => {
    const onLinkCapture = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a[href]');
      if (!el) return;
      const href = el.getAttribute('href');
      if (!href || href === '#' || href.trim() === '' || href.toLowerCase().startsWith('javascript:')) return;
      e.preventDefault();
      e.stopPropagation();
      setLeaveModalVariant(isAnyUploading ? 'upload' : 'unsaved');
      setPendingNavHref(href);
    };
    document.addEventListener('click', onLinkCapture, true);
    return () => document.removeEventListener('click', onLinkCapture, true);
  }, [isAnyUploading]);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setLeaveModalVariant(isAnyUploading ? 'upload' : 'unsaved');
    }
  }, [blocker.state, isAnyUploading]);

  /** Close the warning only — no navigation (prototype). */
  const dismissNavigationWarning = useCallback(() => {
    setPendingNavHref(null);
    setLeaveModalVariant('unsaved');
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  /** Prototype: header nav always opens the warning; upload state only affects modal copy. */
  const handleHeaderNavigate = useCallback(
    (href: string) => {
      setLeaveModalVariant(isAnyUploading ? 'upload' : 'unsaved');
      setPendingNavHref(href);
    },
    [isAnyUploading]
  );

  const showLeaveModal = blocker.state === 'blocked' || pendingNavHref !== null;

  /** Row X: remove only that pendant’s image; other slots and drafts for other steps stay. */
  const handleSlotRemove = useCallback((index: number) => {
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setModalPersistedDraft((prev) => {
      if (!prev) return null;
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = {
          ...next[index],
          image: null,
          name: '',
          photoTitle: undefined,
          colorSwatchId: undefined,
          frameSizeXL: undefined,
          hasWarning: false,
          hasError: false,
          errorMessage: undefined,
        };
      }
      return next;
    });
    setPendingDraftImages([]);
    setReplacePhotoIndex((prev) => (prev === index ? null : prev));
  }, []);

  const handleModalStepChange = useCallback((step: number) => {
    setCurrentStep(step);
    setLastInteractedStep(step);
  }, []);

  const handleModeChange = (mode: UploadMode) => {
    setUploadMode(mode);
    resetUpload();
    setModalPersistedDraft(null);
    setValidationErrors({}); // Clear validation errors when mode changes
    setCurrentStep(1);
    setLastInteractedStep(1);
  };

  const stepToResumeFromFirstEmpty = () => {
    const firstEmpty = getFirstEmptySlotIndex(photos, totalPhotos);
    if (firstEmpty === -1) {
      return Math.min(Math.max(1, lastInteractedStep), totalPhotos);
    }
    return Math.min(firstEmpty + 1, totalPhotos);
  };

  const handleUploadClick = () => {
    // V3 (image with editor): reopen wizard with in-memory draft when possible; otherwise pick from gallery
    if (uploadMode === 'photo-only' || uploadMode === 'slow-upload-v7') {
      if (modalPersistedDraft && draftHasContent(modalPersistedDraft, totalPhotos)) {
        setModalMountKey((k) => k + 1);
        const stepToOpen = stepToResumeFromFirstEmpty();
        setCurrentStep(stepToOpen);
        setLastInteractedStep(stepToOpen);
        setIsModalOpen(true);
      } else {
        setIsGalleryOpen(true);
        setIsGalleryFromModal(true);
      }
      return;
    }
    // V4 (skip editor): gallery only (no multi-step draft reopen in this flow)
    if (uploadMode === 'image-only') {
      setIsGalleryOpen(true);
      setIsGalleryFromModal(true);
      return;
    }
    // V5 (duplicate of V4): gallery then open the popup editor immediately
    if (uploadMode === 'image-only-v5') {
      setIsGalleryOpen(true);
      setIsGalleryFromModal(true);
      return;
    }
    // V5 B (IEC): gallery saves to the IE only; open the image editor via Edit on each row
    if (uploadMode === 'v5b-inline-multi') {
      setIsGalleryOpen(true);
      setIsGalleryFromModal(true);
      return;
    }
    // V1 / V2 / V5 A: reopen wizard with saved draft, or gallery for new picks
    if (
      uploadMode === 'personalization-bulk' ||
      uploadMode === 'personalization-bulk-regular' ||
      uploadMode === 'v5a-bulk-multi'
    ) {
      if (modalPersistedDraft && draftHasContent(modalPersistedDraft, totalPhotos)) {
        setModalMountKey((k) => k + 1);
        const stepToOpen = stepToResumeFromFirstEmpty();
        setCurrentStep(stepToOpen);
        setLastInteractedStep(stepToOpen);
        setIsModalOpen(true);
      } else {
        setIsGalleryOpen(true);
        setIsGalleryFromModal(true);
      }
      return;
    }
  };

  const handleEditPhoto = (index: number) => {
    // Check if the photo at this index already has an image
    const hasExistingImage = photos[index]?.image !== null;
    setIsEditMode(hasExistingImage);
    if (uploadMode === 'v5b-inline-multi') {
      setPendingDraftImages([]);
      setModalPersistedDraft(null);
    }

    setModalMountKey((k) => k + 1);
    const step = index + 1;
    setCurrentStep(step);
    setLastInteractedStep(step);
    setIsModalOpen(true);
  };

  const handleReplacePhoto = (index: number) => {
    // Open gallery for quick replace (single photo selection)
    setReplacePhotoIndex(index);
    setIsGalleryOpen(true);
    setIsGalleryFromModal(true);
  };

  /** V5 B: inline IE on product page — clear slot image + personalization fields */
  const handleV5BDeleteImage = useCallback((index: number) => {
    updatePhoto(index, {
      image: null,
      photoTitle: undefined,
      colorSwatchId: undefined,
      frameSizeXL: undefined,
      hasWarning: false,
      hasError: false,
      errorMessage: undefined,
    });
  }, [updatePhoto]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setPendingDraftImages([]);
  };

  const handleModalDismissWithDraft = (draft: PhotoData[]) => {
    setModalPersistedDraft(clonePhotoDataList(draft));
    handleCloseModal();
  };

  /** V2: Save & Close — cumulative consecutive completed steps from Image 1 (prefix) into the IE. */
  const handleV2PartialSaveAndClose = (draft: PhotoData[]) => {
    const k = getCompletedPrefixLengthV2(draft, totalPhotos);
    if (k === 0) return;
    const prevIe = photos.slice(0, totalPhotos);
    for (let i = 0; i < k; i++) {
      updatePhoto(i, draft[i]);
    }
    setModalPersistedDraft(clonePhotoDataList(draft));
    handleCloseModal();
    beginSimulatedUpload(
      Array.from({ length: k }, (_, i) => i).filter(
        (i) => draft[i]?.image && slotNeedsSimulatedUpload(prevIe[i], draft[i])
      )
    );
  };

  /** V5 A (multi personalization): Save & Close — cumulative consecutive completed steps from Image 1 into the IE. */
  const handleV6PartialSaveAndClose = (draft: PhotoData[]) => {
    const k = getCompletedPrefixLengthV6(draft, totalPhotos);
    if (k === 0) return;
    const prevIe = photos.slice(0, totalPhotos);
    for (let i = 0; i < k; i++) {
      updatePhoto(i, draft[i]);
    }
    setModalPersistedDraft(clonePhotoDataList(draft));
    handleCloseModal();
    beginSimulatedUpload(
      Array.from({ length: k }, (_, i) => i).filter(
        (i) => draft[i]?.image && slotNeedsSimulatedUpload(prevIe[i], draft[i])
      )
    );
  };

  /** V5 B: modal is image-only; prefix completion is consecutive slots with an image. */
  const handleV5BImageOnlyPartialSaveAndClose = (draft: PhotoData[]) => {
    const k = getCompletedPrefixLengthImageOnly(draft, totalPhotos);
    if (k === 0) return;
    const prevIe = photos.slice(0, totalPhotos);
    for (let i = 0; i < k; i++) {
      updatePhoto(i, draft[i]);
    }
    setModalPersistedDraft(clonePhotoDataList(draft));
    handleCloseModal();
    beginSimulatedUpload(
      Array.from({ length: k }, (_, i) => i).filter(
        (i) => draft[i]?.image && slotNeedsSimulatedUpload(prevIe[i], draft[i])
      )
    );
  };

  const handleSaveAndCloseBulk = (draft: PhotoData[]) => {
    if (uploadMode === 'personalization-bulk-regular') {
      handleV2PartialSaveAndClose(draft);
    } else if (uploadMode === 'v5a-bulk-multi') {
      handleV6PartialSaveAndClose(draft);
    } else if (uploadMode === 'v5b-inline-multi') {
      handleV5BImageOnlyPartialSaveAndClose(draft);
    } else {
      handleModalDismissWithDraft(draft);
    }
  };

  /** V1: Save & Close — all steps from Image 1 through the current step (cumulative). */
  const handleV1SaveAndClose = (draft: PhotoData[]) => {
    const idx = currentStep - 1;
    if (idx < 0 || idx >= totalPhotos) return;
    const prevIe = photos.slice(0, totalPhotos);
    const uploadIndices: number[] = [];
    for (let i = 0; i <= idx; i++) {
      updatePhoto(i, draft[i]);
      if (draft[i]?.image && slotNeedsSimulatedUpload(prevIe[i], draft[i])) uploadIndices.push(i);
    }
    setModalPersistedDraft(clonePhotoDataList(draft));
    handleCloseModal();
    beginSimulatedUpload(uploadIndices);
  };

  /**
   * Confirm on the last step — persist the full draft for all pendants (1–N) to the IE.
   * Next/Previous only update in-modal draft state until Save & Close or Confirm.
   */
  const handleModalCommitDraft = (draft: PhotoData[]) => {
    const prevIe = photos.slice(0, totalPhotos);
    const uploadIndices: number[] = [];

    for (let i = 0; i < totalPhotos; i++) {
      const p = draft[i];
      if (uploadMode === 'photo-only' || uploadMode === 'slow-upload-v7' || uploadMode === 'image-only') {
        if (p?.image) {
          const merged = { ...p, name: sharedName.trim() };
          updatePhoto(i, merged);
          if (slotNeedsSimulatedUpload(prevIe[i], merged)) uploadIndices.push(i);
        }
      } else {
        updatePhoto(i, p);
        if (p?.image && slotNeedsSimulatedUpload(prevIe[i], p)) uploadIndices.push(i);
      }
    }

    setModalPersistedDraft(null);
    handleCloseModal();
    beginSimulatedUpload(uploadIndices);
  };

  const handleGalleryOpen = () => {
    setIsGalleryOpen(true);
    setIsGalleryFromModal(true);
  };

  /**
   * Empty-slot click: open the device gallery first (no personalization modal yet).
   * After the user confirms image(s), handleGalleryConfirm opens the modal with pending picks.
   * The clicked row index is not used for routing; sequential steps are derived after selection.
   */
  const handleEmptySlotOpen = (_clickedSlotIndex?: number) => {
    handleGalleryOpen();
  };

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
    setReplacePhotoIndex(null);
    setIsGalleryFromModal(false);
  };

  // Handler for when gallery is opened from within the upload modal
  const handleGalleryOpenFromModal = (stepIndex: number) => {
    setReplacePhotoIndex(stepIndex); // Use replacePhotoIndex to track which photo we're uploading
    setIsGalleryOpen(true);
    setIsGalleryFromModal(true);
  };

  const handleGalleryConfirm = (selectedImages: string[]) => {
    // If replacing a specific photo or uploading from modal
    if (replacePhotoIndex !== null) {
      if (selectedImages.length > 0) {
        // If gallery was opened from modal, store pending image instead of saving immediately
        if (isGalleryFromModal && isModalOpen) {
          if (selectedImages.length > 0) {
            const ri = replacePhotoIndex;
            updatePhoto(ri, {
              image: selectedImages[0],
              hasError: false,
              errorMessage: undefined,
              hasWarning: false,
            });
            setPendingImageForModal(selectedImages[0]);
          }
          setIsGalleryOpen(false);
          setIsGalleryFromModal(false);
          setReplacePhotoIndex(null);
          return; // Modal syncs local draft from pendingImage; IE updated above
        }
        // Otherwise, directly update photo (for quick replace outside modal)
        const ri = replacePhotoIndex;
        updatePhoto(ri, {
          image: selectedImages[0],
          hasError: false,
          errorMessage: undefined,
          hasWarning: false,
        });
        beginSimulatedUpload([ri]);
      }
      setReplacePhotoIndex(null);
    } else {
      // Get existing photo URLs to filter them out
      const existingPhotoUrls = photos.slice(0, totalPhotos).filter(p => p.image !== null).map(p => p.image!);
      
      // Filter to only get newly selected images (exclude existing ones)
      const newlySelectedImages = selectedImages.filter(url => !existingPhotoUrls.includes(url));
      
      // Only proceed if there are new images to upload
      if (newlySelectedImages.length > 0) {
        // V5 B (IEC): save picks straight to the IE; user opens the image editor with Edit
        if (uploadMode === 'v5b-inline-multi') {
          setModalPersistedDraft(null);
          const emptySlots: number[] = [];
          for (let i = 0; i < totalPhotos; i++) {
            if (photos[i].image === null) emptySlots.push(i);
          }
          const take = Math.min(newlySelectedImages.length, emptySlots.length);
          const filledIndices = emptySlots.slice(0, take);
          bulkUpdatePhotos(newlySelectedImages, false, false);
          beginSimulatedUpload(filledIndices);
        } else if (
          uploadMode === 'personalization-bulk' ||
          uploadMode === 'personalization-bulk-regular' ||
          uploadMode === 'v5a-bulk-multi' ||
          uploadMode === 'photo-only' ||
          uploadMode === 'slow-upload-v7'
        ) {
          // New gallery session replaces any in-memory wizard draft
          setModalPersistedDraft(null);
          setModalMountKey((k) => k + 1);
          // Store images as pending drafts - DO NOT update photos context yet
          setPendingDraftImages(newlySelectedImages);
          
          const firstEmptyIdx = getFirstEmptySlotIndex(photos, totalPhotos);
          let stepToOpen = firstEmptyIdx === -1 ? 1 : firstEmptyIdx + 1;
          if (uploadMode === 'personalization-bulk-regular') {
            const base = photos.map((p) => ({ ...p }));
            const mergedPending = mergePendingImagesIntoDraft(base, newlySelectedImages, false);
            stepToOpen = getFirstIncompleteStepV2(mergedPending, totalPhotos);
          }
          if (uploadMode === 'v5a-bulk-multi') {
            const base = photos.map((p) => ({ ...p }));
            const mergedPending = mergePendingImagesIntoDraft(base, newlySelectedImages, false);
            stepToOpen = getFirstIncompleteStepV6(mergedPending, totalPhotos);
          }
          
          setCurrentStep(stepToOpen);
          setLastInteractedStep(stepToOpen);
          setIsModalOpen(true);
        } else if (uploadMode === 'image-only') {
          // V4 (skip editor): immediately update photos (no modal)
          // Low-res warning on Pendant 1 when slot 0 is filled; demo error on pendant 2 when 2+ pendants
          const shouldMarkFirstPendantWarning = true;
          const shouldMarkSecondAsError = totalPhotos >= 2;
          const emptySlots: number[] = [];
          for (let i = 0; i < totalPhotos; i++) {
            if (photos[i].image === null) emptySlots.push(i);
          }
          const take = Math.min(newlySelectedImages.length, emptySlots.length);
          const filledIndices = emptySlots.slice(0, take);
          bulkUpdatePhotos(newlySelectedImages, shouldMarkFirstPendantWarning, shouldMarkSecondAsError);
          beginSimulatedUpload(filledIndices);
        } else if (uploadMode === 'image-only-v5') {
          // V5 (dup of V4): update photos and open the popup editor immediately (stay on step 1).
          const v5BlockingMsg =
            "This photo is too small. Please replace it with one that's at least 600 x 600 pixels.";
          // V5: Step 1 should be a regular image (no warning). Only pendant 2 is blocking.
          const shouldMarkFirstPendantWarning = false;
          const emptySlots: number[] = [];
          for (let i = 0; i < totalPhotos; i++) {
            if (photos[i].image === null) emptySlots.push(i);
          }
          const take = Math.min(newlySelectedImages.length, emptySlots.length);
          const filledIndices = emptySlots.slice(0, take);
          // Do NOT use the V4 deferred error logic — V5 shows a blocking error inside the popup.
          bulkUpdatePhotos(newlySelectedImages, shouldMarkFirstPendantWarning, false);
          if (filledIndices.includes(1)) {
            updatePhoto(1, {
              hasError: true,
              errorMessage: v5BlockingMsg,
              hasWarning: false,
            });
          }
          beginSimulatedUpload(filledIndices);

          setModalPersistedDraft(null);
          setModalMountKey((k) => k + 1);
          setIsEditMode(false);
          setCurrentStep(1);
          setLastInteractedStep(1);
          setIsModalOpen(true);
        }
      }
    }
    setIsGalleryOpen(false);
    setIsGalleryFromModal(false);
  };

  // Calculate remaining empty slots
  const remainingSlots = totalPhotos - photos.slice(0, totalPhotos).filter(p => p.image !== null).length;

  // Validation handler for Add to Bag button
  const handleAddToBag = () => {
    if (
      uploadMode === 'v5a-bulk-multi' ||
      uploadMode === 'v5b-inline-multi'
    ) {
      const errors: { [key: number]: { image?: string; name?: string; combined?: string } } = {};
      let hasErrors = false;
      let allItemsEmpty = true;
      for (let i = 0; i < totalPhotos; i++) {
        const p = photos[i];
        if (p?.image || p?.photoTitle?.trim()) {
          allItemsEmpty = false;
        }
        if (!isStepCompleteV6(p)) {
          hasErrors = true;
          if (!p?.image) {
            errors[i] = { image: 'Please upload an image' };
          } else {
            errors[i] = { combined: 'Add title, color, and frame' };
          }
        }
      }
      if (allItemsEmpty) {
        errors[-1] = { combined: 'Please upload images and complete personalization' };
        setValidationErrors(errors);
        return;
      }
      if (hasErrors) {
        setValidationErrors(errors);
        return;
      }
      setValidationErrors({});
      console.log('Adding to bag (V5 A / V5 B multi-personalization)', photos.slice(0, totalPhotos));
      return;
    }

    const isPersonalizationMode =
      uploadMode === 'personalization-bulk' || uploadMode === 'personalization-bulk-regular';
    const isPhotoOnlyMode =
      uploadMode === 'photo-only' ||
      uploadMode === 'slow-upload-v7' ||
      uploadMode === 'image-only' ||
      uploadMode === 'image-only-v5';
    const isV1Mode = uploadMode === 'personalization-bulk'; // V1 - names are optional (informative)
    const isV2Mode = uploadMode === 'personalization-bulk-regular'; // V2 - names are mandatory
    
    // Validate all photos for ALL modes
    const errors: { [key: number]: { image?: string; name?: string; combined?: string } } = {};
    let hasErrors = false;

    // For V3/V4 (image with editor & skip editor), validate images and shared name
    if (isPhotoOnlyMode) {
      // Check if sharedName is missing
      if (!sharedName || sharedName.trim() === '') {
        errors[-1] = { name: 'Please enter a name' };
        hasErrors = true;
      }
      
      // Check if any images are missing
      for (let i = 0; i < totalPhotos; i++) {
        const photo = photos[i];
        const missingImage = !photo || !photo.image;
        
        if (missingImage) {
          errors[i] = { image: 'Please upload an image' };
          hasErrors = true;
        }
      }
      
      // If validation errors exist, return early
      if (hasErrors) {
        setValidationErrors(errors);
        return;
      }
    }

    // For V1/V2 (personalization modes), check if ALL items are completely empty
    let allItemsEmpty = true;
    let incompleteItemsCount = 0;

    for (let i = 0; i < totalPhotos; i++) {
      const photo = photos[i];
      const photoErrors: { image?: string; name?: string; combined?: string } = {};

      const missingImage = !photo || !photo.image;
      // For V1, name is optional so don't check for missing name. For V2, name is mandatory
      const missingName = isV2Mode && (!photo || !photo.name || photo.name.trim() === '');

      // Track if any item has ANY data
      if (isPersonalizationMode) {
        if (photo?.image || photo?.name) {
          allItemsEmpty = false;
        }
        // For V1, only count as incomplete if missing image. For V2, count as incomplete if missing either
        if (isV1Mode && missingImage) {
          incompleteItemsCount++;
        } else if (isV2Mode && (missingImage || missingName)) {
          incompleteItemsCount++;
        }
      }

      // For V1 and V2 (personalization modes), merge error when both are missing
      // V1: Only check image (name is optional)
      // V2: Check both image and name
      if (isV1Mode && missingImage) {
        photoErrors.image = 'Please upload an image';
        hasErrors = true;
      } else if (isV2Mode && missingImage && missingName) {
        photoErrors.combined = 'Please upload an image and enter a name';
        hasErrors = true;
      } else if (isV2Mode) {
        // Check for missing image
        if (missingImage) {
          photoErrors.image = 'Please upload an image';
          hasErrors = true;
        }

        // Check for missing name (only in V2 mode)
        if (missingName) {
          photoErrors.name = 'Please enter a name';
          hasErrors = true;
        }
      }

      if (Object.keys(photoErrors).length > 0) {
        errors[i] = photoErrors;
      }
    }

    // For V1/V2: If ALL items are completely empty, show consolidated error in BulkUploadOption
    if (isPersonalizationMode && allItemsEmpty && incompleteItemsCount === totalPhotos) {
      // V1: Only require images, V2: Require both images and names
      errors[-1] = { combined: isV1Mode ? 'Please upload images' : 'Please upload images and enter names' };
      setValidationErrors(errors);
      return;
    }

    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    // Clear errors and proceed
    setValidationErrors({});
    console.log('Adding to bag...');
  };

  return (
    <div className="bg-white flex flex-col items-start min-h-screen relative w-full">
      {/* Mobile Header */}
      <div className="min-[992px]:hidden w-full">
        <HeaderMb />
      </div>

      {/* Desktop Header */}
      <div className="hidden min-[992px]:block w-full">
        <HeaderDt onNavigate={handleHeaderNavigate} />
      </div>

      {/* Upload Mode Selector - Floating dropdown (mobile & desktop) */}
      <div className="fixed top-[64px] min-[992px]:top-[76px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-[min(100%,420px)] bg-white/95 backdrop-blur-sm rounded-[12px] shadow-sm border border-[#E3E3E3] px-[14px] py-[10px] flex items-center gap-[10px]">
        <label htmlFor="upload-mode-select" className="font-medium text-[12px] text-[#666] shrink-0 whitespace-nowrap">
          Version
        </label>
        <select
          id="upload-mode-select"
          value={uploadMode}
          onChange={(e) => handleModeChange(e.target.value as UploadMode)}
          className="min-w-0 flex-1 px-[12px] py-[8px] pr-[32px] rounded-[8px] border border-[#E3E3E3] min-[992px]:hover:border-black focus:outline-none focus:border-black font-normal text-[13px] text-black bg-white transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%23000%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center]"
        >
          <option value="personalization-bulk">V1: Optional Personalization</option>
          <option value="personalization-bulk-regular">V2: Mandatory Personalization</option>
          <option value="photo-only">V3: Image with Editor</option>
          <option value="image-only">V4: Skip Editor (w/ warning + error msgs)</option>
          <option value="image-only-v5">V5: Image + Editor (Block low-res img)</option>
          <option value="v5a-bulk-multi">V6 A: Multi-Personalization (In popup)</option>
          <option value="v5b-inline-multi">V6 B: Multi-Personalization (IEC)</option>
          <option value="slow-upload-v7">V7: Slow Upload</option>
        </select>
      </div>
      
      {/* Mobile Layout */}
      <div className="min-[992px]:hidden content-stretch flex flex-col items-start relative shrink-0 w-full">
        <ProductGallery />

        <div className="flex flex-col items-center w-full">
          <div className="content-stretch flex flex-col items-center px-[16px] py-[20px] relative w-full gap-[8px]">
            <ProductInfo />

            {/* Photo Count Selector */}
            <div className="content-stretch flex flex-col gap-[8px] items-start max-w-[520px] relative shrink-0 w-full pt-[16px] min-[992px]:pt-[16px] pb-[24px]">
              <p className="font-semibold leading-[18px] not-italic text-[14px] text-black">
                Number of Pendants:
              </p>
              <select
                value={totalPhotos}
                onChange={(e) => {
                  setTotalPhotos(Number(e.target.value));
                }}
                className="w-full px-[12px] py-[10px] pr-[12px] rounded-[4px] border border-[#E3E3E3] min-[992px]:hover:border-black focus:outline-none font-normal text-[14px] text-black bg-white transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%23000%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
              >
                <option value={1}>1 Pendant</option>
                <option value={2}>2 Pendants</option>
                <option value={3}>3 Pendants</option>
                <option value={4}>4 Pendants</option>
                <option value={5}>5 Pendants</option>
                <option value={6}>6 Pendants</option>
              </select>
            </div>

            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full max-w-[520px]">
              {uploadMode === 'v5b-inline-multi' ? (
                <InlineEditorV5B
                  onOpenGallery={() => {
                    setIsGalleryOpen(true);
                    setIsGalleryFromModal(false);
                  }}
                  onEditPendant={handleEditPhoto}
                  onDeleteBlockImage={handleV5BDeleteImage}
                  validationErrors={validationErrors}
                />
              ) : !hasAnyUploads && Object.keys(validationErrors).length === 0 ? (
                <BulkUploadOption 
                  onUploadClick={handleUploadClick}
                  onBulkUploadClick={handleGalleryOpen}
                  totalPhotos={totalPhotos}
                  uploadedCount={uploadedCount}
                  uploadMode={uploadMode}
                  name={sharedName}
                  onNameChange={setSharedName}
                />
              ) : !hasAnyUploads && Object.keys(validationErrors).length > 0 && (uploadMode === 'photo-only' || uploadMode === 'slow-upload-v7' || uploadMode === 'image-only' || uploadMode === 'image-only-v5') ? (
                <BulkUploadOption 
                  onUploadClick={handleUploadClick}
                  onBulkUploadClick={handleGalleryOpen}
                  totalPhotos={totalPhotos}
                  uploadedCount={uploadedCount}
                  uploadMode={uploadMode}
                  name={sharedName}
                  onNameChange={setSharedName}
                  validationError={validationErrors[-1]}
                  allValidationErrors={validationErrors}
                />
              ) : !hasAnyUploads && validationErrors[-1]?.combined && (uploadMode === 'personalization-bulk' || uploadMode === 'personalization-bulk-regular' || uploadMode === 'v5a-bulk-multi') ? (
                <BulkUploadOption 
                  onUploadClick={handleUploadClick}
                  onBulkUploadClick={handleGalleryOpen}
                  totalPhotos={totalPhotos}
                  uploadedCount={uploadedCount}
                  uploadMode={uploadMode}
                  name={sharedName}
                  onNameChange={setSharedName}
                  validationError={validationErrors[-1]}
                  allValidationErrors={validationErrors}
                />
              ) : (
                <PhotoList 
                  uploadMode={uploadMode}
                  onEditPhoto={handleEditPhoto}
                  onReplacePhoto={handleReplacePhoto}
                  onEmptySlotClick={handleEmptySlotOpen}
                  onSlotRemove={handleSlotRemove}
                  validationErrors={validationErrors}
                />
              )}
              
              <MaterialSelector />
              <Subtotal onAddToBag={handleAddToBag} addToBagDisabled={isAnyUploading} />
            </div>
          </div>
        </div>
        
        {/* Mobile Description Section - Accordion */}
        <div className="w-full">
          <Frame1223 />
        </div>
      </div>

      {/* Desktop Layout - Two Columns */}
      <div className="hidden min-[992px]:block w-full">
        <div className="flex w-full">
          {/* Left Column - Gallery */}
          <div className="flex-1">
            <ProductGallery />
          </div>

          {/* Right Column - Product Details & Upload */}
          <div className="flex-1 max-w-[600px] sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
            <div className="content-stretch flex flex-col items-center px-[80px] py-[60px] relative w-full">
              {/* Product Info */}
              <div className="w-full pb-[24px] p-[0px]">
                <ProductInfo />
              </div>

              {/* Photo Count Selector */}
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full pb-[24px] pt-[16px] min-[992px]:pt-0 pr-[0px] pl-[0px]">
                <p className="font-medium leading-[18px] not-italic text-[14px] text-black">
                  Number of Pendants:
                </p>
                <select
                  value={totalPhotos}
                  onChange={(e) => {
                    setTotalPhotos(Number(e.target.value));
                  }}
                  className="w-full px-[12px] py-[10px] pr-[12px] rounded-[4px] border border-[#E3E3E3] min-[992px]:hover:border-black focus:outline-none font-normal text-[14px] text-black bg-white transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%3E%3cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%23000%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3c%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]"
                >
                  <option value={1}>1 Pendant</option>
                  <option value={2}>2 Pendants</option>
                  <option value={3}>3 Pendants</option>
                  <option value={4}>4 Pendants</option>
                  <option value={5}>5 Pendants</option>
                  <option value={6}>6 Pendants</option>
                </select>
              </div>

              {/* Upload Section */}
              <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
                {uploadMode === 'v5b-inline-multi' ? (
                  <InlineEditorV5B
                    onOpenGallery={() => {
                      setIsGalleryOpen(true);
                      setIsGalleryFromModal(false);
                    }}
                    onEditPendant={handleEditPhoto}
                    onDeleteBlockImage={handleV5BDeleteImage}
                    validationErrors={validationErrors}
                  />
                ) : !hasAnyUploads && Object.keys(validationErrors).length === 0 ? (
                  <BulkUploadOption 
                    onUploadClick={handleUploadClick}
                    onBulkUploadClick={handleGalleryOpen}
                    totalPhotos={totalPhotos}
                    uploadedCount={uploadedCount}
                    uploadMode={uploadMode}
                    name={sharedName}
                    onNameChange={setSharedName}
                  />
                ) : !hasAnyUploads && Object.keys(validationErrors).length > 0 && (uploadMode === 'photo-only' || uploadMode === 'slow-upload-v7' || uploadMode === 'image-only' || uploadMode === 'image-only-v5') ? (
                  <BulkUploadOption 
                    onUploadClick={handleUploadClick}
                    onBulkUploadClick={handleGalleryOpen}
                    totalPhotos={totalPhotos}
                    uploadedCount={uploadedCount}
                    uploadMode={uploadMode}
                    name={sharedName}
                    onNameChange={setSharedName}
                    validationError={validationErrors[-1]}
                    allValidationErrors={validationErrors}
                  />
                ) : !hasAnyUploads && validationErrors[-1]?.combined && (uploadMode === 'personalization-bulk' || uploadMode === 'personalization-bulk-regular' || uploadMode === 'v5a-bulk-multi') ? (
                  <BulkUploadOption 
                    onUploadClick={handleUploadClick}
                    onBulkUploadClick={handleGalleryOpen}
                    totalPhotos={totalPhotos}
                    uploadedCount={uploadedCount}
                    uploadMode={uploadMode}
                    name={sharedName}
                    onNameChange={setSharedName}
                    validationError={validationErrors[-1]}
                    allValidationErrors={validationErrors}
                  />
                ) : (
                  <PhotoList 
                    uploadMode={uploadMode}
                    onEditPhoto={handleEditPhoto}
                    onReplacePhoto={handleReplacePhoto}
                    onEmptySlotClick={handleEmptySlotOpen}
                    onSlotRemove={handleSlotRemove}
                    validationErrors={validationErrors}
                  />
                )}
                
                <MaterialSelector />
                <Subtotal onAddToBag={handleAddToBag} addToBagDisabled={isAnyUploading} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop Description Section - Full Width Below Gallery */}
        <Row3Description />
      </div>
      
      {/* Upload Modal */}
      {isModalOpen && uploadMode === 'personalization-bulk' && (
        <MaskedUploadModal 
          key={modalMountKey}
          step={currentStep}
          onSaveAndClose={handleV1SaveAndClose}
          onDismissWithDraft={handleModalDismissWithDraft}
          onCommitDraft={handleModalCommitDraft}
          onStepChange={handleModalStepChange}
          onGalleryOpen={handleGalleryOpenFromModal}
          pendingImage={pendingImageForModal}
          setPendingImage={setPendingImageForModal}
          isEditMode={isEditMode}
          pendingDraftImages={pendingDraftImages}
          persistedDraft={isEditMode ? null : modalPersistedDraft}
        />
      )}
      
      {isModalOpen && uploadMode === 'personalization-bulk-regular' && (
        <BulkPhotoUploadModal 
          key={modalMountKey}
          step={currentStep}
          onSaveAndClose={handleSaveAndCloseBulk}
          onDismissWithDraft={handleModalDismissWithDraft}
          onCommitDraft={handleModalCommitDraft}
          onStepChange={handleModalStepChange}
          onGalleryOpen={handleGalleryOpenFromModal}
          pendingImage={pendingImageForModal}
          setPendingImage={setPendingImageForModal}
          isEditMode={isEditMode}
          pendingDraftImages={pendingDraftImages}
          persistedDraft={isEditMode ? null : modalPersistedDraft}
        />
      )}

      {isModalOpen && (uploadMode === 'v5a-bulk-multi' || uploadMode === 'v5b-inline-multi') && (
        <BulkPhotoMultiPersonalizationModal
          key={modalMountKey}
          step={currentStep}
          onSaveAndClose={handleSaveAndCloseBulk}
          onDismissWithDraft={handleModalDismissWithDraft}
          onCommitDraft={handleModalCommitDraft}
          onStepChange={handleModalStepChange}
          onGalleryOpen={handleGalleryOpenFromModal}
          pendingImage={pendingImageForModal}
          setPendingImage={setPendingImageForModal}
          isEditMode={isEditMode}
          pendingDraftImages={pendingDraftImages}
          persistedDraft={isEditMode ? null : modalPersistedDraft}
          imageOnly={uploadMode === 'v5b-inline-multi'}
        />
      )}

      {isModalOpen && (uploadMode === 'photo-only' || uploadMode === 'slow-upload-v7') && (
        <SvgPhotoOnlyModal 
          key={modalMountKey}
          step={currentStep}
          onDismissWithDraft={handleModalDismissWithDraft}
          onCommitDraft={handleModalCommitDraft}
          onStepChange={handleModalStepChange}
          onGalleryOpen={handleGalleryOpenFromModal}
          pendingImage={pendingImageForModal}
          setPendingImage={setPendingImageForModal}
          isEditMode={isEditMode}
          pendingDraftImages={pendingDraftImages}
          persistedDraft={isEditMode ? null : modalPersistedDraft}
        />
      )}
      
      {isModalOpen && (uploadMode === 'image-only' || uploadMode === 'image-only-v5') && (
        <ImagePhotoOnlyModal 
          key={modalMountKey}
          step={currentStep}
          onDismissWithDraft={handleModalDismissWithDraft}
          onCommitDraft={handleModalCommitDraft}
          onStepChange={handleModalStepChange}
          onGalleryOpen={handleGalleryOpenFromModal}
          pendingImage={pendingImageForModal}
          setPendingImage={setPendingImageForModal}
          isEditMode={isEditMode}
          persistedDraft={isEditMode ? null : modalPersistedDraft}
        />
      )}

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <GalleryModal
          onClose={handleGalleryClose}
          onConfirm={handleGalleryConfirm}
          maxPhotos={replacePhotoIndex !== null ? 1 : totalPhotos}
          replaceMode={replacePhotoIndex !== null}
          fromModal={isGalleryFromModal}
          initialSelections={
            replacePhotoIndex !== null && photos[replacePhotoIndex]?.image
              ? [photos[replacePhotoIndex].image!]
              : photos.slice(0, totalPhotos).filter(p => p.image !== null).map(p => p.image!)
          }
        />
      )}

      <NavigationLeaveModal
        open={showLeaveModal}
        variant={leaveModalVariant}
        onStayOnPage={dismissNavigationWarning}
        onLeaveAnyway={dismissNavigationWarning}
      />
    </div>
  );
}