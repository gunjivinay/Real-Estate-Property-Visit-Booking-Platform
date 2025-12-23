import { Home, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-dark border-t border-primary/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 gold-gradient rounded flex items-center justify-center">
                                <Home className="text-secondary-dark" size={18} />
                            </div>
                            <span className="text-xl font-serif font-bold tracking-tight">
                                Home<span className="text-primary-light">Visit</span>
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Curating the world's most exquisite properties for your next visit. Luxury, comfort, and elegance in every booking.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-primary-light font-bold mb-6 uppercase tracking-wider text-xs">Explore</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All Properties</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Residential</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Commercial</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Luxury Villas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary-light font-bold mb-6 uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-primary-light font-bold mb-6 uppercase tracking-wider text-xs">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3 text-gray-400"><Mail size={16} /> contact@homevisit.com</li>
                            <li className="flex items-center gap-3 text-gray-400"><Phone size={16} /> +1 (555) LUX-HOME</li>
                            <li className="flex items-center gap-3 text-gray-400"><MapPin size={16} /> Beverly Hills, CA 90210</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary/5 pt-8 text-center text-gray-500 text-xs">
                    <p>© {new Date().getFullYear()} HomeVisit. Designed for excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
