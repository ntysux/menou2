import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { JwtPayload, decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

export async function GET(request: NextRequest) {
  const cookie = cookies().get('token')

  if (cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)

    if (typeof tokenDecoded !== 'string' && tokenDecoded) {
      const uid: string = tokenDecoded['id']
      
      const {results} = await notion.databases.query({
        database_id: notionMenouId!,
        filter: {
          property: 'uid',
          rich_text: {
            contains: uid
          }
        } 
      })

      const pages = [...results.map((page: any) => {
        const {id, properties: {
          uid, name, description, deleted, materials, required, steps, status, color
        }} = page
  
        return {
          id,
          uid: uid.title[0].plain_text,
          name: name.rich_text[0].plain_text,
          description: description.rich_text[0]?.plain_text,
          deleted: deleted.checkbox,
          materials: materials.rich_text[0]?.plain_text,
          required: required.rich_text[0]?.plain_text,
          steps: steps.rich_text[0]?.plain_text,
          status: status.checkbox,
          color: color.rich_text[0]?.plain_text
        }
      })]

      return NextResponse.json({pages})
    }
  }

  return NextResponse.json({error: 'Người dùng không xác định'})
}