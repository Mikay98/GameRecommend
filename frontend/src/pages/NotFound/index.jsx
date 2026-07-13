// pages/NotFound/index.jsx — 404 page

import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
      <span className="font-display text-[160px] lg:text-[200px] font-bold text-accent-coral/10
                       leading-none select-none animate-fade-up">
        404
      </span>
      <h1 className="font-display text-3xl font-bold text-text-primary -mt-8 mb-4 animate-fade-up animate-delay-1">
        Trang không tồn tại
      </h1>
      <p className="text-text-secondary max-w-sm mb-8 animate-fade-up animate-delay-2">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <div className="flex gap-4 animate-fade-up animate-delay-3">
        <Link to="/"
          className="bg-accent-coral text-bg-deep font-display font-bold text-sm tracking-widest
                     px-6 py-3 hover:bg-accent-amber transition-colors">
          VỀ TRANG CHỦ
        </Link>
        <Link to="/catalog"
          className="border border-border-default text-text-secondary hover:border-accent-coral
                     hover:text-accent-coral font-display text-sm tracking-widest px-6 py-3 transition-colors">
          KHÁM PHÁ GAME
        </Link>
      </div>
    </main>
  );
}
