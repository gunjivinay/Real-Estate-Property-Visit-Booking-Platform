import { ArrowRight, Star, Shield, Clock, Home, Building2, Key, MapPin, ShieldCheck, Wallet, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ImageCarousel from '../components/ImageCarousel';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom easing for premium feel
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const LandingPage = () => {
    return (
        <div className="relative overflow-hidden bg-secondary-dark font-sans">
            {/* Hero Section */}
            {/* Increased bottom padding to pb-52 for better separation between CTA and Stats - Responsive adjust */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 md:pb-52 overflow-hidden">

                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-secondary-dark/95 to-secondary-dark"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
                </div>

                {/* Floating Icons Container */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <FloatingIcon icon={Home} top="12%" left="8%" delay={0} duration={4} size={36} />
                    <FloatingIcon icon={Building2} top="18%" right="12%" delay={1} duration={5} size={44} />
                    <FloatingIcon icon={Key} bottom="40%" left="15%" delay={0.5} duration={4.5} size={32} />
                    <FloatingIcon icon={MapPin} top="28%" right="28%" delay={2} duration={6} size={28} />
                    <FloatingIcon icon={ShieldCheck} bottom="35%" right="18%" delay={1.5} duration={5.5} size={40} />
                    <FloatingIcon icon={Wallet} top="48%" left="6%" delay={2.5} duration={5} size={34} />
                    <FloatingIcon icon={Award} bottom="42%" right="8%" delay={3} duration={6.5} size={38} />
                    <FloatingIcon icon={Users} top="15%" left="22%" delay={1.2} duration={4.8} size={30} />
                </div>

                {/* Main Content */}
                <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeInUp} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/20 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <span className="text-primary-light font-extrabold tracking-[0.2em] uppercase text-xs">Exquisite Living Redefined</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-white tracking-tight drop-shadow-2xl">
                            Find Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-[#FFD700] to-primary-light drop-shadow-lg bg-[length:200%_auto] animate-gradient">
                                Signature Home
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
                            Unlock a world of exclusive properties. From modern urban penthouses to serene coastal villas, we bridge the gap between you and your dream lifestyle.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/properties"
                                className="group relative px-8 py-4 bg-primary-light text-secondary-dark rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Exploring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>

                            {/* Showreel Button with Hover Glow */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/20 hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-3 backdrop-blur-md"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1 relative z-10"></div>
                                </div>
                                Watch Showreel
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Stats - Integrated cleanly */}
                <div className="relative md:absolute bottom-auto md:bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-secondary-dark via-secondary-dark/95 to-transparent pb-12 pt-12 md:pt-32 pointer-events-none mt-20 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-y-10 gap-x-4 md:flex md:flex-wrap md:justify-between text-center md:text-left pt-8 pointer-events-auto"
                    >
                        <StatItem number={250} label="Premium Estates" suffix="+" delay={0} />
                        <StatItem number={120} label="Global Cities" suffix="" delay={0.1} />
                        <StatItem number={4500} label="Happy Clients" suffix="+" delay={0.2} />
                        <StatItem number={5} label="Star Rating" suffix=".0" delay={0.3} />
                    </motion.div>
                </div>
            </section>

            {/* Auto-Rotating Image Carousel */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <ImageCarousel />
            </motion.div>

            {/* Features Section */}
            <section className="py-24 bg-black/40 backdrop-blur-sm relative z-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Star, title: "Premium Selection", desc: "Only the most exclusive properties make our list." },
                            { icon: Shield, title: "Secure Booking", desc: "Advanced security for your property visits." },
                            { icon: Clock, title: "Easy Scheduling", desc: "Select a time that works for you, instantly." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group p-8 rounded-3xl border border-white/5 bg-secondary-light/10 hover:bg-secondary-light/30 transition-colors duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary-light mb-6 group-hover:scale-110 transition-transform shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)]">
                                    <feature.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-4 text-white group-hover:text-primary-light transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components - Updated for MAX VISIBILITY
const FloatingIcon = ({ icon: Icon, top, left, right, bottom, delay, duration, size }) => (
    <motion.div
        className="absolute text-primary-light hidden md:block" // Hidden on mobile
        style={{ top, left, right, bottom }}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.3, 0.2] // Reduced opacity to ~30%
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        {/* Added stronger border, background brightness, and shadow */}
        <div className="p-4 rounded-3xl border-2 border-black bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Icon size={size} strokeWidth={2} /> {/* Thicker stroke */}
        </div>
    </motion.div>
);

const StatItem = ({ number, label, suffix, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            className="flex flex-col items-center md:items-start group hover:scale-105 transition-transform duration-300"
        >
            <div className="flex items-baseline text-3xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-xl">
                <Counter from={0} to={number} />
                <span className="text-primary-light dropdown-shadow-md ml-1">{suffix}</span>
            </div>
            <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-[0.25em] font-bold group-hover:text-primary-light transition-colors text-center md:text-left">{label}</p>
        </motion.div>
    );
};

const Counter = ({ from, to }) => {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(from, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            }
        });
        return () => controls.stop();
    }, [from, to]);

    return <span ref={nodeRef} />;
};

export default LandingPage;
