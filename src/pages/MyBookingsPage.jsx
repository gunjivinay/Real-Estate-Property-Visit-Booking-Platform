import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPriceToINR } from '../utils/formatPrice';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
};

const MyBookingsPage = () => {
    const { currentUser } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!currentUser) return;

            try {
                // 1. Get all visits for this user
                const q = query(
                    collection(db, "visits"),
                    where("userId", "==", currentUser.uid)
                );
                const querySnapshot = await getDocs(q);

                const visitsData = [];

                // 2. For each visit, fetch the property details
                for (const docSnapshot of querySnapshot.docs) {
                    const visit = { id: docSnapshot.id, ...docSnapshot.data() };

                    if (visit.propertyId) {
                        try {
                            const propertyDoc = await getDoc(doc(db, "properties", visit.propertyId));
                            if (propertyDoc.exists()) {
                                visit.property = propertyDoc.data();
                            }
                        } catch (err) {
                            console.error("Error fetching property for visit", visit.id, err);
                        }
                    }
                    visitsData.push(visit);
                }

                setBookings(visitsData);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] pt-24">
                <div className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="py-24 max-w-7xl mx-auto px-8 min-h-[80vh]">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-serif font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-light to-white w-max"
            >
                My Bookings
            </motion.h1>

            {bookings.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-secondary-light/10 rounded-3xl border border-white/5 backdrop-blur-sm"
                >
                    <Calendar className="mx-auto mb-4 text-gray-500" size={48} />
                    <p className="text-xl text-gray-300 mb-6 font-light">You haven't scheduled any visits yet.</p>
                    <Link to="/properties" className="px-8 py-3 bg-primary text-secondary-dark rounded-full font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                        Browse Properties
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-6"
                >
                    {bookings.map((booking) => (
                        <motion.div
                            key={booking.id}
                            variants={item}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                            className="glass-morphism p-6 rounded-2xl border border-primary/20 flex flex-col md:flex-row gap-6 items-start md:items-center transition-colors group relative overflow-hidden"
                        >
                            {/* Subtle Glow Effect on Hover */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Property Image */}
                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 shadow-md relative z-10">
                                {booking.property ? (
                                    <img
                                        src={booking.property.image}
                                        alt={booking.property.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 text-xs">Property Image Unavailable</div>
                                )}
                            </div>

                            {/* Booking Details */}
                            <div className="flex-grow space-y-2 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        }`}>
                                        {booking.status}
                                    </span>
                                    <span className="text-gray-500 text-xs font-mono">
                                        #{booking.id.slice(0, 8).toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-serif text-white group-hover:text-primary-light transition-colors">
                                    {booking.property ? booking.property.title : "Unknown Property"}
                                </h3>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-md">
                                        <Calendar size={14} className="text-primary-light" />
                                        {booking.visitDate}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-md">
                                        <MapPin size={14} className="text-primary-light" />
                                        {booking.property ? booking.property.location : "Location N/A"}
                                    </div>
                                    {booking.amount && (
                                        <div className="flex items-center gap-1.5 text-primary-light font-bold bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                                            <CreditCard size={14} />
                                            {formatPriceToINR(booking.amount).replace(/(\.00)+$/, '')} Paid
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="w-full md:w-auto flex flex-col gap-3 relative z-10">
                                <Link
                                    to={`/confirmation/${booking.id}`}
                                    className="px-6 py-2 rounded-lg border border-primary/20 text-sm font-bold text-center hover:bg-primary text-primary-light hover:text-black transition-all hover:scale-105"
                                >
                                    View Pass
                                </Link>
                                {booking.propertyId && (
                                    <Link
                                        to={`/property/${booking.propertyId}`}
                                        className="text-gray-500 text-xs text-center hover:text-white transition-colors flex items-center justify-center gap-1"
                                    >
                                        View Property <span className="text-[10px]">→</span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default MyBookingsPage;
