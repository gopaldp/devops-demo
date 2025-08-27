import React, { useEffect, useState } from 'react'

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function App() {
  const [status, setStatus] = useState('...')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${apiBase}/health`).then(r => r.json()).then(d => setStatus(d.status)).catch(() => setStatus('error'))
    fetch(`${apiBase}/api/hello?name=DevOps`).then(r => r.json()).then(d => setMessage(d.message)).catch(() => setMessage('error'))
  }, [])

  return (
    <main style={{fontFamily:'ui-sans-serif', padding:24}}>
      <h1>DevOps Demo Frontend</h1>
      <p><strong>Backend health:</strong> {status}</p>
      <p><strong>API says:</strong> {message}</p>
      <p>Configure API base with <code>VITE_API_BASE</code> env.</p>
    </main>
  )
}
