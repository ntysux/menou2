import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const url = process.env.NEXT_PUBLIC_APP_URL

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