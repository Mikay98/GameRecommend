// GameCard.jsx — game card following premium Retro-Futuristic Cyber-Editorial spec

import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Check } from 'lucide-react';
import RatingStars from './RatingStars';

export default function GameCard({ game, showRank = false, rank = null, className = '' }) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  const handleCart = (e) => {
    e.preventDefault();
    if (!inCart && game.inStock) addToCart(game);
  };

  const barcodeId = `GV-${String(game.id).padStart(3, '0')}/26`;

  return (
    <Link
      to={`/game/${game.id}`}
      className={`group relative block border border-border-default bg-bg-surface
                  transition-all duration-500
                  hover:-translate-y-1.5 hover:rotate-1 hover:border-accent-coral hover:bg-bg-elevated
                  hover:shadow-[0_0_20px_rgba(255,107,74,0.12)]
                  ${!game.inStock ? 'opacity-50' : ''}
                  ${className}`}
    >
      {/* Rank number (background) */}
      {showRank && rank && (
        <span className="absolute top-2 right-4 font-display text-7xl font-bold
                         text-stroke-dim select-none pointer-events-none z-0 opacity-10 group-hover:opacity-20 transition-opacity">
          {String(rank).padStart(2, '0')}
        </span>
      )}

      {/* Decorative Corner Lines (Tactical Feel) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-border-default/40 group-hover:border-accent-coral/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-border-default/40 group-hover:border-accent-coral/60 transition-colors" />

      {/* Badge */}
      {game.discountPercent && (
        <div className="absolute top-3 left-3 z-10 bg-accent-coral text-bg-deep
                        font-display font-bold text-xs tracking-widest px-3 py-1.5 rotate-3 shadow-[0_2px_8px_rgba(255,107,74,0.3)]">
          -{game.discountPercent}%
        </div>
      )}
      {!game.discountPercent && game.isNew && (
        <div className="absolute top-3 left-3 z-10 bg-accent-amber text-bg-deep
                        font-display font-bold text-xs tracking-widest px-3 py-1.5 rotate-3 shadow-[0_2px_8px_rgba(255,184,48,0.3)]">
          MỚI
        </div>
      )}
      {!game.inStock && (
        <div className="absolute top-3 left-3 z-10 bg-status-error text-bg-deep
                        font-display font-bold text-xs tracking-widest px-3 py-1.5">
          HẾT HÀNG
        </div>
      )}

      {/* Cover image */}
      <div className="aspect-[3/4] overflow-hidden border-b border-border-default bg-bg-elevated relative z-10">
        <img
          src={game.coverUrl}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/300x400/1E2F42/4A6180?text=${encodeURIComponent(game.title)}`;
          }}
        />
        {/* Quick add button on hover (Slide-up mechanical transition) */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0
                        transition-transform duration-300 z-20">
          <button
            onClick={handleCart}
            disabled={!game.inStock}
            className={`w-full flex items-center justify-center gap-2 py-3 text-xs font-display font-bold tracking-widest
                        transition-all duration-200 cursor-pointer
                        ${inCart
                          ? 'bg-status-success text-bg-deep font-semibold'
                          : 'bg-accent-coral text-bg-deep hover:bg-accent-amber shadow-[0_-2px_10px_rgba(255,107,74,0.2)]'
                        }`}
          >
            {inCart
              ? <><Check size={14} /> ĐÃ THÊM</>
              : <><ShoppingCart size={14} /> THÊM VÀO GIỎ</>
            }
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 relative z-10">
        {/* Header row: Platforms + Serial Number */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex gap-1">
            {game.platforms.slice(0, 3).map(p => (
              <span key={p}
                className="text-[9px] font-display font-semibold tracking-wider text-accent-sky
                           border border-accent-sky/30 bg-accent-sky/5 px-1.5 py-0.5">
                {p}
              </span>
            ))}
          </div>
          <span className="text-[9px] font-display text-text-dim/80 tracking-widest font-medium">
            {barcodeId}
          </span>
        </div>

        <h3 className="font-display text-base font-bold text-text-primary tracking-wide
                       group-hover:text-accent-coral transition-colors line-clamp-1 mb-1">
          {game.title}
        </h3>

        <div className="flex items-center gap-1.5">
          <RatingStars rating={game.rating} />
          <span className="text-xs text-text-dim font-display font-bold">
            {game.rating.toFixed(1)}
          </span>
        </div>

        {/* Bottom row: Prices + Simulated Barcode */}
        <div className="mt-4 pt-3 border-t border-border-default/40 flex items-end justify-between">
          <div>
            {game.originalPrice && (
              <span className="font-display text-[11px] text-text-dim line-through block mb-0.5">
                {game.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            <span className="font-display text-lg font-extrabold text-accent-amber [text-shadow:0_0_8px_rgba(255,184,48,0.15)]">
              {game.price.toLocaleString('vi-VN')}₫
            </span>
          </div>

          {/* Barcode Deco */}
          <div className="flex flex-col items-end gap-1 select-none opacity-40 group-hover:opacity-80 transition-opacity">
            <div className="flex gap-[1.5px] h-3.5 items-end">
              <span className="w-[1.5px] h-full bg-text-secondary" />
              <span className="w-[3px] h-full bg-text-secondary" />
              <span className="w-[1px] h-full bg-text-secondary" />
              <span className="w-[1.5px] h-full bg-text-secondary" />
              <span className="w-[4px] h-full bg-text-secondary" />
              <span className="w-[1px] h-full bg-text-secondary" />
              <span className="w-[2.5px] h-full bg-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
