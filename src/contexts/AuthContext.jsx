import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const INACTIVITY_MS = 30 * 60 * 1000

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null)
  const userRef = useRef(null)

  const loadAdminStatus = async (userId) => {
    if (!userId) { setIsAdmin(false); return }
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()
    setIsAdmin(data?.is_admin ?? false)
  }

  const resetTimer = () => {
    if (!userRef.current) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => supabase.auth.signOut(), INACTIVITY_MS)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      userRef.current = session?.user ?? null
      loadAdminStatus(session?.user?.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      userRef.current = session?.user ?? null
      loadAdminStatus(session?.user?.id)
      if (session?.user) {
        resetTimer()
      } else {
        clearTimeout(timerRef.current)
      }
    })

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }))

    return () => {
      subscription.unsubscribe()
      clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, resetTimer))
    }
  }, [])

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })

  const signInWithEmail = (email, password) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUpWithEmail = (email, password) =>
    supabase.auth.signUp({ email, password })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
