import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function POST(request: NextRequest) {
  const {id: pageId, name}: {id: string, name: string} = await request.json()

  const {id} = await notion.pages.update({
    page_id: pageId,
    properties: {
      name: {
        rich_text: [{
          text: {
            content: name
          }
        }]
      }
    }
  })
  
  return NextResponse.json({id})
}