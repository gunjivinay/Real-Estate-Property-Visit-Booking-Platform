import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Check, Info } from 'lucide-react';
import { formatPriceToINR } from '../utils/formatPrice';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const docRef = doc(db, "properties", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProperty(docSnap.data());
                } else {
                    console.log("No such property!");
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <div className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen pt-20 text-center px-4">
                <h2 className="text-2xl font-serif font-bold mb-4">Property Not Found</h2>
                <Link to="/properties" className="text-primary-light hover:underline">Back to Properties</Link>
            </div>
        );
    }

    return (
        <div className="pb-24">
            {/* Banner */}
            <div className="h-[60vh] relative">
                <img src={property.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="bg-primary-light text-secondary-dark px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">{property.type}</span>
                            <h1 className="text-5xl font-serif font-bold mb-4">{property.title}</h1>
                            <div className="flex items-center gap-2 text-gray-300">
                                <MapPin size={20} className="text-primary-light" />
                                {property.location}
                            </div>
                        </div>
                        <div className="bg-secondary-light/80 backdrop-blur-xl p-8 rounded-3xl border border-primary/20">
                            <div className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Estimated Price</div>
                            <div className="text-4xl font-bold text-primary-light">
                                {formatPriceToINR(property.price)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 border-b border-primary/10 pb-4">Description</h2>
                        <p className="text-gray-400 leading-loose text-lg">
                            {property.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-6 border-b border-primary/10 pb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {property.amenities.map((amenity, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-400">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary-light">
                                        <Check size={16} />
                                    </div>
                                    <span className="text-sm">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-32 glass-morphism p-8 rounded-3xl space-y-8 border-primary/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-secondary-dark">
                                <Info size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Book a Site Visit</h3>
                                <p className="text-xs text-gray-500 italic">Fee: ₹5,000 (Refundable on purchase)</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed">
                            Experience the grandeur in person. Schedule a private tour with our senior luxury consultant.
                        </p>

                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3"><Check size={16} className="text-primary-light" /> Private Limousine Pickup</li>
                            <li className="flex items-center gap-3"><Check size={16} className="text-primary-light" /> Personalized Tour</li>
                            <li className="flex items-center gap-3"><Check size={16} className="text-primary-light" /> Investment Briefing</li>
                        </ul>

                        <Link
                            to={`/book/${id}`}
                            className="block w-full text-center gold-gradient text-secondary-dark py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                        >
                            Book Site Visit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
