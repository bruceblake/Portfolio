import { PortfolioData } from '@/types/portfolio'

interface FooterProps {
  data: PortfolioData
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">BB</span>
          </div>
          <p className="text-neutral-400 mb-4">Built with React, TypeScript, and Tailwind CSS</p>
          <p className="text-neutral-500 text-sm">
            © {currentYear} {data?.personal?.name || "Bruce Blake"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}