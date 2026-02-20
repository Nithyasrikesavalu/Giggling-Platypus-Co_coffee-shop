import React from 'react';

const MenuCard = ({ item, onAddToCart, onBuyNow, isAdded }) => {
    const isAvailable = item.available !== false;

    return (
        <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/3C2A21/ECB176?text=${encodeURIComponent(item.name)}`;
                    }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-[#3C2A21]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {item.category}
                    </span>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-md ${isAvailable
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-rose-500/90 text-white'
                        }`}>
                        {isAvailable ? 'Available' : 'Out of Stock'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-[#3C2A21] group-hover:text-[#6F4E37] transition-colors leading-tight">
                            {item.name}
                        </h3>
                        <span className="text-xl font-bold text-[#6F4E37]">₹{item.price}</span>
                    </div>
                    <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">{item.type}</p>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Actions */}
                <div className="space-y-3 mt-4">
                    <button
                        onClick={() => onAddToCart(item)}
                        disabled={!isAvailable}
                        className={`w-full py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 border-2 ${!isAvailable
                            ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                            : isAdded
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-transparent border-[#3C2A21] text-[#3C2A21] hover:bg-[#3C2A21] hover:text-white'
                            }`}
                    >
                        {isAdded ? (
                            <>
                                <span>✓</span>
                                <span>Added</span>
                            </>
                        ) : (
                            <>
                                <span>Add to Cart</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => onBuyNow(item)}
                        disabled={!isAvailable}
                        className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${!isAvailable
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                            : 'bg-[#6F4E37] text-white hover:bg-[#3C2A21] shadow-[#6F4E37]/30'
                            }`}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
