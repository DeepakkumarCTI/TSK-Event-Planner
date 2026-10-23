import { Button, Reveal, SectionTitle } from '../components/UI'
import {
    HeartHandshake,
    Lightbulb,
    BadgeCheck,
    UsersRound,
    ArrowRight,
} from 'lucide-react'

const values = [
    {
        icon: HeartHandshake,
        title: 'People first',
        text: 'We listen closely and design each experience around the people celebrating.',
    },
    {
        icon: Lightbulb,
        title: 'Ideas with energy',
        text: 'Fresh concepts, thoughtful details and a creative approach to every brief.',
    },
    {
        icon: BadgeCheck,
        title: 'Care in every detail',
        text: 'Clear coordination and dependable execution from the first call to the final cue.',
    },
    {
        icon: UsersRound,
        title: 'One connected team',
        text: 'Planning, performers and production work together to make the day feel effortless.',
    },
]

export default function About() {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative isolate overflow-hidden bg-[#21131c] py-14 text-white sm:py-20 lg:py-24">
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=85"
                    className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                >
                    <source src="/videos/about.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Light Overlay — keeps the video visible */}
                <div className="absolute inset-0 -z-10 bg-black/30" />

                {/* Gradient Overlay — improves text readability */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#21131c]/70 via-[#21131c]/30 to-transparent" />

                {/* Content */}
                <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-[.25em] text-[#ffbd32] sm:text-sm">
                        A little about us
                    </p>

                    <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        We don’t just plan events.{' '}
                        <span className="gradient-text">We create feelings.</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:mt-5 sm:text-base sm:leading-8">
                        TSK Entertainment is an event management and entertainment team
                        built around one simple belief: the best moments deserve to be
                        extraordinary.
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="container-wide grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
                <Reveal>
                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"
                        alt="Beautifully styled event"
                        className="h-[420px] w-full rounded-[2rem] object-cover shadow-xl"
                    />
                </Reveal>

                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[.25em] text-tsk-red">
                        Who we are
                    </p>

                    <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                        Your idea is the starting point. The magic is what we build
                        together.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-tsk-muted">
                        From weddings and birthdays to corporate gatherings and live
                        entertainment, we bring creative planning, reliable coordination
                        and exciting talent together. We take care of the moving parts so
                        you can be fully present in the moments that matter.
                    </p>

                    <p className="mt-4 text-sm leading-7 text-tsk-muted">
                        No two celebrations are alike. That’s why we listen first, plan
                        with purpose and make every event feel personal.
                    </p>

                    <Button to="/contact" className="mt-7">
                        Let’s talk about your event <ArrowRight size={16} />
                    </Button>
                </Reveal>
            </section>
            {/* Mission & Vision Section */}
            <section className="bg-[#fffaf6] py-10 sm:py-14 lg:py-16">
                <div className="container-wide px-4 sm:px-6 lg:px-8">

                    {/* Section Heading */}
                    <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
                        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#c2415d] sm:text-sm">
                            Our Purpose
                        </p>

                        <h2 className="mt-3 font-display text-3xl font-bold text-[#21131c] sm:text-4xl lg:text-5xl">
                            What inspires everything we do
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-[#75636b] sm:text-base">
                            Every celebration starts with an idea. Our purpose is to turn those
                            ideas into meaningful experiences and lasting memories.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid gap-5 md:grid-cols-2 md:gap-7">

                        {/* Mission */}
                        <article className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-6 sm:p-8 lg:p-10">
                            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#c2415d]">
                                Our Mission
                            </p>

                            <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-[#21131c] sm:text-3xl">
                                Creating moments that bring people together.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#75636b] sm:text-base sm:leading-8">
                                Our mission is to deliver creative, well-organized and memorable
                                events tailored to every client’s vision. Through thoughtful
                                planning, quality entertainment and attention to every detail,
                                we strive to make each celebration special and stress-free.
                            </p>

                            <div className="mt-6 h-1 w-16 rounded-full bg-[#e85d75]" />
                        </article>

                        {/* Vision */}
                        <article className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 lg:p-10">
                            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#a66b08]">
                                Our Vision
                            </p>

                            <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-[#21131c] sm:text-3xl">
                                Becoming a name people trust for every celebration.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-[#75636b] sm:text-base sm:leading-8">
                                Our vision is to be a trusted event management and entertainment
                                company recognized for creativity, reliability and excellence.
                                We aspire to transform ideas into extraordinary experiences
                                that inspire happiness and create memories that last a lifetime.
                            </p>

                            <div className="mt-6 h-1 w-16 rounded-full bg-[#ffbd32]" />
                        </article>

                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="bg-white py-16 sm:py-24">
                <div className="container-wide">
                    <SectionTitle
                        eyebrow="What guides us"
                        title="The details make the difference"
                        description="A good event is more than a schedule. It’s how everything comes together and how people feel when they’re there."
                    />

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((v) => (
                            <Reveal key={v.title}>
                                <article className="rounded-3xl border border-gray-100 bg-[#fffaf6] p-6">
                                    <div className="gradient-bg inline-flex rounded-2xl p-3 text-white">
                                        <v.icon size={22} />
                                    </div>

                                    <h3 className="mt-5 font-display text-xl font-bold">
                                        {v.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-tsk-muted">
                                        {v.text}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="container-wide py-16 text-center sm:py-20">
                <p className="text-xs font-bold uppercase tracking-[.25em] text-tsk-red">
                    Ready when you are
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
                    Let’s make your next event{' '}
                    <span className="gradient-text">the one they talk about.</span>
                </h2>

                <div className="mt-7">
                    <Button to="/services">
                        See what we do <ArrowRight size={16} />
                    </Button>
                </div>
            </section>
        </main>
    )
}
