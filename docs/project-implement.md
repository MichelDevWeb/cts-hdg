# Project Implementation Plan (Construction, Design & Consulting Web)

## Business Description
- HDG is a design and engineering consultancy providing highly feasible technical solutions, optimizing investment efficiency and aligning with real-world project conditions.
- Reference: `docs/business-solution.md`

## Project Goals
- Present HDG brand, services, and capabilities with high trust.
- Support bilingual/trilingual stakeholders (VN/EN/ZH).
- Generate qualified leads and streamline project inquiries.
- Provide a scalable foundation for future project showcases and client portals.

## Core Requirements
- Translation: Vietnamese, English, Chinese (Simplified).
- Tech stack: Next.js + Drizzle ORM + Supabase + Vercel.
- Implement based on phases.

---

## Implemented Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 14 (App Router) | SSR, RSC, routing |
| Styling | Tailwind CSS + CSS Variables | Brand theming |
| UI Components | shadcn/ui (Radix primitives) | Forms, dialogs, cards |
| Forms | React Hook Form + Zod | Validation |
| i18n | next-intl | Trilingual routing |
| Auth | Supabase Auth | Admin access |
| **ORM** | **Drizzle ORM** | **Type-safe database queries** |
| Database | Supabase Postgres | Content storage |
| Storage | Supabase Storage | Images, documents |
| Hosting | Vercel | Edge deployment |

---

## Design System (Updated)

### Brand Colors (Based on Logo)

The HDG logo features a distinctive "H" shape with two primary colors:

| Color | Hex | Usage |
|-------|-----|-------|
| **HDG Blue** | `#3B6B9C` | Primary brand, headers, CTAs |
| **HDG Dark** | `#3A3A3A` | Text, secondary elements |
| **White** | `#FFFFFF` | Backgrounds, contrast |
| **Blue Light** | `#5A8BBF` | Hover states, accents |
| **Blue Dark** | `#2A4F73` | Active states, depth |
| **Blue Muted** | `#E8F0F7` | Backgrounds, cards |

### Typography
- **Font Family**: Be Vietnam Pro (Google Fonts)
  - Optimized for Vietnamese language with full diacritics support
  - Modern, clean aesthetic suitable for both headings and body text
  - Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Animation System
- Micro transitions: 150ms
- Fast transitions: 200ms
- Normal transitions: 300ms
- Slow transitions: 500ms
- Custom keyframes: fade-in-up, scale-in, slide-in-left, float, shimmer

### UI/UX Implementation Guide
See: `docs/project-ui-ux-implement.md`

---

## Project Structure

```
cts-hdg/
├── src/
│   ├── app/
│   │   ├── [locale]/                 # Locale-based routing (vi, en, zh)
│   │   │   ├── (admin)/              # Admin dashboard routes
│   │   │   │   ├── dashboard/        # Dashboard overview
│   │   │   │   ├── admin-projects/   # Project management
│   │   │   │   ├── admin-services/   # Services management (NEW)
│   │   │   │   ├── admin-team/       # Team member management
│   │   │   │   ├── admin-clients/    # Clients & partners management
│   │   │   │   ├── admin-inquiries/  # Inquiry management
│   │   │   │   ├── admin-information/# Site information management (NEW)
│   │   │   │   └── layout.tsx        # Admin layout (with footer)
│   │   │   ├── (auth)/               # Authentication routes
│   │   │   │   └── login/            # Login page (no main header/footer)
│   │   │   ├── about/                # About page
│   │   │   ├── services/             # Services page
│   │   │   ├── projects/             # Projects listing
│   │   │   │   └── [slug]/           # Project detail page
│   │   │   ├── process/              # Working process
│   │   │   ├── contact/              # Contact page
│   │   │   ├── [...rest]/            # Catch-all for 404
│   │   │   ├── layout.tsx            # Main layout (conditional header/footer)
│   │   │   ├── page.tsx              # Home page
│   │   │   └── not-found.tsx         # 404 page (enhanced)
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── robots.ts                 # Robots.txt
│   ├── components/
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── admin-sidebar.tsx     # Sidebar with logo
│   │   │   ├── admin-header.tsx      # Header with language switcher
│   │   │   ├── admin-footer.tsx      # Footer with CheoTechStudio info
│   │   │   ├── team-member-actions.tsx
│   │   │   ├── team-member-form.tsx
│   │   │   ├── client-actions.tsx
│   │   │   ├── client-form.tsx
│   │   │   ├── service-actions.tsx   # Service CRUD actions (NEW)
│   │   │   ├── service-form.tsx      # Service edit form (NEW)
│   │   │   ├── site-info-form.tsx    # Site info edit form (NEW)
│   │   │   └── image-browser.tsx     # Browse images from storage
│   │   ├── auth/                     # Auth components
│   │   │   └── login-form.tsx        # Login form with logo & password reset
│   │   ├── forms/                    # Form components
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx            # Main header with logo
│   │   │   ├── footer.tsx            # Main footer with logo
│   │   │   └── language-switcher.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── team-section.tsx      # Dynamic team display
│   │   │   └── clients-carousel.tsx  # Dynamic clients carousel
│   │   └── ui/                       # shadcn/ui components
│   │       └── loading-section.tsx   # Loading states for API data
│   ├── lib/
│   │   ├── db/                       # Drizzle ORM
│   │   │   ├── index.ts              # Database connection
│   │   │   ├── schema.ts             # Table definitions
│   │   │   └── queries/              # Query functions
│   │   │       ├── projects.ts       # Project CRUD
│   │   │       ├── team.ts           # Team member CRUD
│   │   │       └── clients.ts        # Client CRUD
│   │   ├── i18n/                     # Internationalization
│   │   ├── supabase/                 # Supabase clients (auth)
│   │   └── utils.ts                  # Utility functions
│   ├── messages/                     # Translation files
│   │   ├── vi.json
│   │   ├── en.json
│   │   └── zh.json
│   └── middleware.ts                 # Next.js middleware (i18n + pathname)
├── public/
│   └── images/
│       └── logo.png                  # HDG logo
├── drizzle/                          # Drizzle migrations
├── docs/
│   ├── business-solution.md
│   ├── project-implement.md
│   └── project-ui-ux-implement.md    # UI/UX guide
├── drizzle.config.ts                 # Drizzle config
├── package.json
├── tailwind.config.ts                # Updated with HDG colors
├── next.config.mjs
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## Database Schema (Drizzle ORM)

### Tables

| Table | Description | Type Export |
|-------|-------------|-------------|
| `projects` | Project portfolio | `Project`, `NewProject` |
| `services` | Company services (with multilingual features) | `Service`, `NewService` |
| `site_info` | Site/company information (contact, address, etc.) | `SiteInfo`, `NewSiteInfo` |
| `team` | Team members (with education, certifications, active) | `TeamMember`, `NewTeamMember` |
| `posts` | News/blog articles | `Post`, `NewPost` |
| `inquiries` | Contact submissions | `Inquiry`, `NewInquiry` |
| `clients` | Client/partner logos (with category, active) | `Client`, `NewClient` |

### Key Fields (projects example)
```typescript
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  titleVi: text("title_vi").notNull(),
  titleEn: text("title_en").notNull(),
  titleZh: text("title_zh").notNull(),
  category: text("category").notNull(),
  services: text("services").array().default([]),
  location: text("location").notNull(),
  scale: text("scale"),
  year: integer("year").notNull(),
  client: text("client"), // Client/company name
  summaryVi: text("summary_vi"),
  summaryEn: text("summary_en"),
  summaryZh: text("summary_zh"),
  contentVi: text("content_vi"), // Detailed content in Vietnamese
  contentEn: text("content_en"), // Detailed content in English
  contentZh: text("content_zh"), // Detailed content in Chinese
  coverImage: text("cover_image"),
  gallery: text("gallery").array().default([]),
  featured: boolean("featured").default(false), // Featured project flag
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### Query Functions

```typescript
// Projects
getPublishedProjects()
getProjectBySlug(slug)
getProjectBySlugAdmin(slug) // Includes unpublished projects
getFeaturedProjects(limit) // Returns projects with featured=true
getProjectsByCategory(category)
createProject(data)
updateProject(id, data)
deleteProject(id)
toggleProjectFeatured(id) // Toggle featured status
toggleProjectPublished(id) // Toggle published status
getLocalizedProject(project, locale)

// Team Members
getAllTeamMembers() // For admin (all members)
getActiveTeamMembers() // For public (active only)
getTeamMemberById(id)
createTeamMember(data)
updateTeamMember(id, data)
deleteTeamMember(id)
toggleTeamMemberActive(id, active)

// Clients
getAllClients() // For admin (all clients)
getActiveClients() // For public (active only)
getClientById(id)
createClient(data)
updateClient(id, data)
deleteClient(id)
toggleClientActive(id, active)

// Inquiries
getAllInquiries()
getInquiriesByStatus(status)
createInquiry(data)
updateInquiryStatus(id, status)
getNewInquiriesCount()
```

---

## Implementation Phases

### Phase 1: Discovery and Content Preparation ✅
- Finalize brand tone, service list, and content outline.
- Collect assets: logo, typography, colors, project imagery.
- Define translated copy for VN/EN/ZH.

### Phase 2: UX/UI and Design System ✅
- Design system tokens based on logo colors.
- Define component library (cards, hero, grids, tabs).
- Animation system and transitions.
- **NEW**: Created `project-ui-ux-implement.md` guide.

### Phase 3: MVP Build (Public Website) ✅
- Next.js 14 setup with App Router and SSR.
- Multi-language routing and content loading.
- Static pages: Home, About, Services, Process, Contact.
- **NEW**: Project detail page with dynamic routing.
- SEO setup: metadata, OpenGraph, sitemap, robots.

### Phase 4: CMS and Dynamic Content ✅
- Supabase schema, RLS policies, and seed data.
- **NEW**: Drizzle ORM integration for type-safe queries.
- Admin dashboard for projects, posts, team.
- File upload and image optimization pipeline.
- **NEW**: Supabase Storage integration for project images.
- **NEW**: Featured projects functionality (toggle featured flag).
- **NEW**: Project content fields (content_vi, content_en, content_zh) for detailed descriptions.
- **NEW**: Client field for project client/company information.

### Phase 5: Lead Generation and Integrations ✅
- ✅ **Contact form** with validation
- ✅ **Mailto integration** - Contact form redirects to email client (Gmail, Outlook, etc.) with pre-filled information
- ✅ **Contact form integration** with company email from mock data (`contactInfo.email`)
- ✅ Admin inquiry management panel.
- ✅ **NEW**: Catch-all routing for 404 handling.

### Phase 6: Quality, Performance, and Security (Pending)
- Core Web Vitals optimization.
- Accessibility audit (WCAG 2.1 AA).
- Security review (RLS, auth, rate limiting).

### Phase 7: Launch and Post-Launch Enhancements (Pending)
- Final content review and translation QA.
- Launch on production domain.
- Monitor analytics and iterate.

---

## Pages Implemented

| Page | Route | Status |
|------|-------|--------|
| Home | `/[locale]` | ✅ Complete |
| About | `/[locale]/about` | ✅ Complete |
| Services | `/[locale]/services` | ✅ Complete |
| Projects | `/[locale]/projects` | ✅ Complete |
| **Project Detail** | `/[locale]/projects/[slug]` | ✅ Complete |
| Process | `/[locale]/process` | ✅ Complete |
| Contact | `/[locale]/contact` | ✅ Complete |
| Login | `/[locale]/login` | ✅ Complete |
| **Reset Password** | `/[locale]/reset-password` | ✅ **NEW** |
| Dashboard | `/[locale]/dashboard` | ✅ Complete |
| Admin Projects | `/[locale]/admin-projects` | ✅ Complete |
| **Admin Team** | `/[locale]/admin-team` | ✅ **NEW** |
| **Admin Clients** | `/[locale]/admin-clients` | ✅ **NEW** |
| Admin Inquiries | `/[locale]/admin-inquiries` | ✅ Complete |
| **404 Not Found** | `/[locale]/[...rest]` | ✅ Complete |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Supabase account

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=https://hdg.vn
DATABASE_URL=your_postgres_connection_string  # For Drizzle

# Run development server
npm run dev
```

### Database Commands (Drizzle)
```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio (GUI)
npm run db:studio
```

### Migration Files Structure

The project uses Supabase migrations located in `supabase/migrations/`:

1. **`00001_initial_schema.sql`**
   - Creates all database tables (projects, services, team, inquiries, posts, clients)
   - Includes all project fields: `client`, `content_vi`, `content_en`, `content_zh`, `featured`
   - Creates indexes for performance
   - Sets up triggers for `updated_at` timestamps
   - Creates `project-images` storage bucket

2. **`00002_rls_policies.sql`**
   - Enables Row Level Security (RLS) on all tables
   - Public read policies for published content
   - Authenticated user policies for admin operations
   - Storage bucket policies for project image uploads

3. **`00003_seed_data.sql`**
   - Seeds default services (Design Consultancy, Engineering Design, Integrated Solutions)
   - Seeds **all 35 projects** from HDG business portfolio with full trilingual content
   - Includes projects from Tracodi Group (2024), Tung Feng Vietnam (2022-2024), Pure VN (2020-2022), Chi Thanh (2018-2020), Dinco (2014-2018), Sanofi (2013-2014), COFICO (2012-2013), Colgate Palmolive (2007-2012), CMIT Port (2010), PEB Vietnam (2006-2007), SMEC (2004-2006), HAZAMA Vietnam (1997-2003), Mitsui Construction (1995-1997), GCC1 (1995)
   - Uses `ON CONFLICT` to allow safe re-running

---

## Recent Changes (Latest Update)

### UI/UX Improvements
- ✅ Created `project-ui-ux-implement.md` design guide
- ✅ Updated color palette to match HDG logo (#3B6B9C blue, #3A3A3A dark)
- ✅ Enhanced animations: fade-in-up, scale-in, slide-in, float
- ✅ Improved button hover states with shadows and transforms
- ✅ Added glass effect and shimmer loading utilities

### Logo Integration
- ✅ Added logo to public/images/logo.png
- ✅ Updated header with logo image and improved layout
- ✅ Updated footer with inverted logo and refined styling
- ✅ **Admin sidebar now uses logo image**
- ✅ **Login form includes logo in card header**

### Layout Improvements
- ✅ **Main header/footer hidden in admin routes** (dashboard, admin-*)
- ✅ **Main header/footer hidden in auth routes** (login)
- ✅ Middleware updated to pass pathname to layout for route detection
- ✅ Admin layout uses its own header (AdminHeader) and sidebar

### Authentication Features
- ✅ **Password reset functionality** via Supabase Auth
- ✅ Reset password dialog with email input
- ✅ Success/error states for password reset
- ✅ Email sent confirmation with visual feedback
- ✅ **Reset password page** (`/reset-password`) with token validation
- ✅ **Password strength validation** (min 8 chars, uppercase, lowercase, number)
- ✅ **Password confirmation** matching validation
- ✅ **Show/hide password** toggle buttons
- ✅ **Session handling** for recovery tokens
- ✅ **Auto-redirect** to login after successful reset

### Favicon & Branding
- ✅ **Favicon.ico** added to root layout
- ✅ Favicon configured in metadata with multiple formats

### Admin Navigation
- ✅ **Admin link icon** in main header (Shield icon)
- ✅ **Real-time auth state** checking with Supabase
- ✅ **Smooth hover transitions** and styling

### Internationalization (Admin Pages)
- ✅ **Admin translations** added for all three languages (VI/EN/ZH)
- ✅ **Dashboard page** fully translated
- ✅ **Projects management page** fully translated
- ✅ **Inquiries management page** fully translated
- ✅ **Admin sidebar** navigation items translated
- ✅ **Status labels** and action buttons translated

### Project Detail Page
- ✅ Dynamic route `/projects/[slug]`
- ✅ Hero image with gradient overlay
- ✅ Project metadata sidebar (location, year, scale, services)
- ✅ Image gallery grid
- ✅ Previous/Next project navigation
- ✅ Localized content support

### 404 Handling
- ✅ Enhanced not-found page with search illustration
- ✅ Catch-all route `[...rest]` for invalid paths
- ✅ Automatic redirect to not-found for unmatched routes

### Drizzle ORM Integration
- ✅ Installed drizzle-orm and drizzle-kit
- ✅ Created schema with type exports
- ✅ Query functions for projects and inquiries
- ✅ Helper functions for localized content
- ✅ **Featured projects** query function (filters by featured flag)
- ✅ **Toggle featured/published** functions for admin
- ✅ **Project content fields** (content_vi, content_en, content_zh) for detailed descriptions
- ✅ **Client field** added to projects table

### Database Migrations
- ✅ **Unified migrations**: Schema, RLS policies, and seed data consolidated
  - `00001_initial_schema.sql` - Complete schema with all fields (including client, content_vi/en/zh, featured)
  - `00002_rls_policies.sql` - RLS policies + Storage bucket policies for project images
  - `00003_seed_data.sql` - Services + Full project portfolio (14 projects from business history)
- ✅ **Storage bucket** `project-images` created with public read access
- ✅ **Storage policies** for authenticated uploads/updates/deletes

### Mock Data & Localization
- ✅ **Created centralized mock data file** (`src/lib/data/mock-data.ts`)
- ✅ **Projects data** - 35+ projects with trilingual titles, summaries, and detailed content covering:
  - Tracodi Group projects (2024): R-PAC, Hue Dormitory, Bestmix Ha Nam, VN Apparel
  - Tung Feng Vietnam (2022-2024): SGSU Model House, Villa Complex, Chateau
  - Pure VN (2020-2022): The Song Apartment, Wonder Sea Office, IML Factory
  - Chi Thanh (2018-2020): Newhope VN, Nhat Pham Food, King Yuan Tong Phase 2
  - Dinco (2014-2018): Phu An Thanh Office, Heineken Factory, Fukuvi Factory
  - Sanofi, COFICO, Colgate Palmolive, CMIT Port, and more historical projects
- ✅ **Clients data** - 24 clients with placeholder logos covering:
  - Japanese companies: Ajinomoto, Wacoal, NEC/Tokin, Shimazu, Fukuvi, Nissey, Lixil
  - Multinational corporations: Heineken, Colgate Palmolive, Sanofi, Unilever, Mitsubishi Motors, BP-PETRO, Newhope
  - Construction firms: HAZAMA, Mitsui, SMEC, Tracodi, Dinco, COFICO, PEB Vietnam
  - Real estate developers: Pure VN, Tung Feng Vietnam, Chi Thanh
- ✅ **Contact information** with trilingual support
- ✅ **Team members** data with photos, roles, and bios (16 actual team members)
- ✅ **Team photos** using default-men.png and default-women.png from public/images
- ✅ **Team expand/collapse** functionality - Shows 4 members initially with expand/collapse button to show all
- ✅ **Team hover popover** - Displays detailed member info on hover (name, role, bio)
- ✅ **Team organization** by departments (Design Leads, Architecture, Structure, MEPF, Infrastructure, Estimating, Project Management, Surveying, Finance)
- ✅ **Services data** with trilingual features
- ✅ **Engineering services** (Architecture, Structure, MEP) with translations
- ✅ **Project categories** with translations
- ✅ **Process highlights** data with trilingual support (Timely Delivery, Collaborative Approach, Quality Assurance, Result-Oriented)
- ✅ **Helper functions** for localized data retrieval
- ✅ **Translation keys** used throughout instead of locale checks
- ✅ **Contact page** uses translation keys for all labels
- ✅ **Project detail page** uses translation keys for navigation and labels
- ✅ **Process page** uses translation keys and mock data for highlights
- ✅ **Footer** uses translation keys for services section
- ✅ **About page** displays full team with proper organization

### Clients Carousel
- ✅ **Created ClientsCarousel component** (`src/components/sections/clients-carousel.tsx`)
- ✅ **Auto-scrolling animation** - Continuous left-to-right scroll with pause on hover
- ✅ **Infinite scroll effect** - Seamless looping through duplicated client list
- ✅ **Gradient fade effects** - Smooth fade on left and right edges
- ✅ **Grayscale to color transition** - Client logos turn from grayscale to color on hover
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Added to Home page** - Displays before CTA section
- ✅ **Added to About page** - Displays after Team section
- ✅ **Translation support** - Title and subtitle in all 3 languages

### Vercel Analytics
- ✅ **Added @vercel/analytics** package
- ✅ **Integrated Analytics component** in locale layout

### Typography Update
- ✅ **Changed font to Be Vietnam Pro**
- ✅ **Full Vietnamese diacritics support**
- ✅ **Single font family** for consistency

### Language Switcher Enhancement
- ✅ **Updated styling** to match HDG brand theme
- ✅ **Added Globe icon** for better UX
- ✅ **Improved hover states** and transitions
- ✅ **Backdrop blur effect** for modern look

---

## Authentication Flow

### Login Process
1. User enters email and password
2. Form validates input (Zod schema)
3. Supabase Auth authenticates credentials
4. On success: redirect to `/dashboard`
5. On error: display error message

### Password Reset Process
1. User clicks "Forgot password?" link in login form
2. Dialog opens with email input
3. User enters email address
4. Supabase sends password reset email with recovery token
5. Email contains link to `/{locale}/reset-password#access_token=...&type=recovery`
6. User clicks link and is redirected to reset password page
7. Page validates token and exchanges it for a session
8. User enters new password (with strength requirements)
9. User confirms password
10. Password is updated via Supabase Auth
11. Session is cleared and user redirected to login
12. Success confirmation displayed

### Admin Route Protection
- All admin routes (`/dashboard`, `/admin-*`) require authentication
- Unauthenticated users redirected to `/login`
- Main site header/footer hidden in admin area
- Admin sidebar and header shown instead

---

## Deliverables Checklist

- [x] Next.js 14 project with TypeScript
- [x] Tailwind CSS with HDG brand colors
- [x] shadcn/ui component library
- [x] Trilingual support (VN/EN/ZH)
- [x] Public pages (Home, About, Services, Projects, Process, Contact)
- [x] **Project detail page with dynamic routing**
- [x] **404 catch-all routing**
- [x] **Drizzle ORM integration**
- [x] **Admin layout isolation (no main header/footer)**
- [x] **Logo integration in admin sidebar and login form**
- [x] **Password reset functionality**
- [x] **Reset password page with token validation**
- [x] Supabase database schema
- [x] Row Level Security policies
- [x] Admin dashboard with authentication
- [x] Project and inquiry management
- [x] SEO configuration (sitemap, robots, OpenGraph)
- [x] Vercel deployment configuration
- [x] **UI/UX implementation guide**
- [x] Documentation (README)
- [x] **Vercel Analytics integration**
- [x] **Vietnamese-optimized font (Be Vietnam Pro)**
- [x] **Centralized mock data with translations**
- [x] **Enhanced language switcher UI**
- [x] **Contact information from business data**
- [x] **Real projects from business portfolio**
- [x] **Team & Organization section in About page**
- [x] **Translation keys instead of locale checks**
- [x] **Real team data from business (16 members)**
- [x] **Team organization by departments**
- [x] **Team photos using default-men.png and default-women.png**
- [x] **Contact form mailto integration** (redirects to email client)
- [x] **Team expand/collapse functionality**
- [x] **Team hover popover** for detailed member info
- [x] **Process highlights with translation keys**
- [x] **Process page using mock data and translations**
- [x] **Full projects data** from business-projects.md (35+ projects)
- [x] **Clients carousel** with auto-scroll animation
- [x] **Clients carousel** added to home and about pages

### Database & Admin Enhancements
- ✅ **Updated contact information** from business documents (correct addresses, phone, legal representative)
- ✅ **Project schema updates** - Added client, content_vi/en/zh, featured fields
- ✅ **Supabase Storage integration** - Project images stored in `project-images` bucket
- ✅ **Admin project management** - Full CRUD with image upload, featured toggle, publish/unpublish
- ✅ **Dynamic project data** - Home and projects pages fetch from Supabase, fallback to mock data
- ✅ **Featured projects** - Admin can mark projects as featured to show on home page
- ✅ **Unified migrations** - Consolidated schema, RLS, and seed data into 3 migration files
- ✅ **Complete project seed data** - All 35 projects from mock-data.ts added to seed migration
- ✅ **Image browser component** - Admin can browse and select existing images from Supabase Storage
- ✅ **Storage list API** - Endpoint to list images from storage bucket with search functionality

### Admin Team & Clients Management (NEW)
- ✅ **Admin header language switcher** - Added LanguageSwitcher to admin header
- ✅ **Admin footer** - Created AdminFooter with CheoTechStudio info
- ✅ **Loading section component** - Created LoadingSection for API data loading states
- ✅ **Team schema updates** - Added education_vi/en/zh, certifications_vi/en/zh, active fields
- ✅ **Clients schema updates** - Added category, active fields
- ✅ **Team seed data** - Added 15 team members to seed migration with full trilingual data
- ✅ **Clients seed data** - Added 24 clients/partners to seed migration with categories
- ✅ **Admin team page** - Full CRUD with image upload/selection, active toggle
- ✅ **Admin clients page** - Full CRUD with logo upload/selection, category selection, active toggle
- ✅ **Team member form** - Fields for name, roles (vi/en/zh), bio, photo, education, certifications, order
- ✅ **Client form** - Fields for name, logo, website, category, order
- ✅ **Public team API** - `/api/team` returns active team members
- ✅ **Public clients API** - `/api/clients` returns active clients
- ✅ **Dynamic team section** - TeamSection fetches from Supabase with useDynamicData prop
- ✅ **Dynamic clients carousel** - ClientsCarousel fetches from Supabase with useDynamicData prop
- ✅ **About page updated** - Uses useDynamicData for team and clients sections
- ✅ **Home page updated** - Uses useDynamicData for clients carousel

### Services & Site Information Management (NEW)
- ✅ **Services schema updates** - Added features_vi/en/zh arrays for detailed service features
- ✅ **Site info table** - New key-value table for company information with trilingual support
- ✅ **Admin services page** - Full CRUD with feature list management, icon selection
- ✅ **Admin information page** - Edit company contact details, addresses, working hours
- ✅ **Service form** - Fields for name, description, features (vi/en/zh), icon, order, active toggle
- ✅ **Site info form** - Fields for company name, addresses, phone, email, working hours
- ✅ **Public services API** - `/api/services` returns active services
- ✅ **Public site-info API** - `/api/site-info` returns company information
- ✅ **Dynamic services on home page** - Services section fetches from Supabase
- ✅ **Dynamic services page** - Services page fetches from Supabase with fallback to mock data
- ✅ **Dynamic contact info** - Contact page and footer fetch from Supabase
- ✅ **Icon utilities** - Added iconMap and getIconByName helpers for service icons
- ✅ **External image support** - Updated next.config.mjs for placeholder image domains

---

## Future Enhancements

### Authentication
- [x] **Password reset page (`/reset-password`)** ✅ Complete
- [ ] Email verification flow
- [ ] Two-factor authentication (2FA)
- [ ] Session management and timeout

### Admin Features
- [x] **Project CRUD forms with image upload** ✅ Complete
- [x] **Featured projects toggle** ✅ Complete
- [x] **Published/unpublished toggle** ✅ Complete
- [x] **Image upload to Supabase Storage** ✅ Complete (cover image + gallery)
- [x] **Image browser from storage** ✅ Complete - Browse and select existing images
- [x] **Team member management** ✅ Complete - Full CRUD with photo upload/selection
- [x] **Clients management** ✅ Complete - Full CRUD with logo upload/selection
- [x] **Services management** ✅ Complete - Full CRUD with feature list, icon selection
- [x] **Site information management** ✅ Complete - Company info, contact details
- [x] **Admin header language switcher** ✅ Complete
- [x] **Admin footer with developer info** ✅ Complete
- [x] **Loading states for API data** ✅ Complete
- [ ] Rich text editor for project content
- [ ] Bulk operations for projects
- [ ] Export inquiries to CSV/PDF
- [ ] Admin activity logs

### Public Features
- [ ] Project search and advanced filters
- [ ] Newsletter subscription
- [ ] Social media integration
- [ ] Blog/news section
- [ ] Client testimonials

### Performance
- [ ] Image optimization with Next.js Image
- [ ] Lazy loading for project galleries
- [ ] Caching strategy for static content
- [ ] CDN integration for assets
