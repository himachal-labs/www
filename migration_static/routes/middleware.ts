import { NextRequest, NextResponse } from 'next/server';

/**
 * Extracts the subdomain from a hostname
 */
function extractSubdomain(hostname: string): string | null {
  // Extract all domain parts
  const domainParts = hostname.split('.');
  
  // Skip IP addresses (they have numeric first parts)
  if (domainParts.length > 0 && !isNaN(Number(domainParts[0]))) {
    return null;
  }
  
  // Localhost doesn't have a subdomain
  if (hostname === 'localhost' || hostname.startsWith('localhost:')) {
    return null;
  }
  
  // For development environments with specific ports
  if (hostname.includes('localhost:') || hostname.match(/127\.0\.0\.1:\d+/)) {
    return null;
  }
  
  // Check if we have a subdomain (e.g., moneytide.vastsilicon.com)
  if (domainParts.length > 2 && domainParts[0] !== 'www') {
    return domainParts[0];
  }
  
  return null;
}

// Mapping of subdomains to their routes
const SUBDOMAIN_ROUTES: Record<string, string> = {
  'moneytide': '/moneytide',
  'choicecheck': '/choicecheck',
};

/**
 * Middleware to handle subdomain routing and special cases like AASA files
 */
export async function middleware(request: NextRequest) {
  // Get the request URL details
  const url = request.nextUrl.clone();
  const { pathname, hostname } = url;
  
  // Debug all request details
  console.log(`
=== MIDDLEWARE DEBUG ===
- Request: ${hostname}${pathname}
- Headers: ${JSON.stringify(Object.fromEntries(request.headers))}
- Method: ${request.method}
- NextURL: ${request.nextUrl}
========================
`);
  
  // CRITICAL: When using Cloudflare, we need to check the X-Forwarded-Host header
  // This contains the actual hostname that the user requested
  const forwardedHost = request.headers.get('x-forwarded-host') || hostname;
  console.log(`Original hostname: ${hostname}, Forwarded host: ${forwardedHost}`);
  
  // Extract the subdomain from the forwarded host, not the internal hostname
  const subdomain = extractSubdomain(forwardedHost);
  
  // Handle AASA files for universal links - this needs to come BEFORE subdomain routing
  if (pathname === '/.well-known/apple-app-site-association' || pathname === '/apple-app-site-association') {
    console.log(`[Middleware] AASA file request detected: ${pathname}`);
    // Let the route handler handle AASA requests - CRITICAL for Universal Links
    return NextResponse.next();
  }
  
  // Handle subdomain routing 
  if (subdomain && SUBDOMAIN_ROUTES[subdomain]) {
    console.log(`[Middleware] Detected subdomain: ${subdomain}`);
    
    // Check if this is a static asset request
    const staticExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.xml', '.txt', '.css', '.js'];
    const isStaticAsset = staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
    
    // Skip rewriting for static assets - serve them from their actual location
    if (isStaticAsset) {
      console.log(`[Middleware] Static asset detected, skipping rewrite: ${pathname}`);
      return NextResponse.next();
    }
    
    // For any path on a subdomain, rewrite maintaining the path structure
    // But for the root path, use the specific route
    let targetPath = pathname;
    if (pathname === '/') {
      targetPath = SUBDOMAIN_ROUTES[subdomain];
    } else if (!pathname.startsWith(SUBDOMAIN_ROUTES[subdomain])) {
      // For other paths, prepend the subdomain route only if it's not already there
      targetPath = SUBDOMAIN_ROUTES[subdomain] + pathname;
    }
    
    // Update the URL with our target path
    url.pathname = targetPath;
    console.log(`[Middleware] Rewriting ${subdomain}${pathname} to: ${url.pathname}`);
      
    // Use rewrite to maintain the original URL in the browser
    return NextResponse.rewrite(url);
  }
  
  // For all other requests, continue processing
  return NextResponse.next();
}

// Match all paths including the root path - crucial for subdomain routing
export const config = {
  matcher: [
    // Including root is essential for subdomain routing
    '/',
    // AASA files must be matched explicitly
    '/.well-known/apple-app-site-association',
    '/apple-app-site-association',
    // All other paths except static assets and system files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|assets/|api/).*)',
  ],
};