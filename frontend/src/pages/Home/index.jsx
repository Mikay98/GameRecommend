// pages/Home/index.jsx — Landing page with hero, recommendations, trending

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import GameCard from '../../components/GameCard';
import SectionHeading from '../../components/SectionHeading';
import DotDivider from '../../components/DotDivider';
import {
  FEATURED_GAME,
  getRecommendations,
  TRENDING_GAMES,
  getPurchasedGames,
  MOCK_USER,
} from '../../data/mockData';
import { useCart } from '../../hooks/useCart';

// ─── Hero Banner ─────────────────────────────────────────────
function HeroBanner() {
  const { addToCart, isInCart } = useCart();
  const game = FEATURED_GAME;
  const inCart = isInCart(game.id);

  return (
    <section className="relative min-h-[550px] lg:min-h-[650px] flex items-end overflow-hidden border-b border-border-default/80 bg-bg-deep scanline-overlay">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={game.bannerUrl}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/90 via-transparent to-transparent z-10" />
        {/* Cyber Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 z-10 pointer-events-none" />
      </div>

      {/* Console dashboard bar */}
      <div className="absolute top-6 left-6 hidden lg:flex items-center gap-3 font-display text-[9px] text-text-dim/80 tracking-widest z-20 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
        <span>VAULT CONSOLE v1.0.9</span>
        <span className="w-[1px] h-3 bg-border-default" />
        <span>SYS_STATUS: ACTIVE</span>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-5 animate-fade-up">
          <span className="bg-accent-coral text-bg-deep font-display font-bold text-xs tracking-widest px-3 py-1.5 shadow-[0_2px_8px_rgba(255,107,74,0.3)]">
            NỔI BẬT
          </span>
          <span className="font-display text-xs tracking-widest text-text-dim">
            {game.releaseYear}
          </span>
        </div>

        <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-text-primary
                       leading-none tracking-tight mb-4 max-w-2xl animate-fade-up animate-delay-1">
          {game.title}
        </h1>

        {/* Rating row */}
        <div className="flex items-center gap-3 mb-5 animate-fade-up animate-delay-2">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-accent-amber text-accent-amber" />
            <span className="font-display text-sm font-bold text-accent-amber">{game.rating}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-text-dim" />
          <div className="flex gap-1.5">
            {game.genre.map(g => (
              <span key={g} className="text-xs font-display text-accent-sky border border-accent-sky/40 px-2 py-0.5">
                {g}
              </span>
            ))}
          </div>
        </div>

        <p className="text-text-secondary max-w-md leading-relaxed mb-8 animate-fade-up animate-delay-3 text-sm">
          {game.description}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-4">
          <Link
            to={`/game/${game.id}`}
            className="inline-flex items-center gap-2 bg-accent-coral text-bg-deep
                       font-display font-bold text-sm tracking-widest px-6 py-3.5
                       hover:bg-accent-amber hover:shadow-[0_0_15px_rgba(255,107,74,0.4)] transition-all duration-300"
          >
            XEM CHI TIẾT <ChevronRight size={16} />
          </Link>
          <button
            onClick={() => !inCart && addToCart(game)}
            className={`inline-flex items-center gap-2 border font-display font-bold text-sm
                        tracking-widest px-6 py-3.5 transition-all duration-300 cursor-pointer
                        ${inCart
                          ? 'border-status-success text-status-success'
                          : 'border-border-default text-text-primary hover:border-accent-coral hover:text-accent-coral hover:shadow-[0_0_12px_rgba(255,107,74,0.15)]'
                        }`}
          >
            {inCart ? '✓ ĐÃ THÊM VÀO GIỎ' : `${game.price.toLocaleString('vi-VN')}₫ — MUA NGAY`}
          </button>
        </div>
      </div>

      {/* Vol label */}
      <div className="absolute top-6 right-6 font-display text-xs tracking-widest text-text-dim z-20">
        VOL.01 / 2026
      </div>
    </section>
  );
}

// ─── Recommendation Reason Chip ───────────────────────────────
function ReasonChip() {
  return (
    <div className="inline-flex items-center gap-2 bg-accent-coral/10 border border-accent-coral/30
                    px-4 py-2 mb-8">
      <Sparkles size={14} className="text-accent-coral" />
      <span className="font-display text-xs tracking-widest text-accent-coral">
        DỰA TRÊN LỊCH SỬ MUA CỦA BẠN
      </span>
    </div>
  );
}

// ─── Recently Purchased Mini-Strip ────────────────────────────
function RecentPurchases() {
  const { purchaseHistory } = useCart();
  const purchased = useMemo(() => getPurchasedGames(purchaseHistory), [purchaseHistory]);

  if (purchased.length === 0) return null;

  return (
    <div className="flex items-center gap-4 flex-wrap mb-6 border-b border-border-default/40 pb-4">
      <div className="flex items-center gap-2 text-[10px] font-display text-text-dim tracking-wider font-semibold">
        <Clock size={11} />
        ĐÃ MUA GẦN ĐÂY:
      </div>
      <div className="flex flex-wrap gap-2">
        {purchased.map(g => (
          <Link
            key={g.id}
            to={`/game/${g.id}`}
            className="flex items-center gap-2 border border-border-default bg-bg-surface/50 px-3 py-1.5
                       hover:border-accent-coral hover:bg-bg-surface transition-all group"
          >
            <img
              src={g.coverUrl}
              alt={g.title}
              className="w-5 h-7 object-cover"
              onError={(e) => { e.currentTarget.style.display='none'; }}
            />
            <span className="font-display text-xs text-text-secondary group-hover:text-accent-coral transition-colors">
              {g.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function HomePage() {
  const { purchasedGameIds, viewedGameIds } = useCart();

  const recommendedGames = useMemo(() => {
    return getRecommendations(purchasedGameIds, viewedGameIds, 8);
  }, [purchasedGameIds, viewedGameIds]);

  return (
    <main className="flex-1 bg-deep relative">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      <HeroBanner />

      <DotDivider className="py-8" />

      {/* ── Recommendations section ── */}
      <section className="max-w-7xl mx-auto px-6 py-4 relative z-10">
        <RecentPurchases />
        <ReasonChip />

        <SectionHeading
          marker="coral"
          label="Gợi ý dành cho bạn"
          subtitle={`Xin chào ${MOCK_USER.name}! Dựa trên lịch sử của bạn, chúng tôi gợi ý những tựa game này.`}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendedGames.map((game, i) => (
            <div key={game.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}>
              <GameCard game={game} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/account?tab=recommendations"
            className="inline-flex items-center gap-2 border border-border-default
                       text-text-secondary hover:border-accent-coral hover:text-accent-coral hover:shadow-[0_0_12px_rgba(255,107,74,0.1)]
                       font-display text-xs tracking-widest px-6 py-3.5 transition-all"
          >
            XEM TẤT CẢ GỢI Ý <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      <DotDivider className="py-10" />

      {/* ── Hot Genres / Editorial Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <SectionHeading
          marker="amber"
          label="Danh Mục Thịnh Hành"
          subtitle="Khám phá các thể loại game phổ biến với thiết kế hình học độc đáo."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: RPG */}
          <Link to="/catalog?genre=RPG" 
            className="relative overflow-hidden border border-border-default bg-bg-surface p-6 h-44 flex flex-col justify-between group transition-all duration-300 hover:border-accent-coral hover:shadow-[0_0_15px_rgba(255,107,74,0.1)]">
            <span className="absolute -bottom-8 -right-4 font-display text-9xl font-extrabold text-stroke-dim group-hover:scale-105 transition-transform duration-500 opacity-20">RPG</span>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-display text-accent-coral tracking-widest font-semibold">// CỐT TRUYỆN SÂU SẮC</span>
              <span className="text-xs font-display text-text-dim">01</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-accent-coral transition-colors">NHẬP VAI</h3>
              <p className="text-xs text-text-secondary mt-1">Hành trình sử thi trong thế giới mở giả tưởng.</p>
            </div>
          </Link>

          {/* Card 2: Action */}
          <Link to="/catalog?genre=Action" 
            className="relative overflow-hidden border border-border-default bg-bg-surface p-6 h-44 flex flex-col justify-between group transition-all duration-300 hover:border-accent-amber hover:shadow-[0_0_15px_rgba(255,184,48,0.1)]">
            <span className="absolute -bottom-8 -right-4 font-display text-9xl font-extrabold text-stroke-dim group-hover:scale-105 transition-transform duration-500 opacity-20">ACT</span>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-display text-accent-amber tracking-widest font-semibold">// NHỊP ĐỘ CAO</span>
              <span className="text-xs font-display text-text-dim">02</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-accent-amber transition-colors">HÀNH ĐỘNG</h3>
              <p className="text-xs text-text-secondary mt-1">Những trận chiến gay cấn thử thách kỹ năng của bạn.</p>
            </div>
          </Link>

          {/* Card 3: Adventure */}
          <Link to="/catalog?genre=Adventure" 
            className="relative overflow-hidden border border-border-default bg-bg-surface p-6 h-44 flex flex-col justify-between group transition-all duration-300 hover:border-accent-sky hover:shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <span className="absolute -bottom-8 -right-4 font-display text-9xl font-extrabold text-stroke-dim group-hover:scale-105 transition-transform duration-500 opacity-20">ADV</span>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-display text-accent-sky tracking-widest font-semibold">// KHÁM PHÁ BẤT TẬN</span>
              <span className="text-xs font-display text-text-dim">03</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-accent-sky transition-colors">PHIÊU LƯU</h3>
              <p className="text-xs text-text-secondary mt-1">Khám phá bí mật ẩn giấu trong vùng đất kỳ bí.</p>
            </div>
          </Link>
        </div>
      </section>

      <DotDivider className="py-10" />

      {/* ── Trending section ── */}
      <section className="max-w-7xl mx-auto px-6 py-4 pb-16 relative z-10">
        <SectionHeading
          marker="amber"
          label="Đang Hot Nhất"
          subtitle="Những tựa game được cộng đồng đánh giá cao nhất hiện tại."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TRENDING_GAMES.slice(0, 8).map((game, i) => (
            <div key={game.id}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}>
              <GameCard game={game} showRank rank={i + 1} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-1.5">
            {[...Array(30)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-border-default" />
            ))}
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-bg-surface border border-border-default
                       text-text-secondary hover:border-accent-amber hover:text-accent-amber hover:shadow-[0_0_12px_rgba(255,184,48,0.1)]
                       font-display text-xs tracking-widest px-6 py-3.5 transition-colors"
          >
            <TrendingUp size={14} />
            KHÁM PHÁ TẤT CẢ
          </Link>
        </div>
      </section>
    </main>
  );
}
