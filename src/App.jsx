import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { seedProperties } from './seed';

function App() {
  useEffect(() => {
    seedProperties();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-secondary-dark text-white flex flex-col">
          <Navbar />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/book/:id" element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              } />
              <Route path="/payment/:bookingId" element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              } />
              <Route path="/confirmation/:bookingId" element={
                <PrivateRoute>
                  <ConfirmationPage />
                </PrivateRoute>
              } />
              <Route path="/my-bookings" element={
                <PrivateRoute>
                  <MyBookingsPage />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
