import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Star,
  Heart,
  Gift,
  Flower2,
  Truck,
} from "lucide-react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const OCCASIONS = [
  { icon: "🎂", label: "Birthdays" },
  { icon: "💑", label: "Anniversaries" },
  { icon: "💍", label: "Weddings" },
  { icon: "🎉", label: "Festivals" },
  { icon: "🎁", label: "Surprises" },
  { icon: "🌸", label: "Just Because" },
];

const FEATURES = [
  {
    icon: <Heart size={22} className="text-rose-500" />,
    title: "Handmade with Love",
    desc: "Every piece is crafted personally by Saloni with care and passion.",
  },
  {
    icon: <Flower2 size={22} className="text-rose-500" />,
    title: "Fresh & Premium",
    desc: "Only the freshest flowers and highest quality materials.",
  },
  {
    icon: <Sparkles size={22} className="text-rose-500" />,
    title: "100% Customized",
    desc: "Tailored to your occasion, taste, and budget - no two orders are alike.",
  },
  {
    icon: <Truck size={22} className="text-rose-500" />,
    title: "Delivered to You",
    desc: "On-time delivery to your doorstep with beautiful packaging.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priyanka Sharma",
    text: "The anniversary gift was absolutely magical! Saloni exceeded every expectation.",
    rating: 5,
    occasion: "Anniversary",
  },
  {
    name: "Sneha Patel",
    text: "The birthday bouquet was beyond beautiful. Got so many compliments from guests!",
    rating: 5,
    occasion: "Birthday",
  },
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    getProducts({ featured: true })
      .then((r) => {
        const data = r?.data || [];
        setFeatured(data.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
        setFeatured([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center petal-bg pt-20 overflow-hidden">
        {["💐", "🌸", "🌺", "🌹", "✨", "💖"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20 animate-float pointer-events-none"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {emoji}
          </div>
        ))}

        <div className="max-w-5xl mx-auto px-6 text-center z-10">
          {/* CLICKABLE BRAND NAME */}
          <Link to="/" className="inline-block">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-rose-900 hover:text-rose-600 transition">
              Creations
            </h1>
            <h2 className="font-accent text-4xl md:text-6xl text-rose-500 hover:text-rose-400 transition">
              by Saloni
            </h2>
          </Link>

          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Making every occasion special with handcrafted bouquets,
            personalised gift hampers & decorations 💖
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link to="/order" className="btn-primary flex items-center gap-2">
              <Gift size={18} /> Place Order <ArrowRight size={16} />
            </Link>

            <Link
              to="/products"
              className="btn-outline flex items-center gap-2"
            >
              <Flower2 size={18} /> Explore
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Creations
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id || p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Place Your Custom Order</h2>

        <a
          href="https://wa.me/918770571002?text=Hi%20Saloni!%20I%20want%20to%20place%20a%20custom%20order%20🌸"
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 text-white px-8 py-3 rounded-full"
        >
          💬 WhatsApp Us
        </a>
      </section>
    </div>
  );
}
