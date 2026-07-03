import { useEffect, useState } from 'react'

interface ToastProps {
  message: string | null
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onDismiss, 500)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [message, onDismiss])

  if (!message) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s',
      }}
    >
      <span style={{
        fontFamily: "'Lavishly Yours', cursive",
        fontSize: '120px',
        color: '#fff',
        textShadow: '0 0 20px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.3)',
        textAlign: 'center',
      }}>
        {message}
      </span>
    </div>
  )
}
