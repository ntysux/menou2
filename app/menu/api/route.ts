import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { JwtPayload, decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { User } from '@/redux/user/types'
import { Menu } from '@/redux/menu/types'
import { MenuGroup } from '@/redux/menu.group/types'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU
const notionMenouGroupId = process.env.NOTION_GROUP

async function renderMenuGroup(uid: string): Promise<MenuGroup[]> {
  const {results} = await notion.databases.query({
    database_id: notionMenouGroupId!,
    filter: {
      property: 'uid',
      rich_text: {
        contains: uid
      }
    } 
  })
  return [...results.map((page: any) => {
    const {id, properties: {name, list, deleted}} = page
    return {
      id,
      uid,
      name: name.rich_text[0].plain_text,
      list: list.rich_text[0]?.plain_text.length ? list.rich_text[0].plain_text.split('|') : [],
      deleted: deleted.checkbox
    }
  })]
}

async function renderUser(uid: string): Promise<User> {
  const {properties: {name, verified, premium}}: any = await notion.pages.retrieve({
    page_id: uid
  })
  return {
    id: uid,
    name: name.rich_text[0].plain_text, 
    verified: verified.checkbox,
    premium: premium.checkbox
  }
}

async function renderMenu(uid: string): Promise<Menu[]> {
  const {results} = await notion.databases.query({
    database_id: notionMenouId!,
    filter: {
      property: 'uid',
      rich_text: {
        contains: uid
      }
    } 
  })
  return [...results.map((page: any) => {
    const {id, properties: {uid, name, description, deleted, materials, required, steps, status, color}} = page
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
}

export async function GET(request: NextRequest) {
  const cookie = cookies().get('token')

  if (cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)
    if (typeof tokenDecoded !== 'string' && tokenDecoded) {
      const uid: string = tokenDecoded['id']
      const user = await renderUser(uid)      
      const pages = await renderMenu(uid)
      const groupPages = await renderMenuGroup(uid)

      return NextResponse.json({results: {pages, user, groupPages}})
    }
  }

  return NextResponse.json({error: 'Người dùng không xác định'})
}