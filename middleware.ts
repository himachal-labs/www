import { NextRequest, NextResponse } from 'next/server';

function extractSubdomain(hostname: string): string | null {
  const domainParts = hostname.split('.');
  
  if (domainParts.length > 0 && !isNaN(Number(domainParts[0]))) {
    return null;
  }
  
  if (hostname === 'localhost' || hostname.startsWith('localhost:')) {
    return null;
  }
  
  if (hostname.includes('localhost:') || hostname.match(/127\.0\.0\.1:\d+/)) {
    return null;
  }
  
  if (domainParts.length > 2 && domainParts[0] !== 'www') {
    return domainParts[0];
  }
  
  return null;
}

const SUBDOMAIN_ROUTES: Record<string, string> = {
  'moneytide': '/products/moneytide',
  'choicecheck': '/products/choicecheck',
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname, hostname } = url;
  
  const forwardedHost = request.headers.get('x-forwarded-host') || hostname;
  const subdomain = extractSubdomain(forwardedHost);
  
  if (pathname === '/.well-known/apple-app-site-association' || pathname === '/apple-app-site-association') {
    console.log(`[Middleware] AASA file request detected: ${pathname}`);
    return NextResponse.next();
  }
  
  if (subdomain && SUBDOMAIN_ROUTES[subdomain]) {
    const staticExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.xml', '.txt', '.css', '.js'];
    const isStaticAsset = staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
    
    if (isStaticAsset) {
      return NextResponse.next();
    }
    
    let targetPath = pathname;
    if (pathname === '/') {
      targetPath = SUBDOMAIN_ROUTES[subdomain];
    } else if (!pathname.startsWith(SUBDOMAIN_ROUTES[subdomain])) {
      targetPath = SUBDOMAIN_ROUTES[subdomain] + pathname;
    }
    
    url.pathname = targetPath;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/.well-known/apple-app-site-association',
    '/apple-app-site-association',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|assets/|api/).*)',
  ],
};