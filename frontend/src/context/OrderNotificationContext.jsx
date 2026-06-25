import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

const OrderNotificationContext = createContext();

export const useOrderNotification = () => useContext(OrderNotificationContext);

const STATUS_STEPS = [
    { key: "pending", label: "Order Placed", icon: "📋" },
    { key: "confirmed", label: "Confirmed", icon: "✅" },
    { key: "preparing", label: "Preparing", icon: "☕" },
    { key: "ready", label: "Ready", icon: "🔔" },
    { key: "delivered", label: "Delivered", icon: "🎉" },
];

const AUTO_ADVANCE_MS = [0, 4000, 10000, 20000, 35000];

// ── Toast Component ───────────────────────────────────────────────────────────
const Toast = ({ message, icon, onClose }) => {
    useEffect(() => {
        const t = setTimeout(onClose, 5000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className="bg-[#3C2A21] text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] border-l-4 border-[#ECB176] pointer-events-auto animate-[slideIn_0.3s_ease-out]">
            <div className="text-3xl bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ECB176] mb-0.5">Order Update</p>
                <p className="font-bold text-sm leading-tight">{message}</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white text-lg">✕</button>
        </div>
    );
};

export const OrderNotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const trackedOrders = React.useRef(new Set());

    const playDing = () => {
        try {
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.volume = 0.4;
            audio.play();
        } catch (e) { }
    };

    const addNotification = useCallback((msg, icon) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, msg, icon }]);
        playDing();
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    // Monitor orders and set up simulations
    useEffect(() => {
        if (!user) {
            trackedOrders.current.clear();
            return;
        }

        const checkAndSimulate = async () => {
            try {
                const res = await api.get('/api/orders', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                const all = res.data?.data || res.data || [];
                const mine = all.filter(o =>
                    o.customerEmail === user.email ||
                    o.userEmail === user.email ||
                    o.user === user._id
                );

                mine.forEach(order => {
                    const orderId = order.orderNumber || order._id;
                    if (trackedOrders.current.has(orderId)) return;

                    // Mark as tracked
                    trackedOrders.current.add(orderId);

                    const currentIdx = STATUS_STEPS.findIndex(s => s.key === order.status);
                    if (currentIdx >= 0 && currentIdx < STATUS_STEPS.length - 1) {
                        // Set up future status changes
                        for (let i = currentIdx + 1; i < STATUS_STEPS.length; i++) {
                            const delay = AUTO_ADVANCE_MS[i] - (currentIdx >= 0 ? AUTO_ADVANCE_MS[currentIdx] : 0);
                            if (delay > 0) {
                                setTimeout(async () => {
                                    const nextStep = STATUS_STEPS[i];
                                    try {
                                        await api.put(`/api/orders/${orderId}/status`, { status: nextStep.key });
                                    } catch (e) { }
                                    addNotification(`Order #${orderId.slice(-6).toUpperCase()}: ${nextStep.label}`, nextStep.icon);
                                }, delay);
                            }
                        }
                    }
                });
            } catch (e) { }
        };

        checkAndSimulate();
        // Check every 30 seconds for new orders
        const interval = setInterval(checkAndSimulate, 30000);
        return () => clearInterval(interval);
    }, [user, addNotification]);

    return (
        <OrderNotificationContext.Provider value={{ addNotification }}>
            {children}

            {/* Global Toasts UI */}
            <div className="fixed bottom-10 right-5 sm:right-10 z-[9999] flex flex-col gap-3 pointer-events-none">
                {notifications.map(n => (
                    <Toast
                        key={n.id}
                        message={n.msg}
                        icon={n.icon}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}} />
        </OrderNotificationContext.Provider>
    );
};
