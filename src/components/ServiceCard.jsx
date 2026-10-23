import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ServiceCard({ service, index = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
            className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-tsk-red/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:rounded-2xl sm:hover:-translate-y-2 sm:hover:shadow-[0_20px_55px_rgba(0,0,0,0.10)]"
        >
            <Link
                to={`/booking?service=${service.id}`}
                className="flex h-full flex-col"
            >
                {/* Image */}
                <div className="relative h-36 shrink-0 overflow-hidden bg-gray-100 min-[400px]:h-40 sm:h-56 md:h-64 lg:h-72">
                    <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Number */}
                    <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-black/25 text-[9px] font-bold text-white backdrop-blur-md sm:left-4 sm:top-4 sm:h-10 sm:w-10 sm:text-xs">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Category */}
                    <span className="absolute right-2 top-2 max-w-[65%] truncate rounded-full bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-tsk-red sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.14em]">
                        {service.tag || service.category}
                    </span>

                    {/* Image title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6">
                        <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/75 sm:mb-2 sm:text-[10px] sm:tracking-[0.2em]">
                            TSK Entertainment
                        </p>

                        <h3 className="line-clamp-2 font-display text-sm font-bold leading-tight text-white min-[400px]:text-base sm:text-2xl md:text-3xl">
                            {service.title}
                        </h3>
                    </div>

                    {/* Arrow */}
                    <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-tsk-red text-white transition-all duration-300 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <ArrowUpRight size={16} className="sm:hidden" />
                        <ArrowUpRight size={20} className="hidden sm:block" />
                    </span>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-3 min-[400px]:p-3.5 sm:p-5 md:p-6">
                    <p className="line-clamp-3 flex-1 text-[11px] leading-[1.4rem] text-tsk-muted sm:min-h-[66px] sm:text-sm sm:leading-6">
                        {service.description}
                    </p>

                    <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 min-[400px]:mt-4 sm:mt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-4">
                        <div className="min-w-0">
                            <p className="text-[8px] font-semibold uppercase leading-3 tracking-wide text-gray-400 sm:text-[10px] sm:leading-normal sm:tracking-[0.15em]">
                                Packages from
                            </p>

                            <p className="mt-1 truncate text-base font-bold tracking-tight text-gray-900 min-[400px]:text-lg sm:text-xl">
                                ₹{Number(service.price).toLocaleString('en-IN')}
                            </p>
                        </div>

                        <span className="inline-flex items-center gap-1 pb-0.5 text-[10px] font-bold text-tsk-red transition-all duration-300 group-hover:gap-2 sm:pb-1 sm:text-xs">
                            Explore
                            <ArrowUpRight size={13} className="sm:h-[15px] sm:w-[15px]" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}