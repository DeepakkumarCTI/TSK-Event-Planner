
import { useState } from 'react'
import {
  Search,
  Users,
  Mail,
  Phone,
  CalendarDays,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function AdminCustomers() {
  const { users, bookings } = useApp()
  const [query, setQuery] = useState('')

  const shown = users.filter((u) =>
    `${ u.name } ${ u.email } ${ u.phone } `
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  const getBookingCount = (email) =>
    bookings.filter((booking) => booking.email === email).length

  const getCreatedDate = (id) =>
    id
      ? new Date(
          Number(id.slice(0, 8)) || Date.now()
        ).toLocaleDateString('en-IN')
      : '—'

  return (
    <div className="min-w-0">
      {/* Page Header */}
      <div className="mb-5 sm:mb-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-tsk-red sm:text-xs sm:tracking-[0.2em]">
          People
        </p>

        <h1 className="mt-1.5 font-display text-xl font-bold leading-tight sm:mt-2 sm:text-3xl">
          Customers
        </h1>

        <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
          Registered customer accounts and their booking activity.
        </p>
      </div>

      {/* Customer Count */}
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-sm sm:mb-5 sm:rounded-2xl sm:p-4">
        <div className="gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white sm:h-12 sm:w-12 sm:rounded-xl">
          <Users size={17} className="sm:h-5 sm:w-5" />
        </div>

        <div>
          <p className="text-xs text-gray-500 sm:text-sm">
            Registered customers
          </p>

          <p className="mt-0.5 text-xl font-bold sm:text-2xl">
            {users.length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4 w-full sm:mb-5 sm:max-w-md">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 sm:h-[17px] sm:w-[17px]"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:py-3 sm:pl-10 sm:pr-4 sm:text-sm"
        />
      </div>

      {/* Customer List */}
      {shown.length > 0 ? (
        <>
          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:hidden">
            {shown.map((u) => {
              const count = getBookingCount(u.email)

              return (
                <article
                  key={u.id}
                  className="min-w-0 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm sm:rounded-2xl sm:p-4"
                >
                  {/* Name */}
                  <div className="min-w-0 border-b border-gray-100 pb-3">
                    <h2 className="break-words font-display text-sm font-bold sm:text-base">
                      {u.name}
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                      Customer
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="mt-3 space-y-2.5">
                    <div className="flex min-w-0 items-start gap-2">
                      <Mail
                        size={13}
                        className="mt-0.5 shrink-0 text-tsk-red sm:h-[14px] sm:w-[14px]"
                      />

                      <a
                        href={`mailto:${ u.email } `}
                        className="min-w-0 break-all text-[11px] leading-4 text-gray-600 hover:text-tsk-red sm:text-xs"
                      >
                        {u.email}
                      </a>
                    </div>

                    {u.phone && (
                      <div className="flex min-w-0 items-start gap-2">
                        <Phone
                          size={13}
                          className="mt-0.5 shrink-0 text-gray-400 sm:h-[14px] sm:w-[14px]"
                        />

                        <a
                          href={`tel:${ u.phone } `}
                          className="break-words text-[11px] leading-4 text-gray-500 hover:text-tsk-red sm:text-xs"
                        >
                          {u.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex min-w-0 items-start gap-2">
                      <CalendarDays
                        size={13}
                        className="mt-0.5 shrink-0 text-gray-400 sm:h-[14px] sm:w-[14px]"
                      />

                      <span className="text-[11px] leading-4 text-gray-500 sm:text-xs">
                        Joined {getCreatedDate(u.id)}
                      </span>
                    </div>
                  </div>

                  {/* Booking Count */}
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                    <span className="text-[11px] text-gray-500 sm:text-xs">
                      Total bookings
                    </span>

                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-700 sm:text-xs">
                      {count}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      Customer
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Contact
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Bookings
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Account created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {shown.map((u) => {
                    const count = getBookingCount(u.email)

                    return (
                      <tr
                        key={u.id}
                        className="border-t border-gray-100 transition hover:bg-gray-50/70"
                      >
                        <td className="px-5 py-4">
                          <p className="break-words font-bold">
                            {u.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Customer
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <a
                            href={`mailto:${ u.email } `}
                            className="flex items-start gap-2 break-all hover:text-tsk-red"
                          >
                            <Mail
                              size={14}
                              className="mt-0.5 shrink-0 text-tsk-red"
                            />

                            {u.email}
                          </a>

                          {u.phone && (
                            <a
                              href={`tel:${ u.phone } `}
                              className="mt-2 flex items-start gap-2 text-xs text-gray-500 hover:text-tsk-red"
                            >
                              <Phone
                                size={13}
                                className="mt-0.5 shrink-0"
                              />

                              {u.phone}
                            </a>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-orange-50 px-3 py-1.5 font-bold text-orange-700">
                            {count}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          <span className="flex items-center gap-2">
                            <CalendarDays size={14} />

                            {getCreatedDate(u.id)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="rounded-xl bg-white px-4 py-9 text-center sm:rounded-2xl sm:p-12">
          <Users
            size={27}
            className="mx-auto text-gray-300 sm:h-8 sm:w-8"
          />

          <p className="mt-3 text-sm font-bold sm:text-base">
            {query ? 'No customers found' : 'No customers yet'}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
            When customers register, their accounts will show here.
          </p>
        </div>
      )}
    </div>
  )
}
