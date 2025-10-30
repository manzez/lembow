'use client'
import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './Toast'
import MobileNavigation from './MobileNavigation'

interface ClientProvidersProps {
  children: React.ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <MobileNavigation />
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}