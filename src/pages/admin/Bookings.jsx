
import { useMemo, useState } from 'react'
import {
  Search,
  CalendarDays,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const statuses = [
  'Pending',
  'Confirmed',
  'Completed',
  'Rejected',
  'Cancelled',
]

export default function AdminBookings() {
  const { bookings, setBookings } = useApp()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [notes, setNotes] = useState({})

  const filtered = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (status === 'All' || b.status === status) &&
          `${ b.id } ${ b.customerName } ${ b.email } ${ b.serviceTitle } `
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [bookings, status, query]
  )

  const update = (id, key, value) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, [key]: value } : b
      )
    )
  }

  const inputClass =
    'w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:py-3 sm:text-sm'

  return (
    <div className="min-w-0">
      {/* Page Header */}
      <div className="mb-5 sm:mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-tsk-red sm:text-xs sm:tracking-[0.2em]">
          Customer requests
        </p>

        <h1 className="mt-1.5 font-display text-xl font-bold leading-tight sm:mt-2 sm:text-3xl">
          Bookings
        </h1>

        <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
          Review event requests and update their progress.
        </p>
      </div>

      {/* Search and Status Filter */}
      <div className="mb-4 flex min-w-0 flex-col gap-2.5 sm:mb-5 sm:flex-row sm:gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:h-[17px] sm:w-[17px]"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by booking, customer or service"
            className={`${ inputClass } pl - 9 pr - 3 sm: pl - 10 sm: pr - 4`}
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter bookings by status"
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-[#ffbd32] sm:w-auto sm:min-w-[155px] sm:px-4 sm:py-3 sm:text-sm"
        >
          {['All', ...statuses].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Booking Cards */}
      {filtered.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((b) => (
            <article
              key={b.id}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-5 lg:p-6"
            >
              <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_250px]">
                {/* Booking Information */}
                <div className="min-w-0">
                  <p className="break-words text-[10px] leading-4 text-gray-400 sm:text-xs">
                    {b.id} · {new Date(b.createdAt).toLocaleString()}
                  </p>

                  <h2 className="mt-1.5 break-words font-display text-base font-bold leading-snug sm:mt-2 sm:text-xl">
                    {b.serviceTitle}
                  </h2>

                  <p className="mt-1 break-words text-xs text-gray-500 sm:text-sm">
                    {b.customerName}
                  </p>

                  {/* Contact and Event Details */}
                  <div className="mt-3 grid min-w-0 grid-cols-1 gap-2.5 text-[11px] text-gray-500 min-[420px]:grid-cols-2 sm:mt-4 sm:gap-3 sm:text-xs">
                    <a
                      href={`mailto:${ b.email } `}
                      className="flex min-w-0 items-start gap-1.5 transition hover:text-tsk-red"
                    >
                      <Mail
                        size={13}
                        className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                      />
                      <span className="min-w-0 break-all">
                        {b.email}
                      </span>
                    </a>

                    {b.phone && (
                      <a
                        href={`tel:${ b.phone } `}
                        className="flex min-w-0 items-start gap-1.5 transition hover:text-tsk-red"
                      >
                        <Phone
                          size={13}
                          className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                        />
                        <span className="break-words">{b.phone}</span>
                      </a>
                    )}

                    <div className="flex min-w-0 items-start gap-1.5">
                      <CalendarDays
                        size={13}
                        className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                      />
                      <span className="break-words">
                        {b.eventDate} {b.eventTime || ''}
                      </span>
                    </div>

                    <div className="flex min-w-0 items-start gap-1.5">
                      <MapPin
                        size={13}
                        className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                      />
                      <span className="break-words">
                        {[b.venue, b.city].filter(Boolean).join(', ') || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  {/* Guests and Budget */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-gray-100 pt-3 text-xs leading-5 text-gray-600 sm:mt-4 sm:gap-x-5 sm:text-sm">
                    <p>
                      Guests:{' '}
                      <b className="text-gray-800">
                        {b.guests || 'Not specified'}
                      </b>
                    </p>

                    <p>
                      Budget:{' '}
                      <b className="text-gray-800">
                        {b.budget
                          ? `₹${ Number(b.budget).toLocaleString('en-IN') } `
                          : 'Not specified'}
                      </b>
                    </p>
                  </div>

                  {/* Customer Note */}
                  {b.notes && (
                    <div className="mt-3 rounded-lg bg-gray-50 p-3 sm:rounded-xl sm:p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
                        Customer note
                      </p>

                      <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                        {b.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Booking Management */}
                <div className="min-w-0 border-t border-gray-100 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">
                    Update status

                    <select
                      value={b.status}
                      onChange={(e) =>
                        update(b.id, 'status', e.target.value)
                      }
                      className={`${ inputClass } mt - 1.5 font - semibold sm: mt - 2`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="mt-3 block text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:mt-4 sm:text-xs">
                    Note for customer

                    <textarea
                      value={notes[b.id] ?? b.adminNote ?? ''}
                      onChange={(e) =>
                        setNotes((prev) => ({
                          ...prev,
                          [b.id]: e.target.value,
                        }))
                      }
                      className="mt-1.5 min-h-20 w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-normal leading-5 outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:mt-2 sm:text-sm"
                      placeholder="Optional note"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      update(b.id, 'adminNote', notes[b.id] || '')
                    }
                    className="mt-2 w-full rounded-lg bg-[#21131c] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-tsk-red sm:rounded-xl sm:py-3 sm:text-sm"
                  >
                    Save note
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl bg-white px-4 py-9 text-center sm:rounded-2xl sm:p-12">
          <CalendarDays
            size={27}
            className="mx-auto text-gray-300 sm:h-8 sm:w-8"
          />

          <p className="mt-3 text-sm font-bold sm:text-base">
            No bookings found
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            Customer booking requests will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
