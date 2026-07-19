import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones de utilidad para la app

export async function getMesas() {
  const { data, error } = await supabase
    .from('mesas')
    .select('*')
    .order('id', { ascending: true })

  if (error) console.error('Error fetching mesas:', error)
  return data || []
}

export async function updateMesa(id, updates) {
  const { data, error } = await supabase
    .from('mesas')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) console.error('Error updating mesa:', error)
  return data?.[0]
}

export async function getStandings() {
  const { data, error } = await supabase
    .from('standings')
    .select('*')
    .order('pts', { ascending: false })

  if (error) console.error('Error fetching standings:', error)
  return data || []
}

export async function getBracket() {
  const { data, error } = await supabase
    .from('bracket')
    .select('*')
    .single()

  if (error) console.error('Error fetching bracket:', error)
  return data
}

export async function updateBracket(bracketData) {
  const { data, error } = await supabase
    .from('bracket')
    .update({ cuartos: bracketData.cuartos, semis: bracketData.semis, final: bracketData.final })
    .eq('id', 1)
    .select()

  if (error) console.error('Error updating bracket:', error)
  return data?.[0]
}
