# Development Guide

Day-to-day development workflow for the VastSilicon website using Next.js and content-driven architecture.

## Project Structure

```
src/
├── app/                    # Next.js app directory (App Router)
│   ├── page.tsx           # Homepage
│   ├── products/[slug]/   # Dynamic product pages
│   │   └── page.tsx       # Product page template
│   ├── about/             # Company pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── product/           # Product page templates and components
│   │   ├── ProductTemplate.tsx
│   │   ├── ProductHero.tsx
│   │   └── FeatureGrid.tsx
│   ├── ui/               # Shared UI components (Button, Card, etc.)
│   └── layout/           # Layout components (Header, Footer)
├── content/              # Content files (MDX)
│   ├── products/         # Product content
│   │   ├── moneytide.mdx
│   │   ├── choicecheck.mdx
│   │   └── [new-product].mdx
│   └── pages/            # Page content
└── lib/                  # Utilities and content processing
    ├── products.ts       # Product data utilities
    └── mdx.ts           # MDX processing helpers

public/
├── images/               # Product assets organized by product
│   ├── moneytide/       # MoneyTide screenshots, logos, etc.
│   ├── choicecheck/     # ChoiceCheck assets
│   └── shared/          # Shared company assets
└── ...                  # Other static files
```

## Development Workflow

### 1. Starting Work
```bash
# Always start with latest code
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### 2. Making Changes
- Edit files in `src/` for code changes
- Edit files in `content/` for content changes
- Add images to `public/images/[product]/`
- Changes appear instantly via hot reload
- Check browser console for errors

### 3. Before Committing
```bash
# Check for issues
npm run lint           # Fix any errors
npm run type-check     # Fix TypeScript errors
npm run build          # Ensure build works

# Test production build
npm run start          # Check at http://localhost:3000
```

## Content-Driven Development

### Adding a New Product

The key strength of this architecture is easy product additions. Here's the complete workflow:

#### 1. Create Product Content File
Create `content/products/[product-name].mdx`:

```typescript
---
metadata:
  name: "ProductName"
  tagline: "Clear value proposition"
  description: "Longer description for SEO"
  status: "available" | "coming-soon" | "beta"
  platforms: ["ios", "android", "web"]
  primaryColor: "#1E40AF"
  hero:
    image: "/images/product-name/hero.png"
    video: "/videos/product-name-demo.mp4"
  features:
    - title: "Feature 1"
      description: "Feature description"
      icon: "icon-name"
    - title: "Feature 2" 
      description: "Another feature"
      icon: "icon-name"
  screenshots:
    - "/images/product-name/screenshot-1.png"
    - "/images/product-name/screenshot-2.png"
  appStore:
    ios: "https://apps.apple.com/app/..."
    android: "https://play.google.com/store/apps/..."
---

# Product Vision

Write your product vision document here using standard Markdown.

## The Problem

Describe the problem your product solves.

## Our Solution

Explain how your product addresses the problem.

## Key Benefits

- Benefit 1
- Benefit 2
- Benefit 3
```

#### 2. Add Product Assets
```bash
# Create product directory
mkdir public/images/[product-name]

# Add assets
public/images/[product-name]/
├── hero.png              # Hero image
├── logo.png              # Product logo
├── icon.png              # App icon
├── screenshot-1.png      # App screenshots
├── screenshot-2.png
└── demo-video.mp4        # Demo video (optional)
```

#### 3. Deploy
```bash
git add .
git commit -m "Add [ProductName] product page"
git push origin feature/add-product-name
# Create PR and merge
```

**Result**: New product page automatically available at `/products/[product-name]`

### Product Template System

The `ProductTemplate` component automatically renders any product based on the MDX metadata:

```typescript
// src/components/product/ProductTemplate.tsx
export default function ProductTemplate({ product, content }) {
  return (
    <>
      <ProductHero 
        name={product.name}
        tagline={product.tagline}
        hero={product.hero}
        status={product.status}
        platforms={product.platforms}
      />
      
      <ProductFeatures features={product.features} />
      
      <ProductScreenshots screenshots={product.screenshots} />
      
      <ProductContent content={content} />
      
      <AppStoreLinks appStore={product.appStore} />
    </>
  )
}
```

This template works for ALL products - no product-specific code needed.

## Component Development

### Creating Components

#### Component Structure (TypeScript + Tailwind)
```typescript
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

#### Component Guidelines
- **TypeScript interfaces**: Always define props interfaces
- **Tailwind classes**: Use utilities for styling
- **Accessibility**: Include ARIA attributes and semantic HTML
- **Responsive**: Design mobile-first
- **Reusable**: Design for multiple contexts

### Product-Specific Components

```typescript
// src/components/product/ProductHero.tsx
interface ProductHeroProps {
  name: string
  tagline: string
  hero: {
    image?: string
    video?: string
  }
  status: 'available' | 'coming-soon' | 'beta'
  platforms: string[]
}

export default function ProductHero({ name, tagline, hero, status, platforms }: ProductHeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{name}</h1>
            <p className="text-xl text-gray-600 mb-8">{tagline}</p>
            
            <StatusBadge status={status} />
            <PlatformBadges platforms={platforms} />
          </div>
          
          <div>
            {hero.video ? (
              <video autoPlay muted loop className="w-full rounded-lg shadow-lg">
                <source src={hero.video} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={hero.image} 
                alt={`${name} app interface`}
                className="w-full rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

## Creating Pages

### App Router Structure (Next.js 14+)

```typescript
// src/app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts } from '@/lib/products'
import ProductTemplate from '@/components/product/ProductTemplate'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }
  
  return <ProductTemplate product={product} />
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getAllProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  
  if (!product) return {}
  
  return {
    title: `${product.name} - ${product.tagline}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.hero.image],
    },
  }
}
```

### Page Guidelines
- **Static generation**: Use `generateStaticParams` for dynamic routes
- **SEO optimization**: Include metadata generation
- **Error handling**: Use `notFound()` for missing content
- **TypeScript**: Type all props and parameters

## Content Management

### MDX Processing

```typescript
// src/lib/products.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const productsDirectory = path.join(process.cwd(), 'content/products')

export async function getAllProducts() {
  const filenames = fs.readdirSync(productsDirectory)
  
  const products = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const fullPath = path.join(productsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: name.replace(/\.mdx$/, ''),
        ...data.metadata,
      }
    })
  
  return products
}

export async function getProductBySlug(slug: string) {
  try {
    const fullPath = path.join(productsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      ...data.metadata,
    }
  } catch {
    return null
  }
}
```

### Content Validation

```typescript
// src/lib/content-validation.ts
import { z } from 'zod'

const ProductMetadataSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string().optional(),
  status: z.enum(['available', 'coming-soon', 'beta']),
  platforms: z.array(z.string()),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  hero: z.object({
    image: z.string().optional(),
    video: z.string().optional(),
  }),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  })).optional(),
})

export function validateProductMetadata(data: unknown) {
  return ProductMetadataSchema.parse(data)
}
```

## Styling Guidelines

### Tailwind CSS Best Practices

```typescript
// Good: Use semantic class combinations
<div className="max-w-4xl mx-auto px-4 py-16">
  <h1 className="text-4xl font-bold text-gray-900 mb-8">Title</h1>
  <p className="text-lg text-gray-600 leading-relaxed">Content</p>
</div>

// Good: Extract complex patterns to components
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {children}
    </div>
  )
}
```

### Design System
Use consistent tokens:
- **Colors**: `blue-600` (primary), `gray-900` (text), `gray-50` (background)
- **Spacing**: `4` (1rem), `8` (2rem), `16` (4rem) for consistent rhythm
- **Typography**: `text-4xl` (headings), `text-lg` (body), `font-semibold` (emphasis)

## Performance Optimization

### Image Optimization
```typescript
// Use Next.js Image component for optimization
import Image from 'next/image'

<Image
  src="/images/moneytide/hero.png"
  alt="MoneyTide app interface"
  width={800}
  height={600}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Optional
/>
```

### Bundle Optimization
```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false // If component doesn't need SSR
})
```

## Testing Your Changes

### Local Testing
```bash
# Development testing
npm run dev
# → Test at http://localhost:3000

# Production testing  
npm run build && npm run start
# → Test production build locally
```

### Content Testing
1. **Add test product**: Create temporary MDX file
2. **Verify routing**: Check `/products/test-product` loads
3. **Test template**: Ensure all metadata renders correctly
4. **Check responsive**: Test on mobile viewport
5. **Validate performance**: Run Lighthouse audit

### Pre-commit Checklist
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes  
- [ ] `npm run build` succeeds
- [ ] New product pages render correctly
- [ ] Images optimized and have alt text
- [ ] Mobile responsive design
- [ ] Performance targets met

## Git Workflow

### Commit Messages
```bash
# Good examples for this project
git commit -m "Add NewProduct product page and assets"
git commit -m "Update ProductTemplate to support video heroes"
git commit -m "Fix mobile responsive layout in ProductHero"

# Content changes
git commit -m "Update MoneyTide feature descriptions"
git commit -m "Add ChoiceCheck app store links"
```

### Branch Naming
```bash
# Product additions
feature/add-product-newapp
content/update-moneytide-screenshots

# Component development
feature/product-video-hero
feature/app-store-badges

# Bug fixes
fix/mobile-product-layout
fix/mdx-processing-error
```

## Common Patterns

### Responsive Product Grids
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.map(product => (
    <ProductCard key={product.slug} product={product} />
  ))}
</div>
```

### Status Indicators
```typescript
function StatusBadge({ status }: { status: string }) {
  const styles = {
    available: 'bg-green-100 text-green-800',
    'coming-soon': 'bg-yellow-100 text-yellow-800',
    beta: 'bg-blue-100 text-blue-800'
  }
  
  return (
    <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${styles[status]}`}>
      {status.replace('-', ' ')}
    </span>
  )
}
```

### Progressive Image Loading
```typescript
<Image
  src={screenshot}
  alt="App screenshot"
  width={400}
  height={300}
  className="rounded-lg shadow-sm"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Low quality placeholder
/>
```

## Getting Help

### Debug Common Issues
1. **Content not appearing**: Check MDX frontmatter syntax
2. **Build fails**: Verify all TypeScript types are correct
3. **Images not loading**: Check file paths and formats
4. **Styling issues**: Verify Tailwind class names

### Resources
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Team chat/meetings for project-specific questions

### Content Workflow Help
- **Product metadata**: Check existing products for examples
- **Image sizing**: Follow established aspect ratios
- **Content structure**: Use existing MDX files as templates
- **Asset organization**: Keep product assets grouped by product name