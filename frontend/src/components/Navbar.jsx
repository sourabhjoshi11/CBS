import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Our Creations' },
  { to: '/order', label: 'Order Now' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md shadow-rose-100/60 py-2'
          : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 flex items-center justify-center shadow-md group-hover:shadow-rose-300 transition-shadow duration-300 overflow-hidden border-2 border-rose-200">
              {/* Cute girl silhouette */}
              <span className="text-2xl select-none">🎀</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="leading-tight">
            <p className="font-accent text-xl text-rose-600 leading-none tracking-wide">
              Creations
            </p>
            <p className="font-display text-xs font-bold text-rose-900 tracking-[0.2em] uppercase">
              by Saloni
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold font-body transition-all duration-300 ${
                  active
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50/60'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/order"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-bold font-body shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <ShoppingBag size={15} />
            Order Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-rose-100 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold font-body transition-all duration-200 ${
                  active ? 'text-rose-600 bg-rose-50' : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50/60'
                }`}
              >
                {active && <Sparkles size={14} className="text-rose-400" />}
                {label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/order"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 rounded-xl text-sm font-bold font-body"
            >
              <ShoppingBag size={15} />
              Place Your Order
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
