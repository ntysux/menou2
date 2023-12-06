import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function Middleware(request: NextRequest) {
  return NextResponse.next()
}

// export const config = {
//   matcher: ['/']
// }