import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-[#3C2A21]">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
          alt="Coffee Background"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3C2A21] via-[#3C2A21]/80 to-transparent"></div>
      </div>

      {/* Floating Coffee Beans Decor */}
      <div className="absolute top-20 right-[10%] w-16 h-16 animate-float opacity-20 hidden lg:block">
        <img src="https://cdn-icons-png.flaticon.com/512/3121/3121655.png" alt="Bean" className="w-full grayscale invert" />
      </div>
      <div className="absolute bottom-20 right-[25%] w-12 h-12 animate-float opacity-10 hidden lg:block" style={{ animationDelay: '1s' }}>
        <img src="https://cdn-icons-png.flaticon.com/512/3121/3121655.png" alt="Bean" className="w-full grayscale invert rotate-45" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-[#6F4E37]/30 backdrop-blur-sm border border-[#6F4E37]/50 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#ECB176] rounded-full animate-pulse"></span>
              <span className="text-[#ECB176] text-xs font-bold tracking-widest uppercase">Artisanal Roastery</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Experience <br />
              <span className="text-[#ECB176] italic">Perfect</span> Brew
            </h1>

            <p className="text-xl text-[#FAF3E0]/70 mb-10 leading-relaxed font-light max-w-lg">
              We don't just serve coffee; we serve moments of joy wrapped in the rich aroma of hand-roasted beans. Crafting the extraordinary for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/menu')}
                className="bg-[#ECB176] text-[#3C2A21] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-2xl shadow-[#ECB176]/20 active:scale-95 group flex items-center space-x-3"
              >
                <span>Explore Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/about')}
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center space-x-3"
              >
                <span>Our Story</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex items-center space-x-6 border-t border-white/10 pt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#3C2A21] bg-gray-400 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-bold text-sm">2k+ Coffee Lovers</div>
                <div className="text-[#ECB176] text-xs">Rating 4.9/5 ★★★★★</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop"
                alt="Specialty Coffee"
                className="w-[450px] aspect-[4/5] object-cover rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white/5"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white max-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold text-[#6F4E37] uppercase">Signature</span>
                </div>
                <div className="text-[#3C2A21] font-bold text-lg">Caramel Macchiato</div>
              </div>
            </div>
            {/* Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full -z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full -z-0"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
        <span className="text-white text-[10px] uppercase tracking-widest mb-2 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
}

export default Banner;