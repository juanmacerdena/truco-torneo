import { getSupabaseAdminClient } from '../../lib/supabaseAdmin'

export default async function handler(req, res) {
  try {
    const supabase = getSupabaseAdminClient()

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('bracket')
        .select('*')
        .single()

      if (error) throw error
      res.status(200).json(data)
    } 
    else if (req.method === 'PUT') {
      const { cuartos, semis, final } = req.body
      const { data, error } = await supabase
        .from('bracket')
        .update({ cuartos, semis, final })
        .eq('id', 1)
        .select()

      if (error) throw error
      res.status(200).json(data?.[0])
    }
    else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message })
  }
}
