# PatronMag Frontend

BBC-style news magazine frontend built with Next.js 15, TypeScript, and Tailwind CSS for Django REST backend.

## 🚀 Features

- ✅ **Server-Side Rendering (SSR)** - SEO-optimized with Next.js App Router
- ✅ **Responsive Design** - Mobile-first, BBC-inspired UI
- ✅ **10 Categories** - News, Pistol, Rifle, Shotgun, Revolver, Ammunition, Reloading, Optics, Accessories, History
- ✅ **Homepage** - Featured articles, trending, latest by category
- ✅ **Category Pages** - Dynamic routing for all categories
- ✅ **Article Detail** - Full article view with images, metadata, social sharing
- ✅ **Search** - Global search functionality
- ✅ **Reloading Data Tables** - Sortable tables with CSV export
- ✅ **Mock Data** - Ready for development and testing
- ✅ **Docker Support** - Containerized deployment ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

## 🛠️ Installation

### 1. Extract and Install

```bash
tar -xzf patronmag-frontend.tar.gz
cd patronmag-frontend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
patronmag-frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Homepage
│   ├── [category]/              # Category pages (dynamic)
│   │   └── page.tsx
│   ├── article/[slug]/          # Article detail pages
│   │   └── page.tsx
│   ├── search/                  # Search page
│   │   └── page.tsx
│   ├── reloading/               # Reloading data page
│   │   └── page.tsx
│   └── not-found.tsx           # 404 page
├── components/
│   ├── common/                  # Reusable components
│   │   ├── ArticleCard.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   ├── home/                    # Homepage sections
│   │   ├── FeaturedSection.tsx
│   │   ├── TrendingSection.tsx
│   │   └── LatestByCategory.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SearchBar.tsx
│   └── tables/                  # Data tables
│       └── ReloadingTable.tsx
├── lib/
│   ├── api/                     # API client (ready for backend)
│   │   ├── client.ts
│   │   ├── config.ts
│   │   └── services.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   └── utils/                   # Utilities
│       ├── helpers.ts
│       └── mockData.ts         # Mock data for development
├── public/                      # Static assets
├── Dockerfile                   # Docker production build
├── docker-compose.yml          # Docker compose config
└── .dockerignore               # Docker ignore file
```

## 🎨 Pages & Features

### Homepage (`/`)
- Featured articles section
- Trending articles
- Latest articles by category (all 10 categories)

### Category Pages (`/[category]`)
- Dynamic routing for all 10 categories
- Grid layout of category articles
- Responsive design

### Article Detail (`/article/[slug]`)
- Full article content with HTML support
- Featured image
- Author and metadata
- Category badge and breadcrumbs
- Tags
- Social sharing buttons
- Related articles (TODO)

### Search (`/search?q=query`)
- Global search functionality
- Real-time results
- Empty states

### Reloading Data (`/reloading`)
- Sortable data table
- CSV export functionality
- Safety warnings
- Responsive table design

### 404 Page
- Custom not found page
- Quick navigation to popular categories

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t patronmag-frontend .
```

### Run with Docker

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.patronmag.com \
  patronmag-frontend
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## 🔄 Switching from Mock Data to Real API

When your Django REST API is ready:

1. Update `.env.local` with your real API URL
2. The API client is already configured in `lib/api/`
3. Update pages to use `lib/api/services.ts` instead of `mockData.ts`

Example for homepage:
```typescript
// Change from:
import { mockArticles } from '@/lib/utils/mockData';

// To:
import { getHomepageData } from '@/lib/api/services';
```

## 📝 Available Scripts

```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Design System

### BBC-inspired Colors
- Primary Red: `#bb1919`
- Dark: `#1a1a1a`
- Gray: `#3f3f42`
- Light Gray: `#f2f2f2`
- Border: `#e4e4e4`

### Typography
- Font: Geist Sans (Next.js default)
- Headings: Bold, line-height 1.2
- Body: Regular, line-height 1.6

## 📊 Performance

Optimization features:
- Server-side rendering (SSR)
- Image lazy loading
- Code splitting by route
- CSS optimization with Tailwind
- Automatic static optimization
- Response caching

## 🔍 SEO Features

- Server-side rendering for all pages
- Dynamic meta tags
- OpenGraph and Twitter Cards
- Semantic HTML
- Breadcrumbs
- Structured URLs

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Image Optimization**: Next.js Image
- **Deployment**: Docker

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Docker build fails
```bash
# Clear Docker cache
docker system prune -a
```

### Images not loading
Check that `NEXT_PUBLIC_API_BASE_URL` is set correctly in `.env.local`

## 📄 License

Copyright © 2025 PatronMag. All rights reserved.

## 🙋 Support

For issues and questions:
- Create an issue in the repository
- Contact: support@patronmag.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
