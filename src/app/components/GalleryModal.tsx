import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/** Stock-only thumbnails for the picker mock (PDP gallery uses separate product assets). */
const STOCK_UNSPLASH: string[] = [
  'https://images.unsplash.com/photo-1552249352-02a0817a2d95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1768726049669-02d56884a86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1757339801273-c28a906e25f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1707528904057-1b699ebb09b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1604580826271-aa59d10b875a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1634840459492-47e67b9ae3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1653333574023-334216ace3b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];

interface GalleryModalProps {
  onClose: () => void;
  onConfirm: (selectedImages: string[]) => void;
  maxPhotos: number;
  replaceMode?: boolean; // True when replacing a single photo
  fromModal?: boolean; // True when opened from within the upload modal
  initialSelections?: string[]; // Pre-selected images
}

const MOCK_PHOTOS: string[] = [...STOCK_UNSPLASH];

// Organize photos by date sections (for macOS Finder view) — 9 stock images
const PHOTO_SECTIONS = [
  { title: 'Yesterday', photos: MOCK_PHOTOS.slice(0, 2) },
  { title: 'Previous 7 Days', photos: MOCK_PHOTOS.slice(2, 5) },
  { title: 'Last Month', photos: MOCK_PHOTOS.slice(5, 9) },
];

const SIDEBAR_FOLDERS = [
  { name: "Tenengroup", icon: "📁" },
  { name: "Theo Grace", icon: "📁" },
  { name: "Oak and Luna", icon: "📁" },
  { name: "Israel Blessing", icon: "📁" },
  { name: "Lime And Lou", icon: "📁" },
  { name: "MYKA", icon: "📁" },
  { name: "SETT", icon: "📁" },
  { name: "DOWZE", icon: "📁" },
  { name: "VZARI", icon: "📁" },
  { name: "Desktop", icon: "💻", isSystem: true },
  { name: "Downloads", icon: "⬇️", isSystem: true },
  { name: "Documents", icon: "📄", isSystem: true }
];

export default function GalleryModal({ onClose, onConfirm, maxPhotos, replaceMode = false, fromModal = false, initialSelections = [] }: GalleryModalProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>(initialSelections);
  const [isClosing, setIsClosing] = useState(false);
  
  // Use maxPhotos as the limit regardless of mode
  const effectiveMax = maxPhotos;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const togglePhotoSelection = (photoUrl: string) => {
    setSelectedPhotos(prev => {
      if (prev.includes(photoUrl)) {
        return prev.filter(url => url !== photoUrl);
      } else {
        if (prev.length >= effectiveMax) {
          // In replace mode (maxPhotos = 1), replace the current selection
          if (replaceMode && effectiveMax === 1) {
            return [photoUrl];
          }
          // Otherwise, don't add more if at max
          return prev;
        }
        return [...prev, photoUrl];
      }
    });
  };

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      onConfirm(selectedPhotos);
    }, 300);
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className={`fixed inset-0 flex items-end lg:items-center justify-center ${fromModal ? 'z-[60]' : 'z-50'} p-0 lg:p-[32px] transition-colors duration-300 ${
        isClosing ? 'bg-black/0' : 'bg-black/50'
      }`}
    >
      {/* Mobile/Tablet View (below 992px) - iPhone Gallery Style */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`lg:hidden bg-white w-full rounded-t-[20px] flex flex-col max-h-[90vh] overflow-hidden transition-transform duration-300 ease-out ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          animation: isClosing ? 'none' : 'slideUp 0.3s ease-out'
        }}
      >
        {/* iPhone Gallery Header */}
        <div className="flex items-center justify-between p-[16px] border-b border-[#E3E3E3]">
          <button 
            onClick={handleClose}
            className="font-medium text-[16px] text-black"
          >
            Cancel
          </button>
          <div className="flex items-center gap-[8px]">
            <h2 className="font-semibold text-[16px] text-black">
              Photos
            </h2>
          </div>
          <button 
            onClick={handleConfirm}
            disabled={selectedPhotos.length === 0}
            className={`font-semibold text-[16px] ${
              selectedPhotos.length > 0 ? 'text-black' : 'text-gray-300'
            }`}
          >
            Add
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-[4px]">
          <div className="grid grid-cols-3 gap-[4px]">
            {MOCK_PHOTOS.map((photo, index) => {
              const isSelected = selectedPhotos.includes(photo);
              const selectionIndex = selectedPhotos.indexOf(photo);
              
              return (
                <button
                  key={index}
                  onClick={() => togglePhotoSelection(photo)}
                  className="relative aspect-square overflow-hidden bg-gray-100"
                >
                  <ImageWithFallback 
                    src={photo}
                    alt={`Gallery photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Selection overlay */}
                  {isSelected && (
                    <>
                      <div className="absolute inset-0 bg-black/20 border-2 border-black" />
                      <div className="absolute top-[8px] right-[8px] bg-black text-white rounded-full size-[24px] flex items-center justify-center font-semibold text-[12px]">
                        {selectionIndex + 1}
                      </div>
                    </>
                  )}
                  
                  {/* Unselected circle */}
                  {!isSelected && (
                    <div className="absolute top-[8px] right-[8px] size-[24px] rounded-full border-2 border-white bg-white/50" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection hint */}
        <div className="p-[16px] bg-gray-50 border-t border-[#E3E3E3]">
          <p className="font-normal text-[14px] text-[#666] text-center">
            {selectedPhotos.length === 0 
              ? `Select up to ${effectiveMax} ${effectiveMax === 1 ? 'photo' : 'photos'}`
              : `${selectedPhotos.length} of ${effectiveMax} ${effectiveMax === 1 ? 'photo' : 'photos'} selected`
            }
          </p>
        </div>
      </div>

      {/* Desktop View (above 992px) - macOS Finder Style */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`hidden lg:flex bg-[#2b2b2b] w-full max-w-[900px] h-[600px] rounded-[8px] flex-col overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* macOS Window Header */}
        <div className="flex items-center justify-between h-[44px] bg-[#323232] border-b border-[#1e1e1e] px-[12px]">
          {/* Traffic lights */}
          <div className="flex items-center gap-[8px]">
            <button onClick={handleClose} className="size-[12px] rounded-full bg-[#ff5f57] hover:bg-[#ff4136]" />
            <div className="size-[12px] rounded-full bg-[#ffbd2e]" />
            <div className="size-[12px] rounded-full bg-[#28ca42]" />
          </div>
          
          {/* Navigation and controls */}
          <div className="flex items-center gap-[12px] flex-1 justify-center">
            <div className="flex items-center gap-[4px]">
              <button className="size-[24px] flex items-center justify-center text-[#999] hover:text-white text-[16px]">‹</button>
              <button className="size-[24px] flex items-center justify-center text-[#999] hover:text-white text-[16px]">›</button>
            </div>
            
            <div className="flex items-center gap-[8px] bg-[#424242] rounded-[6px] px-[12px] py-[4px] min-w-[180px]">
              <span className="text-[13px] text-white flex items-center gap-[6px]">
                📁 <span className="text-[#0c84ff]">Desktop</span>
              </span>
            </div>
            
            <div className="flex items-center gap-[8px] bg-[#424242] rounded-[6px] px-[12px] py-[4px] flex-1 max-w-[200px]">
              <span className="text-[13px] text-[#999]">🔍</span>
              <input 
                type="text" 
                placeholder="Search"
                className="bg-transparent border-none outline-none text-[13px] text-white placeholder-[#666] w-full"
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[230px] bg-[#232323] border-r border-[#1e1e1e] p-[12px] overflow-y-auto">
            <div className="mb-[8px]">
              <p className="text-[11px] text-[#999] uppercase tracking-wider mb-[6px] px-[6px]">Favorites</p>
              <div className="flex flex-col gap-[2px]">
                {SIDEBAR_FOLDERS.map((folder, idx) => (
                  <button
                    key={idx}
                    className={`flex items-center gap-[8px] px-[8px] py-[4px] rounded-[4px] text-[13px] transition-colors ${
                      folder.name === "Desktop" 
                        ? 'bg-[#0c84ff] text-white' 
                        : 'text-white hover:bg-[#2b2b2b]'
                    }`}
                  >
                    <span>{folder.icon}</span>
                    <span>{folder.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* File content area */}
          <div className="flex-1 flex flex-col bg-[#2b2b2b] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-[20px]">
              {PHOTO_SECTIONS.map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-[24px]">
                  <h3 className="text-[13px] text-[#999] mb-[12px]">{section.title}</h3>
                  <div className="flex flex-wrap gap-[16px]">
                    {section.photos.map((photo) => {
                      const fileNum = MOCK_PHOTOS.indexOf(photo) + 1;
                      const isSelected = selectedPhotos.includes(photo);
                      const selectionIndex = selectedPhotos.indexOf(photo);
                      
                      return (
                        <button
                          key={photo}
                          type="button"
                          onClick={() => togglePhotoSelection(photo)}
                          className={`flex flex-col gap-[6px] items-center relative group ${
                            isSelected ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                          }`}
                        >
                          <div className={`relative w-[100px] h-[100px] rounded-[4px] overflow-hidden ${
                            isSelected ? 'ring-2 ring-[#0c84ff]' : ''
                          }`}>
                            <ImageWithFallback 
                              src={photo}
                              alt={`Photo ${fileNum}`}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute top-[4px] right-[4px] bg-[#0c84ff] text-white rounded-full size-[20px] flex items-center justify-center text-[11px] font-semibold">
                                {selectionIndex + 1}
                              </div>
                            )}
                          </div>
                          <div className="text-center max-w-[100px]">
                            <p className="text-[11px] text-white truncate">
                              photo-{fileNum}.jpg
                            </p>
                            <p className="text-[10px] text-[#999]">
                              1,725 × 4,096
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="h-[56px] bg-[#232323] border-t border-[#1e1e1e] flex items-center justify-between px-[16px]">
              <button className="text-[13px] text-[#999] hover:text-white">
                Show Options
              </button>
              
              <div className="flex items-center gap-[12px]">
                <button 
                  onClick={handleClose}
                  className="px-[20px] py-[6px] rounded-[6px] bg-[#3b3b3b] hover:bg-[#4b4b4b] text-white text-[13px]"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={selectedPhotos.length === 0}
                  className={`px-[20px] py-[6px] rounded-[6px] text-[13px] ${
                    selectedPhotos.length > 0 
                      ? 'bg-[#0c84ff] hover:bg-[#0070e0] text-white' 
                      : 'bg-[#3b3b3b] text-[#666] cursor-not-allowed'
                  }`}
                >
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}