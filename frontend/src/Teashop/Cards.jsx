import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TeaContext } from "../context/TeaContext"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import Navbar from "./Navbar"
import Footer from "./footer"

function Cards() {
    const navigate = useNavigate()
    const { data, loading, error } = useContext(TeaContext)
    const { addToCart, cartItems } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    // States
    const [message, setMessage] = useState("")
    const [processingItemId, setProcessingItemId] = useState(null)
    const [activeCategory, setActiveCategory] = useState("All")
    const [addedToCart, setAddedToCart] = useState(null)
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#6F4E37] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-xl font-serif font-bold text-[#3C2A21]">Brewing something special...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center px-4">
                <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-md text-center border border-red-50">
                    <div className="text-6xl mb-6">☕️</div>
                    <h2 className="text-2xl font-serif font-bold text-[#3C2A21] mb-4">A tiny spill!</h2>
                    <p className="text-[#3C2A21]/60 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#6F4E37] text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-[#6F4E37]/30"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    const filteredData = data.filter(item => {
        if (activeCategory === "All") return true;
        return item.type === activeCategory;
    });

    const Teaprocess = (item) => {
        if (!user) { navigate("/login"); return; }
        if (processingItemId !== null) return;

        setProcessingItemId(item.id)
        setMessage("")

        const steps = [
            `Grinding fresh ${item.name} beans...`,
            `Heating spring water to the perfect temperature...`,
            `Infusing magical flavors...`,
            `Finishing with a touch of magic...`
        ];

        steps.forEach((step, idx) => {
            setTimeout(() => setMessage(step), idx * 1500);
        });

        setTimeout(() => {
            setMessage(`Your ${item.name} is ready! Enjoy! ${item.type === "Coffee" ? "☕" : "🍵"}`);
            setProcessingItemId(null)
        }, steps.length * 1500 + 500);
    }

    const handleAddToCart = (item) => {
        if (!user) { navigate("/login"); return; }
        addToCart(item);
        setAddedToCart(item.id);
        setTimeout(() => setAddedToCart(null), 2000);
    }

    const toggleWishlist = (itemId) => {
        if (!user) { navigate("/login"); return; }
        setWishlist(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    }

    const handleBuyNow = (item) => {
        if (!user) { navigate("/login"); return; }
        addToCart(item);
        navigate("/cart");
    }

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />

            <div className="h-32"></div>

            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-[#6F4E37] font-bold text-sm uppercase tracking-[0.3em] mb-4">Our Menu</h2>
                        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#3C2A21] mb-6">
                            Pick Your <span className="text-[#6F4E37]">Giggle</span>
                        </h1>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3 mt-10">
                            {["All", "Coffee", "Tea"].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeCategory === cat
                                            ? "bg-[#3C2A21] text-white shadow-xl scale-105"
                                            : "bg-white text-[#3C2A21] border border-white hover:bg-[#6F4E37] hover:text-white"
                                        }`}
                                >
                                    {cat === "All" ? "All Brews" : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notification Overlay */}
                    {(message || processingItemId !== null) && (
                        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] w-[90%] max-w-lg">
                            <div className="bg-[#3C2A21] text-white p-6 rounded-[30px] shadow-2xl border border-white/10 backdrop-blur-xl flex items-center space-x-6">
                                <div className="w-12 h-12 bg-[#6F4E37] rounded-2xl flex items-center justify-center text-2xl animate-bounce">
                                    {message.includes("ready") ? "✨" : "☕"}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-lg">{message || "Preparing your drink..."}</p>
                                    {!message.includes("ready") && (
                                        <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                                            <div className="bg-[#ECB176] h-full animate-progress-indefinite"></div>
                                        </div>
                                    )}
                                </div>
                                {message.includes("ready") && (
                                    <button onClick={() => setMessage("")} className="text-white/50 hover:text-white">✕</button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-[40px] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
                            >
                                <div className="relative h-64 rounded-[30px] overflow-hidden mb-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Glass Overlay with Actions */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => toggleWishlist(item.id)}
                                            className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${wishlist.includes(item.id) ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
                                                }`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill={wishlist.includes(item.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(item)}
                                            className="bg-white text-[#3C2A21] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#ECB176] transition-colors"
                                        >
                                            Buy Now
                                        </button>
                                    </div>

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-2xl flex flex-col items-center shadow-lg">
                                        <span className="text-[10px] font-bold text-[#6F4E37] uppercase leading-none">Rating</span>
                                        <span className="text-sm font-bold text-[#3C2A21]">{item.rating}</span>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#3C2A21] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{item.type}</span>
                                    </div>
                                </div>

                                <div className="px-2 pb-2">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-serif font-bold text-[#3C2A21] group-hover:text-[#6F4E37] transition-colors">{item.name}</h3>
                                            <p className="text-[#3C2A21]/50 text-xs font-medium uppercase tracking-wider">{item.tag}</p>
                                        </div>
                                        <div className="text-xl font-serif font-bold text-[#6F4E37]">₹{item.price}</div>
                                    </div>

                                    <p className="text-[#3C2A21]/60 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="flex items-center space-x-2 text-[10px] font-bold text-[#3C2A21]/40 uppercase">
                                            <span>⏱️ {item.brewTime}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-[10px] font-bold text-[#3C2A21]/40 uppercase text-right justify-end">
                                            <span>⚡ {item.calories} Cal</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => Teaprocess(item)}
                                            disabled={processingItemId !== null}
                                            className="flex-1 bg-[#FAF3E0] hover:bg-[#6F4E37] hover:text-white text-[#6F4E37] font-bold py-4 rounded-2xl transition-all flex items-center justify-center space-x-2 group/btn"
                                        >
                                            <span className="group-hover/btn:rotate-12 transition-transform">{item.type === 'Coffee' ? '☕' : '🍵'}</span>
                                            <span className="text-sm">Brew</span>
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${addedToCart === item.id
                                                    ? 'bg-green-500 text-white animate-bounce'
                                                    : cartItems.some(c => c.id === item.id)
                                                        ? 'bg-[#3C2A21] text-white'
                                                        : 'bg-[#3C2A21] hover:bg-[#6F4E37] text-white shadow-lg'
                                                }`}
                                        >
                                            {addedToCart === item.id ? "✓" : "+"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes progress-indefinite {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-progress-indefinite {
                    width: 100%;
                    animation: progress-indefinite 2s infinite linear;
                }
            `}} />
        </div>
    )
}

export default Cards;