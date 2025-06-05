# Getting Started

Quick setup guide for new developers to start contributing to the VastSilicon website.

## Prerequisites

- **Node.js**: 18.17+ (recommended: latest LTS)
- **npm**: 9+ (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended editor

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd www
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Setup

Create `.env.local` for optional environment variables:

```bash
# Optional: Google Search Console verification
GOOGLE_SITE_VERIFICATION=your_verification_code

# Optional: Vercel Analytics (auto-detected in production)
VERCEL_ANALYTICS_ID=your_analytics_id
```

## Verify Installation

Run these commands to ensure everything works:

```bash
npm run build        # Should complete without errors
npm run lint         # Should pass all checks
npm run type-check   # Should pass TypeScript validation
```

## First Contribution

### Add a new product

1. Create `/src/content/products/my-product.mdx`
2. Add required frontmatter (see [API Reference](api-reference.md#product-schema))
3. Add product images to `/public/images/my-product/`
4. Product appears at `/products/my-product`

### Add a blog post

1. Create `/src/content/blog/category/my-post.mdx`
2. Add required frontmatter (see [API Reference](api-reference.md#blog-schema))
3. Post appears in blog listing

## Development Workflow

1. **Create feature branch**: `git checkout -b feature/my-feature`
2. **Make changes**: Edit files in `src/`
3. **Test locally**: `npm run dev`
4. **Validate code**: `npm run lint && npm run type-check`
5. **Build test**: `npm run build`
6. **Commit changes**: Use conventional commit format
7. **Push and create PR**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Homepage
│   ├── products/[slug]/   # Dynamic product pages
│   └── blog/              # Blog pages
├── components/
│   ├── ui/                # Base UI components
│   ├── product/           # Product-specific components
│   └── layout/            # Layout components
├── content/
│   ├── products/          # Product MDX files
│   └── blog/              # Blog MDX files
├── lib/
│   ├── products.ts        # Product data processing
│   ├── blog.ts           # Blog data processing
│   └── schemas.ts        # TypeScript interfaces
└── public/               # Static assets
```

## Next Steps

- Read [Development Guide](development.md) for detailed workflows
- Check [API Reference](api-reference.md) for component interfaces
- Review [Architecture](architecture.md) for system design decisions

## Troubleshooting

### Common Issues

**Port 3000 in use**
```bash
npx kill-port 3000
npm run dev
```

**TypeScript errors**
```bash
npm run type-check
# Fix reported errors
```

**Build failures**
```bash
rm -rf .next out
npm run build
```

For more issues, see [Troubleshooting](troubleshooting.md).