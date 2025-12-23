import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PropertyCard from '../components/PropertyCard';
import { properties as seedProperties } from '../seed';
import { Search, Filter, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const PropertiesPage = () => {
    const [properties, setProperties] = useState(seedProperties);
    const [filteredProperties, setFilteredProperties] = useState(seedProperties);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "properties"));
                if (!querySnapshot.empty) {
                    const fetchedProps = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setProperties(fetchedProps);
                    setFilteredProperties(fetchedProps);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        let result = properties;

        // Filter by Location
        if (searchTerm) {
            result = result.filter(prop =>
                prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prop.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by Price
        if (priceFilter !== "all") {
            const maxPrice = Number(priceFilter);
            result = result.filter(prop => prop.price <= maxPrice);
        }

        setFilteredProperties(result);
    }, [searchTerm, priceFilter, properties]);

    return (
        <div className="py-24 max-w-7xl mx-auto px-4 md:px-8 min-h-screen">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mb-12 flex flex-col items-center text-center"
            >
                <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-light to-white inline-block">
                    Our Exclusive Collection
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-400 mb-8 max-w-2xl text-sm md:text-base">
                    Discover the world's most luxurious estates across the globe. Each property is handpicked for its unique character and exceptional quality.
                </motion.p>

                {/* Search & Filter Section */}
                <motion.div
                    variants={fadeInDown}
                    className="w-full glass-morphism p-6 rounded-2xl border border-primary/20 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xl shadow-black/20"
                >
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-light" size={20} />
                        <input
                            type="text"
                            placeholder="Search location or property..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-secondary-dark/50 border border-primary/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary-light transition-all placeholder-gray-500 focus:ring-1 focus:ring-primary/20"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 text-primary-light font-medium self-start md:self-auto">
                            <Filter size={20} />
                            <span>Filter Price:</span>
                        </div>
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="w-full md:w-auto bg-secondary-dark/50 border border-primary/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-light transition-all cursor-pointer hover:bg-secondary-dark/70"
                        >
                            <option value="all">Any Price</option>
                            <option value="30000000">Under ₹3 Cr</option>
                            <option value="50000000">Under ₹5 Cr</option>
                            <option value="100000000">Under ₹10 Cr</option>
                            <option value="500000000">Under ₹50 Cr</option>
                        </select>
                    </div>
                </motion.div>
            </motion.div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <motion.div
                    layout
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((prop, index) => (
                                <motion.div
                                    layout
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={prop.id || index}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                >
                                    <PropertyCard property={prop} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 text-gray-500"
                            >
                                <MapPin className="mx-auto mb-4 opacity-50 text-primary-light" size={48} />
                                <p className="text-xl mb-4">No properties found matching your criteria.</p>
                                <button
                                    onClick={() => { setSearchTerm(""); setPriceFilter("all"); }}
                                    className="text-primary-light hover:text-white transition-colors underline underline-offset-4"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default PropertiesPage;
