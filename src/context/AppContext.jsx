import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedServices } from '../data/seed'

const AppContext = createContext(null)
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback } }

export function AppProvider({ children }) {
  const [services, setServices] = useState(() => read('tsk_services', seedServices))
  const [users, setUsers] = useState(() => read('tsk_users', []))
  const [currentUser, setCurrentUser] = useState(() => read('tsk_current_user', null))
  const [bookings, setBookings] = useState(() => read('tsk_bookings', []))
  const [enquiries, setEnquiries] = useState(() => read('tsk_enquiries', []))
  const [admin, setAdmin] = useState(() => read('tsk_admin', false))
  useEffect(() => localStorage.setItem('tsk_services', JSON.stringify(services)), [services])
  useEffect(() => localStorage.setItem('tsk_users', JSON.stringify(users)), [users])
  useEffect(() => localStorage.setItem('tsk_current_user', JSON.stringify(currentUser)), [currentUser])
  useEffect(() => localStorage.setItem('tsk_bookings', JSON.stringify(bookings)), [bookings])
  useEffect(() => localStorage.setItem('tsk_enquiries', JSON.stringify(enquiries)), [enquiries])
  useEffect(() => localStorage.setItem('tsk_admin', JSON.stringify(admin)), [admin])

  const register = (data) => {
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) return { ok:false, message:'An account with this email already exists.' }
    const user = { id: crypto.randomUUID(), name:data.name.trim(), email:data.email.trim().toLowerCase(), phone:data.phone || '' }
    setUsers(prev => [...prev, { ...user, password:data.password }])
    setCurrentUser(user)
    return { ok:true }
  }
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password)
    if (!user) return { ok:false, message:'Email or password is incorrect. Please register if you are new.' }
    const { password: _, ...safeUser } = user; setCurrentUser(safeUser); return { ok:true }
  }
  const logout = () => { setCurrentUser(null); setAdmin(false) }
  const addBooking = (data) => {
    const booking = { ...data, id:`TSK-${Date.now().toString().slice(-7)}`, status:'Pending', createdAt:new Date().toISOString() }
    setBookings(prev => [booking, ...prev]); return booking
  }
  const addEnquiry = (data) => setEnquiries(prev => [{ ...data, id:crypto.randomUUID(), createdAt:new Date().toISOString(), status:'New' }, ...prev])
  const value = useMemo(() => ({ services,setServices,users,currentUser,setCurrentUser,bookings,setBookings,enquiries,setEnquiries,admin,setAdmin,register,login,logout,addBooking,addEnquiry }), [services,users,currentUser,bookings,enquiries,admin])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)