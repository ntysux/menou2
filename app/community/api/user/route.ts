import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { JwtPayload, decode } from 'jsonwebtoken'

const notion = new Client({auth: process.env.NOTION_KEY})

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('token')

  if (cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)

    if (typeof tokenDecoded !== 'string' && tokenDecoded) {
      const uid: string = tokenDecoded['id']
      
      const {
        properties: {
          name: {rich_text: [{plain_text}]},
          verified: {checkbox}
        }
      }: any = await notion.pages.retrieve({
        page_id: uid
      })

      return NextResponse.json({
        user: {
          id: uid,
          name: plain_text, 
          verified: checkbox
        }
      })
    }
  }

  return NextResponse.json({error: 'Unknown user'})
}