// pages/Catalog/index.jsx — Browse all games with filters

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import GameCard from '../../components/GameCard';
import SectionHeading from '../../components/SectionHeading';
import { ALL_GAMES, GENRES, PLATFORMS } from '../../data/mockData';

const SORT_OPTIONS = [
  { value: 'popular',   label: 'Phổ biến nhất' },
  { value: 'rating',    label: 'Đánh giá cao nhất' },
  { value: 'price_asc', label: 'Giá: thấp → cao' },
  { value: 'price_desc',label: 'Giá: cao → thấp' },
  { value: 'newest',    label: 'Mới nhất' },
];

export default function CatalogPage() {
  const [searchParams] = useSearchParams();

  // Filter state
  const [search,   setSearch]   = useState('');
  const [genre,    setGenre]    = useState(searchParams.get('genre') || '');
  const [platform, setPlatform] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sort,     setSort]     = useState('popular');
  const [sideOpen, setSideOpen] = useState(false);

  // Filtered + sorted games
  const games = useMemo(() => {
    let list = [...ALL_GAMES];

    if (search.trim())
      list = list.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));
    if (genre)
      list = list.filter(g => g.genre.includes(genre));
    if (platform)
      list = list.filter(g => g.platforms.includes(platform));
    list = list.filter(g => g.price <= maxPrice);

    list.sort((a, b) => {
      if (sort === 'popular')    return b.reviewCount - a.reviewCount;
      if (sort === 'rating')     return b.rating - a.rating;
      if (sort === 'price_asc')  return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'newest')     return b.releaseYear - a.releaseYear;
      return 0;
    });
    return list;
  }, [search, genre, platform, maxPrice, sort]);

  const hasFilters = genre || platform || maxPrice < 2000000;

  const clearFilters = () => {
    setGenre('');
    setPlatform('');
    setMaxPrice(2000000);
    setSearch('');
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
      {/* Header */}
      <SectionHeading
        marker="coral"
        label="Khám Phá Game"
        subtitle={`${games.length} tựa game — tìm kiếm theo thể loại, nền tảng và giá.`}
      />

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            type="text"
            placeholder="Tìm tên game..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-border-default bg-bg-surface pl-10 pr-4 py-2.5
                       text-sm text-text-primary placeholder:text-text-dim
                       focus:border-accent-coral focus:outline-none transition-colors font-body"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-accent-coral">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none border border-border-default bg-bg-surface px-4 py-2.5 pr-10
                       text-sm text-text-primary focus:border-accent-coral focus:outline-none
                       transition-colors cursor-pointer font-body min-w-[200px]"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" />
        </div>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setSideOpen(o => !o)}
          className={`lg:hidden flex items-center gap-2 border px-4 py-2.5 font-display text-sm tracking-wide transition-colors
                       ${sideOpen ? 'border-accent-coral text-accent-coral' : 'border-border-default text-text-secondary'}`}
        >
          <SlidersHorizontal size={16} />
          Bộ lọc {hasFilters && <span className="bg-accent-coral text-bg-deep rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center">!</span>}
        </button>
      </div>

      <div className="flex gap-8">
        {/* ── Sidebar filters ── */}
        <aside className={`${sideOpen ? 'block' : 'hidden'} lg:block w-full lg:w-56 shrink-0`}>
          <div className="border border-border-default bg-bg-surface p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <span className="font-display text-sm font-semibold text-text-primary tracking-wide">Bộ lọc</span>
              {hasFilters && (
                <button onClick={clearFilters}
                  className="text-xs text-accent-coral hover:underline font-display">
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Genre */}
            <div className="mb-6">
              <p className="font-display text-xs tracking-widest text-text-dim mb-3">
                <span className="text-accent-coral mr-1">//</span>THỂ LOẠI
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setGenre('')}
                  className={`text-left text-sm px-2 py-1.5 transition-colors font-body
                               ${genre === '' ? 'text-accent-coral bg-accent-coral/10' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Tất cả
                </button>
                {GENRES.map(g => (
                  <button
                    key={g}
                    onClick={() => setGenre(genre === g ? '' : g)}
                    className={`text-left text-sm px-2 py-1.5 transition-colors font-body
                                 ${genre === g ? 'text-accent-coral bg-accent-coral/10 border-l-2 border-accent-coral' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="mb-6">
              <p className="font-display text-xs tracking-widest text-text-dim mb-3">
                <span className="text-accent-amber mr-1">//</span>NỀN TẢNG
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setPlatform('')}
                  className={`text-left text-sm px-2 py-1.5 transition-colors font-body
                               ${platform === '' ? 'text-accent-coral bg-accent-coral/10' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Tất cả
                </button>
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatform(platform === p ? '' : p)}
                    className={`text-left text-sm px-2 py-1.5 transition-colors font-body
                                 ${platform === p ? 'text-accent-coral bg-accent-coral/10 border-l-2 border-accent-coral' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <p className="font-display text-xs tracking-widest text-text-dim mb-3">
                <span className="text-accent-sky mr-1">//</span>GIÁ TỐI ĐA
              </p>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="font-display text-xs text-text-dim">100K</span>
                <span className="font-display text-xs text-accent-amber font-bold">
                  {maxPrice.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Game grid ── */}
        <div className="flex-1 min-w-0">
          {games.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="font-display text-6xl font-bold text-accent-coral/10 mb-4">?</span>
              <p className="font-display text-lg font-semibold text-text-primary mb-2">Không tìm thấy game</p>
              <p className="text-sm text-text-secondary mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
              <button onClick={clearFilters}
                className="border border-border-default text-text-secondary hover:border-accent-coral
                           hover:text-accent-coral font-display text-sm tracking-widest px-5 py-2.5 transition-colors">
                XÓA BỘ LỌC
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {games.map((game, i) => (
                <div key={game.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
