import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { url } from './utils/app.url'

export default function Middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')

  if (cookie) {
    return NextResponse.redirect(`${url}/menu`)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/']
}