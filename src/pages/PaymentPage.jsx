import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CreditCard, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentPage = () => {
    const { bookingId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const docRef = doc(db, "visits", bookingId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBookingDetails(docSnap.data());
                }
            } catch (err) {
                console.log("Using mock data for payment display");
            }
        };
        fetchBooking();
    }, [bookingId]);

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment delay
        await new Promise(r => setTimeout(r, 2000));

        try {
            const docRef = doc(db, "visits", bookingId);
            await updateDoc(docRef, {
                status: "Confirmed",
                paymentId: "PAY_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
                amount: 5000,
                currency: "INR",
                paidAt: new Date()
            });
        } catch (err) {
            console.log("Mock payment success notification");
        }

        setLoading(false);
        navigate(`/confirmation/${bookingId}`);
    };

    return (
        <div className="py-24 max-w-5xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                <h2 className="text-4xl font-serif font-bold">Secure Checkout</h2>
                <div className="bg-secondary-light/50 p-6 rounded-2xl border border-primary/10">
                    <h3 className="text-primary-light font-bold mb-4 uppercase tracking-wider text-xs">Summary</h3>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Visit Fee</span>
                        <span className="text-2xl font-bold">₹5,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 italic">
                        <span>* Fully refundable upon property purchase</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-secondary-light/30 text-gray-400">
                        <ShieldCheck className="text-primary-light" />
                        <span className="text-sm">Bank-level encryption security</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-secondary-light/30 text-gray-400">
                        <Lock className="text-primary-light" />
                        <span className="text-sm">Your data is never shared with 3rd parties</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-morphism p-10 rounded-3xl border-primary/20"
            >
                <div className="flex items-center justify-between mb-8">
                    <CreditCard className="text-primary-light" size={32} />
                    <div className="flex gap-2">
                        <div className="w-8 h-5 bg-gray-700 rounded"></div>
                        <div className="w-8 h-5 bg-gray-700 rounded"></div>
                        <div className="w-8 h-5 bg-gray-700 rounded"></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Card Holder</label>
                        <input type="text" placeholder="NAME ON CARD" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary-light transition-colors font-mono" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary-light transition-colors font-mono" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                            <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary-light transition-colors font-mono" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">CVC</label>
                            <input type="password" placeholder="***" className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-primary-light transition-colors font-mono" />
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full gold-gradient text-secondary-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
                    >
                        {loading ? "Verifying Transaction..." : "Pay ₹5,000 Now"}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentPage;
