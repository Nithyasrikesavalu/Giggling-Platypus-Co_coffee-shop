import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const GiftCards = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleBuyGiftCard = (amount) => {
        addToCart({
            id: `gift-${amount}`,
            name: `Digital Gift Card - ₹${amount}`,
            price: amount,
            category: "Gift Card",
            image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c6703?q=80&w=2030&auto=format&fit=crop"
        });
        navigate("/cart");
    };

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="bg-[#3C2A21] py-20 px-4 text-center text-white mb-16 px-6">
                    <h1 className="text-5xl font-serif font-bold mb-4">Gift the Joy of Coffee</h1>
                    <p className="text-[#ECB176] max-w-2xl mx-auto opacity-80">The perfect gift for any occasion. Let them choose their favorite beans or brew.</p>
                </div>

                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-[#3C2A21] p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6F4E37] rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
                            <div className="relative z-10">
                                <h2 className="text-white text-3xl font-bold mb-8">Digital Gift Card</h2>
                                <div className="space-y-4 mb-10">
                                    {[500, 1000, 2000, 5000].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => handleBuyGiftCard(val)}
                                            className="w-full py-4 rounded-2xl border-2 border-white/20 text-white font-bold hover:bg-white hover:text-[#3C2A21] transition-all"
                                        >
                                            ₹{val}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-white/40 text-xs text-center">Select an amount to add to cart</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center space-y-6">
                            <h2 className="text-3xl font-serif font-bold text-[#3C2A21]">How it works</h2>
                            <ul className="space-y-6">
                                {[
                                    { step: '01', title: 'Pick a value', desc: 'Choose from multiple denominations.' },
                                    { step: '02', title: 'Deliver instantly', desc: 'Sent via email to your recipient on your chosen date.' },
                                    { step: '03', title: 'Redeem anytime', desc: 'Can be used for any purchase on our online store.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="text-4xl font-serif text-[#6F4E37] font-bold opacity-30">{item.step}</span>
                                        <div>
                                            <h4 className="font-bold text-[#3C2A21]">{item.title}</h4>
                                            <p className="text-stone-500 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GiftCards;
