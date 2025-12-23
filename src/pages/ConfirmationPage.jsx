import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle, Calendar, Users, MapPin, Printer, Download, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const docRef = doc(db, "visits", bookingId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBooking(docSnap.data());
                }
            } catch (err) {
                console.log("Using mock data for confirmation");
            }
        };
        fetchBooking();
    }, [bookingId]);

    return (
        <div className="py-24 max-w-4xl mx-auto px-8 text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center mb-12"
            >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle size={48} />
                </div>
                <h2 className="text-4xl font-serif font-bold mb-4">Visit Confirmed!</h2>
                <p className="text-gray-400">Your private tour has been successfully scheduled. See your visit pass below.</p>
            </motion.div>

            {/* Digital Visit Pass */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white text-secondary-dark rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 max-w-lg mx-auto"
            >
                <div className="gold-gradient p-8 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-2xl font-serif font-bold mb-1">DIGITAL VISIT PASS</h3>
                    <p className="text-xs font-bold opacity-70 tracking-tighter uppercase">HomeVisit Premium Membership ID: {bookingId?.substring(0, 8).toUpperCase()}</p>
                </div>

                <div className="p-8 text-left space-y-8">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estate Name</p>
                            <p className="font-serif font-bold text-lg">The Golden Horizon Estate</p>
                            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                <MapPin size={12} /> Malibu, California
                            </div>
                        </div>
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                            <QrCode size={48} className="text-secondary-dark" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-b border-gray-100 pb-6">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Visitor</p>
                            <p className="font-bold">{booking?.visitorName || "John Doe"}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                            <p className="font-bold flex items-center gap-2">
                                <Calendar size={14} className="text-primary" />
                                {booking?.visitDate || "Dec 28, 2025"}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Group Size</p>
                            <p className="font-bold flex items-center gap-2">
                                <Users size={14} className="text-primary" />
                                {booking?.visitorsCount || 2} Persons
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold border border-green-200 uppercase">Confirmed</span>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 italic">
                        Please present this pass at the gate. Security will verify your ID and phone number.
                    </div>
                </div>
            </motion.div>

            <div className="mt-12 flex gap-4 justify-center">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold">
                    <Printer size={18} /> Print Pass
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold">
                    <Download size={18} /> Download PDF
                </button>
                <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-secondary-dark text-sm font-bold">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ConfirmationPage;
