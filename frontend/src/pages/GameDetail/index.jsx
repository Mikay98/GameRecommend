// pages/GameDetail/index.jsx — Game detail with contextual recommendations & Retro Spec Console

import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft, Star, Users, Calendar, Monitor, Terminal } from 'lucide-react';
import { getGameById, getSimilarGames } from '../../data/mockData';
import { useCart } from '../../hooks/useCart';
import GameCard from '../../components/GameCard';
import SectionHeading from '../../components/SectionHeading';
import RatingStars from '../../components/RatingStars';
import DotDivider from '../../components/DotDivider';

// ─── Reason tag for contextual recommendation ─────────────────
function WhyRecommended({ game }) {
  const { purchasedGameIds, viewedGameIds } = useCart();
  const purchased = purchasedGameIds.map(id => getGameById(id)).filter(Boolean);
  const viewed    = viewedGameIds.map(id => getGameById(id)).filter(Boolean);

  const matchPurchased = purchased.find(g => g.genre.some(gen => game.genre.includes(gen)));
  const matchViewed    = viewed.find(g => g.genre.some(gen => game.genre.includes(gen)));

  if (!matchPurchased && !matchViewed) return null;

  const reason = matchPurchased
    ? `Vì bạn đã mua "${matchPurchased.title}"`
    : `Vì bạn đã xem "${matchViewed.title}"`;

  return (
    <div className="inline-flex items-center gap-2 bg-accent-sky/10 border border-accent-sky/30 px-4 py-2">
      <Star size={12} className="text-accent-sky" />
      <span className="font-display text-xs tracking-wide text-accent-sky">{reason}</span>
    </div>
  );
}

export default function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, addViewedGame, purchasedGameIds, viewedGameIds } = useCart();

  const game = getGameById(id);

  useEffect(() => {
    if (game) {
      addViewedGame(game.id);
    }
  }, [id, game, addViewedGame]);

  if (!game) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 py-32">
        <span className="font-display text-8xl font-bold text-accent-coral/10">404</span>
        <p className="font-display text-xl font-semibold text-text-primary">Không tìm thấy game</p>
        <Link to="/catalog" className="border border-border-default text-text-secondary
                                       hover:border-accent-coral hover:text-accent-coral
                                       font-display text-sm tracking-widest px-5 py-2.5 transition-colors">
          ← QUAY LẠI CATALOG
        </Link>
      </main>
    );
  }

  const inCart       = isInCart(game.id);
  const isPurchased  = purchasedGameIds.includes(game.id);
  const isViewed     = viewedGameIds.includes(game.id);
  const similarGames = getSimilarGames(game, 4);

  const barcodeId = `SYS-REG/0${game.id}-B`;

  return (
    <main className="flex-1 bg-deep relative">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      {/* Hero banner */}
      <div className="relative h-72 lg:h-[450px] overflow-hidden border-b border-border-default/80 scanline-overlay">
        <img
          src={game.bannerUrl || game.coverUrl}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent z-10" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-bg-deep/75 backdrop-blur-sm z-20
                     border border-border-default/80 text-text-secondary hover:text-text-primary
                     hover:border-accent-coral hover:shadow-[0_0_10px_rgba(255,107,74,0.3)] font-display text-[10px] tracking-widest px-4 py-2 transition-all cursor-pointer"
        >
          <ArrowLeft size={12} />
          QUAY LẠI
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">

          {/* Cover + Add to cart */}
          <div className="animate-fade-up">
            <div className="aspect-[3/4] overflow-hidden border border-border-default/80 bg-bg-elevated -mt-24 relative z-10 shadow-2xl">
              <img
                src={game.coverUrl}
                alt={game.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/280x373/1E2F42/4A6180?text=${encodeURIComponent(game.title)}`;
                }}
              />
              {/* Status badge */}
              {(isPurchased || isViewed) && (
                <div className={`absolute top-3 right-3 font-display text-[9px] tracking-widest
                                  font-bold px-2 py-1 shadow-md
                                  ${isPurchased ? 'bg-status-success text-bg-deep' : 'bg-accent-sky/20 border border-accent-sky text-accent-sky'}`}>
                  {isPurchased ? 'ĐÃ SỞ HỮU' : 'ĐÃ XEM'}
                </div>
              )}
            </div>

            {/* Pricing + CTA */}
            <div className="mt-4 border border-border-default bg-bg-surface p-4">
              <div className="flex items-end gap-3 mb-4">
                {game.originalPrice && (
                  <span className="font-display text-xs text-text-dim line-through">
                    {game.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                )}
                <span className="font-display text-2xl font-black text-accent-amber [text-shadow:0_0_8px_rgba(255,184,48,0.15)]">
                  {game.price.toLocaleString('vi-VN')}₫
                </span>
                {game.discountPercent && (
                  <span className="bg-accent-coral text-bg-deep font-display font-bold text-xs px-2 py-0.5 shadow-[0_2px_6px_rgba(255,107,74,0.3)]">
                    -{game.discountPercent}%
                  </span>
                )}
              </div>

              {isPurchased ? (
                <div className="w-full py-3 bg-status-success/10 border border-status-success
                                text-status-success font-display text-xs font-bold tracking-widest text-center">
                  ✓ BẠN ĐÃ SỞ HỮU GAME NÀY
                </div>
              ) : (
                <button
                  onClick={() => addToCart(game)}
                  disabled={!game.inStock || inCart}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 cursor-pointer
                              font-display font-bold text-xs tracking-widest transition-all duration-300
                              ${inCart
                                ? 'bg-status-success text-bg-deep cursor-default'
                                : !game.inStock
                                  ? 'bg-bg-elevated text-text-dim cursor-not-allowed border border-border-default'
                                  : 'bg-accent-coral text-bg-deep hover:bg-accent-amber hover:shadow-[0_0_15px_rgba(255,107,74,0.3)]'
                              }`}
                >
                  {inCart
                    ? <><Check size={14} /> ĐÃ THÊM VÀO GIỎ</>
                    : !game.inStock
                      ? 'HẾT HÀNG'
                      : <><ShoppingCart size={14} /> THÊM VÀO GIỎ HÀNG</>
                  }
                </button>
              )}
            </div>
          </div>

          {/* Info panel */}
          <div className="animate-fade-up animate-delay-1 flex flex-col gap-6">
            <div>
              {/* Badges row */}
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genre.map(g => (
                  <span key={g} className="font-display text-[10px] tracking-wider border border-accent-coral/40
                                            text-accent-coral bg-accent-coral/5 px-2.5 py-1">
                    {g}
                  </span>
                ))}
                {game.isNew && (
                  <span className="font-display text-[10px] tracking-wider bg-accent-amber text-bg-deep
                                    font-bold px-2.5 py-1 shadow-sm">MỚI</span>
                )}
              </div>

              <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
                {game.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-text-secondary pb-4 border-b border-border-default/40">
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="fill-accent-amber text-accent-amber" />
                  <span className="font-display font-bold text-accent-amber">{game.rating}</span>
                  <span className="text-text-dim">/ 10</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={game.rating} size="sm" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-text-dim" />
                  <span>{game.reviewCount.toLocaleString('vi-VN')} đánh giá</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-text-dim" />
                  <span>Năm phát hành: {game.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-text-secondary leading-relaxed text-sm max-w-2xl">
                {game.description}
              </p>
            </div>

            {/* Retro System Specification Terminal */}
            <div>
              <p className="font-display text-xs tracking-widest text-text-dim mb-3 flex items-center gap-2">
                <Terminal size={12} className="text-accent-coral" />
                <span>// CONFIGURATION CONSOLE (CẤU HÌNH HỆ THỐNG)</span>
              </p>
              
              <div className="border border-border-default/80 bg-bg-deep p-5 relative font-mono text-[11px] overflow-hidden scanline-overlay">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
                
                <div className="flex justify-between items-center border-b border-border-default/40 pb-2.5 mb-3 relative z-10">
                  <span className="text-[9px] tracking-widest text-accent-sky font-display font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-sky animate-pulse" />
                    GV-SYSREQUIREMENTS v1.2.0
                  </span>
                  <span className="text-text-dim text-[8px] tracking-widest">{barcodeId}</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 relative z-10">
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; HỆ ĐIỀU HÀNH:</span>
                      <span className="text-text-secondary">Windows 10/11 (64-bit)</span>
                    </div>
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; BỘ VI XỬ LÝ:</span>
                      <span className="text-text-secondary">Intel Core i5-8400 / AMD Ryzen 5 2600</span>
                    </div>
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; BỘ NHỚ RAM:</span>
                      <span className="text-text-secondary">16 GB RAM</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; CARD ĐỒ HỌA:</span>
                      <span className="text-text-secondary">NVIDIA GTX 1060 6GB / AMD RX 580 8GB</span>
                    </div>
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; DUNG LƯỢNG Ổ CỨNG:</span>
                      <span className="text-text-secondary">75 GB trống (Khuyên dùng ổ SSD)</span>
                    </div>
                    <div>
                      <span className="text-accent-coral font-bold mr-1.5">&gt; PHIÊN BẢN DIRECTX:</span>
                      <span className="text-text-secondary">Phiên bản 12 (DirectX 12 API)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <p className="font-display text-xs tracking-widest text-text-dim mb-3">
                <span className="text-accent-sky mr-1.5">//</span>NỀN TẢNG HỖ TRỢ
              </p>
              <div className="flex gap-2 flex-wrap">
                {game.platforms.map(p => (
                  <span key={p} className="flex items-center gap-1.5 border border-accent-sky/30 bg-accent-sky/5
                                           text-accent-sky font-display text-[10px] px-3 py-1.5 tracking-wider font-semibold">
                    <Monitor size={12} />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="font-display text-xs tracking-widest text-text-dim mb-3">
                <span className="text-accent-amber mr-1.5">//</span>NHÃN TÌM KIẾM (TAGS)
              </p>
              <div className="flex gap-2 flex-wrap">
                {game.tags.map(t => (
                  <span key={t} className="border border-border-default/60 text-text-dim bg-bg-surface/30
                                           font-display text-[10px] px-3 py-1.5 tracking-wider
                                           hover:border-accent-coral hover:text-accent-coral hover:bg-bg-surface transition-all cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DotDivider className="py-8" />

      {/* Similar games */}
      {similarGames.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <SectionHeading
              marker="sky"
              label="Tựa Game Tương Tự"
              subtitle="Được gợi ý dựa trên thể loại bạn đang xem."
              className="mb-0"
            />
            <WhyRecommended game={game} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similarGames.map((g, i) => (
              <div key={g.id} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <GameCard game={g} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
