import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { Author, MenuPublicPreview } from '@/redux/menu.public/types'

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
  const {properties: {name, verified, premium}}: any = await notion.pages.retrieve({
    page_id: uid
  })
  return {
    name: name.rich_text[0].plain_text,
    verified: verified.checkbox,
    premium: premium.checkbox
  }
}

async function renderMenuPublic(page: any): Promise<MenuPublicPreview> {
  const {id, last_edited_time, properties: {uid, name, description, materials, required, steps}} = page
  const author = await getAuthor(uid.title[0].plain_text)

  const 
    date = new Date(last_edited_time),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate()

  return {
    id,
    uid: uid.title[0].plain_text,
    name: name.rich_text[0].plain_text,
    description: description.rich_text[0]?.plain_text,
    materials: materials.rich_text[0]?.plain_text,
    required: required.rich_text[0]?.plain_text,
    steps: steps.rich_text[0]?.plain_text,
    lastEditedTime: `${day}/${month}/${year}`,
    author
  }
}

export async function GET(request: NextRequest) {
  const menu = await getAllMenu()
  const menuPublicPreview = await Promise.all([...menu.map(page => renderMenuPublic(page))])

  return NextResponse.json({menuPublicPreview})
}