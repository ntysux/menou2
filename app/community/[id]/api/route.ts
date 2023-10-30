import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { Author, Comment, MenuPublic } from '@/redux/menu.public/types'
import { User } from '@/redux/user/types'

export const dynamic = 'force-dynamic'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionCommentId = process.env.NOTION_COMMENT

async function getUser(uid: string): Promise<User> {
  const {id, properties: {name, verified}}: any = await notion.pages.retrieve({
    page_id: uid
  })
  return {
    id,
    name: name.rich_text[0].plain_text,
    verified: verified.checkbox
  }
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

async function renderComment(commentRaw: any): Promise<Comment> {
  const {properties: {uid, comment}} = commentRaw
  const user = await getUser(uid.rich_text[0].plain_text)
  return {
    user,
    comment: comment.rich_text[0].plain_text
  }
}

async function getAllComment(pid: string): Promise<Comment[]> {
  const {results} = await notion.databases.query({
    database_id: notionCommentId!,
    filter: {
      property: 'pid',
      rich_text: {
        contains: pid
      }
    }     
  })
  const comments = await Promise.all([...results.map(result => renderComment(result))])
  return comments
}

async function getMenuPublicPage(pid: string): Promise<MenuPublic> {
  const {id, last_edited_time, properties: {uid, name, description, materials, required, steps}}: any = await notion.pages.retrieve({
    page_id: pid
  })

  const 
    date = new Date(last_edited_time),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate()

  const author = await getAuthor(uid.title[0].plain_text)
  const comments = await getAllComment(pid)

  return {
    id,
    uid: uid.title[0].plain_text,
    name: name.rich_text[0].plain_text,
    description: description.rich_text[0]?.plain_text,
    materials: materials.rich_text[0]?.plain_text,
    required: required.rich_text[0]?.plain_text,
    steps: steps.rich_text[0]?.plain_text,
    lastEditedTime: `${day}/${month}/${year}`,
    author,
    comments
  }
}

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const menuPublic = await getMenuPublicPage(params.id)
  return NextResponse.json({...menuPublic})
}