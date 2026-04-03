import { useEffect, useState } from 'react';
import { Search, X, Flower2 } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Bouquets', 'Gift Hampers', 'Surprise Boxes', 'Custom Arts'];
const CATEGORY_ICONS = { All: '🌸', Bouquets: '💐', 'Gift Hampers': '🎁', 'Surprise Boxes': '🎀', 'Custom Arts': '✨' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((r) => { setProducts(r.data); setFiltered(r.data); })
      .catch(() => setError('Could not load products. Please ensure the backend is running.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (search.trim()) result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [category, search, products]);

  return (
    <div className="pt-20 min-h-screen petal-bg">
      {/* Hero */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-cream py-16 text-center">
        <p className="font-accent text-rose-400 text-2xl mb-2">Handcrafted with love</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-rose-900 mb-3">
          Our Creations
        </h1>
        <p className="text-gray-500 font-body max-w-xl mx-auto">
          Browse our full collection of bouquets, gift hampers, surprise boxes & custom arts — all made personally by Saloni.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mt-8 px-6">
          <Search size={18} className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bouquets, hampers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 pr-10 shadow-md"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold font-body transition-all duration-300 ${
                category === cat
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                  : 'bg-white text-gray-600 border border-rose-200 hover:border-rose-400 hover:text-rose-500'
              }`}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm font-body">
            {loading ? 'Loading...' : `${filtered.length} creation${filtered.length !== 1 ? 's' : ''} found`}
          </p>
          {(category !== 'All' || search) && (
            <button
              onClick={() => { setCategory('All'); setSearch(''); }}
              className="flex items-center gap-1 text-rose-500 text-sm font-semibold hover:text-rose-700 font-body"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-rose-600 font-semibold font-body">{error}</p>
            <p className="text-gray-500 text-sm mt-2 font-body">Run: <code className="bg-gray-100 px-2 py-1 rounded text-xs">uvicorn app.main:app --reload</code></p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse">
                <div className="bg-rose-100 h-52" />
                <div className="p-4 space-y-2">
                  <div className="bg-rose-100 h-4 rounded-full w-3/4" />
                  <div className="bg-rose-50 h-3 rounded-full" />
                  <div className="bg-rose-50 h-3 rounded-full w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24">
            <Flower2 size={48} className="text-rose-200 mx-auto mb-4" />
            <p className="font-display text-2xl text-rose-300 mb-2">No creations found</p>
            <p className="text-gray-400 font-body">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
