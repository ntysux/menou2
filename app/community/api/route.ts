import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { Author, MenuPublic } from '@/redux/menu.public/types'

export const dynamic = 'force-dynamic'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

async function getAllMenu() {
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
  return results
}

async function getAuthor(uid: string): Promise<Author> {
  const {properties: {name, verified}}: any = await notion.pages.retrieve({
    page_id: uid
  })

  return {
    name: name.rich_text[0].plain_text,
    verified: verified.checkbox
  }
}

async function renderMenuPublic(page: any): Promise<MenuPublic> {
  const {id, properties: {uid, name, description, materials, required, steps}} = page
  const author = await getAuthor(uid.title[0].plain_text)

  return {
    id,
    uid: uid.title[0].plain_text,
    name: name.rich_text[0].plain_text,
    description: description.rich_text[0]?.plain_text,
    materials: materials.rich_text[0]?.plain_text,
    required: required.rich_text[0]?.plain_text,
    steps: steps.rich_text[0]?.plain_text,
    author,
    comments: []
  }
}

export async function GET(request: NextRequest) {
  const menu = await getAllMenu()
  const menuPublic = await Promise.all([...menu.map(page => renderMenuPublic(page))])

  return NextResponse.json({menuPublic})
}