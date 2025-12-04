import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' 

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('dna_orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    console.log({ data, error })
    
    if (error) {
      console.error('Supabase error:', error)
      // Provide more detailed error information
      return NextResponse.json(
        { 
          error: error.message,
          details: error.details || 'No additional details available',
          hint: error.hint || 'Check if the dna_orders table exists and RLS policies are configured correctly'
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(data || [])
  } catch (err) {
    console.error('Unexpected error in GET /api/orders:', err)
    return NextResponse.json(
      { error: 'Internal server error', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
