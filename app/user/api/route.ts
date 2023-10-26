import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { JwtPayload, decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { User } from '@/redux/user/types'

const notion = new Client({auth: process.env.NOTION_KEY})

export async function GET(request: NextRequest) {
  const cookie = cookies().get('token')

  if (cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)
    if (typeof tokenDecoded !== 'string' && tokenDecoded) {
      const 
        uid: string = tokenDecoded['id'],
        {properties: {name, verified}}: any = await notion.pages.retrieve({page_id: uid})

      const user: User = {
        id: uid,
        name: name.rich_text[0].plain_text, 
        verified: verified.checkbox
      }

      return NextResponse.json(user)
    }
  }

  return NextResponse.json({error: 'Lỗi: người dùng không xác định !'})
}