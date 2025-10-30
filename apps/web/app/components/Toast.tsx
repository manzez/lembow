'use client'
import { useState, useEffect } from 'react'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface ToastProps extends Toast {
  onRemove: (id: string) => void
}

function ToastComponent({ id, message, type, onRemove, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, onRemove, duration])

  const icons = {
    success: '✅',
    error: '❌', 
    info: 'ℹ️',
    warning: '⚠️'
  }

  const colors = {
    success: 'from-green-500 to-emerald-500 border-green-200',
    error: 'from-red-500 to-rose-500 border-red-200',
    info: 'from-blue-500 to-cyan-500 border-blue-200',
    warning: 'from-yellow-500 to-amber-500 border-yellow-200'
  }

  return (
    <div className={`bg-gradient-to-r ${colors[type]} text-white p-4 rounded-2xl shadow-xl border backdrop-blur-sm transform transition-all duration-300 animate-in slide-in-from-right`}>
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => onRemove(id)}
          className="ml-auto text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export interface ToastContextType {
  addToast: (message: string, type?: Toast['type'], duration?: number) => void
  removeToast: (id: string) => void
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
        {toasts.map(toast => (
          <ToastComponent
            key={toast.id}
            {...toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </>
  )
}

// Hook for easy toast usage
export function useToast() {
  return {
    success: (message: string, duration?: number) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('addToast', { 
          detail: { message, type: 'success', duration }
        }))
      }
    },
    error: (message: string, duration?: number) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('addToast', { 
          detail: { message, type: 'error', duration }
        }))
      }
    },
    info: (message: string, duration?: number) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('addToast', { 
          detail: { message, type: 'info', duration }
        }))
      }
    },
    warning: (message: string, duration?: number) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('addToast', { 
          detail: { message, type: 'warning', duration }
        }))
      }
    }
  }
}