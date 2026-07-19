import { getSupabaseAdminClient } from '../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const supabase = getSupabaseAdminClient()

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('standings')
        .select('*')
        .order('pts', { ascending: false })

      if (error) throw error
      res.status(200).json(data)
    } 
    else if (req.method === 'POST') {
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
    }
    else if (req.method === 'PUT') {
      const { id, ...updates } = req.body
      if (!id) throw new Error('ID is required')
      const { data, error } = await supabase
        .from('standings')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json(data?.[0])
    }
    else if (req.method === 'DELETE') {
      const id = req.query.id || req.body.id
      if (!id) throw new Error('ID is required')
      const { data, error } = await supabase
        .from('standings')
        .delete()
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json({ success: true, deleted: data?.[0] })
    }
    else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message })
  }
}
