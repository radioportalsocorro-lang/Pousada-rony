import React from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageTitle: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageSrc,
  imageTitle,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          aria-label="Fechar foto"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
          <img
            src={imageSrc}
            alt={imageTitle}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-white">
          <span className="font-serif font-semibold text-sm sm:text-base">
            {imageTitle}
          </span>
          <span className="text-xs text-slate-400">
            Pousada Vila de Santa Marina &middot; Caraguatatuba - SP
          </span>
        </div>
      </div>
    </div>
  );
};
