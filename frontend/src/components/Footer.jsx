import { Link } from 'react-router-dom';
import { Instagram, Heart, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const whatsapp = 'https://wa.me/918770571002?text=Hi%20Saloni!%20I%20would%20like%20to%20place%20an%20order%20%F0%9F%8C%B8';

  return (
    <footer className="bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 text-white">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 fill-cream">
          <path d="M0,40 C300,80 900,0 1200,40 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-2xl shadow-lg">
                🎀
              </div>
              <div>
                <p className="font-accent text-xl text-rose-200">Creations</p>
                <p className="font-display text-xs font-bold tracking-[0.2em] uppercase text-white">by Saloni</p>
              </div>
            </div>
            <p className="font-accent text-rose-300 text-lg italic">Handmade with love ✨</p>
            <p className="text-rose-200 text-sm font-body leading-relaxed">
              Every bouquet, hamper & decoration is crafted with love to make your special moments unforgettable.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com/creationsby_saloni" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-rose-700 hover:bg-rose-500 transition-colors flex items-center justify-center">
                <Instagram size={16} />
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 transition-colors flex items-center justify-center">
                <MessageCircle size={16} />
              </a>
              <a href="mailto:creationbysalonii@gmail.com"
                className="w-9 h-9 rounded-full bg-rose-700 hover:bg-rose-500 transition-colors flex items-center justify-center">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Our Creations' },
                { to: '/order', label: 'Place an Order' },
                { to: '/about', label: 'About Saloni' },
                { to: '/contact', label: 'Contact Us' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-rose-200 hover:text-white transition-colors text-sm font-body flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:bg-rose-200 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-rose-200 text-sm font-body">
                <Phone size={15} className="mt-0.5 text-rose-300 shrink-0" />
                <a href="tel:+918770571002" className="hover:text-white transition-colors">+91 87705 71002</a>
              </li>
              <li className="flex items-start gap-3 text-rose-200 text-sm font-body">
                <Mail size={15} className="mt-0.5 text-rose-300 shrink-0" />
                <a href="mailto:creationbysalonii@gmail.com" className="hover:text-white transition-colors break-all">creationbysalonii@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-rose-200 text-sm font-body">
                <Instagram size={15} className="mt-0.5 text-rose-300 shrink-0" />
                <a href="https://instagram.com/creationsby_saloni" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@creationsby_saloni</a>
              </li>
              <li className="flex items-start gap-3 text-rose-200 text-sm font-body">
                <MapPin size={15} className="mt-0.5 text-rose-300 shrink-0" />
                <a href="https://maps.google.com/?q=Indore" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Indore, Madhya Pradesh</a>
              </li>
            </ul>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5 shadow-lg"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-rose-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-rose-300 text-xs font-body">
            © {new Date().getFullYear()} Creations by Saloni. All rights reserved.
          </p>
          <p className="text-rose-300 text-xs font-body flex items-center gap-1">
            Made with <Heart size={12} className="text-rose-400 fill-rose-400" /> and lots of flowers 🌸
          </p>
        </div>
      </div>
    </footer>
  );
}



