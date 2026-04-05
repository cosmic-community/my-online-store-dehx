# My Online Store

![App Preview](https://imgix.cosmicjs.com/92883190-30e1-11f1-9c70-a950ca4b5940-autopilot-photo-1495474472287-4d71bcdd2085-1775388080928.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront powered by [Cosmic](https://www.cosmicjs.com) CMS and built with Next.js 16. Features a complete product catalog, organized categories, and customer reviews — all managed through Cosmic's headless CMS.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured products, category showcase, and recent reviews
- 📦 **Product Catalog** — Browse all products with category filtering, sale badges, and inventory status
- 🏷️ **Category Pages** — Organized product browsing with category images and descriptions
- ⭐ **Customer Reviews** — Star ratings and testimonials linked to specific products
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🚀 **Server-Side Rendered** — Fast page loads and excellent SEO with Next.js 16 App Router
- 🎨 **Modern Design** — Clean typography, smooth animations, and a premium color palette

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69d2456a1d87ba155187aa7a&clone_repository=69d246ad1d87ba155187aaaa)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: product-categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-online-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Products | `products` | Product listings with images, pricing, inventory |
| Product Categories | `product-categories` | Category organization with images |
| Reviews | `reviews` | Customer reviews with star ratings |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy!

<!-- README_END -->