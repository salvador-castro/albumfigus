import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useCollection() {
  const { user } = useAuth()
  const [collection, setCollection] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchCollection = useCallback(async () => {
    if (!user) { setCollection({}); setLoading(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('user_stickers')
      .select('sticker_id, count')
      .eq('user_id', user.id)
    if (data) {
      const map = {}
      data.forEach(({ sticker_id, count }) => { map[sticker_id] = count })
      setCollection(map)
    }
    setLoading(false)
  }, [user])

  useEffect(() => { fetchCollection() }, [fetchCollection])

  const setCount = async (stickerId, count) => {
    if (!user) return
    setCollection((prev) => ({ ...prev, [stickerId]: count }))
    if (count === 0) {
      await supabase
        .from('user_stickers')
        .delete()
        .eq('user_id', user.id)
        .eq('sticker_id', stickerId)
    } else {
      await supabase
        .from('user_stickers')
        .upsert({ user_id: user.id, sticker_id: stickerId, count }, { onConflict: 'user_id,sticker_id' })
    }
  }

  const increment = (stickerId) => {
    const current = collection[stickerId] ?? 0
    setCount(stickerId, current + 1)
  }

  const decrement = (stickerId) => {
    const current = collection[stickerId] ?? 0
    if (current > 0) setCount(stickerId, current - 1)
  }

  const owned = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 1)
  const duplicates = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 2)

  return { collection, loading, setCount, increment, decrement, owned, duplicates, refetch: fetchCollection }
}
