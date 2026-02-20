import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/menu");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate("/orders");
        } else {
            // Check if user doesn't exist → redirect to register
            const msg = result.message || "";
            if (
                msg.toLowerCase().includes("not found") ||
                msg.toLowerCase().includes("no account") ||
                msg.toLowerCase().includes("invalid email") ||
                msg.toLowerCase().includes("invalid email or password")
            ) {
                setError("⚠️ Account not found! Please create an account first.");
            } else {
                setError(msg || "Login failed. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#f5e6cc] to-[#ede0c8] flex items-center justify-center p-4 pt-28">
                <div className="max-w-md w-full">
                    {/* Card */}
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#6F4E37]/10 p-10">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-[#3C2A21] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <span className="text-3xl">☕</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#3C2A21]">Welcome Back!</h2>
                            <p className="text-stone-400 mt-2 text-sm">Sign in to continue your journey</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6 text-sm font-medium flex flex-col items-center gap-3">
                                <span>{error}</span>
                                {error.includes("Account not found") && (
                                    <Link
                                        to="/register"
                                        className="bg-[#3C2A21] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#6F4E37] transition-all"
                                    >
                                        → Create Account
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-stone-100 focus:border-[#6F4E37] focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-stone-100 focus:border-[#6F4E37] focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#3C2A21]/20 transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Signing in...
                                    </span>
                                ) : "Sign In"}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-8 text-center">
                            <p className="text-stone-400 text-sm">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-[#6F4E37] font-bold hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
