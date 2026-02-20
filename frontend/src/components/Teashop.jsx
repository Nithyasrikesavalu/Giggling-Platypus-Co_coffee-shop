

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Teashop() {
    const navigate = useNavigate();

    const handleclick = () => {
        navigate("/cards");
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, []);

    return (
        <div>
            
            {/* Only Button */}
            <button 
                className="mt-4 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                onClick={handleclick}
            >
                🍃 View Full Menu
            </button>
        </div>
    );
}

export default Teashop;