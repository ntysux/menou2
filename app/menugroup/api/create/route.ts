import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { JwtPayload, decode } from 'jsonwebtoken'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionGroupId = process.env.NOTION_GROUP

export async function POST(request: NextRequest) {
  const {name}: {name: string} = await request.json()
  const cookie: RequestCookie | undefined = request.cookies.get('token')

  if(cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)
    
    if(typeof tokenDecoded !== 'string' && tokenDecoded !== null) {
      const uid: string = tokenDecoded['id']
      const {id} = await notion.pages.create({
        parent: {
          database_id: notionGroupId!
        },
        properties: {
          uid: {
            title: [{
              text: {
                content: uid
              }
            }]
          },
          name: {
            rich_text: [{
              text: {
                content: name
              }
            }]
          }
        }
      })

      return NextResponse.json({
        id,
        uid,
        name,
        list: [],
        deleted: false
      })
    }
  }
  
  return NextResponse.json({error: 'Lỗi: Người dùng không xác định !'})
}