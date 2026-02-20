import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#3C2A21] text-white pt-20 pb-10 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <img src="https://www.transparenttextures.com/patterns/carbon-fibre.png" alt="pattern" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ECB176] rounded-xl flex items-center justify-center text-xl">
                ☕
              </div>
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                Giggling <span className="text-[#ECB176]">Platypus</span>
              </h2>
            </div>
            <p className="text-[#FAF3E0]/60 font-light leading-relaxed">
              Crafting perfect moments one cup at a time. Join our community of coffee lovers and experience the extraordinary.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#ECB176] font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Menu', path: '/menu' }
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#FAF3E0]/70 hover:text-[#ECB176] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#ECB176] font-bold uppercase tracking-widest text-sm mb-8">The Shop</h4>
            <ul className="space-y-4">
              {[
                { name: 'Coffee Beans', path: '/beans' },
                { name: 'Subscription', path: '/subscription' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-[#FAF3E0]/70 hover:text-[#ECB176] cursor-pointer transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#ECB176] font-bold uppercase tracking-widest text-sm mb-8">News & Offers</h4>
            <p className="text-[#FAF3E0]/60 text-sm mb-6 font-light">
              Subscribe to get notified about new roasts and special events.
            </p>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                navigate('/subscription');
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#ECB176] outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#ECB176] text-[#3C2A21] font-bold py-4 rounded-xl hover:bg-white transition-all"
              >
                Explore Plans
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#FAF3E0]/40 text-xs font-light">
            © 2025 Giggling Platypus Co. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6 text-[#FAF3E0]/40 text-xs font-light">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;