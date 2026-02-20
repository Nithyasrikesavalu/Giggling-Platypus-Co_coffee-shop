import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Teashop/Navbar";
import Footer from "../Teashop/footer";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/menu");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Password match check
        if (formData.password !== formData.confirmPassword) {
            return setError("❌ Passwords do not match!");
        }

        // Password length check
        if (formData.password.length < 6) {
            return setError("❌ Password must be at least 6 characters.");
        }

        setLoading(true);
        const result = await register(formData.name, formData.email, formData.password);
        setLoading(false);

        if (result.success) {
            navigate("/menu");
        } else {
            const msg = result.message || "";
            // Duplicate email check
            if (
                msg.toLowerCase().includes("already exists") ||
                msg.toLowerCase().includes("duplicate") ||
                msg.toLowerCase().includes("already registered")
            ) {
                setError("⚠️ This email is already registered! Please login instead.");
            } else {
                setError(msg || "Registration failed. Please try again.");
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
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#3C2A21] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <span className="text-3xl">🫘</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#3C2A21]">Create Account</h2>
                            <p className="text-stone-400 mt-2 text-sm">Join us and start your coffee journey</p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-5 text-sm font-medium flex flex-col items-center gap-3">
                                <span>{error}</span>
                                {error.includes("already registered") && (
                                    <Link
                                        to="/login"
                                        className="bg-[#3C2A21] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#6F4E37] transition-all"
                                    >
                                        → Go to Login
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-2xl mb-5 text-sm font-medium text-center">
                                {success}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-stone-100 focus:border-[#6F4E37] focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-stone-100 focus:border-[#6F4E37] focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 rounded-2xl border-2 border-stone-100 focus:border-[#6F4E37] focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300"
                                    placeholder="Min. 6 characters"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#3C2A21] mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-5 py-3.5 rounded-2xl border-2 focus:outline-none transition-colors bg-stone-50 text-[#3C2A21] placeholder-stone-300 ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                        ? "border-red-300 focus:border-red-400"
                                        : formData.confirmPassword && formData.password === formData.confirmPassword
                                            ? "border-emerald-300 focus:border-emerald-400"
                                            : "border-stone-100 focus:border-[#6F4E37]"
                                        }`}
                                    placeholder="••••••••"
                                    required
                                />
                                {/* Real-time password match indicator */}
                                {formData.confirmPassword && (
                                    <p className={`text-xs mt-1.5 font-medium ${formData.password === formData.confirmPassword
                                        ? "text-emerald-500"
                                        : "text-red-400"
                                        }`}>
                                        {formData.password === formData.confirmPassword
                                            ? "✓ Passwords match"
                                            : "✗ Passwords don't match"}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#3C2A21] hover:bg-[#6F4E37] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#3C2A21]/20 transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Creating Account...
                                    </span>
                                ) : "Create Account"}
                            </button>
                        </form>

                        {/* Footer Link */}
                        <div className="mt-8 text-center">
                            <p className="text-stone-400 text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#6F4E37] font-bold hover:underline">
                                    Sign In
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

export default Register;
