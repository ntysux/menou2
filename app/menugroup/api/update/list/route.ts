import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function POST(request: NextRequest) {
  const {id: pageId, list}: {id: string, list: string[]} = await request.json()

  const {id} = await notion.pages.update({
    page_id: pageId,
    properties: {
      list: {
        rich_text: [{
          text: {
            content: list.join('|')
          }
        }]
      }
    }
  })
  
  return NextResponse.json({id})
}