# HDG Design & Engineering Consultancy Website

A modern, multilingual website for HDG Design & Engineering Consultancy built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Trilingual Support**: Vietnamese, English, and Chinese (Simplified)
- **Modern Design**: Professional construction/engineering aesthetic with HDG brand colors
- **Content Management**: Admin dashboard for managing projects, posts, team, and inquiries
- **SEO Optimized**: Dynamic sitemap, OpenGraph images, and meta tags per locale
- **Responsive**: Mobile-first design with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (Radix primitives)
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cts-hdg
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_SITE_URL=https://hdg.vn
   ```

4. Run database migrations:
   - Go to Supabase Dashboard > SQL Editor
   - Run the SQL files in `supabase/migrations/` in order

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── (admin)/        # Admin dashboard routes
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (public)/       # Public pages
│   │   └── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── admin/              # Admin components
│   ├── auth/               # Auth components
│   ├── forms/              # Form components
│   ├── layout/             # Header, Footer, etc.
│   ├── sections/           # Page sections
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── i18n/               # Internationalization config
│   ├── supabase/           # Supabase clients
│   └── utils.ts
├── messages/               # Translation files
│   ├── vi.json
│   ├── en.json
│   └── zh.json
└── middleware.ts
```

## Database Schema

- **projects**: Project portfolio entries
- **services**: Company services
- **team**: Team members
- **posts**: News/blog articles
- **inquiries**: Contact form submissions
- **clients**: Client/partner logos

## Admin Dashboard

Access the admin at `/dashboard` after logging in at `/login`.

Features:
- Dashboard with stats overview
- Project management (CRUD)
- Inquiry management
- Content publishing

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## Design System

### Colors

- **Primary**: Deep Navy #1a365d (trust, professionalism)
- **Secondary**: Warm Gold #d69e2e (premium, quality)
- **Accent**: Teal #319795 (innovation, technical)

### Typography

- **Headings**: Outfit
- **Body**: Inter

## License

Proprietary - HDG Design & Engineering Consultancy JSC

