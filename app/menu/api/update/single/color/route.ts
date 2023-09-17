import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function POST(request: NextRequest) {
  const {id: pageId, color}: {id: string, color: string} = await request.json()

  const {id} = await notion.pages.update({
    page_id: pageId,
    properties: {
      color: {
        rich_text: [{
          text: {
            content: color
          }
        }]
      }
    }
  })
  
  return NextResponse.json({id})
}