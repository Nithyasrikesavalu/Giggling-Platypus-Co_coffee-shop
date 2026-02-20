import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate("/");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/orders");
                setOrders(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const updateStatus = async (orderNumber, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderNumber}/status`, { status: newStatus });
            setOrders(orders.map(o => o.orderNumber === orderNumber ? { ...o, status: newStatus } : o));
        } catch (error) {
            alert("Error updating status");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin - Orders Dashboard</h1>
                        <div className="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold">
                            Total Orders: {orders.length}
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden p-6 border-l-8 border-amber-500">
                                <div className="flex flex-wrap justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order Number</p>
                                        <p className="text-lg font-mono font-bold text-amber-900">{order.orderNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Customer</p>
                                        <p className="font-bold">{order.customerName}</p>
                                        <p className="text-xs text-gray-400">{order.customerEmail}</p>
                                    </div>
                                </div>

                                <div className="border-t border-b border-gray-100 py-4 my-4">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Items:</h3>
                                    <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <img src={item.image} className="w-10 h-10 object-cover rounded-md" />
                                                    <span>{item.name} x {item.quantity}</span>
                                                </div>
                                                <span className="font-bold">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-between items-center gap-4">
                                    <div className="text-xl font-bold text-amber-600">
                                        Total Amount: ₹{order.totalAmount}
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.orderNumber, e.target.value)}
                                            className="border rounded-lg px-3 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminDashboard;
