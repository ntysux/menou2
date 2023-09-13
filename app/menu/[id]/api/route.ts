import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const {id} = params

  try {
    const pageResponse: any = await notion.pages.retrieve({
      page_id: id
    })
    const {
      properties: {name, materials, required, steps, status}
    } = pageResponse
    return NextResponse.json({
      page: {
        name: name.rich_text[0].plain_text,
        materials: materials.rich_text[0]?.plain_text,
        required: required.rich_text[0]?.plain_text,
        steps: steps.rich_text[0]?.plain_text,
        status: status.checkbox
      }
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message})
  }
}