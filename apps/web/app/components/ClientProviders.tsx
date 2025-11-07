'use client'
import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './Toast'
import { AuthProvider } from '../../contexts/AuthContext'

interface ClientProvidersProps {
  children: React.ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}