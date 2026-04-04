import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Heart, Gift, Flower2, Truck } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const OCCASIONS = [
  { icon: '\u{1F382}', label: 'Birthdays' },
  { icon: '\u{1F491}', label: 'Anniversaries' },
  { icon: '\u{1F48D}', label: 'Weddings' },
  { icon: '\u{1F389}', label: 'Festivals' },
  { icon: '\u{1F381}', label: 'Surprises' },
  { icon: '\u{1F338}', label: 'Just Because' },
];

const FEATURES = [
  { icon: <Heart size={22} className="text-rose-500" />, title: 'Handmade with Love', desc: 'Every piece is crafted personally by Saloni with care and passion.' },
  { icon: <Flower2 size={22} className="text-rose-500" />, title: 'Fresh & Premium', desc: 'Only the freshest flowers and highest quality materials.' },
  { icon: <Sparkles size={22} className="text-rose-500" />, title: '100% Customized', desc: 'Tailored to your occasion, taste, and budget - no two orders are alike.' },
  { icon: <Truck size={22} className="text-rose-500" />, title: 'Delivered to You', desc: 'On-time delivery to your doorstep with beautiful packaging.' },
];

const TESTIMONIALS = [
  { name: 'Priyanka Sharma', text: 'The anniversary gift was absolutely magical! Saloni exceeded every expectation.', rating: 5, occasion: 'Anniversary' },
  
  { name: 'Sneha Patel', text: 'The birthday bouquet was beyond beautiful. Got so many compliments from guests!', rating: 5, occasion: 'Birthday' },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  useScrollAnimation();

  useEffect(() => {
    getProducts({ featured: true })
      .then((r) => setFeatured(r.data.slice(0, 6)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center petal-bg pt-20 overflow-hidden">
        {/* Floating petals */}
        {[
          "\u{1F490}",
          "\u{1F338}",
          "\u{1F33A}",
          "\u{1F339}",
          "\u{2728}",
          "\u{1F496}",
        ].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20 animate-float pointer-events-none select-none"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.4}s`,
              fontSize: `${1.5 + (i % 3) * 0.5}rem`,
            }}
          >
            {emoji}
          </div>
        ))}

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <a href="https://www.instagram.com/creationsby_saloni" target="_blank" rel="noopener noreferrer">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-full px-4 py-2 mb-8 shadow-sm animate-fade-in max-w-full">
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <span className="text-rose-600 text-sm font-semibold font-body">
                @creationsby_saloni
              </span>
              <span className="hidden sm:inline text-gray-400 text-sm font-body">
                Handmade with love
              </span>
            </div>
          </a>

          {/* Cursive tagline */}
          <p
            className="font-accent text-rose-400 text-2xl sm:text-3xl md:text-4xl mb-3 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Welcome to
          </p>

          {/* Main title */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-rose-900 leading-none mb-2 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            Creations
          </h1>
          <h2
            className="font-accent text-3xl sm:text-4xl md:text-6xl text-rose-500 mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            by Saloni
          </h2>

          <p
            className="font-body text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            Making every occasion special with handcrafted bouquets,
            personalised gift hampers & beautiful decorations. {'\u{1F496}'}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <Link
              to="/order"
              className="btn-primary inline-flex items-center gap-2 justify-center text-base"
            >
              <Gift size={18} />
              Place Your Order
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              className="btn-outline inline-flex items-center gap-2 justify-center text-base"
            >
              <Flower2 size={18} />
              Explore Creations
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-14 opacity-0 animate-fade-up"
            style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
          >
            {[
              ["500+", "Happy Customers"],
              ["700+", "Orders Delivered"],
              ["100%", "Handmade"],
              ['5\u2605', 'Average Rating'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl font-bold text-rose-700">
                  {val}
                </p>
                <p className="font-body text-xs text-gray-500 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-12 fill-white"
          >
            <path d="M0,40 C400,80 800,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-accent text-rose-400 text-2xl mb-2 animate-on-scroll">
            We celebrate
          </p>
          <h2 className="section-title mb-10 animate-on-scroll">
            Every Special Occasion
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {OCCASIONS.map(({ icon, label }) => (
              <div
                key={label}
                className="animate-on-scroll flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-rose-50 hover:shadow-md transition-all duration-300 cursor-default group"
              >
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                  {icon}
                </span>
                <span className="font-body text-sm font-semibold text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 petal-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-rose-400 text-2xl mb-2 animate-on-scroll">
              Handpicked for you
            </p>
            <h2 className="section-title animate-on-scroll">
              Featured Creations
            </h2>
            <p className="text-gray-500 font-body mt-3 max-w-xl mx-auto animate-on-scroll">
              Each piece is lovingly crafted to bring a smile to your loved
              ones' faces.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl h-80 animate-pulse"
                >
                  <div className="bg-rose-100 h-56 rounded-t-3xl" />
                  <div className="p-4 space-y-2">
                    <div className="bg-rose-100 h-4 rounded-full w-3/4" />
                    <div className="bg-rose-50 h-3 rounded-full w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Creations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-rose-400 text-2xl mb-2 animate-on-scroll">
              Why us?
            </p>
            <h2 className="section-title animate-on-scroll">
              The Saloni Promise {'\u{1F338}'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="animate-on-scroll text-center p-6 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover:shadow-xl hover:shadow-rose-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-display font-semibold text-rose-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm font-body leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-rose-900 to-pink-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-rose-300 text-2xl mb-2">
              What they say
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Happy Customers {'\u{1F495}'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, text, rating, occasion }) => (
              <div
                key={name}
                className="animate-on-scroll bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-rose-100 text-sm font-body leading-relaxed mb-4 italic">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-xs font-bold text-white">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm font-body">
                      {name}
                    </p>
                    <p className="text-rose-300 text-xs font-body">
                      {occasion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 petal-bg">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-accent text-rose-400 text-3xl mb-3 animate-on-scroll">
            Ready to make someone smile?
          </p>
          <h2 className="section-title mb-4 animate-on-scroll">
            Place Your Custom Order Today
          </h2>
          <p className="text-gray-500 font-body mb-8 animate-on-scroll">
            Tell us your occasion, budget & ideas - Saloni will craft something
            magical just for you. {'\u{1F338}'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
            <Link
              to="/order"
              className="btn-primary inline-flex items-center gap-2 justify-center"
            >
              <Sparkles size={18} />
              Order Now
            </Link>
            <a
              href="https://wa.me/+918770571002?text=Hi%20Saloni!%20I%20want%20to%20place%20a%20custom%20order%20%F0%9F%8C%B8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 justify-center bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              {'\u{1F4AC}'} WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

