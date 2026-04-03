import { useState } from "react";
import {
  Mail,
  Phone,
  Instagram,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

const FAQS = [
  {
    q: "How do I place a custom order?",
    a: "Go to the Order page, fill in your details and preferences. Saloni will contact you to confirm within 24 hours!",
  },
  {
    q: "How much advance notice do I need?",
    a: "For bouquets: 1-2 days. For hampers/boxes: 2-3 days. For room decorations: 3-5 days in advance.",
  },
  {
    q: "Do you deliver outside the city?",
    a: "Currently delivering locally. For outstation, custom dried flower arrangements and hampers can be shipped.",
  },
  {
    q: "Can I see the creation before delivery?",
    a: "Yes! Saloni sends a preview photo for approval before delivering. Your satisfaction is guaranteed 💖",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const whatsapp =
    "https://wa.me/+918770571002?text=Hi%20Saloni!%20I%20have%20a%20query%20🌸";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-16 text-center petal-bg">
        <p className="font-accent text-rose-400 text-2xl mb-2">
          We'd love to hear from you
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-rose-900 mb-3">
          Get in Touch 🌸
        </h1>
        <p className="text-gray-500 font-body max-w-md mx-auto">
          Have questions? Want a custom order? Just want to say hi? Reach out —
          Saloni responds fast! 💖
        </p>
      </section>

      <section className="py-16 petal-bg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="section-title mb-2">Let's Connect</h2>
                <p className="text-gray-500 font-body">
                  Choose the way that's most convenient for you.
                </p>
              </div>

              {/* WhatsApp — primary */}
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-2xl hover:bg-green-100 hover:border-green-300 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-green-200 group-hover:scale-110 transition-all">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 font-body">
                    WhatsApp (Fastest Response)
                  </p>
                  <p className="text-green-600 text-sm font-body">
                    +91 8770571002
                  </p>
                  <p className="text-green-500 text-xs font-body">
                    Usually replies in minutes!
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/creationsby_saloni"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-5 bg-pink-50 border border-pink-200 rounded-2xl hover:bg-pink-100 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                  <Instagram size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-rose-800 font-body">
                    Instagram DMs
                  </p>
                  <p className="text-rose-500 text-sm font-body">
                    @creationsby_saloni
                  </p>
                  <p className="text-rose-400 text-xs font-body">
                    See all our latest creations!
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:creationbysalonii@gmail.com"
                className="flex items-start gap-4 p-5 bg-rose-50 border border-rose-200 rounded-2xl hover:bg-rose-100 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                  <Mail size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-rose-800 font-body">
                    Email Us
                  </p>
                  <p className="text-rose-500 text-sm font-body">
                    creationbysalonii@gmail.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl">
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
                  <MapPin size={22} className="text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-rose-800 font-body">
                    Location
                  </p>
                  <p className="text-gray-500 text-sm font-body">
                    India 🇮🇳 · Delivering with love
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-50">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle
                    size={48}
                    className="text-green-500 mx-auto mb-4"
                  />
                  <h3 className="font-display text-2xl font-bold text-rose-900 mb-2">
                    Message Sent! 🌸
                  </h3>
                  <p className="text-gray-500 font-body">
                    Thank you for reaching out! Saloni will get back to you
                    soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 btn-outline text-sm py-2.5"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-rose-900 mb-6">
                    Send a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="label">Your Name</label>
                      <input
                        className="input-field"
                        placeholder="Saloni"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="label">Email / Phone</label>
                      <input
                        className="input-field"
                        placeholder="email@example.com or your phone number"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="label">Your Message</label>
                      <textarea
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Hi Saloni! I'd like to know about..."
                        required
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="bg-rose-50 rounded-2xl p-5 border border-rose-100 hover:border-rose-300 transition-colors"
              >
                <p className="font-display font-semibold text-rose-900 mb-2">
                  Q: {q}
                </p>
                <p className="text-gray-600 text-sm font-body leading-relaxed">
                  A: {a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-500 font-body mb-3">Have more questions?</p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-all"
            >
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

