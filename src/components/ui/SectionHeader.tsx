interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}