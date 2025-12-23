import { MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPriceToINR } from '../utils/formatPrice';
import { useState } from 'react';

const PropertyCard = ({ property }) => {
    const [imgSrc, setImgSrc] = useState(property.image);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group bg-secondary-light rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-300"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={imgSrc}
                    alt={property.title}
                    onError={() => setImgSrc("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-secondary-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-light border border-primary/20">
                    {property.type}
                </div>
                <div className="absolute bottom-4 right-4 gold-gradient px-4 py-1.5 rounded-lg text-secondary-dark font-bold text-lg shadow-lg">
                    {formatPriceToINR(property.price)}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                    {property.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                    <MapPin size={14} className="text-primary-light" />
                    {property.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="bg-primary/5 text-primary-light text-[10px] px-2 py-1 rounded border border-primary/10">
                            {amenity}
                        </span>
                    ))}
                    {property.amenities.length > 3 && (
                        <span className="bg-primary/5 text-primary-light text-[10px] px-2 py-1 rounded border border-primary/10">
                            +{property.amenities.length - 3}
                        </span>
                    )}
                </div>

                <Link
                    to={`/property/${property.id || 'test-id'}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary/20 text-white font-semibold group-hover:bg-primary-light group-hover:text-secondary-dark transition-all duration-300"
                >
                    View Details
                    <ArrowRight size={18} />
                </Link>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
