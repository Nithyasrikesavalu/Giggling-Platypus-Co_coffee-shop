import Navbar from "../Teashop/Navbar";
import Banner from "../Teashop/Banner";
import About from "../Teashop/About";
import Footer from "../Teashop/footer";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#FAF3E0]">
            <Navbar />
            <Banner />

            {/* Featured Menu Teaser */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto text-center">
                    <h2 className="text-[#6F4E37] font-bold text-sm uppercase tracking-[0.3em] mb-4">Taste the excellence</h2>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#3C2A21] mb-12">Our Favorite Brews</h1>
                    <p className="max-w-xl mx-auto text-[#3C2A21]/60 mb-12 font-light">
                        Explore our handpicked selection of artisanal coffees and exotic teas. Each brew is a masterpiece of flavor and aroma.
                    </p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="bg-[#3C2A21] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#6F4E37] transition-all shadow-xl"
                    >
                        View Full Menu
                    </button>
                </div>
            </section>

            {/* About Teaser */}
            <div className="bg-white/50">
                <About />
            </div>

            <Footer />
        </div>
    );
}

export default Home;
