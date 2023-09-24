import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const {id} = params

  try {
    const {properties: {uid, name, description, materials, required, steps}}: any = await notion.pages.retrieve({
      page_id: id
    })

    const {
      properties: {
        name: {rich_text: [{plain_text}]},
        verified: {checkbox}
      }
    }: any = await notion.pages.retrieve({
      page_id: uid.title[0].plain_text
    }) 

    return NextResponse.json({
      page: {
        uid: uid.title[0].plain_text,
        name: name.rich_text[0].plain_text,
        description: description.rich_text[0]?.plain_text,
        materials: materials.rich_text[0]?.plain_text,
        required: required.rich_text[0]?.plain_text,
        steps: steps.rich_text[0]?.plain_text,
        uname: plain_text,
        verified: checkbox
      }
    })
  } catch (error: any) {
    return NextResponse.json({error: {code: error.code, message: error.message}})
  }
}