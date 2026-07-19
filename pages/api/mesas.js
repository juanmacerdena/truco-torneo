import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('mesas')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error
      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } 
  else if (req.method === 'PUT') {
    try {
      const { id, ...updates } = req.body
      const { data, error } = await supabase
        .from('mesas')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json(data?.[0])
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
