import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";
import MenuCard from "../components/MenuCard";

// ✅ Static menu data - Backend இல்லாமலும் வேலை செய்யும்
const coffeeMenu = [
    { id: 1, name: "Espresso", type: "Coffee", category: "Hot Coffee", price: 120, available: true, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&auto=format&fit=crop&q=80" },
    { id: 2, name: "Americano", type: "Coffee", category: "Hot Coffee", price: 140, available: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80" },
    { id: 3, name: "Cappuccino", type: "Coffee", category: "Hot Coffee", price: 180, available: true, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&auto=format&fit=crop&q=80" },
    { id: 4, name: "Latte", type: "Coffee", category: "Hot Coffee", price: 190, available: true, image: "https://images.unsplash.com/photo-1561882468-9110d70d3069?w=800&auto=format&fit=crop&q=80" },
    { id: 5, name: "Mocha", type: "Coffee", category: "Hot Coffee", price: 210, available: true, image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&auto=format&fit=crop&q=80" },
    { id: 6, name: "Flat White", type: "Coffee", category: "Hot Coffee", price: 200, available: true, image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&auto=format&fit=crop&q=80" },
    { id: 7, name: "Macchiato", type: "Coffee", category: "Hot Coffee", price: 170, available: true, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&auto=format&fit=crop&q=80" },
    { id: 8, name: "Cold Brew", type: "Coffee", category: "Cold Coffee", price: 220, available: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop&q=80" },
    { id: 9, name: "Iced Latte", type: "Coffee", category: "Cold Coffee", price: 210, available: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80" },
    { id: 10, name: "Iced Mocha", type: "Coffee", category: "Cold Coffee", price: 230, available: true, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&auto=format&fit=crop&q=80" },
    { id: 11, name: "Frappuccino", type: "Coffee", category: "Cold Coffee", price: 250, available: true, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=800&auto=format&fit=crop&q=80" },
    { id: 12, name: "Vanilla Frappe", type: "Coffee", category: "Cold Coffee", price: 260, available: true, image: "https://images.unsplash.com/photo-1572490122709-66850fcc1fae?w=800&auto=format&fit=crop&q=80" },
    { id: 13, name: "Caramel Frappe", type: "Coffee", category: "Cold Coffee", price: 270, available: true, image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&auto=format&fit=crop&q=80" },
    { id: 14, name: "Hazelnut Latte", type: "Coffee", category: "Specialty Coffee", price: 240, available: true, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80" },
    { id: 15, name: "Irish Coffee", type: "Coffee", category: "Specialty Coffee", price: 280, available: false, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80" },
    { id: 16, name: "Hot Chocolate", type: "Beverages", category: "Beverages", price: 180, available: true, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&auto=format&fit=crop&q=80" },
    { id: 17, name: "Green Tea", type: "Beverages", category: "Beverages", price: 150, available: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop&q=80" },
    { id: 18, name: "Masala Chai", type: "Beverages", category: "Beverages", price: 130, available: true, image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=800&auto=format&fit=crop&q=80" },
    { id: 19, name: "Lemon Tea", type: "Beverages", category: "Beverages", price: 140, available: true, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80" },
    { id: 20, name: "Blueberry Muffin", type: "Snacks", category: "Snacks", price: 160, available: true, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&auto=format&fit=crop&q=80" },
    { id: 21, name: "Chocolate Croissant", type: "Snacks", category: "Snacks", price: 180, available: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80" },
    { id: 22, name: "Veg Sandwich", type: "Snacks", category: "Snacks", price: 200, available: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80" },
    { id: 23, name: "Chicken Sandwich", type: "Snacks", category: "Snacks", price: 240, available: true, image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&auto=format&fit=crop&q=80" },
    { id: 24, name: "Paneer Wrap", type: "Snacks", category: "Snacks", price: 230, available: true, image: "https://images.unsplash.com/photo-1626700051175-6518a4e94ef4?w=800&auto=format&fit=crop&q=80" },
    { id: 25, name: "French Fries", type: "Snacks", category: "Snacks", price: 150, available: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80" },
    { id: 26, name: "Cheese Burger", type: "Snacks", category: "Snacks", price: 260, available: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80" },
    { id: 27, name: "Brownie", type: "Desserts", category: "Desserts", price: 170, available: true, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop&q=80" },
    { id: 28, name: "Chocolate Cake", type: "Desserts", category: "Desserts", price: 220, available: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80" },
    { id: 29, name: "Cheesecake", type: "Desserts", category: "Desserts", price: 250, available: true, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80" },
    { id: 30, name: "Ice Cream Sundae", type: "Desserts", category: "Desserts", price: 240, available: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80" },
];

const Menu = () => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [addedToCartId, setAddedToCartId] = useState(null);

    const categories = ["All", "Coffee", "Beverages", "Snacks", "Desserts"];

    // Filter and Sort Logic
    const getProcessedData = () => {
        let filtered = coffeeMenu.filter(item => {
            if (activeCategory === "All") return true;
            return item.type === activeCategory;
        });

        if (sortBy === "low-to-high") {
            return [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === "high-to-low") {
            return [...filtered].sort((a, b) => b.price - a.price);
        }

        return filtered;
    };

    const handleAddToCart = (item) => {
        if (!user) {
            navigate("/login");
            return;
        }
        addToCart(item);
        setAddedToCartId(item.id);
        setTimeout(() => setAddedToCartId(null), 2000);
    };

    const handleBuyNow = (item) => {
        if (!user) {
            navigate("/login");
            return;
        }
        addToCart(item);
        navigate("/cart");
    };

    const processedData = getProcessedData();

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-12 px-4 text-center">
                <p className="text-[#6F4E37] font-bold text-sm uppercase tracking-[0.3em] mb-4">Giggling Platypus</p>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#3C2A21] mb-6">
                    Our <span className="text-[#6F4E37]">Menu</span>
                </h1>
                <p className="max-w-2xl mx-auto text-[#3C2A21]/60 font-light text-lg">
                    Discover our artisanal collection of roasts and treats, crafted with passion.
                </p>
                {/* Item Count */}
                <div className="mt-6 inline-flex items-center space-x-2 bg-white/60 backdrop-blur px-5 py-2 rounded-full border border-stone-200">
                    <span className="text-[#6F4E37] font-bold">{processedData.length}</span>
                    <span className="text-stone-400 text-sm">items available</span>
                </div>
            </div>

            {/* Controls: Filter & Sort */}
            <div className="sticky top-20 z-40 bg-[#FAF3E0]/90 backdrop-blur-xl border-b border-[#6F4E37]/10 py-5">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${activeCategory === cat
                                    ? "bg-[#3C2A21] text-white shadow-xl scale-105"
                                    : "bg-white text-[#3C2A21] border border-stone-200 hover:border-[#6F4E37] hover:text-[#6F4E37]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting Dropdown */}
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm font-bold text-[#3C2A21] outline-none focus:ring-2 focus:ring-[#6F4E37]/20 cursor-pointer"
                        >
                            <option value="default">Default</option>
                            <option value="low-to-high">Price: Low to High</option>
                            <option value="high-to-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {processedData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {processedData.map((item) => (
                                <MenuCard
                                    key={item.id}
                                    item={item}
                                    onAddToCart={handleAddToCart}
                                    onBuyNow={handleBuyNow}
                                    isAdded={addedToCartId === item.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="text-6xl mb-6">☕</div>
                            <h3 className="text-2xl font-bold text-[#3C2A21]">No items in this category</h3>
                            <button
                                onClick={() => setActiveCategory("All")}
                                className="mt-4 text-[#6F4E37] font-bold hover:underline"
                            >
                                Show all items
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Menu;
