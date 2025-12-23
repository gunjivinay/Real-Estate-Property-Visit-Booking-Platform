import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Calendar, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        visitorName: '',
        phone: '',
        visitDate: '',
        visitorsCount: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create a temporary booking ID if Firebase fails or just use Firestore
            const bookingRef = await addDoc(collection(db, "visits"), {
                propertyId: id,
                userId: currentUser?.uid,
                userEmail: currentUser?.email,
                ...formData,
                status: "Scheduled",
                createdAt: serverTimestamp()
            });

            navigate(`/payment/${bookingRef.id}`);
        } catch (error) {
            console.error("Booking error:", error);
            // Fallback for demo if Firebase not configured
            const mockId = Math.random().toString(36).substr(2, 9);
            navigate(`/payment/${mockId}?propertyId=${id}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-24 max-w-2xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-morphism p-10 rounded-3xl border-primary/20"
            >
                <h2 className="text-3xl font-serif font-bold mb-2">Schedule Your Visit</h2>
                <p className="text-gray-400 mb-10">Fill in your details to book a private tour of the estate.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary-light uppercase tracking-wider ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-light transition-colors"
                                value={formData.visitorName}
                                onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-primary-light uppercase tracking-wider ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                required
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-light transition-colors"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-light uppercase tracking-wider ml-1">Visit Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    required
                                    type="date"
                                    className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-light transition-colors text-gray-300"
                                    value={formData.visitDate}
                                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-primary-light uppercase tracking-wider ml-1">Visitors</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-light transition-colors"
                                    value={formData.visitorsCount}
                                    onChange={(e) => setFormData({ ...formData, visitorsCount: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full gold-gradient text-secondary-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Proceed to Payment"}
                        <ChevronRight size={20} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BookingPage;
