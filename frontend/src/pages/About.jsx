import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MILESTONES = [
  { year: 'July 2025', event: 'Creations by Saloni was founded with a dream and a single bouquet.' },
  { year: 'December 2025', event: 'First 250 orders delivered - all 5-star rated by happy customers.' },
  { year: 'January 2026', event: 'Expanded to custom decorative items and surprise boxes.' },
  { year: 'March 2026', event: 'Crossed 500+ happy customers.' },
  { year: 'April 2026', event: 'Launched online ordering and custom hamper collections.' },
];

const VALUES = [
  { icon: '\u{1F496}', title: 'Made with Heart', desc: 'Every arrangement is personal. We pour love into every petal, ribbon, and bow.' },
  { icon: '\u{1F33F}', title: 'Fresh Quality', desc: 'Only premium, fresh materials sourced carefully for every creation.' },
  { icon: '\u{2728}', title: 'Your Vision', desc: 'We listen to your ideas and bring your dream gift to life, exactly as you imagine.' },
  { icon: '\u{1F91D}', title: 'Trust & Care', desc: 'Hundreds of happy customers who come back again and again - that\'s our promise.' },
];

export default function About() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-cream py-20 text-center petal-bg">
        <p className="font-accent text-rose-400 text-2xl mb-2">The story behind</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-rose-900 mb-4">Creations by Saloni</h1>
        <p className="font-accent text-rose-500 text-2xl">@creationsby_saloni {'\u{2728}'}</p>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 flex items-center justify-center shadow-2xl shadow-rose-100 overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300 flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white">
                    <span className="text-7xl">{'\u{1F380}'}</span>
                  </div>
                  <p className="font-accent text-rose-600 text-3xl">Creations</p>
                  <p className="font-display text-xl font-bold text-rose-900 tracking-widest uppercase">by Saloni</p>
                  <p className="font-accent text-rose-400 mt-2 text-lg">Handmade with love {'\u{2728}'}</p>
                  <div className="flex justify-center gap-2 mt-3 text-2xl">
                    {'\u{1F338}\u{1F33A}\u{1F339}'}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-200 rounded-full opacity-60 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-200 rounded-full opacity-60 blur-xl" />
            </div>

            <div className="space-y-5">
              <div>
                <p className="font-accent text-rose-400 text-xl mb-1">Hello, I&apos;m</p>
                <h2 className="font-display text-4xl font-bold text-rose-900">Saloni {'\u{1F338}'}</h2>
              </div>
              <p className="text-gray-600 font-body leading-relaxed">
                Welcome to <strong className="text-rose-600">Creations by Saloni</strong> - a passion project born from a deep love for flowers, gifting, and the joy of making people smile.
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                Every bouquet I craft, every hamper I assemble, every decoration I design - it&apos;s all done with genuine love and intention. I believe that the right gift at the right moment can create a memory that lasts a lifetime.
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                Whether it&apos;s your partner&apos;s anniversary, your best friend&apos;s birthday, or a festive celebration - I&apos;m here to make it magical. No two creations are ever the same. {'\u{2728}'}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-rose-600">500+</p>
                  <p className="text-xs text-gray-500 font-body">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-rose-600">700+</p>
                  <p className="text-xs text-gray-500 font-body">Orders Delivered</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-rose-600">5{'\u2605'}</p>
                  <p className="text-xs text-gray-500 font-body">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 petal-bg">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-rose-50 border border-rose-100">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-4">
                <Heart size={22} className="text-rose-500 fill-rose-200" />
              </div>
              <h3 className="font-display text-2xl font-bold text-rose-900 mb-3">Our Mission {'\u{1F496}'}</h3>
              <p className="text-gray-600 font-body leading-relaxed">
                To bring joy, warmth, and love through beautifully handcrafted gifts and floral arrangements - making every occasion unforgettable for our customers and their loved ones.
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white shadow-lg shadow-rose-200">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles size={22} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Our Vision {'\u{2728}'}</h3>
              <p className="text-rose-100 font-body leading-relaxed">
                To be India&apos;s most loved handmade gift brand - where every creation tells a unique story, and every customer feels truly special, cared for, and cherished.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="section-title mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-3xl bg-rose-50 border border-rose-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-3">{icon}</div>
                <h4 className="font-display font-semibold text-rose-900 mb-2">{title}</h4>
                <p className="text-gray-500 text-sm font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 petal-bg">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title text-center mb-10">Our Journey {'\u{1F331}'}</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-rose-200" />
            {MILESTONES.map(({ year, event }) => (
              <div key={year} className="relative flex gap-6 mb-8 pl-14">
                <div className="absolute left-3 top-1 w-6 h-6 rounded-full bg-rose-500 border-4 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 flex-1">
                  <span className="font-display font-bold text-rose-500 text-sm">{year}</span>
                  <p className="text-gray-700 text-sm font-body mt-1">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-rose-900 to-pink-900 text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-accent text-rose-300 text-2xl mb-2">Ready to create a memory?</p>
          <h2 className="font-display text-3xl font-bold mb-4">Order Your Custom Creation</h2>
          <p className="text-rose-200 font-body mb-6">Let Saloni handcraft something magical just for you and your loved ones. {'\u{1F338}'}</p>
          <Link to="/order" className="inline-flex items-center gap-2 bg-white text-rose-600 font-bold px-8 py-3 rounded-full hover:bg-rose-50 transition-all hover:-translate-y-0.5 shadow-xl">
            <Flower2 size={18} /> Place Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
