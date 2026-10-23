import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { seedServices, categories } from '../data/seed'
import ServiceCard from '../components/ServiceCard'
import { SectionTitle } from '../components/UI'

export default function Services() {
  const { services } = useApp()

  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  // Use the updated local images from seed.js.
  // Preserve context data such as prices and descriptions.
  const updatedServices = useMemo(() => {
    return services.map((service) => {
      const updatedService = seedServices.find(
        (item) => item.id === service.id
      )

      return updatedService
        ? { ...service, image: updatedService.image }
        : service
    })
  }, [services])

  const filtered = useMemo(() => {
    return updatedServices.filter((service) => {
      const matchesCategory =
        category === 'All' || service.category === category

      const searchText =
        `${service.title} ${service.description} ${service.category}`.toLowerCase()

      return matchesCategory && searchText.includes(search.toLowerCase())
    })
  }, [updatedServices, category, search])

  return (
    <main>
          <section className="relative isolate overflow-hidden bg-[#21131c] py-20 text-white sm:py-28 lg:py-32">
              {/* Background Video */}
              <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
              >
                  <source src="/videos/services.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
              </video>

              {/* Light Overlay - Keeps Video Clearly Visible */}
              <div className="absolute inset-0 -z-10 bg-black/35" />

              {/* Optional Gradient for Text Readability */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21131c]/65 via-[#21131c]/20 to-transparent" />

              {/* Content */}
              <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
                  <p className="text-xs font-bold uppercase tracking-[.25em] text-[#ffbd32] sm:text-sm">
                      What we do
                  </p>

                  <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                      One team.{" "}
                      <span className="gradient-text">A thousand ways</span> to celebrate.
                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
                      Browse our event planning, entertainment and production services.
                      We can tailor a package to your date, venue and vision.
                  </p>
              </div>
          </section>

      <section className="container-wide py-12 sm:py-16">
        <SectionTitle
          eyebrow="Find your experience"
          title="Services for every kind of occasion"
          description="Choose a service to get started. Pricing shown is an indicative starting package and can be tailored to your event."
        />

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services..."
              className="w-full rounded-full border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-tsk-red"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal
              size={16}
              className="shrink-0 text-tsk-red"
            />

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                  category === item
                    ? 'gradient-bg text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white py-16 text-center">
            <p className="font-display text-2xl font-bold">
              No services found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="mt-5 font-bold text-tsk-red"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  )
}