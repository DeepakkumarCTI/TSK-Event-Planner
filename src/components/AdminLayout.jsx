
import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  MessageSquare,
  Users,
  ArrowLeft,
  LogOut,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function AdminLayout() {
  const { setAdmin } = useApp()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const items = [
    { label: 'Overview', path: '/admin', Icon: LayoutDashboard },
    { label: 'Services', path: '/admin/services', Icon: Sparkles },
    { label: 'Bookings', path: '/admin/bookings', Icon: CalendarDays },
    { label: 'Enquiries', path: '/admin/enquiries', Icon: MessageSquare },
    { label: 'Customers', path: '/admin/customers', Icon: Users },
  ]

  const handleSignOut = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?')

    if (confirmed) {
      setAdmin(false)
      setMobileMenuOpen(false)
      navigate('/admin/login')
    }
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const navLinks = (
    <nav className="flex flex-col gap-1.5">
      {items.map(({ label, path, Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/admin'}
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `group flex items - center gap - 3 rounded - xl px - 4 py - 3 text - sm font - medium transition - all duration - 200 ${
    isActive
        ? 'gradient-bg text-white shadow-lg shadow-black/10'
        : 'text-white/60 hover:bg-white/[0.07] hover:text-white'
} `
          }
        >
          <Icon size={19} strokeWidth={1.8} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )

  const sidebarActions = (
    <div className="space-y-2 border-t border-white/10 pt-5">
      <Link
        to="/"
        onClick={closeMobileMenu}
        className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/75 transition hover:border-[#ffb52e]/40 hover:bg-white/[0.06] hover:text-white"
      >
        <Globe size={18} />
        <span>Back to Website</span>
        <ArrowLeft className="ml-auto" size={15} />
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f4f2] md:flex">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-y-auto bg-[#17121b] px-5 py-6 text-white md:flex">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-1">
          <img
            src="/images/tsk-logo.jpg"
            alt="TSK Entertainment"
            className="h-12 w-12 rounded-xl bg-white object-cover"
          />

          <div>
            <p className="font-display text-lg font-bold leading-tight">
              TSK <span className="text-[#ffb52e]">Admin</span>
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Management Portal
            </p>
          </div>
        </Link>

        {/* Workspace Label */}
        <div className="mb-3 mt-10 flex items-center justify-between px-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
            Workspace
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb52e]" />
        </div>

        {navLinks}

        {/* Sidebar Bottom Actions */}
        <div className="mt-auto pt-8">{sidebarActions}</div>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-2 px-3 text-[11px] text-white/30">
          <ShieldCheck size={14} />
          <span>Admin Control Panel</span>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <img
              src="/images/tsk-logo.jpg"
              alt="TSK Entertainment"
              className="h-10 w-10 shrink-0 rounded-xl bg-white object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-display text-base font-bold text-[#21131c]">
                TSK <span className="text-[#b77912]">Admin</span>
              </p>
              <p className="text-[10px] text-gray-500">
                Management Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#21131c] transition hover:bg-gray-50"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Always-visible Mobile Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to="/"
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-[#21131c] transition hover:border-[#ffb52e] hover:bg-amber-50"
          >
            <Globe size={15} />
            Back to Website
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#21131c] px-2 py-2 text-xs font-semibold text-white transition hover:bg-red-900"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />

          <aside className="fixed inset-y-0 right-0 z-50 flex w-[min(82vw,320px)] flex-col overflow-y-auto bg-[#17121b] px-5 py-6 text-white shadow-2xl md:hidden">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/tsk-logo.jpg"
                  alt="TSK Entertainment"
                  className="h-10 w-10 rounded-xl bg-white object-cover"
                />

                <div>
                  <p className="font-display font-bold">
                    TSK <span className="text-[#ffb52e]">Admin</span>
                  </p>
                  <p className="text-[10px] text-white/40">
                    Management Portal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              Workspace
            </p>

            {navLinks}

            <div className="mt-auto pt-8">{sidebarActions}</div>

            <div className="mt-5 flex items-center gap-2 px-3 text-[11px] text-white/30">
              <ShieldCheck size={14} />
              <span>Admin Control Panel</span>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:ml-64 md:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}
