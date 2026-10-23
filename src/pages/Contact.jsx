
import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Button, Field, TextArea, SectionTitle } from '../components/UI'
import { useApp } from '../context/AppContext'

const contactDetails = [
  {
    title: 'Call us',
    text: '+91 98765 43210',
    image: '/images/phone.jpg',
    alt: 'Phone contact',
  },
  {
    title: 'Email us',
    text: 'hello@tskentertainments.com',
    image: '/images/email.jpg',
    alt: 'Email contact',
  },
  {
    title: 'Find us',
    text: 'Coimbatore, Tamil Nadu, India',
    image: '/images/location.jpg',
    alt: 'Location',
  },
  
]

export default function Contact() {
  const { addEnquiry, currentUser } = useApp()

  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    eventType: 'Wedding',
    eventDate: '',
    guests: '',
    message: '',
  })

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const submit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete your name, email and message.')
      return
    }

    addEnquiry(form)
    setSent(true)
    setError('')
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
          <section className="relative isolate overflow-hidden py-16 text-white sm:py-20 lg:py-28">
              {/* Background Video */}
              <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 -z-20 h-full w-full object-cover"
              >
                  <source src="/videos/contact.mp4" type="video/mp4" />
              </video>

              {/* Dark Overlay */}
              <div className="absolute inset-0 -z-10 bg-[#21131c]/75" />

              {/* Hero Content */}
              <div className="container-wide relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffbd32] sm:text-xs sm:tracking-[0.25em]">
                      Let’s make it happen
                  </p>

                  <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                      Tell us what you’re{' '}
                      <span className="gradient-text">dreaming up.</span>
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                      Share a few details and our team can help you turn your idea into
                      a plan.
                  </p>
              </div>
          </section>

      {/* Contact Section */}
      <section className="container-wide grid grid-cols-1 gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
        {/* Contact Information */}
              
              <div className="min-w-0">
                  <SectionTitle
                      center={false}
                      eyebrow="Get in touch"
                      title="We’re all ears."
                      description="Have a question, a date in mind or a big idea? We’d love to hear about it."
                  />

                  <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                      {contactDetails.map((item) => (
                          <div
                              key={item.title}
                              className="flex min-w-0 flex-col items-center rounded-xl border border-gray-100 bg-white p-2 text-center transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-4"
                          >
                              {/* Contact image */}
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#fff7e8] sm:h-12 sm:w-12 sm:rounded-xl lg:h-14 lg:w-14">
                                  <img
                                      src={item.image}
                                      alt={item.alt}
                                      className="h-full w-full object-contain p-1"
                                      loading="lazy"
                                  />
                              </div>

                              {/* Contact details */}
                              <div className="mt-2 min-w-0 w-full">
                                  <p className="break-words text-[11px] font-bold leading-4 text-[#21131c] sm:text-sm">
                                      {item.title}
                                  </p>

                                  <p className="mt-1 break-words text-[9px] leading-4 text-tsk-muted sm:text-xs lg:text-sm">
                                      {item.text}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              

        {/* Enquiry Form */}
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-orange-900/5 sm:rounded-[2rem] sm:p-6 md:p-8">
          {sent ? (
            <div className="py-10 text-center sm:py-16">
              <CheckCircle2
                size={44}
                className="mx-auto text-green-500 sm:h-12 sm:w-12"
              />

              <h2 className="mt-4 font-display text-xl font-bold sm:text-2xl">
                Enquiry received!
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Thank you, {form.name}. Your enquiry has been saved and our
                team can follow up with you.
              </p>

              <Button
                onClick={() => {
                  setSent(false)
                  setError('')
                }}
                className="mt-6 w-full sm:w-auto"
              >
                Send another enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 sm:space-y-5">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Your event details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Your name *"
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder="Full name"
                  required
                />

                <Field
                  label="Email address *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  placeholder="you@example.com"
                  required
                />

                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  placeholder="+91"
                />

                <label className="block min-w-0 text-sm font-semibold text-gray-700">
                  Event type

                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={change}
                    className="mt-2 min-h-11 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal outline-none transition focus:border-[#ffbd32] focus:ring-2 focus:ring-[#ffbd32]/20 sm:px-4"
                  >
                    {[
                      'Wedding',
                      'Birthday',
                      'Corporate event',
                      'Live entertainment',
                      'Private celebration',
                      'Other',
                    ].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <Field
                  label="Preferred date"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={change}
                />

                <Field
                  label="Approx. guests"
                  name="guests"
                  type="number"
                  min="1"
                  value={form.guests}
                  onChange={change}
                  placeholder="e.g. 150"
                />
              </div>

              <TextArea
                label="Tell us about your plans *"
                name="message"
                value={form.message}
                onChange={change}
                placeholder="Venue, theme, entertainment, budget or anything else..."
                required
              />

              {error && (
                <p
                  role="alert"
                  className="text-sm leading-5 text-red-600"
                >
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full sm:w-auto">
                Send enquiry <Send size={16} />
              </Button>

              <p className="text-xs leading-5 text-gray-400">
                Your enquiry will be saved in this browser demo.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
