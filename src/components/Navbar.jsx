import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Compass, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return location.pathname === path ? "text-primary-light font-bold" : "text-gray-300 hover:text-primary-light";
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] h-20 flex items-center px-8 border-b border-primary/10 transition-colors duration-300 ${isOpen ? 'bg-secondary-dark' : 'glass-morphism'}`}>
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 relative z-50">
                    <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Home className="text-secondary-dark" size={24} />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight">
                        Home<span className="text-primary-light">Visit</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className={`relative group font-medium transition-colors pb-1 ${isActive('/')} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-light after:transition-all after:duration-300 hover:after:w-full`}>
                        Home
                    </Link>
                    <Link to="/properties" className={`relative group font-medium transition-colors pb-1 ${isActive('/properties')} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-light after:transition-all after:duration-300 hover:after:w-full`}>
                        Properties
                    </Link>
                    <Link to="/my-bookings" className={`relative group font-medium transition-colors pb-1 ${isActive('/my-bookings')} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-light after:transition-all after:duration-300 hover:after:w-full`}>
                        My Bookings
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <>
                            <div className="relative group">
                                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary-light font-bold text-sm tracking-wider cursor-pointer">
                                    {(() => {
                                        if (currentUser.displayName) {
                                            const names = currentUser.displayName.split(' ');
                                            return names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
                                        }
                                        const emailName = currentUser.email.split('@')[0];
                                        return emailName.substring(0, 2).toUpperCase();
                                    })()}
                                </div>
                                <div className="absolute top-12 right-0 w-max px-3 py-1.5 rounded-lg bg-secondary-dark border border-primary/20 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl z-50">
                                    {currentUser.email}
                                    <div className="absolute -top-1 right-3 w-2 h-2 bg-secondary-dark border-t border-l border-primary/20 transform rotate-45"></div>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-primary-light transition-colors text-sm font-bold">
                                <LogOut size={18} />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="gold-gradient text-secondary-dark px-5 py-2 rounded-full font-bold hover:opacity-90 transition-opacity text-sm">
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-300 hover:text-primary-light transition-colors relative z-50 p-2"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ backgroundColor: '#030712' }} // Force solid background
                        className="fixed inset-0 top-20 z-40 md:hidden flex flex-col p-8 border-t border-primary/20"
                    >
                        <div className="flex flex-col gap-4 text-xl font-serif">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`block w-full px-4 py-3 rounded-xl transition-all duration-300 border-b ${location.pathname === '/' ? 'bg-primary-light text-secondary-dark font-bold pl-6 border-transparent shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-white/5 text-gray-300 hover:bg-primary-light hover:text-secondary-dark hover:pl-6 hover:border-transparent'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/properties"
                                onClick={() => setIsOpen(false)}
                                className={`block w-full px-4 py-3 rounded-xl transition-all duration-300 border-b ${location.pathname === '/properties' ? 'bg-primary-light text-secondary-dark font-bold pl-6 border-transparent shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-white/5 text-gray-300 hover:bg-primary-light hover:text-secondary-dark hover:pl-6 hover:border-transparent'}`}
                            >
                                Properties
                            </Link>
                            <Link
                                to="/my-bookings"
                                onClick={() => setIsOpen(false)}
                                className={`block w-full px-4 py-3 rounded-xl transition-all duration-300 border-b ${location.pathname === '/my-bookings' ? 'bg-primary-light text-secondary-dark font-bold pl-6 border-transparent shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'border-white/5 text-gray-300 hover:bg-primary-light hover:text-secondary-dark hover:pl-6 hover:border-transparent'}`}
                            >
                                My Bookings
                            </Link>

                            {currentUser ? (
                                <div className="flex flex-col gap-4 mt-2">
                                    <div className="flex items-center gap-3 text-primary-light px-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center font-bold text-sm tracking-wider">
                                            {(() => {
                                                if (currentUser.displayName) {
                                                    const names = currentUser.displayName.split(' ');
                                                    return names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
                                                }
                                                const emailName = currentUser.email.split('@')[0];
                                                return emailName.substring(0, 2).toUpperCase();
                                            })()}
                                        </div>
                                        <span className="text-sm">{currentUser.email}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full px-4 py-3 rounded-xl text-left"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="gold-gradient text-secondary-dark px-5 py-3 rounded-xl font-bold text-center mt-4">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
