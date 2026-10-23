
import { useState } from 'react'
import {
  Search,
  Mail,
  Phone,
  CalendarDays,
  Trash2,
  MessageSquare,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function AdminEnquiries() {
  const { enquiries, setEnquiries } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const shown = enquiries.filter(
    (e) =>
      (filter === 'All' || e.status === filter) &&
      `${ e.name } ${ e.email } ${ e.message } ${ e.eventType } `
        .toLowerCase()
        .includes(query.toLowerCase())
  )

  const update = (id, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    )
  }

  const remove = (enquiry) => {
    if (window.confirm('Delete this enquiry?')) {
      setEnquiries((prev) =>
        prev.filter((item) => item.id !== enquiry.id)
      )
    }
  }

  const inputClass =
    'w-full min-w-0 rounded-xl border border-gray-200 bg-white py-2.5 text-xs outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:py-3 sm:text-sm'

  return (
    <div className="min-w-0">
      {/* Page Header */}
      <div className="mb-5 sm:mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-tsk-red sm:text-xs sm:tracking-[0.2em]">
          Inbox
        </p>

        <h1 className="mt-1.5 font-display text-xl font-bold leading-tight sm:mt-2 sm:text-3xl">
          Customer enquiries
        </h1>

        <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
          Review messages sent through the public contact form.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 flex min-w-0 flex-col gap-2.5 sm:mb-5 sm:flex-row sm:gap-3">
        <div className="relative min-w-0 flex-1">
          

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enquiries..."
            className={`${ inputClass } pl - 9 pr - 3 sm: pl - 10 sm: pr - 4`}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-[#ffbd32] sm:w-auto sm:min-w-[140px] sm:px-4 sm:py-3 sm:text-sm"
        >
          {['All', 'New', 'Contacted', 'Closed'].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Enquiry Cards */}
      {shown.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-2">
          {shown.map((e) => (
            <article
              key={e.id}
              className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-5"
            >
              {/* Customer Details */}
              <div className="flex min-w-0 items-start justify-between gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-[10px] leading-4 text-gray-400 sm:text-xs">
                    {new Date(e.createdAt).toLocaleString()}
                  </p>

                  <h2 className="mt-1 break-words font-display text-base font-bold leading-snug sm:text-xl">
                    {e.name}
                  </h2>

                  <p className="mt-1 break-words text-xs font-semibold text-tsk-red sm:text-sm">
                    {e.eventType || 'General enquiry'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(e)}
                  aria-label="Delete enquiry"
                  className="shrink-0 rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 sm:rounded-xl sm:p-2.5"
                >
                  <Trash2 size={14} className="sm:h-4 sm:w-4" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="mt-3 flex min-w-0 flex-col gap-2 text-[11px] text-gray-500 sm:mt-4 sm:gap-2.5 sm:text-xs">
                <a
                  className="flex min-w-0 items-start gap-1.5 break-all transition hover:text-tsk-red"
                  href={`mailto:${ e.email } `}
                >
                  <Mail
                    size={13}
                    className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                  />
                  <span className="min-w-0">{e.email}</span>
                </a>

                {e.phone && (
                  <a
                    className="flex min-w-0 items-start gap-1.5 break-words transition hover:text-tsk-red"
                    href={`tel:${ e.phone } `}
                  >
                    <Phone
                      size={13}
                      className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                    />
                    <span>{e.phone}</span>
                  </a>
                )}

                {e.eventDate && (
                  <span className="flex min-w-0 items-start gap-1.5">
                    <CalendarDays
                      size={13}
                      className="mt-0.5 shrink-0 sm:h-[14px] sm:w-[14px]"
                    />
                    <span className="break-words">{e.eventDate}</span>
                  </span>
                )}
              </div>

              {/* Enquiry Message */}
              <div className="mt-3 rounded-lg bg-gray-50 p-3 sm:mt-4 sm:rounded-xl sm:p-4">
                <p className="whitespace-pre-wrap break-words text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                  {e.message}
                </p>
              </div>

              {/* Status and Actions */}
              <div className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 sm:mt-4 sm:pt-4">
                <span
                  className={`inline - flex rounded - full px - 2.5 py - 1 text - [10px] font - bold sm: px - 3 sm: py - 1.5 sm: text - xs ${
    e.status === 'New'
        ? 'bg-orange-50 text-orange-700'
        : e.status === 'Closed'
            ? 'bg-gray-100 text-gray-600'
            : 'bg-green-50 text-green-700'
} `}
                >
                  {e.status}
                </span>

                <select
                  value={e.status}
                  onChange={(ev) => update(e.id, ev.target.value)}
                  aria-label={`Update status for ${ e.name }`}
                  className="min-w-0 max-w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-[10px] font-semibold outline-none focus:border-[#ffbd32] sm:px-3 sm:text-xs"
                >
                  {['New', 'Contacted', 'Closed'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl bg-white px-4 py-9 text-center sm:rounded-2xl sm:p-12">
          <MessageSquare
            size={26}
            className="mx-auto text-gray-300 sm:h-8 sm:w-8"
          />

          <p className="mt-3 text-sm font-bold sm:text-base">
            Your inbox is clear
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            Submitted contact forms will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
