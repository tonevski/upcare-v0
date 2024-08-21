'use server'

import { supabase } from '@/lib/supabase'

export async function subscribeToEarlyAccess(email: string) {
  try {
    const { error } = await supabase
      .from('early_access_emails')
      .insert([{ email }])
    
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error inserting email:', error)
    return { success: false, error: 'Failed to subscribe. Please try again.' }
  }
}