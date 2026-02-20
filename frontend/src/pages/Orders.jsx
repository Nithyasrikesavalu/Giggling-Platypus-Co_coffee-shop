import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";
import axios from "axios";

// ── Status pipeline ──────────────────────────────────────────────────────────
const STATUS_STEPS = [
    { key: "pending", label: "Order Placed", icon: "📋" },
    { key: "confirmed", label: "Confirmed", icon: "✅" },
    { key: "preparing", label: "Preparing", icon: "☕" },
    { key: "ready", label: "Ready", icon: "🔔" },
    { key: "delivered", label: "Delivered", icon: "🎉" },
];

const PREPARING_STEPS = [
    { icon: "🫘", label: "Grinding fresh beans" },
    { icon: "💧", label: "Heating water to 93°C" },
    { icon: "☕", label: "Pulling espresso shot" },
    { icon: "🥛", label: "Steaming milk" },
    { icon: "🎨", label: "Latte art finishing" },
    { icon: "📦", label: "Packing your order" },
];

// ── Order Tracker Card ────────────────────────────────────────────────────────
const OrderTracker = ({ order }) => {
    const stepIdx = STATUS_STEPS.findIndex(s => s.key === order.status?.toLowerCase());
    const currentStep = STATUS_STEPS[stepIdx] || STATUS_STEPS[0];
    const isPreparing = order.status === "preparing";
    const [prepStep, setPrepStep] = useState(0);

    useEffect(() => {
        if (!isPreparing) return;
        const t = setInterval(() => setPrepStep(p => (p + 1) % PREPARING_STEPS.length), 2000);
        return () => clearInterval(t);
    }, [isPreparing]);

    const items = order.items || [];
    const total = order.totalAmount || 0;
    const orderId = order.orderNumber || order._id || "—";

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden mb-8">
            <div className="p-5 bg-stone-50 border-b border-stone-100 flex flex-wrap gap-4 items-center justify-between">
                <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">Order ID</p>
                    <p className="font-mono font-bold text-[#3C2A21] text-sm">#{String(orderId).slice(-10).toUpperCase()}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${isPreparing ? 'animate-pulse' : ''} bg-white text-[#6F4E37] border-stone-200`}>
                    {currentStep.icon} {currentStep.label}
                </span>
                <div className="text-right">
                    <p className="text-[10px] text-stone-400">Total Bill</p>
                    <p className="text-xl font-bold text-[#6F4E37]">₹{total}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    {STATUS_STEPS.map((s, i) => {
                        const done = i <= stepIdx;
                        const active = i === stepIdx;
                        return (
                            <div key={s.key} className="flex-1 flex flex-col items-center relative">
                                <div className="flex items-center w-full">
                                    {i > 0 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-1000 ${i <= stepIdx ? "bg-[#6F4E37]" : "bg-stone-200"}`} />}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 z-10 ${active
                                        ? "border-[#6F4E37] bg-white shadow-lg scale-125"
                                        : done ? "border-[#3C2A21] bg-[#3C2A21] text-white" : "border-stone-200 bg-white"
                                        }`}>
                                        {done ? s.icon : <span className="text-[10px] font-bold text-stone-300">{i + 1}</span>}
                                    </div>
                                    {i < STATUS_STEPS.length - 1 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-1000 ${i < stepIdx ? "bg-[#6F4E37]" : "bg-stone-200"}`} />}
                                </div>
                                <p className={`text-[10px] font-bold mt-3 uppercase tracking-wider text-center absolute -bottom-6 ${active ? "text-[#6F4E37]" : "text-stone-400"}`}>
                                    {s.label}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {isPreparing && (
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mt-8 animate-pulse flex items-center gap-3">
                        <span className="text-2xl">{PREPARING_STEPS[prepStep].icon}</span>
                        <div>
                            <p className="text-xs font-bold text-orange-700 uppercase tracking-widest">Barista is at work</p>
                            <p className="text-sm font-semibold text-orange-600">{PREPARING_STEPS[prepStep].label}...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Items */}
            <div className="p-6 bg-stone-50/50">
                <div className="space-y-3">
                    {items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-stone-500">{item.name} × {item.quantity}</span>
                            <span className="font-bold text-[#3C2A21]">₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Orders = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/orders", {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const all = res.data?.data || res.data || [];
            const mine = all.filter(o => o.customerEmail === user.email || o.userEmail === user.email || o.user === user._id);
            setOrders(mine);
        } catch { setOrders([]); } finally { setLoading(false); }
    }, [user]);

    useEffect(() => {
        if (!user) { navigate("/login"); return; }
        fetchOrders();
    }, [user, fetchOrders, navigate]);

    // Polling for updates on the orders page
    useEffect(() => {
        if (!user) return;
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [user, fetchOrders]);

    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-serif font-bold text-[#3C2A21] mb-2">My Orders</h1>
                    <p className="text-stone-500">Live order tracking and history</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-[#6F4E37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-stone-500 font-bold">Checking our barista's log...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-stone-100">
                        <div className="text-7xl mb-6">☕</div>
                        <h2 className="text-2xl font-bold text-[#332a21] mb-4">No Active Orders</h2>
                        <Link to="/menu" className="inline-block bg-[#3C2A21] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#6F4E37] transition-all">
                            Order Coffee Now
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, i) => (
                            <OrderTracker key={order._id || i} order={order} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
