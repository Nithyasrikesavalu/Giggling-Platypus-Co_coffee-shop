import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

// ── Animated Number Counter ──────────────────────────────────────────────────
const AnimatedCounter = ({ target, duration = 1200, prefix = "₹" }) => {
    const [count, setCount] = useState(0);
    const startRef = useRef(null);
    useEffect(() => {
        startRef.current = null;
        const animate = (ts) => {
            if (!startRef.current) startRef.current = ts;
            const p = Math.min((ts - startRef.current) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [target, duration]);
    return <span>{prefix}{count}</span>;
};

// ── Quick Cash Buttons ───────────────────────────────────────────────────────
const QUICK_CASH = [50, 100, 200, 500, 1000, 2000];

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Steps: "cart" → "payment" → "receipt"
    const [step, setStep] = useState("cart");
    const [cashGiven, setCashGiven] = useState("");
    const [isPlacing, setIsPlacing] = useState(false);
    const [orderReceipt, setOrderReceipt] = useState(null);

    const total = getTotalPrice();
    const cashNum = parseFloat(cashGiven) || 0;
    const balance = cashNum - total;
    const isEnough = cashNum >= total;

    // ── Place Order ────────────────────────────────────────────────────────────
    const handlePlaceOrder = async () => {
        if (!user) { navigate("/login"); return; }
        setIsPlacing(true);

        const receiptItems = [...cartItems];
        const receiptTotal = total;

        const orderData = {
            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                type: item.type
            })),
            customerName: user.name,
            customerEmail: user.email,
            userEmail: user.email,
            user: user._id,
            totalAmount: receiptTotal,
            totalPrice: receiptTotal,
            cashGiven: cashNum,
            balanceReturned: balance,
            status: "Processing"
        };

        let orderId = `ORD-${Date.now()}`;
        try {
            const res = await axios.post("http://localhost:5000/api/orders", orderData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            orderId = res.data?.data?.orderNumber || res.data?._id || orderId;
        } catch (_) { /* backend offline → use local id */ }

        clearCart();
        setOrderReceipt({
            orderId,
            items: receiptItems,
            total: receiptTotal,
            cashGiven: cashNum,
            balance,
            name: user.name,
            email: user.email,
            date: new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }),
        });
        setStep("receipt");
        setIsPlacing(false);
    };

    // ════════════════════════════════════════════════════════════════════════════
    // RECEIPT PAGE
    // ════════════════════════════════════════════════════════════════════════════
    if (step === "receipt" && orderReceipt) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] to-[#f0e4cc] flex items-center justify-center p-4 pt-28">
                    <div className="w-full max-w-md">
                        {/* Success tick */}
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-emerald-200 animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-[#3C2A21]">Payment Done!</h1>
                            <p className="text-stone-400 mt-1">Thank you, <span className="font-bold text-[#6F4E37]">{orderReceipt.name}</span>!</p>
                        </div>

                        {/* Receipt */}
                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#6F4E37]/10 overflow-hidden">
                            {/* Header strip */}
                            <div className="bg-[#3C2A21] p-5 text-white text-center">
                                <p className="text-[#ECB176] text-xs font-bold uppercase tracking-widest mb-0.5">☕ Giggling Platypus</p>
                                <h2 className="text-lg font-bold">Bill Receipt</h2>
                                <p className="text-white/50 text-xs mt-0.5">{orderReceipt.date}</p>
                            </div>

                            {/* Order ID + Status */}
                            <div className="px-6 py-3 bg-stone-50 border-b border-stone-100 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Order ID</p>
                                    <p className="font-mono font-bold text-[#3C2A21] text-sm">#{String(orderReceipt.orderId).slice(-10).toUpperCase()}</p>
                                </div>
                                <span className="bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">⏳ Processing</span>
                            </div>

                            {/* Items */}
                            <div className="px-6 pt-5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Items</p>
                                <div className="space-y-2.5">
                                    {orderReceipt.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-9 h-9 rounded-xl object-cover"
                                                    onError={e => { e.target.src = "https://placehold.co/36x36/3C2A21/ECB176?text=☕"; }}
                                                />
                                                <div>
                                                    <p className="font-semibold text-[#3C2A21] text-sm leading-tight">{item.name}</p>
                                                    <p className="text-[11px] text-stone-400">₹{item.price} × {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-[#6F4E37] text-sm">₹{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Dashed line */}
                                <div className="border-t-2 border-dashed border-stone-200 my-4" />

                                {/* Bill breakdown — counter style */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-stone-500">
                                        <span>Bill Amount</span>
                                        <span className="font-semibold text-[#3C2A21]">₹{orderReceipt.total}</span>
                                    </div>
                                    <div className="flex justify-between text-stone-500">
                                        <span>Cash Given</span>
                                        <span className="font-semibold text-[#3C2A21]">₹{orderReceipt.cashGiven}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base border-t border-stone-100 pt-2">
                                        <span className="text-[#3C2A21]">Balance Return</span>
                                        <span className="text-emerald-600 text-lg">
                                            <AnimatedCounter target={orderReceipt.balance} duration={1000} />
                                        </span>
                                    </div>
                                </div>

                                {/* Total big */}
                                <div className="bg-[#3C2A21] rounded-2xl p-4 mt-4 flex justify-between items-center">
                                    <span className="text-white/70 font-medium">Total Paid</span>
                                    <span className="text-2xl font-bold text-[#ECB176]">
                                        <AnimatedCounter target={orderReceipt.total} duration={1200} />
                                    </span>
                                </div>

                                {/* Customer info */}
                                <div className="mt-4 bg-stone-50 rounded-2xl p-4 text-sm text-stone-500 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Customer</span>
                                        <span className="font-semibold text-[#3C2A21]">{orderReceipt.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Payment Mode</span>
                                        <span className="font-semibold text-emerald-600">💵 Cash</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status</span>
                                        <span className="font-semibold text-emerald-600">✅ Paid</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-6 py-5 space-y-3">
                                <Link to="/orders" className="block w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-4 rounded-2xl text-center transition-all shadow-lg">
                                    📋 View My Orders
                                </Link>
                                <Link to="/menu" className="block w-full bg-white border-2 border-stone-200 text-[#3C2A21] font-bold py-3.5 rounded-2xl text-center hover:border-[#6F4E37] transition-all">
                                    ☕ Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // ════════════════════════════════════════════════════════════════════════════
    // PAYMENT COUNTER PAGE
    // ════════════════════════════════════════════════════════════════════════════
    if (step === "payment") {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] to-[#f0e4cc] pt-28 pb-16 px-4 flex items-center justify-center">
                    <div className="w-full max-w-lg">
                        {/* Back */}
                        <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-[#6F4E37] font-bold mb-6 hover:text-[#3C2A21] transition-colors">
                            ← Back to Cart
                        </button>

                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#6F4E37]/10 overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#3C2A21] p-6 text-white text-center">
                                <p className="text-[#ECB176] text-xs font-bold uppercase tracking-widest mb-1">☕ Counter Payment</p>
                                <h2 className="text-2xl font-bold">Pay at Counter</h2>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Bill Summary */}
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Bill Summary</p>
                                    <div className="space-y-2">
                                        {cartItems.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-stone-500">{item.name} × {item.quantity}</span>
                                                <span className="font-semibold text-[#3C2A21]">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t-2 border-dashed border-stone-200 mt-3 pt-3 flex justify-between font-bold text-lg">
                                        <span className="text-[#3C2A21]">Total Bill</span>
                                        <span className="text-[#6F4E37] text-2xl">₹{total}</span>
                                    </div>
                                </div>

                                {/* Cash Input */}
                                <div>
                                    <label className="block text-sm font-bold text-[#3C2A21] mb-2">
                                        💵 Cash Given by Customer
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#6F4E37]">₹</span>
                                        <input
                                            type="number"
                                            min={total}
                                            value={cashGiven}
                                            onChange={e => setCashGiven(e.target.value)}
                                            placeholder={`Min ₹${total}`}
                                            className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-stone-200 focus:border-[#6F4E37] focus:outline-none text-2xl font-bold text-[#3C2A21] bg-stone-50 transition-colors"
                                        />
                                    </div>

                                    {/* Quick Cash Buttons */}
                                    <div className="mt-3">
                                        <p className="text-xs text-stone-400 mb-2">Quick Select:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {QUICK_CASH.filter(v => v >= total || v === QUICK_CASH[QUICK_CASH.length - 1]).map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setCashGiven(String(val))}
                                                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${cashGiven === String(val)
                                                        ? "bg-[#3C2A21] text-white border-[#3C2A21]"
                                                        : "bg-white text-[#3C2A21] border-stone-200 hover:border-[#6F4E37]"
                                                        }`}
                                                >
                                                    ₹{val}
                                                </button>
                                            ))}
                                            {/* Exact amount */}
                                            <button
                                                onClick={() => setCashGiven(String(total))}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${cashGiven === String(total)
                                                    ? "bg-[#3C2A21] text-white border-[#3C2A21]"
                                                    : "bg-[#FAF3E0] text-[#6F4E37] border-[#ECB176] hover:border-[#6F4E37]"
                                                    }`}
                                            >
                                                Exact ₹{total}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Balance Display */}
                                {cashGiven !== "" && (
                                    <div className={`rounded-2xl p-5 text-center transition-all ${isEnough ? "bg-emerald-50 border-2 border-emerald-200" : "bg-red-50 border-2 border-red-200"}`}>
                                        {isEnough ? (
                                            <>
                                                <p className="text-emerald-600 text-sm font-bold uppercase tracking-wider mb-1">✅ Balance to Return</p>
                                                <p className="text-4xl font-bold text-emerald-700">₹{balance.toFixed(0)}</p>
                                                {balance === 0 && <p className="text-emerald-500 text-xs mt-1">Exact amount — no change!</p>}
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-red-500 text-sm font-bold uppercase tracking-wider mb-1">❌ Insufficient Amount</p>
                                                <p className="text-3xl font-bold text-red-600">₹{Math.abs(balance).toFixed(0)} more needed</p>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Confirm Button */}
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={!isEnough || isPlacing}
                                    className="w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-5 rounded-2xl shadow-lg shadow-[#3C2A21]/20 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-lg"
                                >
                                    {isPlacing ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : isEnough
                                        ? `✅ Confirm Payment — ₹${total}`
                                        : `Enter ₹${total} or more`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // ════════════════════════════════════════════════════════════════════════════
    // EMPTY CART
    // ════════════════════════════════════════════════════════════════════════════
    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#FAF3E0] py-16 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-6">🛒</div>
                        <h2 className="text-3xl font-bold text-[#3C2A21] mb-4">Your Cart is Empty</h2>
                        <p className="text-stone-400 mb-8">Add some delicious items to get started!</p>
                        <button onClick={() => navigate("/menu")} className="bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg">
                            Browse Menu ☕
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // ════════════════════════════════════════════════════════════════════════════
    // CART PAGE
    // ════════════════════════════════════════════════════════════════════════════
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#FAF3E0] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <p className="text-[#6F4E37] font-bold text-xs uppercase tracking-widest mb-1">Checkout</p>
                            <h1 className="text-4xl font-bold text-[#3C2A21]">Your Cart</h1>
                        </div>
                        <button onClick={clearCart} className="text-red-400 hover:text-red-600 font-semibold flex items-center space-x-2 text-sm">
                            <span>🗑️</span><span>Clear All</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white rounded-[1.5rem] shadow-sm border border-stone-100 p-5 flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-shadow">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
                                        onError={e => { e.target.src = "https://placehold.co/96x96/3C2A21/ECB176?text=☕"; }}
                                    />
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-[#3C2A21]">{item.name}</h3>
                                        <span className="inline-block bg-[#FAF3E0] text-[#6F4E37] text-xs font-bold px-3 py-1 rounded-full mt-1">{item.type || item.category}</span>
                                    </div>
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="text-xl font-bold text-[#6F4E37]">₹{item.price * item.quantity}</div>
                                        <div className="flex items-center space-x-3">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-stone-100 hover:bg-stone-200 text-[#3C2A21] rounded-full font-bold transition-colors">−</button>
                                            <span className="w-8 text-center font-bold text-[#3C2A21]">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-[#3C2A21] hover:bg-[#6F4E37] text-white rounded-full font-bold transition-colors">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-xs font-semibold transition-colors">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[1.5rem] shadow-sm border border-stone-100 p-6 sticky top-28">
                                <h2 className="text-xl font-bold text-[#3C2A21] mb-6">Order Summary</h2>
                                <div className="space-y-3 mb-6">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm text-stone-500">
                                            <span>{item.name} × {item.quantity}</span>
                                            <span className="font-semibold text-[#3C2A21]">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                    <div className="border-t-2 border-dashed border-stone-100 pt-4 flex justify-between font-bold text-lg text-[#3C2A21]">
                                        <span>Total</span>
                                        <span className="text-[#6F4E37]">₹{total}</span>
                                    </div>
                                </div>

                                {/* Proceed to Pay */}
                                <button
                                    onClick={() => { if (!user) { navigate("/login"); return; } setStep("payment"); }}
                                    className="w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#3C2A21]/20 transition-all active:scale-95"
                                >
                                    💵 Proceed to Pay ₹{total}
                                </button>
                                <button
                                    onClick={() => navigate("/menu")}
                                    className="w-full mt-3 bg-white border-2 border-stone-200 text-[#3C2A21] font-bold py-3 rounded-2xl hover:border-[#6F4E37] transition-all text-sm"
                                >
                                    ← Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
