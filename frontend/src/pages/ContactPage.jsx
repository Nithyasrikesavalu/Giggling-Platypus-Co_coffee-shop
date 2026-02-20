import Navbar from "../Teashop/Navbar";
import Contact from "../Teashop/Contact";
import Footer from "../Teashop/footer";

function ContactPage() {
    return (
        <div className="bg-[#FAF3E0] min-h-screen">
            <Navbar />
            <div className="h-24"></div> {/* Spacing for sticky navbar */}
            <Contact />
            <Footer />
        </div>
    );
}

export default ContactPage;
