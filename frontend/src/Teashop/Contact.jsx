import { useState } from 'react';
import api from '../services/api';

// ── Success Popup ─────────────────────────────────────────────────────────────
const SuccessPopup = ({ onClose }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-[2rem] shadow-2xl p-10 max-w-sm w-full text-center animate-[popIn_0.3s_ease-out]">
      {/* Animated check */}
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-200">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-[#3C2A21] mb-2">Message Sent! ☕</h3>
      <p className="text-stone-400 text-sm mb-6">
        Thank you for reaching out! Our baristas will get back to you soon.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg"
      >
        Close
      </button>
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/contact', form);
      setForm({ name: '', email: '', subject: '', message: '' });
      setShowSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Success Popup */}
      {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}

      <div id="contact" className="py-24 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FAF3E0] -skew-x-6 translate-x-1/2 z-0 hidden lg:block"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-[#6F4E37] font-bold text-sm uppercase tracking-[0.3em] mb-4">Contact</h2>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#3C2A21] mb-8 leading-tight">
                Say Hello to Our <br />
                <span className="text-[#6F4E37]">Baristas</span>
              </h1>
              <p className="text-lg text-[#3C2A21]/70 mb-12 font-light max-w-md">
                Whether you're curious about our beans, want to collaborate, or just want to chat about coffee, we're all ears.
              </p>

              <div className="space-y-10">
                {[
                  { icon: '📍', label: 'Visit Us', value: '123 Coffee Street, Chennai, TN' },
                  { icon: '📞', label: 'Call Us', value: '+91 90037 75962' },
                  { icon: '✉️', label: 'Email Us', value: 'hello@gigglingplatypus.com' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-[#FAF3E0] rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#6F4E37] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#6F4E37] uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-xl font-medium text-[#3C2A21]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-12 rounded-[30px] overflow-hidden shadow-2xl h-60 border-8 border-[#FAF3E0]">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31097.99444510516!2d80.220966!3d13.0826808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265cdaf67f715%3A0x9ff0f0!2sChennai!5e0!3m2!1sen!2sin!4v1670000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2)' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-[#FAF3E0] p-10 sm:p-14 rounded-[40px] shadow-2xl border border-white">
              <h3 className="text-3xl font-serif font-bold text-[#3C2A21] mb-8">Drop us a line</h3>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl mb-6">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#6F4E37] uppercase tracking-widest mb-2 px-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-white border-none rounded-2xl p-4 text-[#3C2A21] focus:ring-2 focus:ring-[#6F4E37] transition-all outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6F4E37] uppercase tracking-widest mb-2 px-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-white border-none rounded-2xl p-4 text-[#3C2A21] focus:ring-2 focus:ring-[#6F4E37] transition-all outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6F4E37] uppercase tracking-widest mb-2 px-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Coffee Inquiry"
                    required
                    className="w-full bg-white border-none rounded-2xl p-4 text-[#3C2A21] focus:ring-2 focus:ring-[#6F4E37] transition-all outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6F4E37] uppercase tracking-widest mb-2 px-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    required
                    className="w-full bg-white border-none rounded-2xl p-4 text-[#3C2A21] focus:ring-2 focus:ring-[#6F4E37] transition-all outline-none shadow-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3C2A21] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#6F4E37] transition-all shadow-xl hover:shadow-[#6F4E37]/30 flex items-center justify-center space-x-3 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
