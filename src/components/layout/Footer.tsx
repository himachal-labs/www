import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface FooterProps {
  className?: string
}

const footerNavigation = {
  products: [
    { name: 'ChoiceCheck', href: '/products/choicecheck' },
    { name: 'MoneyTide', href: '/products/moneytide' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Status', href: '/status' },
  ],
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('bg-vast-gray-900 text-white', className)}>
      <div className="max-w-container mx-auto px-6 py-large">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-vast-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <span className="font-semibold text-heading-3">VastSilicon</span>
            </Link>
            <p className="text-body-sm text-vast-gray-400 max-w-content">
              Cognitive infrastructure for human flourishing. We don&apos;t simplify your world—we make it comprehensible.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-body mb-4">Products</h3>
            <ul className="space-y-2">
              {footerNavigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-body mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-body mb-4">Support</h3>
            <ul className="space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-vast-gray-800 mt-large pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-body-sm text-vast-gray-400">
            © 2025 VastSilicon. Building cognitive infrastructure for the next century.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-body-sm text-vast-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}