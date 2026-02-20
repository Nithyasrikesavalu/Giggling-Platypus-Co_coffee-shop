import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const CoffeeBeans = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const products = [
        { id: "bean-1", name: "Ethiopian Yirgacheffe", price: 850, roast: "Light", notes: "Floral, Citrus, Tea-like", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop" },
        { id: "bean-2", name: "Colombian Supremo", price: 720, roast: "Medium", notes: "Nutty, Caramel, Balanced", image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1887&auto=format&fit=crop" },
        { id: "bean-3", name: "Sumatra Mandheling", price: 900, roast: "Dark", notes: "Earthy, Spicy, Full-bodied", image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=2070&auto=format&fit=crop" },
    ];

    const handleAddToCart = (item) => {
        addToCart(item);
        navigate("/cart");
    };

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="pt-28 pb-20">
                {/* Hero Section */}
                <div className="bg-[#3C2A21] py-20 px-4 text-center text-white mb-16">
                    <h1 className="text-5xl font-serif font-bold mb-4">Fresh Roasted Beans</h1>
                    <p className="text-[#ECB176] max-w-2xl mx-auto opacity-80">Sourced from the finest altitudes and roasted in small batches to preserve every flavor note.</p>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {products.map((bean, i) => (
                            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-xl group hover:scale-[1.02] transition-all duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={bean.image} alt={bean.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <span className="absolute top-4 right-4 bg-[#6F4E37] text-white px-4 py-1 rounded-full text-xs font-bold uppercase">{bean.roast} Roast</span>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-[#3C2A21] mb-2">{bean.name}</h3>
                                    <p className="text-stone-400 text-sm mb-4">Notes: {bean.notes}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-[#6F4E37]">₹{bean.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(bean)}
                                            className="bg-[#3C2A21] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#6F4E37] transition-all"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CoffeeBeans;
