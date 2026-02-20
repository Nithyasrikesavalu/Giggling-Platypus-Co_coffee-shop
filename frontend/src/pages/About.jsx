import Navbar from "../Teashop/Navbar";
import About from "../Teashop/About";
import Footer from "../Teashop/footer";

function AboutPage() {
    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="h-24"></div> {/* Spacing for sticky navbar */}
            <About />
            <Footer />
        </div>
    );
}

export default AboutPage;
