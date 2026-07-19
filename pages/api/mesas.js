import { getSupabaseAdminClient } from '../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const supabase = getSupabaseAdminClient()

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('mesas')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error
      res.status(200).json(data)
    } 
    else if (req.method === 'PUT') {
      const { id, ...updates } = req.body
      const { data, error } = await supabase
        .from('mesas')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      res.status(200).json(data?.[0])
    }
    else if (req.method === 'POST') {
      const { a, b, scoreA, scoreB, set, status } = req.body
      const { data: maxMesa, error: maxError } = await supabase
        .from('mesas')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)

      if (maxError) throw maxError
      const nextId = (maxMesa && maxMesa.length > 0) ? maxMesa[0].id + 1 : 1

      const { data, error } = await supabase
        .from('mesas')
        .insert({
          id: nextId,
          a: a || 'TBD',
          b: b || 'TBD',
          scoreA: scoreA !== undefined ? scoreA : 0,
          scoreB: scoreB !== undefined ? scoreB : 0,
          set: set || 'malas',
          status: status || 'libre'
        })
        .select()

      if (error) throw error
      res.status(201).json(data?.[0])
    }
    else if (req.method === 'DELETE') {
      const id = req.query.id || req.body.id
      if (!id) throw new Error('ID is required')
      const { data, error } = await supabase
        .from('mesas')
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
