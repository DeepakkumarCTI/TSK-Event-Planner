
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    ArrowUpRight,
    Play,
    Sparkles,
    Heart,
    Music2,
    Building2,
    PartyPopper,
    CheckCircle2,
    Star,
} from 'lucide-react'

import { Button, SectionTitle, Reveal } from '../components/UI'
import ServiceCard from '../components/ServiceCard'
import { useApp } from '../context/AppContext'

const heroImages = [
    {
        title: 'Wedding Celebration',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Engagement Ceremony',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Birthday Parties',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Corporate Events',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Reception Celebration',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Temple Functions',
        image: 'https://images.unsplash.com/photo-1604608672516-4e3b3c5f6f5b?auto=format&fit=crop&w=2000&q=90',
    },
    {
        title: 'Cultural Celebrations',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2000&q=90',
    },
]

function TypingText() {
    const phrases = [
        'big moments',
        'lasting memories',
        'extraordinary events',
    ]

    const [phraseIndex, setPhraseIndex] = useState(0)
    const [text, setText] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex]
        let timeout

        if (!deleting && text === currentPhrase) {
            timeout = setTimeout(() => setDeleting(true), 1600)
        } else if (deleting && text === '') {
            timeout = setTimeout(() => {
                setDeleting(false)
                setPhraseIndex((index) => (index + 1) % phrases.length)
            }, 300)
        } else {
            timeout = setTimeout(() => {
                setText((value) =>
                    deleting
                        ? value.slice(0, -1)
                        : currentPhrase.slice(0, value.length + 1)
                )
            }, deleting ? 35 : 65)
        }

        return () => clearTimeout(timeout)
    }, [text, deleting, phraseIndex])

    return (
        <span className="gradient-text inline">
            {text}
            <span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse rounded-full bg-[#ffbd32]"
            />
        </span>
    )
}

const experiences = [
    {
        icon: Heart,
        title: 'Wedding magic',
        text: 'Thoughtful details for your once-in-a-lifetime day.',
    },
    {
        icon: Music2,
        title: 'Live entertainment',
        text: 'Artists, DJs and performances that lift the room.',
    },
    {
        icon: PartyPopper,
        title: 'Life celebrations',
        text: 'Birthdays, milestones and every reason to gather.',
    },
    {
        icon: Building2,
        title: 'Corporate events',
        text: 'Polished experiences that bring people together.',
    },
]

export default function Home() {
    const { services } = useApp()
    const [activeHero, setActiveHero] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHero((current) => (current + 1) % heroImages.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className="m-0 p-0">
            {/* Hero Section */}
            <section className="relative isolate m-0 flex min-h-[520px] items-center overflow-hidden bg-[#21131c] text-white sm:min-h-[560px] lg:min-h-[620px]">

                {/* Background slideshow */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    {heroImages.map((item, index) => (
                        <img
                            key={item.title}
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${activeHero === index ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                    ))}
                </div>

                {/* Overlay above images, below content */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#21131c]/90 via-[#21131c]/65 to-[#21131c]/30 sm:from-[#21131c]/95 sm:via-[#21131c]/75 sm:to-[#21131c]/30" />

                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#21131c]/45 via-transparent to-[#21131c]/20" />

                {/* Hero content */}
                <div className="container-wide relative z-10 grid w-full items-center gap-6 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:py-14 xl:gap-6">

                    {/* Left content */}
                    <div className="min-w-0">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur sm:px-4 sm:text-xs">
                            <Sparkles size={15} className="text-[#ffbd32]" />
                            EVENTS THAT FEEL LIKE YOU
                        </div>

                        <h1 className="max-w-3xl font-sans text-4xl font-extrabold leading-[1.1] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                            We make your
                            <span className="mt-2 block min-h-[1.15em]">
                                <TypingText />
                            </span>
                            unforgettable.
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-6 text-white/90 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                            From dream weddings to show-stopping live acts, TSK
                            Entertainment brings your vision to life with creativity,
                            care and a little bit of magic.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button to="/services">
                                Explore our services <ArrowRight size={17} />
                            </Button>

                            <Button to="/contact" variant="outline">
                                <Play size={15} /> Plan with us
                            </Button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-white/90 sm:text-sm">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-[#ffbd32]" />
                                End-to-end planning
                            </span>

                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-[#ffbd32]" />
                                Creative experiences
                            </span>
                        </div>
                    </div>

                    {/* Right featured video card */}
                    <div className="hidden min-w-0 justify-center lg:flex lg:pl-0">
                        <div className="relative w-full max-w-[360px] xl:max-w-[390px]">
                            <div className="gradient-bg absolute -inset-2 rotate-3 rounded-[1.5rem] opacity-80 blur-[1px]" />

                            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/10 p-2.5 shadow-2xl backdrop-blur">
                                <video
                                    src="/videos/wedding-video.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="h-[350px] w-full rounded-[1.1rem] object-cover xl:h-[390px]"
                                />

                                <div className="glass absolute bottom-5 left-5 right-5 rounded-xl p-3.5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffbd32]">
                                        Your story, our stage
                                    </p>

                                    <p className="mt-1 font-sans text-lg font-bold tracking-tight sm:text-xl">
                                        Moments worth remembering.
                                    </p>
                                </div>
                            </div>

                            <div className="absolute -left-4 top-8 flex items-center gap-2 rounded-xl bg-white p-2.5 text-gray-900 shadow-xl xl:-left-6 xl:p-3">
                                <div className="gradient-bg rounded-lg p-2 text-white">
                                    <Star size={17} fill="currentColor" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold">Made with heart</p>
                                    <p className="text-[10px] text-gray-500">
                                        Every detail matters
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clickable slideshow indicators */}
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                    {heroImages.map((item, index) => (
                        <button
                            key={item.title}
                            type="button"
                            onClick={() => setActiveHero(index)}
                            aria-label={`Show ${item.title}`}
                            aria-current={activeHero === index ? 'true' : undefined}
                            className={`h-1.5 rounded-full transition-all duration-300 ${activeHero === index
                                    ? 'w-8 bg-[#ffbd32]'
                                    : 'w-3 bg-white/60 hover:bg-white'
                                }`}
                        />
                    ))}
                </div>

                {/* Bottom transition */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-10 bg-gradient-to-t from-[#fffaf6] to-transparent sm:h-12" />
            </section>

            
            {/* The TSK Touch */}
            <section className="relative overflow-hidden bg-[#fffaf6] py-10 sm:py-14 lg:py-20">
                <div className="container-wide">

                    {/* Section heading */}
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_0.85fr] md:items-end md:gap-10 lg:gap-16">
                        <Reveal>
                            <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-tsk-red sm:text-xs">
                                <span className="h-[2px] w-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                                The TSK touch
                            </p>

                            <h2 className="mt-3 max-w-2xl font-sans text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#21131c] sm:mt-4 sm:text-4xl lg:text-6xl">
                                Every event has a story.
                                <span className="mt-1 block gradient-text">
                                    Let’s make yours.
                                </span>
                            </h2>
                        </Reveal>

                        <Reveal>
                            <div className="md:pb-1">
                                <p className="max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                                    From intimate celebrations to unforgettable productions,
                                    we bring every detail together to create experiences
                                    worth remembering.
                                </p>

                                <Link
                                    to="/about"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-tsk-red transition-colors hover:text-orange-600 sm:mt-5"
                                >
                                    Discover our story
                                    <ArrowUpRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    
                    
                    {/* Image cards */}
                    <div className="mt-7 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4">
                        {experiences.map((item, index) => {
                            const cardImages = [
                                'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85',
                                'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85',
                                'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85',
                                'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85',
                            ];

                            return (
                                <Reveal key={item.title}>
                                    <article className="group relative isolate min-h-[280px] overflow-hidden rounded-2xl bg-[#21131c] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:min-h-[320px] sm:rounded-3xl lg:min-h-[360px]">

                                        {/* Background image */}
                                        <img
                                            src={cardImages[index]}
                                            alt={item.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#170d15]/95 via-[#170d15]/50 to-black/10" />

                                        {/* Decorative border */}
                                        <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-white/20 transition-all duration-500 group-hover:inset-3.5 sm:inset-3 sm:rounded-2xl" />

                                        {/* Card content */}
                                        <div className="relative flex min-h-[280px] flex-col justify-end p-4 text-white sm:min-h-[320px] sm:p-5 lg:min-h-[360px] lg:p-4 xl:p-5">

                                            <span className="mb-2 block break-words text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#ffbd32] sm:text-[10px] sm:tracking-[0.18em]">
                                                0{index + 1} / TSK EXPERIENCE
                                            </span>

                                            <h3 className="break-words text-xl font-extrabold leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-2xl lg:text-xl xl:text-2xl">
                                                {item.title}
                                            </h3>

                                            {/* Visible on mobile; expands on desktop hover */}
                                            <p className="mt-2 break-words text-xs leading-5 text-white/85 [overflow-wrap:anywhere] sm:text-sm sm:leading-6 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                                                {item.text}
                                            </p>

                                            <div className="mt-3 flex min-w-0 items-center justify-between gap-2 border-t border-white/25 pt-3 sm:mt-4">
                                                <span className="min-w-0 break-words text-[9px] font-bold uppercase leading-4 tracking-[0.08em] text-white/80 sm:text-[10px] sm:tracking-[0.12em]">
                                                    Moments that matter
                                                </span>

                                                
                                            </div>
                                        </div>
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>
                    

                    {/* Bottom accent */}
                    <div className="mt-7 flex items-center justify-center gap-3 sm:mt-10">
                        <span className="h-px w-10 bg-orange-200 sm:w-16" />
                        <span className="text-center text-[9px] font-extrabold uppercase tracking-[0.24em] text-gray-400 sm:text-[10px]">
                            Crafted with creativity. Delivered with heart.
                        </span>
                        <span className="h-px w-10 bg-orange-200 sm:w-16" />
                    </div>
                </div>
            </section>
            

            {/* Services */}
            <section className="bg-[#fff1e5] py-7 sm:py-10 lg:py-12">
                <div className="container-wide">
                    <SectionTitle
                        eyebrow="A few ways to celebrate"
                        title="Experiences made for your moment"
                        description="Explore a few of our favourite ways to bring people together. Your idea can be the next one."
                    />

                    <div className="mt-4 grid-cols-2 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 lg:mt-7 lg:grid-cols-3 lg:gap-5">
                        {services.slice(0, 6).map((s, i) => (
                            <ServiceCard key={s.id} service={s} index={i} />
                        ))}
                    </div>

                    <div className="mt-5 text-center sm:mt-7">
                        <Button to="/services">
                            Explore all services <ArrowRight size={17} />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container-wide py-7 sm:py-10 lg:py-12">
                <div className="grid overflow-hidden rounded-2xl bg-[#21131c] text-white sm:rounded-[1.5rem] lg:grid-cols-2">
                    <div className="p-4 sm:p-7 lg:p-9 xl:p-10">
                        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#ffbd32] sm:text-xs">
                            Your event, your way
                        </p>

                        <h2 className="mt-2.5 font-sans text-2xl font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
                            Got a date? We’ll bring the{' '}
                            <span className="gradient-text">wow.</span>
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/65 sm:mt-4 sm:leading-7">
                            Tell us what you have in mind and our team will help you
                            shape a celebration that feels unmistakably yours.
                        </p>

                        <div className="mt-4 sm:mt-6">
                            <Button to="/contact">
                                Start planning <ArrowUpRight size={17} />
                            </Button>
                        </div>
                    </div>

                    <div className="relative min-h-40 sm:min-h-56 lg:min-h-full">
                        <img
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=90"
                            alt="Live event crowd"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-[#21131c] via-[#21131c]/20 to-transparent" />
                    </div>
                </div>
            </section>
        </main>
    )
}
