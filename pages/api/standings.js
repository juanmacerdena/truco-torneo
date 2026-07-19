import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
)

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('standings')
        .select('*')
        .order('pts', { ascending: false })

      if (error) throw error
      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { pair, pj, pg, pp, pts } = req.body
      if (!pair) throw new Error('Nombre de pareja es requerido')
      const { data, error } = await supabase
        .from('standings')
        .insert({
          pair,
          pj: pj !== undefined ? pj : 0,
          pg: pg !== undefined ? pg : 0,
          pp: pp !== undefined ? pp : 0,
          pts: pts !== undefined ? pts : 0
        })
        .select()

      if (error) throw error
      res.status(201).json(data?.[0])
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { id, ...updates } = req.body
      if (!id) throw new Error('ID is required')
      const { data, error } = await supabase
        .from('standings')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json(data?.[0])
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const id = req.query.id || req.body.id
      if (!id) throw new Error('ID is required')
      const { data, error } = await supabase
        .from('standings')
        .delete()
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json({ success: true, deleted: data?.[0] })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
