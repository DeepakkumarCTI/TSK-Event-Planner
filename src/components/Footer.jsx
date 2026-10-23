import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Mail,
    Phone,
    ArrowUpRight,
    X,
    ShieldCheck,
    FileText,
} from 'lucide-react'

export default function Footer() {
    const [activePolicy, setActivePolicy] = useState(null)

    const policies = {
        privacy: {
            title: 'Privacy Policy',
            icon: ShieldCheck,
            intro:
                'At TSK Entertainment, we respect your privacy and are committed to protecting the information you share with us.',
            sections: [
                {
                    heading: '1. Information We Collect',
                    text: 'We may collect information such as your name, email address, phone number, event details, and other information you provide when contacting us or submitting a booking enquiry.',
                },
                {
                    heading: '2. How We Use Your Information',
                    text: 'Your information may be used to respond to enquiries, discuss event requirements, manage bookings, provide requested services, and communicate important updates.',
                },
                {
                    heading: '3. Sharing of Information',
                    text: 'We do not sell your personal information. We may share relevant details with service providers or event partners when necessary to coordinate the services you request.',
                },
                {
                    heading: '4. Data Protection',
                    text: 'We take reasonable steps to protect the information submitted to us. However, no method of electronic storage or transmission can be guaranteed to be completely secure.',
                },
                {
                    heading: '5. Cookies and Website Usage',
                    text: 'Our website or its hosting services may use cookies or similar technologies to support website functionality and understand website usage.',
                },
                {
                    heading: '6. Your Choices',
                    text: 'You may contact us to request access to, correction of, or deletion of personal information you have provided, subject to applicable legal requirements.',
                },
                {
                    heading: '7. Policy Updates',
                    text: 'We may update this Privacy Policy when our practices or requirements change. Any updated version will be published on this website.',
                },
                {
                    heading: '8. Contact Us',
                    text: 'For privacy-related questions, contact hello@tskentertainments.com or call +91 98765 43210.',
                },
            ],
        },
        terms: {
            title: 'Terms & Conditions',
            icon: FileText,
            intro:
                'By using the TSK Entertainment website or enquiring about our services, you agree to the following terms.',
            sections: [
                {
                    heading: '1. Services',
                    text: 'TSK Entertainment provides event planning, entertainment coordination, decorations, and related services, subject to availability and the agreed event requirements.',
                },
                {
                    heading: '2. Enquiries and Bookings',
                    text: 'Submitting an enquiry does not automatically confirm a booking. A booking is confirmed only after the requirements, availability, pricing, and applicable payment terms have been agreed upon.',
                },
                {
                    heading: '3. Pricing and Payments',
                    text: 'Prices may vary according to event location, date, duration, guest count, selected services, and other requirements. Any advance payment, balance payment, or additional charges will be communicated during the booking process.',
                },
                {
                    heading: '4. Changes and Cancellation',
                    text: 'Changes to event details, rescheduling, and cancellations are subject to the terms agreed upon for the specific booking. Please contact us as early as possible to discuss any changes.',
                },
                {
                    heading: '5. Customer Responsibilities',
                    text: 'Customers should provide accurate event information, communicate special requirements in advance, and ensure that venue access and any necessary permissions are arranged as agreed.',
                },
                {
                    heading: '6. Third-Party Services',
                    text: 'Some events may involve external performers, venues, vendors, or service providers. Their availability and applicable terms may affect the delivery of an event.',
                },
                {
                    heading: '7. Website Content',
                    text: 'Website descriptions, images, and examples are provided for general information. Final arrangements and deliverables depend on the services confirmed for your event.',
                },
                {
                    heading: '8. Events Beyond Our Control',
                    text: 'We will make reasonable efforts to coordinate agreed services. Circumstances beyond reasonable control, such as severe weather, venue restrictions, or emergencies, may require changes to event arrangements.',
                },
                {
                    heading: '9. Contact',
                    text: 'For questions about these terms or your booking, contact hello@tskentertainments.com or call +91 98765 43210.',
                },
            ],
        },
    }

    const closePolicy = () => setActivePolicy(null)

    return (
        <>
            <footer className="bg-[#17121b] text-white">
                <div className="container-wide grid gap-7 py-8 text-[13px] sm:grid-cols-2 sm:gap-8 sm:py-10 sm:text-sm lg:grid-cols-4 lg:gap-8 lg:py-12">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2.5 sm:gap-3">
                            <img
                                src="/images/tsk-logo.jpg"
                                alt="TSK Entertainment"
                                className="h-10 w-10 rounded-full bg-white object-cover sm:h-12 sm:w-12"
                            />
                            <span className="font-display text-base font-bold sm:text-xl">
                                TSK <span className="text-[#ffb52e]">Entertainment</span>
                            </span>
                        </Link>

                        <p className="mt-3 max-w-xs text-xs leading-5 text-white/60 sm:mt-4 sm:text-sm sm:leading-6">
                            Big ideas, beautiful details and experiences your guests will
                            remember long after the music ends.
                        </p>

                        {/* Social Media Image Logos */}
                        <div className="mt-3 flex items-center gap-2.5 sm:mt-4 sm:gap-3">
                            {[
                                {
                                    name: 'Instagram',
                                    image: '/images/insta.png',
                                    url: 'https://www.instagram.com/',
                                },
                                {
                                    name: 'Facebook',
                                    image: '/images/facebook.png',
                                    url: 'https://www.facebook.com/',
                                },
                                {
                                    name: 'YouTube',
                                    image: '/images/youtube.png',
                                    url: 'https://www.youtube.com/',
                                },
                                {
                                    name: 'Whatsapp',
                                    image: '/images/whatsapp.png',
                                    url: 'https://www.whatsapp.com/',
                                },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit us on ${social.name}`}
                                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 transition duration-300 hover:-translate-y-1 hover:border-[#ffb52e] hover:bg-white/10 sm:h-11 sm:w-11"
                                >
                                    <img
                                        src={social.image}
                                        alt={social.name}
                                        loading="lazy"
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-bold sm:text-base">Explore</h3>

                        <div className="mt-3 flex flex-col gap-2 text-xs text-white/65 sm:mt-4 sm:gap-2.5 sm:text-sm">
                            {[
                                ['Home', '/'],
                                ['About us', '/about'],
                                ['Our services', '/services'],
                                ['Contact', '/contact'],
                                
                            ].map(([label, path]) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className="transition hover:text-[#ffb52e]"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-bold sm:text-base">What we do</h3>

                        <div className="mt-3 flex flex-col gap-2 text-xs text-white/65 sm:mt-4 sm:gap-2.5 sm:text-sm">
                            {[
                                'Weddings & receptions',
                                'Live music & flash mobs',
                                'Birthday celebrations',
                                'Corporate events',
                                'Event decor & planning',
                                'Celebrity management',
                            ].map((label) => (
                                <Link
                                    key={label}
                                    to="/services"
                                    className="transition hover:text-[#ffb52e]"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="min-w-0">
                        <h3 className="text-sm font-bold sm:text-base">
                            Let’s create something
                        </h3>

                        <p className="mt-2.5 text-xs leading-5 text-white/60 sm:mt-3 sm:text-sm sm:leading-6">
                            Tell us what you’re celebrating. We’ll help bring your idea to
                            life.
                        </p>

                        <a
                            href="mailto:hello@tskentertainments.com"
                            className="mt-3 flex min-w-0 items-start gap-2 text-xs leading-5 text-white/70 transition hover:text-[#ffb52e] sm:gap-3 sm:text-sm"
                        >
                            <Mail size={14} className="mt-0.5 shrink-0 text-[#ffb52e] sm:h-4 sm:w-4" />
                            <span className="break-all">hello@tskentertainments.com</span>
                        </a>

                        <a
                            href="tel:+919876543210"
                            className="mt-2 flex items-center gap-2 text-xs text-white/70 transition hover:text-[#ffb52e] sm:gap-3 sm:text-sm"
                        >
                            <Phone size={14} className="shrink-0 text-[#ffb52e] sm:h-4 sm:w-4" />
                            +91 98765 43210
                        </a>

                        <Link
                            to="/contact"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#ffb52e] transition hover:text-white sm:mt-4 sm:gap-2 sm:text-sm"
                        >
                            Send an enquiry <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
                        </Link>
                    </div>
                </div>

                {/* Copyright and legal links */}
                <div className="border-t border-white/10">
                    <div className="container-wide flex flex-col gap-2.5 py-4 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-xs">
                        <span>
                            © {new Date().getFullYear()} TSK Entertainment. All rights reserved.
                        </span>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
                            <button
                                type="button"
                                onClick={() => setActivePolicy('privacy')}
                                className="transition hover:text-[#ffb52e]"
                            >
                                Privacy Policy
                            </button>

                            <span className="text-white/20">|</span>

                            <button
                                type="button"
                                onClick={() => setActivePolicy('terms')}
                                className="transition hover:text-[#ffb52e]"
                            >
                                Terms &amp; Conditions
                            </button>

                            <span className="hidden text-white/20 md:inline">|</span>

                            <span className="hidden md:inline">
                                Good events are planned. Great memories are made.
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Privacy Policy / Terms popup */}
            {activePolicy && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) closePolicy()
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') closePolicy()
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="policy-title"
                        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#21131c] shadow-2xl"
                    >
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:gap-4 sm:px-7 sm:py-4">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                {(() => {
                                    const PolicyIcon = policies[activePolicy].icon
                                    return (
                                        <div className="rounded-xl bg-[#ffb52e]/10 p-2 text-[#ffb52e] sm:p-2.5">
                                            <PolicyIcon size={19} className="sm:h-[21px] sm:w-[21px]" />
                                        </div>
                                    )
                                })()}

                                <div>
                                    <h2
                                        id="policy-title"
                                        className="text-base font-bold text-white sm:text-xl"
                                    >
                                        {policies[activePolicy].title}
                                    </h2>
                                    <p className="mt-0.5 text-[10px] text-white/45 sm:text-xs">
                                        TSK Entertainment
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closePolicy}
                                aria-label="Close popup"
                                className="rounded-full border border-white/10 p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white sm:p-2"
                            >
                                <X size={17} className="sm:h-[19px] sm:w-[19px]" />
                            </button>
                        </div>

                        <div className="overflow-y-auto px-4 py-4 sm:px-7 sm:py-6">
                            <p className="mb-5 text-xs leading-6 text-white/70 sm:mb-6 sm:text-sm sm:leading-7">
                                {policies[activePolicy].intro}
                            </p>

                            <div className="space-y-4 sm:space-y-5">
                                {policies[activePolicy].sections.map((section) => (
                                    <div key={section.heading}>
                                        <h3 className="mb-1.5 text-xs font-bold text-[#ffb52e] sm:text-sm">
                                            {section.heading}
                                        </h3>
                                        <p className="text-xs leading-6 text-white/65 sm:text-sm sm:leading-7">
                                            {section.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-6 border-t border-white/10 pt-4 text-[10px] leading-5 text-white/40 sm:mt-7 sm:text-xs sm:leading-6">
                                These are general website terms and privacy disclosures. Please
                                review and adapt them to your actual business practices and
                                applicable legal requirements before publishing.
                            </p>
                        </div>

                        <div className="flex justify-end border-t border-white/10 px-4 py-3 sm:px-7">
                            <button
                                type="button"
                                onClick={closePolicy}
                                className="rounded-lg bg-[#ffb52e] px-4 py-2 text-xs font-bold text-[#17121b] transition hover:bg-white sm:px-5 sm:py-2.5 sm:text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}
