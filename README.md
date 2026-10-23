# TSK Entertainment website

Responsive React + Vite + Tailwind CSS event-management website with Local Storage demo data.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP and open the project folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`

## Demo admin
- Email: `admin@gmail.com`
- Password: `admin123`

Open `/admin/login` to sign in. The admin can add, edit and delete services, view enquiries and bookings, and update booking status.

## Included
- Home, About, Services, Contact, Register, Login, Booking, Track Booking and Admin dashboard
- Customer registration/login and protected booking flow
- Service management and booking/enquiry dashboards
- Local Storage persistence
- Responsive layout, Framer Motion animations and Tailwind CSS
- Vercel SPA rewrite config and `.gitignore`

## Replace these assets
- Logo: `public/images/tsk-logo.jpg`
- Hero background video: replace `public/videos/hero.mp4` (placeholder note included; add your own MP4)
- Photos: replace image URLs in `src/data/seed.js` with your own assets when ready.

## Important security note
This is a front-end demo. Local Storage and the admin credentials are not secure authentication. Anyone with browser access can inspect or modify local data, and demo credentials are visible in the client bundle. Before production, use a backend/database and server-side authentication with hashed passwords and role-based authorization.
