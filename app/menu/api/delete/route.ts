import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function POST(request: NextRequest) {
  const {id} = await request.json()

  console.log(id)

  const pageUpdated = await notion.pages.update({
    page_id: id,
    properties: {
      deleted: {
        checkbox: true
      }
    }
  })
  
  return NextResponse.json({id: pageUpdated.id})
}