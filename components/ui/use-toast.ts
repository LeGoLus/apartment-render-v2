import { useState, useEffect } from 'react'

export interface ToastProps {
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1))
      }, toasts[0].duration || 3000)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  function toast({ title, description, duration = 3000 }: ToastProps) {
    setToasts((prevToasts) => [...prevToasts, { title, description, duration }])
  }

  return { toast, toasts }
}