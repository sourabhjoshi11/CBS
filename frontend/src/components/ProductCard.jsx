import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Star, Heart } from "lucide-react";

const CATEGORY_EMOJIS = {
  "Bouquets": "💐",
  "Gift Hampers": "🎁",
  "Surprise Boxes": "🎀",
  "Custom Arts": "✨",
};

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImg = `https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=900&auto=format&fit=crop`;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-rose-100 transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-rose-50">
        <img
          src={imgError ? fallbackImg : product.image_url || fallbackImg}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full font-body shadow-sm">
            {CATEGORY_EMOJIS[product.category] || "🌸"} {product.category}
          </span>
        </div>

        {product.is_featured === 1 && (
          <div className="absolute top-3 right-12">
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full font-body flex items-center gap-1">
              <Star size={10} className="fill-white" /> Featured
            </span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={liked ? "fill-rose-500 text-rose-500" : "text-gray-400"}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link
            to={`/order?product=${encodeURIComponent(product.name)}`}
            className="flex items-center justify-center gap-2 w-full bg-white text-rose-600 font-bold text-sm py-2.5 rounded-xl hover:bg-rose-50 transition-colors font-body"
          >
            <ShoppingBag size={14} />
            Order This
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-gray-900 font-semibold text-lg leading-tight mb-1 group-hover:text-rose-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm font-body leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex justify-end">
          <Link
            to={`/order?product=${encodeURIComponent(product.name)}`}
            className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 font-body"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
