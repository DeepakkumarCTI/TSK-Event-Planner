
import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Search,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const blank = {
  title: '',
  category: 'Weddings',
  price: '',
  description: '',
  image:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85',
  tag: 'New',
}

const inputClass =
  'mt-1 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:text-sm'

export default function AdminServices() {
  const { services, setServices } = useApp()

  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const startNew = () => {
    setForm({ ...blank })
    setEditing('new')
    setError('')
  }

  const startEdit = (service) => {
    setForm({
      ...service,
      price: String(service.price),
    })
    setEditing(service.id)
    setError('')
  }

  const save = (e) => {
    e.preventDefault()

    if (
      !form.title.trim() ||
      form.price === '' ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setError('Add a service title and a valid price.')
      return
    }

    if (editing === 'new') {
      setServices((prev) => [
        {
          ...form,
          id: `service - ${ Date.now() } `,
          price: Number(form.price),
        },
        ...prev,
      ])
    } else {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editing
            ? {
                ...form,
                id: editing,
                price: Number(form.price),
              }
            : service
        )
      )
    }

    setEditing(null)
    setError('')
  }

  const remove = (service) => {
    if (window.confirm(`Delete "${service.title}" ? `)) {
      setServices((prev) =>
        prev.filter((item) => item.id !== service.id)
      )
    }
  }

  const shown = services.filter((service) =>
    `${ service.title } ${ service.category } `
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  return (
    <div className="min-w-0">
      {/* Page Header */}
      <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tsk-red sm:text-xs sm:tracking-[0.2em]">
            Catalogue
          </p>

          <h1 className="mt-1.5 font-display text-2xl font-bold leading-tight sm:mt-2 sm:text-3xl">
            Manage services
          </h1>

          <p className="mt-1.5 max-w-xl text-xs leading-5 text-gray-500 sm:mt-2 sm:text-sm">
            Add, update pricing or remove services shown on the public website.
          </p>
        </div>

        <button
          onClick={startNew}
          className="gradient-bg inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-glow transition hover:opacity-90 sm:px-5 sm:py-3 sm:text-sm"
        >
          <Plus size={16} />
          Add service
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 w-full sm:max-w-sm">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            className={`${ inputClass } pl - 9`}
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Add / Edit Service Form */}
      {editing && (
        <div className="mb-5 rounded-xl border border-orange-200 bg-white p-4 shadow-lg sm:mb-7 sm:rounded-2xl sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <h2 className="font-display text-lg font-bold sm:text-xl">
              {editing === 'new' ? 'Add a service' : 'Edit service'}
            </h2>

            <button
              type="button"
              onClick={() => {
                setEditing(null)
                setError('')
              }}
              aria-label="Close form"
              className="shrink-0 rounded-full p-2 transition hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={save} className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">
            <label className="min-w-0 text-xs font-semibold sm:text-sm">
              Service title

              <input
                className={inputClass}
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Enter service title"
                required
              />
            </label>

            <label className="min-w-0 text-xs font-semibold sm:text-sm">
              Category

              <select
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                {[
                  'Weddings',
                  'Entertainment',
                  'Celebrations',
                  'Corporate',
                  'Planning & Decor',
                  'Special Experiences',
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0 text-xs font-semibold sm:text-sm">
              Starting price (₹)

              <input
                className={inputClass}
                type="number"
                min="0"
                step="any"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                placeholder="Enter price"
                required
              />
            </label>

            <label className="min-w-0 text-xs font-semibold sm:text-sm">
              Badge / tag

              <input
                className={inputClass}
                value={form.tag}
                onChange={(e) =>
                  setForm({ ...form, tag: e.target.value })
                }
                placeholder="e.g. New"
              />
            </label>

            <label className="min-w-0 text-xs font-semibold sm:col-span-2 sm:text-sm">
              Image URL

              <input
                className={inputClass}
                type="url"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                required
              />
            </label>

            <label className="min-w-0 text-xs font-semibold sm:col-span-2 sm:text-sm">
              Description

              <textarea
                className={`${ inputClass } min - h - 24 resize - y`}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe this service..."
                required
              />
            </label>

            {error && (
              <p
                role="alert"
                className="text-xs leading-5 text-red-600 sm:col-span-2 sm:text-sm"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5 pt-1 sm:col-span-2 sm:gap-3">
              <button
                type="submit"
                className="gradient-bg inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white sm:px-5 sm:py-3 sm:text-sm"
              >
                <Save size={15} />
                Save service
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setError('')
                }}
                className="rounded-full border border-gray-200 px-4 py-2.5 text-xs font-bold transition hover:bg-gray-50 sm:px-5 sm:py-3 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-3 min-[420px]:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {shown.map((service) => (
          <article
            key={service.id}
            className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-2xl"
          >
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="h-36 w-full object-cover sm:h-40"
            />

            <div className="p-3.5 sm:p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-tsk-red sm:text-[10px] sm:tracking-[0.15em]">
                {service.category}
              </p>

              <h2 className="mt-1.5 break-words font-display text-base font-bold leading-snug sm:mt-2 sm:text-xl">
                {service.title}
              </h2>

              <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-5 text-gray-500 sm:min-h-10 sm:text-sm">
                {service.description}
              </p>

              <p className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">
                ₹{Number(service.price).toLocaleString('en-IN')}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 border-t pt-3 sm:mt-4 sm:pt-4">
                <button
                  onClick={() => startEdit(service)}
                  className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-xs font-bold transition hover:border-tsk-red hover:text-tsk-red sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm"
                >
                  <Pencil size={13} />
                  Edit
                </button>

                <button
                  onClick={() => remove(service)}
                  className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-red-100 px-2 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {!shown.length && (
        <div className="rounded-xl bg-white px-4 py-10 text-center text-xs text-gray-500 sm:rounded-2xl sm:p-12 sm:text-sm">
          No matching services.
        </div>
      )}
    </div>
  )
}
