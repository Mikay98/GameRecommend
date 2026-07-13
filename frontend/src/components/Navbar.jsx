// Navbar.jsx — sticky glassmorphic header with neon accent line and animations

import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Gamepad2, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

const NAV_LINKS = [
  { to: '/',        label: 'Trang Chủ' },
  { to: '/catalog', label: 'Khám Phá' },
  { to: '/account', label: 'Tài Khoản' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-default/80 bg-bg-deep/75 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)] relative">
      {/* Neon LED Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-coral/60 to-transparent shadow-[0_1px_5px_rgba(255,107,74,0.4)]" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-accent-coral flex items-center justify-center
                          transition-all duration-500 group-hover:rotate-12 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(255,107,74,0.6)]">
            <Gamepad2 size={16} className="text-bg-deep" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">
            Game<span className="text-accent-coral transition-colors group-hover:text-accent-amber">Vault</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-display text-sm tracking-widest transition-all duration-200 link-underline py-1
                 ${isActive 
                   ? 'text-accent-coral font-semibold [text-shadow:0_0_8px_rgba(255,107,74,0.3)]' 
                   : 'text-text-secondary hover:text-text-primary'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right: cart + account */}
        <div className="flex items-center gap-4">
          <Link to="/account"
            className="hidden md:flex items-center gap-2 text-xs text-text-secondary
                       hover:text-text-primary hover:border-accent-coral/60 transition-all border border-border-default/60 bg-bg-surface/40 px-3 py-1.5 font-display tracking-widest">
            <User size={12} className="text-accent-sky" />
            Minh Khôi
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:text-accent-coral transition-colors text-text-secondary flex items-center justify-center border border-transparent hover:border-border-default hover:bg-bg-surface/30">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-coral text-bg-deep
                               text-[9px] font-bold rounded-full w-4 h-4
                               flex items-center justify-center animate-bounce-once border border-bg-deep shadow-[0_0_6px_rgba(255,107,74,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors border border-border-default/40"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border-default/80 bg-bg-surface/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-xl">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-display text-sm tracking-widest py-1 border-b border-border-default/20
                 ${isActive ? 'text-accent-coral font-bold' : 'text-text-secondary'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/account" onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-sm text-text-primary font-display py-2 border-b border-border-default/20">
            <User size={14} className="text-accent-sky" />
            Minh Khôi
          </Link>
        </nav>
      )}
    </header>
  );
}
