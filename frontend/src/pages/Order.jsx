import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Calendar, User, Phone, MessageCircle, Gift } from 'lucide-react';
import { createOrder, getProducts } from '../services/api';

const OCCASIONS = ['Birthday 🎂', 'Anniversary 💑', 'Wedding 💍', 'Diwali 🪔', 'Holi 🎨', 'Christmas 🎄', 'Valentines Day 💖', 'Baby Shower 👶', 'Graduation 🎓', 'Just Because 🌸', 'Other'];

const INITIAL = { name: '', phone: '', occasion: '', product: '', message: '', delivery_date: '' };

export default function Order() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ ...INITIAL, product: searchParams.get('product') || '' });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getProducts().then((r) => setProducts(r.data)).catch(console.error);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (!form.occasion) e.occasion = 'Please select an occasion';
    if (!form.product.trim()) e.product = 'Please select a product';
    if (!form.delivery_date) e.delivery_date = 'Delivery date is required';
    else {
      const selectedDate = new Date(form.delivery_date);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) e.delivery_date = 'Delivery date cannot be in the past';
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    try {
      const res = await createOrder(form);
      setSuccess(res.data);
      setForm(INITIAL);
    } catch (err) {
      setErrors({ submit: err.response?.data?.detail || 'Failed to submit. Please try again or WhatsApp us.' });
    } finally {
      setLoading(false);
    }
  };

  const field = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const today = new Date().toISOString().split('T')[0];

  if (success) return (
    <div className="pt-20 min-h-screen petal-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-10 shadow-2xl shadow-rose-100">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bloom">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="font-display text-3xl font-bold text-rose-900 mb-2">
          Order Placed! 🎉
        </h2>
        <p className="font-accent text-rose-400 text-xl mb-4">
          Thank you, {success.name}!
        </p>
        <div className="bg-rose-50 rounded-2xl p-4 text-left mb-6 space-y-2">
          <p className="text-sm font-body text-gray-600">
            <span className="font-semibold text-rose-700">Order ID:</span> #
            {success.id}
          </p>
          <p className="text-sm font-body text-gray-600">
            <span className="font-semibold text-rose-700">Product:</span>{" "}
            {success.product}
          </p>
          <p className="text-sm font-body text-gray-600">
            <span className="font-semibold text-rose-700">Occasion:</span>{" "}
            {success.occasion}
          </p>
          <p className="text-sm font-body text-gray-600">
            <span className="font-semibold text-rose-700">Delivery:</span>{" "}
            {new Date(success.delivery_date).toLocaleDateString("en-IN", {
              dateStyle: "long",
            })}
          </p>
        </div>
        <p className="text-gray-500 text-sm font-body mb-6">
          Saloni will contact you soon on <strong>{success.phone}</strong> to
          confirm your order! 💖
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/+918770571002?text=Hi%20Saloni!%20I%20just%20placed%20Order%20%23${success.id}%20for%20${encodeURIComponent(success.product)}%20🌸`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold font-body hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={18} /> Confirm via WhatsApp
          </a>
          <Link to="/products" className="btn-outline text-sm py-2.5">
            Browse More Creations
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen petal-bg">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-accent text-rose-400 text-2xl mb-2">
            Let's create something special
          </p>
          <h1 className="section-title">Place Your Order 🌸</h1>
          <p className="text-gray-500 font-body mt-2">
            Fill in your details and Saloni will craft the perfect creation for
            you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-50 space-y-6"
        >
          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label">
                <User size={13} className="inline mr-1" />
                Your Name *
              </label>
              <input
                className={`input-field ${errors.name ? "border-red-300 ring-red-200" : ""}`}
                placeholder="e.g. Saloni"
                value={form.name}
                onChange={(e) => field("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-body">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <Phone size={13} className="inline mr-1" />
                Phone Number *
              </label>
              <input
                className={`input-field ${errors.phone ? "border-red-300 ring-red-200" : ""}`}
                placeholder="10-digit mobile"
                value={form.phone}
                type="tel"
                onChange={(e) => field("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 font-body">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="label">🎉 Occasion *</label>
            <select
              className={`input-field ${errors.occasion ? "border-red-300 ring-red-200" : ""}`}
              value={form.occasion}
              onChange={(e) => field("occasion", e.target.value)}
            >
              <option value="">Select your occasion</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {errors.occasion && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.occasion}
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <label className="label">
              <Gift size={13} className="inline mr-1" />
              Product / Creation *
            </label>
            <select
              className={`input-field ${errors.product ? "border-red-300 ring-red-200" : ""}`}
              value={form.product}
              onChange={(e) => field("product", e.target.value)}
            >
              <option value="">Select a product or type custom below</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.category})
                </option>
              ))}
              <option value="Custom Order">
                Custom Order (Describe below)
              </option>
            </select>
            {form.product === "" && (
              <input
                className="input-field mt-2"
                placeholder="Or type product name..."
                onChange={(e) => field("product", e.target.value)}
              />
            )}
            {errors.product && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.product}
              </p>
            )}
          </div>

          {/* Delivery Date */}
          <div>
            <label className="label"><Calendar size={13} className="inline mr-1" />Delivery Date *</label>
            <input type="date" min={today} className={`input-field ${errors.delivery_date ? 'border-red-300 ring-red-200' : ''}`}
              value={form.delivery_date} onChange={(e) => field('delivery_date', e.target.value)} />
            {errors.delivery_date && <p className="text-red-500 text-xs mt-1 font-body">{errors.delivery_date}</p>}
          </div>

          {/* Custom Message */}
          <div>
            <label className="label">💌 Custom Message / Instructions</label>
            <textarea
              rows={4}
              className="input-field resize-none"
              placeholder="e.g. Please include a card saying 'Happy Birthday Riya! Love, Maa' 🌸"
              value={form.message}
              onChange={(e) => field("message", e.target.value)}
            />
            <p className="text-gray-400 text-xs mt-1 font-body">
              Tell Saloni any colour preferences, names, special requests, etc.
            </p>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm font-body">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                Placing Order...
              </>
            ) : (
              <>
                <ShoppingBag size={18} /> Place My Order 🌸
              </>
            )}
          </button>

          <p className="text-center text-gray-400 text-xs font-body">
            Prefer WhatsApp?{" "}
            <a
              href="https://wa.me/+918770571002"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              Chat with Saloni directly
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
