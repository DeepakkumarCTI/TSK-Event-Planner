
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  MessageSquare,
  Sparkles,
  Users,
  ArrowUpRight,
  Clock3,
  CircleCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

function Stat({ label, value, Icon, sub, to }) {
  return (
    <Link
      to={to}
      className="group block min-w-0 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ffbd32]/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#ffbd32]/50 sm:rounded-2xl sm:p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-medium leading-4 text-gray-500 sm:text-sm">
            {label}
          </p>

          <p className="mt-1.5 text-2xl font-bold sm:mt-2 sm:text-3xl">
            {value}
          </p>

          <p className="mt-1.5 break-words text-[10px] leading-4 text-gray-400 sm:mt-2 sm:text-xs">
            {sub}
          </p>
        </div>

        <div className="gradient-bg shrink-0 rounded-lg p-2 text-white transition-transform duration-300 group-hover:scale-110 sm:rounded-xl sm:p-3">
          <Icon size={16} className="sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 sm:mt-3 sm:pt-3">
        <span className="text-[10px] font-semibold text-tsk-red sm:text-xs">
          View details
        </span>

        <ArrowUpRight
          size={13}
          className="text-tsk-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
        />
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const { services, bookings, enquiries, users } = useApp()

  const pending = bookings.filter(
    (b) => b.status === 'Pending'
  ).length

  const recent = [...bookings].slice(0, 5)

  return (
    <div className="min-w-0">
      {/* Dashboard Header */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tsk-red sm:text-xs sm:tracking-[0.2em]">
            Your workspace
          </p>

          <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight sm:mt-2 sm:text-4xl">
            Dashboard overview
          </h1>

          <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
            Here’s what’s happening at TSK Entertainment.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2.5 text-xs font-bold shadow-sm transition hover:shadow-md sm:px-4 sm:py-3 sm:text-sm"
        >
          View website
          <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Clickable Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Stat
          label="Total services"
          value={services.length}
          Icon={Sparkles}
          sub="Active service listings"
          to="/admin/services"
        />

        <Stat
          label="Total bookings"
          value={bookings.length}
          Icon={CalendarDays}
          sub={`${ pending } awaiting review`}
          to="/admin/bookings"
        />

        <Stat
          label="New enquiries"
          value={enquiries.filter((e) => e.status === 'New').length}
          Icon={MessageSquare}
          sub="Customer messages"
          to="/admin/enquiries"
        />

        <Stat
          label="Customers"
          value={users.length}
          Icon={Users}
          sub="Registered accounts"
          to="/admin/customers"
        />
      </div>

      {/* Dashboard Content */}
      <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:mt-8 sm:gap-6 xl:grid-cols-[1.4fr_.6fr]">
        {/* Recent Bookings */}
        <section className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-3.5 sm:rounded-2xl sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold sm:text-xl">
                Recent bookings
              </h2>

              <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-sm">
                Latest customer requests
              </p>
            </div>

            <Link
              to="/admin/bookings"
              className="shrink-0 text-xs font-bold text-tsk-red sm:text-sm"
            >
              View all
            </Link>
          </div>

          {recent.length > 0 ? (
            <div className="-mx-1 mt-4 overflow-x-auto sm:mt-5">
              <table className="w-full min-w-[500px] text-left text-xs sm:min-w-[520px] sm:text-sm">
                <thead>
                  <tr className="border-b text-[10px] text-gray-400 sm:text-xs">
                    <th className="px-2 pb-3 font-semibold sm:px-3">
                      Booking
                    </th>

                    <th className="px-2 pb-3 font-semibold sm:px-3">
                      Customer
                    </th>

                    <th className="px-2 pb-3 font-semibold sm:px-3">
                      Event date
                    </th>

                    <th className="px-2 pb-3 font-semibold sm:px-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recent.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b last:border-0"
                    >
                      <td className="px-2 py-3 sm:px-3 sm:py-4">
                        <p className="font-bold">{b.serviceTitle}</p>

                        <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                          {b.id}
                        </p>
                      </td>

                      <td className="px-2 py-3 sm:px-3 sm:py-4">
                        <p>{b.customerName}</p>

                        <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                          {b.email}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-2 py-3 sm:px-3 sm:py-4">
                        {b.eventDate}
                      </td>

                      <td className="px-2 py-3 sm:px-3 sm:py-4">
                        <span
                          className={`inline - block whitespace - nowrap rounded - full px - 2 py - 1 text - [10px] font - bold sm: px - 3 sm: py - 1.5 sm: text - xs ${
    b.status === 'Confirmed'
        ? 'bg-green-50 text-green-700'
        : b.status === 'Completed'
            ? 'bg-gray-100 text-gray-700'
            : b.status === 'Rejected' ||
                b.status === 'Cancelled'
                ? 'bg-red-50 text-red-700'
                : 'bg-orange-50 text-orange-700'
} `}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-9 text-center sm:py-12">
              <CalendarDays
                className="mx-auto text-gray-300"
                size={28}
              />

              <p className="mt-3 text-sm font-bold sm:text-base">
                No bookings yet
              </p>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                New requests will appear here.
              </p>
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="min-w-0 rounded-xl bg-[#21131c] p-4 text-white sm:rounded-2xl sm:p-6">
          <div className="gradient-bg inline-flex rounded-lg p-2.5 sm:rounded-xl sm:p-3">
            <Clock3 size={18} className="sm:h-5 sm:w-5" />
          </div>

          <h2 className="mt-4 font-display text-xl font-bold sm:mt-5 sm:text-2xl">
            Quick actions
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-white/60 sm:mt-2 sm:text-sm sm:leading-6">
            Keep your event business up to date.
          </p>

          <div className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
            {[
              ['Manage services', '/admin/services', Sparkles],
              ['Review bookings', '/admin/bookings', CalendarDays],
              ['Read enquiries', '/admin/enquiries', MessageSquare],
            ].map(([label, path, Icon]) => (
              <Link
                key={path}
                to={path}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-semibold transition hover:bg-white/10 sm:p-4 sm:text-sm"
              >
                <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <Icon
                    size={15}
                    className="shrink-0 text-[#ffbd32] sm:h-[17px] sm:w-[17px]"
                  />

                  <span>{label}</span>
                </span>

                <ArrowUpRight
                  size={14}
                  className="shrink-0 sm:h-4 sm:w-4"
                />
              </Link>
            ))}
          </div>

          {/* Local Storage Notice */}
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-white/10 p-3 sm:mt-6 sm:gap-3 sm:p-4">
            <CircleCheck
              className="mt-0.5 shrink-0 text-[#ffbd32]"
              size={17}
            />

            <p className="text-[10px] leading-4 text-white/70 sm:text-xs sm:leading-5">
              Changes are saved automatically to this browser’s Local Storage.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
