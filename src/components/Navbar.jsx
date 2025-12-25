import { useEffect, useMemo, useState } from 'react'
import { recordLogin, recordSignup } from '../lib/fakeDb'
import logo from '../assets/headerlogo.png'

export default function Navbar() {
  const [q, setQ] = useState('')
  const [modal, setModal] = useState(null) // 'login' | 'signup' | null
  const [authForm, setAuthForm] = useState({ email: '', password: '' })

  // simple event bus via window (keeps app tiny without extra libs)
  const emit = (value) => window.dispatchEvent(new CustomEvent('search', { detail: value }))

  const onChange = (e) => {
    const value = e.target.value
    setQ(value)
    emit(value)
  }

  useEffect(() => {
    setAuthForm({ email: '', password: '' })
  }, [modal])

  const placeholder = useMemo(() => 'Search jerseys...', [])
  const updateAuthField = (field, value) => setAuthForm((prev) => ({ ...prev, [field]: value }))

  const submitAuth = (e) => {
    e.preventDefault()
    if (!modal) return

    const record = {
      email: authForm.email.trim(),
      password: authForm.password,
    }

    if (modal === 'signup') {
      recordSignup(record)
    } else {
      recordLogin(record)
    }

    setAuthForm({ email: '', password: '' })
  }

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <img className="brand-logo" src={logo} alt="Football Jersey Store logo" />
            <h1>Football Jersey Store</h1>
            <span className="brand-emoji" role="img" aria-label="soccer ball">⚽️</span>
          </div>
          <div className="actions">
            <div className="search">
              <input value={q} onChange={onChange} placeholder={placeholder} />
            </div>
            <button className="btn secondary" onClick={() => setModal('login')}>Login</button>
            <button className="btn" onClick={() => setModal('signup')}>Sign up</button>
          </div>
        </div>
      </header>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal === 'login' ? 'Login' : 'Sign up'}</h3>
            <form onSubmit={submitAuth}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={authForm.email}
                  onChange={(e) => updateAuthField('email', e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={authForm.password}
                  onChange={(e) => updateAuthField('password', e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn secondary" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn">{modal === 'login' ? 'Login' : 'Create account'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
