import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div id="about" className="py-24 bg-[#FAF3E0] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[#6F4E37] font-bold text-sm uppercase tracking-[0.3em] mb-4">Our Heritage</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3C2A21] mb-6">
            Brewing Joy Since <span className="text-[#6F4E37]">2024</span>
          </h1>
          <div className="w-24 h-1 bg-[#6F4E37] mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Interactive Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1974&auto=format&fit=crop"
                  alt="Coffee process"
                  className="w-full h-[300px] object-cover rounded-[30px] shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="bg-[#6F4E37] p-8 rounded-[30px] text-white">
                  <div className="text-4xl font-serif font-bold mb-2">100%</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-bold">Organic Beans</div>
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="bg-[#ECB176] p-8 rounded-[30px] text-[#3C2A21]">
                  <div className="text-4xl font-serif font-bold mb-2">5+</div>
                  <div className="text-sm opacity-80 uppercase tracking-wider font-bold">Master Roasters</div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2064&auto=format&fit=crop"
                  alt="Cafe interior"
                  className="w-full h-[300px] object-cover rounded-[30px] shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
            {/* Center Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-[#FAF3E0] z-20">
              <span className="text-3xl">🦆</span>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-serif font-bold text-[#3C2A21] mb-6">The Giggling Platypus Philosophy</h3>
              <p className="text-lg text-[#3C2A21]/70 leading-relaxed mb-6 font-light">
                At <span className="text-[#6F4E37] font-bold italic">Giggling Platypus Co.</span>, we believe coffee should be more than just a morning survival tool—it should be an adventure. Like the platypus itself, we're a little strange, totally lovable, and impossible to forget.
              </p>
              <p className="text-lg text-[#3C2A21]/70 leading-relaxed font-light">
                We roast every bean with the goal of turning yawns into chuckles. We don't do boring. We don't do ordinary. We bring you coffee that's bold, playful, and just weird enough to keep life interesting.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Ethical Sourcing', icon: '🌍' },
                { title: 'Custom Roasts', icon: '🔥' },
                { title: 'Cozy Atmosphere', icon: '🛋️' },
                { title: 'Expert Baristas', icon: '👨‍🍳' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 border border-white hover:bg-white hover:shadow-lg transition-all">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-bold text-[#3C2A21]">{feature.title}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center space-x-3 text-[#6F4E37] font-bold text-lg group"
            >
              <span>Discover our unique menu</span>
              <div className="w-12 h-[1px] bg-[#6F4E37] group-hover:w-20 transition-all"></div>
            </button>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-32 relative py-16 px-8 rounded-[40px] bg-[#3C2A21] text-white text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <img src="https://www.transparenttextures.com/patterns/coffee-beans.png" alt="pattern" className="w-full h-full object-repeat" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-5xl text-[#ECB176] font-serif mb-6 block">"</span>
            <h4 className="text-2xl sm:text-3xl font-serif italic mb-8">
              Life is serious enough. Coffee doesn't have to be. So grab a mug, take a sip, and let your inner platypus giggle.
            </h4>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-[1px] bg-[#ECB176]"></div>
              <span className="text-[#ECB176] font-bold uppercase tracking-widest text-sm">The Founders</span>
              <div className="w-6 h-[1px] bg-[#ECB176]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;