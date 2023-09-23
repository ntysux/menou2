import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { MenuPublic } from '@/redux/menu.public/types'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

async function getPageWithNameUser(page: any): Promise<MenuPublic> {
  const {properties: {name: {rich_text: [{plain_text}]}}}: any = await notion.pages.retrieve({
    page_id: page.uid
  })

  return {
    ...page,
    uname: plain_text
  }
}

export async function GET(request: NextRequest) {

  const {results} = await notion.databases.query({
    database_id: notionMenouId!,
    filter: {
      and: [
        {
          property: 'status',
          checkbox: {
            equals: false
          }
        },
        {
          property: 'deleted',
          checkbox: {
            equals: false
          }
        }
      ]
    } 
  })

  const pagesI = [...results.map((page: any) => {
    const {id, properties: {uid, name, materials, required, steps}} = page

    return {
      id,
      uid: uid.title[0].plain_text,
      name: name.rich_text[0].plain_text,
      materials: materials.rich_text[0]?.plain_text,
      required: required.rich_text[0]?.plain_text,
      steps: steps.rich_text[0]?.plain_text,
    }
  })]

  const pages = await Promise.all(pagesI.map(page => getPageWithNameUser(page)))

  return NextResponse.json({pages})
}