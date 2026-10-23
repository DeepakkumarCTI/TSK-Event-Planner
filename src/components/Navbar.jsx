import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ArrowUpRight,
  UserRound,
  Sparkles,
  ShieldCheck,
  Home,
  Info,
  Phone,
  ClipboardList,
  LogIn,
  UserPlus,
  ChevronRight,
  CalendarDays,
  Music2,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const links = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Services', path: '/services', icon: Sparkles },
  { label: 'Contact', path: '/contact', icon: Phone },
  { label: 'Track booking', path: '/track', icon: ClipboardList },
]

const eventSlides = [
  [
    { label: 'Weddings', icon: CalendarDays },
    { label: 'Live Shows', icon: Music2 },
    { label: 'Corporate Events', icon: Sparkles },
  ],
  [
    { label: 'Birthday Parties', icon: Sparkles },
    { label: 'Engagements', icon: CalendarDays },
    { label: 'College Events', icon: Music2 },
  ],
  [
    { label: 'Award Shows', icon: Sparkles },
    { label: 'Private Parties', icon: CalendarDays },
    { label: 'Temple Festivals', icon: Music2 },
  ],
]

function AnimatedBrandText() {
  const tagline = 'MAKE MOMENTS LEGENDARY'
  const [typedText, setTypedText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout

    if (!deleting && typedText === tagline) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && typedText === '') {
      timeout = setTimeout(() => setDeleting(false), 400)
    } else {
      timeout = setTimeout(() => {
        setTypedText((current) =>
          deleting
            ? current.slice(0, -1)
            : tagline.slice(0, current.length + 1),
        )
      }, deleting ? 35 : 75)
    }

    return () => clearTimeout(timeout)
  }, [typedText, deleting])

  return (
    <span className="mt-1 block min-h-[13px] whitespace-nowrap text-[7px] font-extrabold uppercase tracking-[0.09em] text-gray-500 sm:text-[9px] sm:tracking-[0.14em] xl:text-[10px]">
      {typedText}
      <span className="ml-0.5 inline-block h-[9px] w-[2px] animate-pulse bg-orange-500 align-middle" />
    </span>
  )
}

function EventCategorySlideshow() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % eventSlides.length)
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full min-w-0 px-3 pb-0 sm:px-5 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-0 lg:pb-0">
      <div className="relative mx-auto w-full max-w-[510px] overflow-hidden rounded-full border border-orange-100/90 bg-white/85 px-2 py-2 shadow-[0_3px_12px_rgba(70,30,20,0.045)] sm:px-3 lg:px-3 lg:py-2.5 xl:px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1.5 text-[8px] font-extrabold uppercase tracking-wide text-[#d82932] sm:px-2.5 sm:text-[9px] lg:gap-1.5 lg:text-[10px]">
            <Sparkles size={12} />
            Events
          </span>

          <div className="relative min-w-0 flex-1 overflow-hidden">
            {eventSlides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                aria-hidden={activeSlide !== slideIndex}
                className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 sm:gap-3 lg:gap-2 xl:gap-3 ${activeSlide === slideIndex
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0'
                  }`}
              >
                {slide.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="flex min-w-0 shrink items-center gap-1 whitespace-nowrap text-[8px] font-bold text-gray-700 sm:text-[9px] lg:text-[10px] xl:text-[11px]"
                  >
                    <Icon
                      size={12}
                      className="shrink-0 text-orange-500 sm:h-[13px] sm:w-[13px] lg:h-[14px] lg:w-[14px]"
                    />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            ))}

            <div className="flex items-center justify-center gap-2 opacity-0 sm:gap-3 lg:gap-2 xl:gap-3">
              {eventSlides[0].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[8px] font-bold sm:text-[9px] lg:text-[10px] xl:text-[11px]"
                >
                  <Icon size={12} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1">
          {eventSlides.map((_, index) => (
            <span
              key={index}
              className={`h-[2px] rounded-full transition-all duration-500 ${activeSlide === index
                  ? 'w-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-[#e60046]'
                  : 'w-1.5 bg-orange-100'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showBottomNav, setShowBottomNav] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  const { currentUser, logout } = useApp()
  const navigate = useNavigate()

  const closeMenu = () => setOpen(false)

  const signOut = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  // Close the drawer with Escape and lock background scrolling while open.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  // Automatically hide the mobile bottom navigation after inactivity.
  useEffect(() => {
    let hideTimeout
    let observer
    let footer = null

    const isMobile = () => window.innerWidth < 1024

    const footerIsOnScreen = () => {
      if (!footer || !isMobile()) return false

      const rect = footer.getBoundingClientRect()

      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const showTemporarily = () => {
      if (!isMobile()) {
        setShowBottomNav(false)
        return
      }

      if (footerIsOnScreen()) {
        setShowBottomNav(false)
        clearTimeout(hideTimeout)
        return
      }

      setShowBottomNav(true)
      clearTimeout(hideTimeout)

      hideTimeout = setTimeout(() => {
        setShowBottomNav(false)
      }, 5000)
    }

    footer = document.querySelector('footer')

    if (footer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting && isMobile()
          setFooterVisible(visible)

          if (visible) {
            setShowBottomNav(false)
            clearTimeout(hideTimeout)
          }
        },
        { threshold: 0.01 },
      )

      observer.observe(footer)
    }

    // Initial visibility and timeout.
    showTemporarily()

    window.addEventListener('mousemove', showTemporarily, { passive: true })
    window.addEventListener('scroll', showTemporarily, { passive: true })
    window.addEventListener('touchstart', showTemporarily, { passive: true })
    window.addEventListener('keydown', showTemporarily)
    window.addEventListener('resize', showTemporarily)

    return () => {
      clearTimeout(hideTimeout)
      observer?.disconnect()
      window.removeEventListener('mousemove', showTemporarily)
      window.removeEventListener('scroll', showTemporarily)
      window.removeEventListener('touchstart', showTemporarily)
      window.removeEventListener('keydown', showTemporarily)
      window.removeEventListener('resize', showTemporarily)
    }
  }, [])

  return (
    <>
      {/* Main navbar */}
      <header className="sticky top-0 z-50 m-0">
        <div className="relative m-0 border-b border-orange-100/80 bg-[#fffaf6]/95 shadow-[0_5px_24px_rgba(70,30,20,0.06)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-yellow-300 via-orange-500 to-[#e60046]" />

          <div className="mx-auto flex h-[68px] w-full max-w-[1800px] items-center gap-2 px-3 sm:h-[78px] sm:gap-3 sm:px-5 lg:h-[84px] lg:gap-4 lg:px-6 xl:px-8">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-[#e60046] opacity-50 blur-md transition duration-300 group-hover:opacity-90" />

                <img
                  src="/images/tsk-logo.jpg"
                  alt="TSK Entertainment logo"
                  className="relative h-10 w-10 rounded-full border-2 border-white object-cover shadow-md transition duration-300 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px]"
                />

                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#fffaf6] bg-gradient-to-br from-yellow-400 to-orange-500 text-white sm:h-5 sm:w-5">
                  <Sparkles size={9} />
                </span>
              </div>

              <span className="group/brand min-w-0 font-sans">
                <span className="flex items-center whitespace-nowrap text-[19px] font-extrabold leading-tight tracking-[-0.055em] sm:text-[23px] xl:text-[26px]">
                  <span className="text-[#171923] transition-colors duration-300 group-hover/brand:text-[#34303b]">
                    TSK
                  </span>
                  <span className="ml-1.5 bg-gradient-to-r from-[#ffb900] via-[#ff7628] to-[#ed174c] bg-clip-text text-transparent transition-all duration-300 group-hover/brand:tracking-[-0.035em]">
                    Entertainment
                  </span>
                </span>

                <span className="mt-1.5 flex items-center gap-1">
                  <span className="h-[2px] w-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 sm:w-7" />
                  <AnimatedBrandText />
                </span>
              </span>
            </Link>

            {/* Desktop event slideshow */}
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1">
              <EventCategorySlideshow />
            </div>

            {/* Account actions */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-2.5">
              {currentUser ? (
                <>
                  <div className="hidden items-center gap-2 rounded-full border border-orange-100 bg-white/90 py-1.5 pl-1.5 pr-3 shadow-sm sm:flex">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-[#e60046] text-white shadow-sm lg:h-9 lg:w-9">
                      <UserRound size={16} />
                    </span>
                    <div className="max-w-[95px]">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                        Welcome
                      </p>
                      <p className="truncate text-xs font-extrabold text-gray-800">
                        {currentUser.name?.split(' ')[0] || 'Account'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={signOut}
                    className="hidden whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#d82932] sm:block lg:px-4 lg:py-2.5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden rounded-full px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-orange-50 hover:text-[#d82932] sm:block"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="hidden rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-bold text-gray-800 transition hover:border-orange-400 hover:bg-orange-50 md:block lg:px-4 lg:py-2.5"
                  >
                    Register
                  </Link>

                  <Link
                    to="/admin/login"
                    title="Admin Login"
                    aria-label="Admin Login"
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-white text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50 hover:text-[#d82932] sm:flex lg:h-10 lg:w-10"
                  >
                    <ShieldCheck size={17} />
                  </Link>
                </>
              )}

              <Link
                to="/booking"
                onClick={closeMenu}
                className="group relative flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-[#e60046] px-3 py-2.5 text-[11px] font-extrabold text-white shadow-[0_5px_16px_rgba(230,65,35,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-1.5 sm:px-4 sm:py-3 sm:text-xs lg:px-5 lg:text-sm"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative sm:hidden">Book</span>
                <span className="relative hidden sm:inline">Book an event</span>
                <ArrowUpRight
                  size={15}
                  className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
                />
              </Link>

              {/* Desktop hamburger */}
              <button
                type="button"
                aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={open}
                aria-controls="tsk-navigation-drawer"
                onClick={() => setOpen((value) => !value)}
                className={`ml-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 lg:flex ${open
                    ? 'border-orange-300 bg-orange-50 text-[#d82932] shadow-inner'
                    : 'border-orange-100 bg-white text-gray-800 shadow-sm hover:-translate-y-0.5 hover:border-orange-300 hover:text-[#d82932] hover:shadow-md'
                  }`}
              >
                {open ? <X size={22} /> : <Menu size={23} />}
              </button>
            </div>
          </div>

          {/* Mobile event slideshow */}
          <div className="lg:hidden">
            <EventCategorySlideshow />
          </div>

          {/* Animated gradient accent */}
          <div className="relative h-[3px] overflow-hidden bg-orange-50">
            <div className="navbar-loop-line absolute inset-y-0 w-[24%] rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-[#e60046]" />
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={closeMenu}
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-[60] cursor-default bg-gray-950/40 backdrop-blur-[3px] transition-opacity duration-300 ${open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
          }`}
      />

      {/* Slide-out menu */}
      <aside
        id="tsk-navigation-drawer"
        aria-label="Main navigation panel"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(400px,90vw)] flex-col overflow-y-auto border-l border-orange-100 bg-[#fffaf6] shadow-2xl transition-transform duration-300 ease-out sm:w-[min(420px,90vw)] ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer heading */}
        <div className="relative shrink-0 overflow-hidden border-b border-orange-100 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
          <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-24 w-24 rounded-full bg-yellow-200/50 blur-3xl" />

          <div className="relative flex items-center justify-between gap-3">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex min-w-0 items-center gap-2.5"
            >
              <img
                src="/images/tsk-logo.jpg"
                alt="TSK Entertainment logo"
                className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-md sm:h-11 sm:w-11"
              />
              <div className="min-w-0">
                <p className="whitespace-nowrap font-sans text-[15px] font-extrabold tracking-tight text-gray-900 sm:text-base">
                  TSK <span className="gradient-text">Entertainment</span>
                </p>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gray-500 sm:text-[9px]">
                  Make moments legendary
                </p>
              </div>
            </Link>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={closeMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-100 bg-white text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-[#d82932]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer content */}
        <div className="flex-1 px-3.5 py-4 sm:px-5 sm:py-5">
          {currentUser && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-3 shadow-sm sm:mb-5 sm:rounded-2xl sm:p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 via-orange-400 to-[#e60046] text-white shadow-sm sm:h-11 sm:w-11">
                <UserRound size={19} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Signed in as
                </p>
                <p className="mt-1 truncate text-sm font-extrabold text-gray-900 sm:text-base">
                  {currentUser.name || 'Customer'}
                </p>
              </div>
            </div>
          )}

          <div className="mb-2.5 flex items-center justify-between px-2.5">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-gray-400">
              Explore
            </p>
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-orange-600">
              Menu
            </span>
          </div>

          <nav className="space-y-1">
            {links.map(({ label, path, icon: Icon }, index) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[13px] font-bold transition-all duration-200 sm:gap-3 sm:py-3 ${isActive
                    ? 'border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 text-[#d82932] shadow-sm'
                    : 'border-transparent text-gray-600 hover:border-orange-100 hover:bg-white hover:text-[#d82932]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${isActive
                          ? 'bg-white text-[#e3344c] shadow-sm'
                          : 'bg-gray-100/80 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-600'
                        }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="flex-1">{label}</span>
                    <span
                      className={`mr-1 text-[9px] font-bold ${isActive ? 'text-orange-500' : 'text-gray-300'
                        }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ChevronRight
                      size={15}
                      className={`transition group-hover:translate-x-1 ${isActive ? 'text-orange-500' : 'text-gray-300'
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="my-4 border-t border-dashed border-orange-200 sm:my-5" />

          <p className="mb-2.5 px-2.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-gray-400">
            Your account
          </p>

          <div className="space-y-1">
            {currentUser ? (
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold text-gray-600 transition hover:bg-red-50 hover:text-[#d82932]"
              >
                <LogIn size={17} className="rotate-180" />
                Logout
                <ArrowUpRight size={14} className="ml-auto rotate-[-45deg]" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold text-gray-600 transition hover:bg-orange-50 hover:text-[#d82932]"
                >
                  <LogIn size={17} />
                  Login
                  <ChevronRight size={15} className="ml-auto text-gray-300" />
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-bold text-gray-600 transition hover:bg-orange-50 hover:text-[#d82932]"
                >
                  <UserPlus size={17} />
                  Register
                  <ChevronRight size={15} className="ml-auto text-gray-300" />
                </Link>

                <Link
                  to="/admin/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white px-3 py-3 text-[13px] font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-[#d82932]"
                >
                  <ShieldCheck size={17} />
                  Admin Login
                  <ArrowUpRight size={14} className="ml-auto" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Drawer footer */}
        <div className="shrink-0 border-t border-orange-100 bg-white/80 p-3.5 sm:p-4">
          <Link
            to="/booking"
            onClick={closeMenu}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-[#e60046] px-4 py-3 text-[13px] font-extrabold text-white shadow-[0_8px_24px_rgba(230,65,35,0.2)] transition hover:-translate-y-0.5 hover:shadow-lg sm:py-3.5 sm:text-sm"
          >
            Book an event
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <p className="mt-3 text-center text-[8px] font-bold uppercase tracking-[0.13em] text-gray-400 sm:text-[9px]">
            TSK Entertainment · Make moments legendary
          </p>
        </div>
      </aside>

      {/* Auto-hiding mobile bottom navigation */}
      <nav
        aria-label="Mobile app navigation"
        aria-hidden={!showBottomNav || footerVisible}
        className={`fixed inset-x-0 bottom-0 z-[55] border-t border-orange-100 bg-white/95 px-2 pb-[max(4px,env(safe-area-inset-bottom))] pt-1 shadow-[0_-6px_20px_rgba(70,30,20,0.07)] backdrop-blur-xl transition-all duration-300 lg:hidden ${showBottomNav && !footerVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-full opacity-0'
          }`}
      >
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
          {[
            { label: 'Home', path: '/', icon: Home },
            { label: 'Services', path: '/services', icon: Sparkles },
            { label: 'Track', path: '/track', icon: ClipboardList },
          ].map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center justify-center gap-0 rounded-lg px-2 py-0.5 text-[9px] font-bold transition ${isActive
                  ? 'text-[#d82932]'
                  : 'text-gray-500 hover:text-[#d82932]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-7 w-10 items-center justify-center rounded-lg transition ${isActive
                        ? 'bg-gradient-to-r from-yellow-100 to-orange-100'
                        : ''
                      }`}
                  >
                    <Icon size={17} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="tsk-navigation-drawer"
            className={`flex min-w-0 flex-col items-center justify-center gap-0 rounded-lg px-2 py-0.5 text-[9px] font-bold transition ${open ? 'text-[#d82932]' : 'text-gray-500 hover:text-[#d82932]'
              }`}
          >
            <span
              className={`flex h-7 w-10 items-center justify-center rounded-lg transition ${open ? 'bg-gradient-to-r from-yellow-100 to-orange-100' : ''
                }`}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </span>
            <span>Menu</span>
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes tskNavbarLoop {
          0% { left: -25%; }
          50% { left: 65%; }
          100% { left: 100%; }
        }

        .navbar-loop-line {
          animation: tskNavbarLoop 3.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-loop-line {
            animation: none;
            left: 38%;
          }
        }
      `}</style>
    </>
  )
}