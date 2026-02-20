import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const Subscription = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const plans = [
        { id: "sub-1", name: "The Explorer", price: 1200, period: "month", desc: "Two 250g bags of fresh single-origin coffee.", features: ["Global Discovery", "Free Shipping", "Brew Guides"] },
        { id: "sub-2", name: "The Ritual", price: 2200, period: "month", desc: "Four 250g bags of our signature blends.", features: ["Daily Essential", "15% Savings", "Free Samples", "Priority Support"] },
        { id: "sub-3", name: "Coffee Master", price: 4000, period: "month", desc: "Eight 250g bags + exclusive limited releases.", features: ["Total Coffee Freedom", "25% Savings", "First Access", "VIP Events"] },
    ];

    const handleSubscribe = (plan) => {
        addToCart({
            ...plan,
            name: `${plan.name} Subscription`,
            category: "Subscription",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
        });
        navigate("/cart");
    };

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="bg-[#3C2A21] py-20 px-4 text-center text-white mb-16">
                    <h2 className="text-[#ECB176] font-bold text-sm uppercase tracking-widest mb-4">Never Run Out</h2>
                    <h1 className="text-5xl font-serif font-bold mb-4">Coffee Subscription</h1>
                    <p className="max-w-2xl mx-auto opacity-70">Freshly roasted beans delivered to your doorstep exactly when you need them. Pause or cancel anytime.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                        {plans.map((plan, i) => (
                            <div key={i} className={`bg-white rounded-[3rem] p-10 shadow-xl border-2 ${i === 1 ? 'border-[#6F4E37]' : 'border-white'} relative flex flex-col`}>
                                {i === 1 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6F4E37] text-white px-6 py-2 rounded-full text-xs font-bold uppercase">Best Value</span>}
                                <h3 className="text-2xl font-bold text-[#3C2A21] mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-6">
                                    <span className="text-4xl font-bold text-[#6F4E37]">₹{plan.price}</span>
                                    <span className="text-stone-400 font-medium">/{plan.period}</span>
                                </div>
                                <p className="text-stone-500 text-sm mb-8">{plan.desc}</p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm font-semibold text-[#3C2A21]">
                                            <span className="text-emerald-500">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    className={`w-full py-4 rounded-2xl font-bold transition-all ${i === 1 ? 'bg-[#6F4E37] text-white' : 'bg-[#FAF3E0] text-[#3C2A21] hover:bg-[#3C2A21] hover:text-white'}`}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Subscription;
