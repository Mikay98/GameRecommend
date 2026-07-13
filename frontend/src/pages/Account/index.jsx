// pages/Account/index.jsx — User account with history & personalized recommendations

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Eye, User, Clock, ChevronRight } from 'lucide-react';
import {
  MOCK_USER,
  getRecommendations,
  getPurchasedGames,
  getViewedGames,
} from '../../data/mockData';
import { useCart } from '../../hooks/useCart';
import GameCard from '../../components/GameCard';
import SectionHeading from '../../components/SectionHeading';
import DotDivider from '../../components/DotDivider';

const TABS = [
  { id: 'recommendations', label: 'Gợi ý cho tôi', icon: Sparkles },
  { id: 'history',         label: 'Lịch sử mua',   icon: ShoppingBag },
  { id: 'viewed',          label: 'Đã xem',         icon: Eye },
];

// ─── Recommendation explanation banner ───────────────────────
function RecommendBanner() {
  const { purchaseHistory } = useCart();
  const purchased = useMemo(() => getPurchasedGames(purchaseHistory), [purchaseHistory]);
  const genres = useMemo(() => [...new Set(purchased.flatMap(g => g.genre))], [purchased]);

  return (
    <div className="border border-accent-coral/30 bg-accent-coral/5 p-5 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-accent-coral/10 border border-accent-coral/40
                        flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-accent-coral" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-text-primary mb-1">
            Cách chúng tôi gợi ý game cho bạn
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Dựa trên{' '}
            <span className="text-accent-coral font-semibold">{purchased.length} game đã mua</span>
            {' '}và lịch sử xem của bạn, hệ thống phân tích sở thích theo thể loại{' '}
            <span className="text-accent-amber font-semibold">{genres.join(', ')}</span>{' '}
            để gợi ý những tựa game phù hợp nhất.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Purchase history card ─────────────────────────────────────
function PurchaseCard({ game }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className="flex gap-4 border border-border-default bg-bg-surface p-4
                 hover:border-accent-coral hover:bg-bg-elevated transition-all duration-200 group"
    >
      <div className="w-14 h-20 overflow-hidden border border-border-default bg-bg-elevated shrink-0">
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-text-primary
                         group-hover:text-accent-coral transition-colors truncate">
            {game.title}
          </h3>
          <span className="font-display text-xs text-status-success shrink-0 border border-status-success/30 px-2 py-0.5">
            ĐÃ MUA
          </span>
        </div>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          {game.genre.map(g => (
            <span key={g} className="text-[10px] font-display text-text-dim tracking-wide">{g}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-sm font-bold text-accent-amber">
            {game.pricePaid?.toLocaleString('vi-VN')}₫
          </span>
          <div className="flex items-center gap-1 text-xs text-text-dim">
            <Clock size={11} />
            {new Date(game.purchasedAt).toLocaleDateString('vi-VN')}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Viewed history card ──────────────────────────────────────
function ViewedCard({ game }) {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const diff = Date.now() - new Date(game.viewedAt);
      const hours = Math.floor(diff / 3600000);
      const mins  = Math.floor(diff / 60000);
      if (hours > 24) setRelativeTime(`${Math.floor(hours / 24)} ngày trước`);
      else if (hours > 0)  setRelativeTime(`${hours} giờ trước`);
      else setRelativeTime(`${mins} phút trước`);
    }, 0);
    return () => clearTimeout(timer);
  }, [game.viewedAt]);

  return (
    <Link
      to={`/game/${game.id}`}
      className="flex gap-4 border border-border-default bg-bg-surface p-4
                 hover:border-accent-coral hover:bg-bg-elevated transition-all duration-200 group"
    >
      <div className="w-14 h-20 overflow-hidden border border-border-default bg-bg-elevated shrink-0">
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base font-semibold text-text-primary
                       group-hover:text-accent-coral transition-colors truncate">
          {game.title}
        </h3>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          {game.genre.map(g => (
            <span key={g} className="text-[10px] font-display text-text-dim tracking-wide">{g}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-lg font-bold text-accent-amber">
            {game.price.toLocaleString('vi-VN')}₫
          </span>
          <div className="flex items-center gap-1 text-xs text-text-dim">
            <Eye size={11} />
            {relativeTime}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'recommendations'
  );

  const { purchasedGameIds, viewedGameIds, purchaseHistory, viewHistory } = useCart();

  const purchased = useMemo(() => {
    return getPurchasedGames(purchaseHistory);
  }, [purchaseHistory]);

  const viewed = useMemo(() => {
    return getViewedGames(viewHistory);
  }, [viewHistory]);

  const recommendedGames = useMemo(() => {
    return getRecommendations(purchasedGameIds, viewedGameIds, 8);
  }, [purchasedGameIds, viewedGameIds]);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">

      {/* Profile header */}
      <div className="flex items-center gap-6 mb-10 animate-fade-up">
        <div className="w-16 h-16 bg-accent-coral/10 border border-accent-coral/40
                        flex items-center justify-center">
          <User size={24} className="text-accent-coral" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary tracking-tight">
            {MOCK_USER.name}
          </h1>
          <p className="text-text-secondary text-sm mt-0.5">{MOCK_USER.email}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-display text-xs tracking-wide text-text-dim">
              <span className="text-accent-amber font-bold">{purchasedGameIds.length}</span> game đã mua
            </span>
            <span className="font-display text-xs tracking-wide text-text-dim">
              <span className="text-accent-sky font-bold">{recommendedGames.length}</span> gợi ý mới
            </span>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex border-b border-border-default mb-8 animate-fade-up animate-delay-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3 font-display text-sm tracking-wide
                        border-b-2 transition-colors duration-200 -mb-px
                        ${activeTab === id
                          ? 'border-accent-coral text-accent-coral'
                          : 'border-transparent text-text-secondary hover:text-text-primary'
                        }`}
          >
            <Icon size={15} />
            {label}
            {id === 'history' && (
              <span className="bg-bg-elevated border border-border-default text-text-dim
                               font-display text-[10px] rounded-full w-5 h-5
                               flex items-center justify-center">
                {purchased.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab: Recommendations ── */}
      {activeTab === 'recommendations' && (
        <div className="animate-fade-up">
          <RecommendBanner />
          <SectionHeading
            marker="coral"
            label="Gợi ý dành riêng cho bạn"
            subtitle={`${recommendedGames.length} tựa game được chọn lọc từ sở thích của bạn.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendedGames.map((game, i) => (
              <div key={game.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Purchase history ── */}
      {activeTab === 'history' && (
        <div className="animate-fade-up">
          <SectionHeading
            marker="amber"
            label="Lịch sử mua hàng"
            subtitle={`Bạn đã mua ${purchased.length} game — đây là cơ sở để chúng tôi gợi ý cho bạn.`}
          />

          {purchased.length === 0 ? (
            <div className="flex flex-col items-center py-24 gap-4 text-center">
              <ShoppingBag size={48} className="text-text-dim" />
              <p className="font-display text-lg text-text-primary">Chưa có lịch sử mua hàng</p>
              <Link to="/catalog"
                className="border border-border-default text-text-secondary hover:border-accent-coral
                           hover:text-accent-coral font-display text-sm tracking-widest px-5 py-2.5 transition-colors">
                KHÁM PHÁ GAME <ChevronRight size={14} className="inline" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {purchased.map(g => <PurchaseCard key={g.id} game={g} />)}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Viewed history ── */}
      {activeTab === 'viewed' && (
        <div className="animate-fade-up">
          <SectionHeading
            marker="sky"
            label="Đã xem gần đây"
            subtitle="Lịch sử xem giúp hệ thống hiểu thêm sở thích của bạn."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {viewed.map(g => <ViewedCard key={g.id} game={g} />)}
          </div>

          <DotDivider className="py-8" />

          {/* Recommendation nudge */}
          <div className="border border-accent-coral/30 bg-accent-coral/5 p-6 flex flex-col sm:flex-row
                          items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-semibold text-text-primary mb-1">
                Muốn xem gợi ý cá nhân?
              </p>
              <p className="text-sm text-text-secondary">
                Hệ thống đã phân tích lịch sử xem của bạn và sẵn sàng gợi ý.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="shrink-0 bg-accent-coral text-bg-deep font-display font-bold
                         text-xs tracking-widest px-5 py-2.5 hover:bg-accent-amber transition-colors whitespace-nowrap"
            >
              XEM GỢI Ý <ChevronRight size={14} className="inline" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
