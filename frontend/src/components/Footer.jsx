// Footer.jsx

import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border-default bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 bg-accent-coral flex items-center justify-center">
                <Gamepad2 size={16} className="text-bg-deep" />
              </div>
              <span className="font-display text-xl font-bold text-text-primary">
                Game<span className="text-accent-coral">Vault</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Hệ thống gợi ý game thông minh — khám phá những tựa game phù hợp
              nhất với sở thích của bạn dựa trên lịch sử mua và xem.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-display text-xs tracking-widest text-text-dim mb-4">
              <span className="text-accent-coral mr-2">//</span>KHÁM PHÁ
            </p>
            <ul className="space-y-2.5">
              {[
                { to: '/catalog', label: 'Tất cả game' },
                { to: '/catalog?genre=RPG', label: 'RPG' },
                { to: '/catalog?genre=Action', label: 'Action' },
                { to: '/catalog?genre=Horror', label: 'Horror' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-text-secondary hover:text-accent-coral transition-colors link-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs tracking-widest text-text-dim mb-4">
              <span className="text-accent-amber mr-2">//</span>TÀI KHOẢN
            </p>
            <ul className="space-y-2.5">
              {[
                { to: '/account', label: 'Hồ sơ' },
                { to: '/account?tab=history', label: 'Lịch sử mua' },
                { to: '/account?tab=recommendations', label: 'Gợi ý cho tôi' },
                { to: '/cart', label: 'Giỏ hàng' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-text-secondary hover:text-accent-coral transition-colors link-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-default flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-xs text-text-dim font-display tracking-wide">
            © 2026 GameVault — Internship Project
          </p>
          <div className="flex items-center gap-1.5">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-border-default" />
            ))}
          </div>
          <p className="text-xs text-text-dim font-display tracking-wide">
            VOL.01 / 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
