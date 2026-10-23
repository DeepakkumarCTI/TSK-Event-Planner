import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Button({ children, to, onClick, type='button', variant='primary', className='' }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 ${variant==='primary'?'gradient-bg text-white shadow-glow hover:shadow-lg':variant==='dark'?'bg-tsk-ink text-white hover:bg-tsk-red':'border border-white/50 text-white hover:bg-white/10'} ${className}`
  return to ? <Link to={to} className={cls}>{children}</Link> : <button type={type} onClick={onClick} className={cls}>{children}</button>
}
export function SectionTitle({ eyebrow, title, description, center=true }) {
  return <div className={`${center?'text-center mx-auto':''} max-w-3xl mb-10`}><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-tsk-red">{eyebrow}</p><h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>{description && <p className="mt-4 text-sm leading-7 text-tsk-muted sm:text-base">{description}</p>}</div>
}
export function Reveal({ children, className='' }) {
  return <motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.55,ease:'easeOut'}}>{children}</motion.div>
}
export function Field({ label, ...props }) {
  return <label className="block text-sm font-semibold text-gray-700">{label}<input {...props} className={`mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-normal focus:border-tsk-red focus:ring-2 focus:ring-tsk-red/10 ${props.className||''}`} /></label>
}
export function TextArea({ label, ...props }) {
  return <label className="block text-sm font-semibold text-gray-700">{label}<textarea {...props} className="mt-2 min-h-32 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-normal focus:border-tsk-red focus:ring-2 focus:ring-tsk-red/10" /></label>
}
