import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ImageCarousel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const q = query(collection(db, "properties"), limit(8));
                const querySnapshot = await getDocs(q);
                const fetchedImages = querySnapshot.docs.map(doc => doc.data().images?.[0]).filter(Boolean);

                // Start with fallbacks if needed
                const initialSet = fetchedImages.length > 0
                    ? fetchedImages
                    : [
                        "https://images.unsplash.com/photo-1600596542815-6000255adeba?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
                        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                    ];

                // Duplicate significantly for seamless loop
                // 3 sets is usually enough for standard 0 -> -33% loop, but 4 sets for 0 -> -50% is safer.
                setImages([...initialSet, ...initialSet, ...initialSet, ...initialSet]);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return null;

    return (
        <div className="w-[90%] mx-auto bg-secondary-dark/50 backdrop-blur-sm py-12 border-y border-white/5 overflow-hidden relative rounded-3xl mt-8">
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-secondary-dark to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-secondary-dark to-transparent z-10 pointer-events-none"></div>

            <div className="flex items-center">
                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50, // Slower for smoothness
                            ease: "linear",
                        },
                    }}
                >
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-64 h-40 md:w-80 md:h-52 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg"
                        >
                            <img
                                src={src}
                                alt={`Property ${index}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80";
                                }}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* REMOVED: Overlay div which was causing the yellow tint/hover effect
                             <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ImageCarousel;
