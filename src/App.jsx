import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import { useApp } from './context/AppContext'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import Booking from './pages/Booking'
import Track from './pages/Track'

import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminServices from './pages/admin/Services'
import AdminBookings from './pages/admin/Bookings'
import AdminEnquiries from './pages/admin/Enquiries'
import AdminCustomers from './pages/admin/Customers'

function PageFrame({ children }) {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            {children}
        </motion.div>
    )
}

function CustomerLayout({ children }) {
    return (
        <>
            <Navbar />
            <PageFrame>{children}</PageFrame>
            <Footer />
        </>
    )
}

function ProtectedAdmin() {
    const { admin } = useApp()

    return admin ? <AdminLayout /> : <Navigate to="/admin/login" replace />
}

export default function App() {
    const { currentUser } = useApp()

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <CustomerLayout>
                            <Home />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/about"
                    element={
                        <CustomerLayout>
                            <About />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/services"
                    element={
                        <CustomerLayout>
                            <Services />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <CustomerLayout>
                            <Contact />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <CustomerLayout>
                            <Auth mode="login" />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <CustomerLayout>
                            <Auth mode="register" />
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/booking"
                    element={
                        <CustomerLayout>
                            {currentUser ? (
                                <Booking />
                            ) : (
                                <Auth mode="login" bookingRedirect />
                            )}
                        </CustomerLayout>
                    }
                />

                <Route
                    path="/track"
                    element={
                        <CustomerLayout>
                            <Track />
                        </CustomerLayout>
                    }
                />

                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" element={<ProtectedAdmin />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="enquiries" element={<AdminEnquiries />} />
                    <Route path="customers" element={<AdminCustomers />} />
                </Route>

                <Route
                    path="*"
                    element={
                        <CustomerLayout>
                            <div className="container-wide py-32 text-center">
                                <h1 className="font-display text-4xl font-bold">
                                    Page not found
                                </h1>
                                <p className="mt-3 text-gray-500">
                                    That page seems to have wandered off backstage.
                                </p>
                            </div>
                        </CustomerLayout>
                    }
                />
            </Routes>

            {/* Floating scroll-to-top button */}
            <ScrollToTop />
        </>
    )
}