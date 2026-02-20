import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const BrewingKits = () => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const kits = [
        { id: "kit-1", name: "V60 Starter Set", price: 2400, includes: "Dripper, Server, Filters", image: "https://images.unsplash.com/photo-1544787210-2211d7c9adac?q=80&w=1932&auto=format&fit=crop" },
        { id: "kit-2", name: "French Press Kit", price: 1850, includes: "Classic Press, Grinder", image: "https://images.unsplash.com/photo-1577905139046-2f0858178a9c?q=80&w=1883&auto=format&fit=crop" },
        { id: "kit-3", name: "Pour Over Master", price: 4200, includes: "Gooseneck Kettle, Scale, V60", image: "https://images.unsplash.com/photo-1522003328472-a42d9733400a?q=80&w=2070&auto=format&fit=crop" },
    ];

    const handleAddToCart = (item) => {
        addToCart(item);
        navigate("/cart");
    };

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="pt-28 pb-20">
                <div className="bg-[#3C2A21] py-20 px-4 text-center text-white mb-16">
                    <h1 className="text-5xl font-serif font-bold mb-4">Brewing Kits</h1>
                    <p className="text-[#ECB176] max-w-2xl mx-auto opacity-80">Everything you need to brew cafe-quality coffee in the comfort of your home.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {kits.map((kit, i) => (
                            <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-xl group hover:shadow-2xl transition-all">
                                <img src={kit.image} alt={kit.name} className="w-full h-72 object-cover" />
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-[#3C2A21] mb-2">{kit.name}</h3>
                                    <p className="text-stone-400 text-sm mb-6">Includes: {kit.includes}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-[#6F4E37]">₹{kit.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(kit)}
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

export default BrewingKits;
