import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Beans', path: '/beans' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const textColor = 'text-white';
  const accentColor = 'text-[#ECB176]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
        ? 'bg-[#3C2A21]/95 backdrop-blur-xl shadow-2xl py-2 border-b border-white/5'
        : 'bg-black/20 backdrop-blur-sm py-4'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-[#ECB176] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
              <span className="text-xl">☕</span>
            </div>
            <h1 className={`text-xl font-serif font-bold ${textColor} tracking-tight`}>
              Giggling <span className="text-[#ECB176]">Platypus</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${textColor} font-medium hover:text-[#ECB176] transition-colors relative group ${location.pathname === item.path ? 'text-[#ECB176]' : ''
                  }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#ECB176] transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}

            {/* Cart Icon */}
            <div className="h-6 w-[1px] bg-white/20"></div>

            <Link
              to="/cart"
              className={`relative p-2 ${textColor} hover:text-[#ECB176] transition-colors duration-300`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ECB176] text-[#3C2A21] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#ECB176] font-bold uppercase tracking-wider">Member</span>
                  <span className={`text-sm font-semibold ${textColor}`}>{user.name.split(' ')[0]}</span>
                </div>
                <div className="group relative">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ECB176] transition-colors">
                    <span className="text-[#ECB176] font-bold">{user.name[0]}</span>
                  </div>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-xs text-stone-400 font-medium">Signed in as</p>
                      <p className="font-bold text-[#3C2A21] text-sm truncate">{user.name}</p>
                    </div>
                    <button onClick={() => navigate('/orders')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF3E0] hover:text-[#6F4E37] flex items-center gap-2">
                      <span>📋</span> My Orders
                    </button>
                    {user.role === 'admin' && (
                      <button onClick={() => navigate('/admin')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF3E0] hover:text-[#6F4E37] flex items-center gap-2">
                        <span>⚙️</span> Admin Panel
                      </button>
                    )}
                    <div className="border-t border-stone-100 mt-1"></div>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#ECB176] text-[#3C2A21] px-6 py-2 rounded-full font-bold hover:bg-white transition-all shadow-lg hover:shadow-[#ECB176]/40 active:scale-95 text-sm"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${textColor}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ECB176] text-[#3C2A21] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              className="w-10 h-10 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`w-6 h-0.5 bg-white transition-all rounded-full ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all rounded-full ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0 py-0'
          } overflow-hidden`}>
          <div className="bg-[#3C2A21] rounded-[30px] p-6 shadow-2xl border border-white/10">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-2xl font-serif font-bold transition-colors ${location.pathname === item.path ? 'text-[#ECB176]' : 'text-white'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-[1px] bg-white/10 my-4"></div>

              {user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#ECB176] flex items-center justify-center text-[#3C2A21] font-bold text-xl">
                      {user.name[0]}
                    </div>
                    <span className="text-xl font-bold text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { navigate('/orders'); setIsMenuOpen(false); }}
                    className="text-left text-white font-semibold flex items-center gap-2"
                  >
                    📋 My Orders
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-400 font-bold"
                  >
                    🚪 Log Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#ECB176] text-[#3C2A21] font-bold py-4 rounded-2xl shadow-lg text-center"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;