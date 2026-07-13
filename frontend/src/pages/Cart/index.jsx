// pages/Cart/index.jsx — Shopping cart

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { getRecommendations } from '../../data/mockData';
import GameCard from '../../components/GameCard';
import SectionHeading from '../../components/SectionHeading';
import DotDivider from '../../components/DotDivider';

function CartItem({ item, onRemove }) {
  return (
    <div className="flex gap-4 border border-border-default bg-bg-surface p-4
                    hover:border-accent-coral/50 transition-colors group">
      <Link to={`/game/${item.id}`} className="shrink-0">
        <div className="w-16 h-22 overflow-hidden border border-border-default bg-bg-elevated"
             style={{ height: '88px' }}>
          <img
            src={item.coverUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.currentTarget.style.display='none'; }}
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/game/${item.id}`}>
            <h3 className="font-display text-base font-semibold text-text-primary
                           hover:text-accent-coral transition-colors line-clamp-1">
              {item.title}
            </h3>
          </Link>
          <button
            onClick={() => onRemove(item.id)}
            className="text-text-dim hover:text-status-error transition-colors shrink-0 p-1"
            aria-label="Xóa"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex gap-1.5 mt-1">
          {item.genre.slice(0, 2).map(g => (
            <span key={g} className="text-[10px] font-display text-text-dim tracking-wide">{g}</span>
          ))}
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {item.originalPrice && (
              <span className="font-display text-xs text-text-dim line-through block">
                {item.originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            <span className="font-display text-lg font-bold text-accent-amber">
              {item.price.toLocaleString('vi-VN')}₫
            </span>
          </div>
          {item.discountPercent && (
            <span className="bg-accent-coral text-bg-deep font-display font-bold text-xs px-2 py-0.5">
              -{item.discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeFromCart, clearCart, cartTotal, purchasedGameIds, viewedGameIds } = useCart();

  const savings = items.reduce((acc, item) => {
    if (item.originalPrice) acc += item.originalPrice - item.price;
    return acc;
  }, 0);

  const recommendedGames = useMemo(() => {
    return getRecommendations(purchasedGameIds, viewedGameIds, 4);
  }, [purchasedGameIds, viewedGameIds]);

  if (items.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-32 gap-6 text-center px-6">
        <div className="w-20 h-20 border border-border-default bg-bg-surface flex items-center justify-center">
          <ShoppingCart size={32} className="text-text-dim" />
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-text-primary mb-2">Giỏ hàng trống</p>
          <p className="text-text-secondary text-sm">Hãy khám phá và thêm game yêu thích vào giỏ!</p>
        </div>
        <div className="flex gap-4">
          <Link to="/catalog"
            className="bg-accent-coral text-bg-deep font-display font-bold text-sm
                       tracking-widest px-6 py-3 hover:bg-accent-amber transition-colors">
            KHÁM PHÁ GAME
          </Link>
          <Link to="/account?tab=recommendations"
            className="border border-border-default text-text-secondary hover:border-accent-coral
                       hover:text-accent-coral font-display text-sm tracking-widest px-6 py-3 transition-colors
                       flex items-center gap-2">
            <Sparkles size={14} />
            XEM GỢI Ý
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-text-primary tracking-tight flex items-center gap-3">
          <span className="text-accent-coral text-sm tracking-widest">//</span>
          Giỏ hàng
          <span className="font-display text-sm font-normal text-text-dim">({items.length} game)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-text-dim hover:text-status-error font-display tracking-wide transition-colors">
          Xóa tất cả
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Item list */}
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
        </div>

        {/* Order summary */}
        <div className="self-start">
          <div className="border border-border-default bg-bg-surface p-6 sticky top-24">
            <p className="font-display text-sm font-semibold text-text-primary mb-5 pb-4 border-b border-border-default">
              <span className="text-accent-amber mr-2">//</span>
              TỔNG ĐƠN HÀNG
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tạm tính ({items.length} game)</span>
                <span className="font-display font-medium text-text-primary">
                  {(cartTotal + savings).toLocaleString('vi-VN')}₫
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-status-success">Tiết kiệm được</span>
                  <span className="font-display font-bold text-status-success">
                    -{savings.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              )}
              <div className="border-t border-border-default pt-3 flex justify-between">
                <span className="font-display font-semibold text-text-primary">Tổng cộng</span>
                <span className="font-display text-xl font-bold text-accent-amber">
                  {cartTotal.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            <Link to="/checkout" className="w-full bg-accent-coral text-bg-deep font-display font-bold
                               text-sm tracking-widest py-3.5 hover:bg-accent-amber transition-colors
                               flex items-center justify-center gap-2 text-center">
              THANH TOÁN <ArrowRight size={16} />
            </Link>

            <Link to="/catalog"
              className="mt-3 w-full border border-border-default text-text-secondary
                         hover:border-accent-coral hover:text-accent-coral font-display text-sm
                         tracking-widest py-3 transition-colors flex items-center justify-center gap-2">
              TIẾP TỤC MUA SẮM
            </Link>

            {savings > 0 && (
              <p className="mt-4 text-xs text-text-dim text-center font-display">
                🎉 Bạn đã tiết kiệm <span className="text-status-success font-bold">
                  {savings.toLocaleString('vi-VN')}₫
                </span> nhờ khuyến mãi!
              </p>
            )}
          </div>
        </div>
      </div>

      <DotDivider className="py-10" />

      {/* Recommendations in cart page */}
      <section>
        <SectionHeading
          marker="coral"
          label="Bạn có thể cũng thích"
          subtitle="Gợi ý dựa trên lịch sử và giỏ hàng hiện tại của bạn."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedGames.slice(0, 4).map((game, i) => (
            <div key={game.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
