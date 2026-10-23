
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { seedServices } from '../data/seed'

const AppContext = createContext(null)

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

// Update image paths without overwriting other saved service data.
const syncServiceImages = (savedServices) => {
  if (!Array.isArray(savedServices)) return seedServices

  return savedServices.map((service) => {
    const latestService = seedServices.find(
      (seed) => seed.id === service.id
    )

    if (!latestService) return service

    return {
      ...service,
      image: latestService.image,
    }
  })
}

export function AppProvider({ children }) {
  const [services, setServices] = useState(() => {
    const savedServices = read('tsk_services', null)

    return savedServices
      ? syncServiceImages(savedServices)
      : seedServices
  })

  const [users, setUsers] = useState(() => read('tsk_users', []))
  const [currentUser, setCurrentUser] = useState(() =>
    read('tsk_current_user', null)
  )
  const [bookings, setBookings] = useState(() =>
    read('tsk_bookings', [])
  )
  const [enquiries, setEnquiries] = useState(() =>
    read('tsk_enquiries', [])
  )
  const [admin, setAdmin] = useState(() =>
    read('tsk_admin', false)
  )

  useEffect(() => {
    localStorage.setItem('tsk_services', JSON.stringify(services))
  }, [services])

  useEffect(() => {
    localStorage.setItem('tsk_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem(
      'tsk_current_user',
      JSON.stringify(currentUser)
    )
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem('tsk_bookings', JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    localStorage.setItem('tsk_enquiries', JSON.stringify(enquiries))
  }, [enquiries])

  useEffect(() => {
    localStorage.setItem('tsk_admin', JSON.stringify(admin))
  }, [admin])

  const register = (data) => {
    if (
      users.some(
        (user) =>
          user.email.toLowerCase() === data.email.toLowerCase()
      )
    ) {
      return {
        ok: false,
        message: 'An account with this email already exists.',
      }
    }

    const user = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone || '',
    }

    setUsers((previous) => [
      ...previous,
      { ...user, password: data.password },
    ])

    setCurrentUser(user)

    return { ok: true }
  }

  const login = (email, password) => {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    )

    if (!user) {
      return {
        ok: false,
        message:
          'Email or password is incorrect. Please register if you are new.',
      }
    }

    const { password: _, ...safeUser } = user

    setCurrentUser(safeUser)

    return { ok: true }
  }

  const logout = () => {
    setCurrentUser(null)
    setAdmin(false)
  }

  const addBooking = (data) => {
    const booking = {
      ...data,
      id: `TSK-${Date.now().toString().slice(-7)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    setBookings((previous) => [booking, ...previous])

    return booking
  }

  const addEnquiry = (data) => {
    setEnquiries((previous) => [
      {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: 'New',
      },
      ...previous,
    ])
  }

  const value = useMemo(
    () => ({
      services,
      setServices,
      users,
      currentUser,
      setCurrentUser,
      bookings,
      setBookings,
      enquiries,
      setEnquiries,
      admin,
      setAdmin,
      register,
      login,
      logout,
      addBooking,
      addEnquiry,
    }),
    [services, users, currentUser, bookings, enquiries, admin]
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
