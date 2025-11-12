import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/home'

  if (code) {
    const supabase = await createClient()
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to the specified next page or home
      const redirectedURL = new URL(next, requestUrl.origin)
      return NextResponse.redirect(redirectedURL)
    } else {
      console.error('Auth callback error:', error)
      // Redirect to auth error page with error message
      const errorURL = new URL('/auth-error', requestUrl.origin)
      errorURL.searchParams.set('error', error.message)
      return NextResponse.redirect(errorURL)
    }
  }

  // If no code, redirect to auth error page
  return NextResponse.redirect(new URL('/auth-error', requestUrl.origin))
}

