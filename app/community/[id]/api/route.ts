import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { Comment, MenuPublic } from '@/redux/menu.public/types'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionCommentId = process.env.NOTION_COMMENT

async function getComments(page: any): Promise<Comment> {
  const {properties: {uid, comment}} = page 

  const {id, properties: {name, verified}}: any = await notion.pages.retrieve({
    page_id: uid.rich_text[0].plain_text
  })

  return {
    user: {
      id,
      name: name.rich_text[0].plain_text,
      verified: verified.checkbox
    },
    comment: comment.rich_text[0].plain_text
  }
}

async function getAuthor(uid: string): Promise<{name: string, verified: boolean}> {
  const {properties: {name: {rich_text: [{plain_text}]}, verified: {checkbox}}}: any = await notion.pages.retrieve({
    page_id: uid
  })

  return {
    name: plain_text,
    verified: checkbox
  }
}

async function getPage(id: string): Promise<{
  uid: string
  name: string
  description: string
  materials: string | undefined
  required: string | undefined
  steps: string | undefined
  author: {
    name: string
    verified: boolean
  }
}> {
  const {properties: {uid, name, description, materials, required, steps}}: any = await notion.pages.retrieve({
    page_id: id
  })

  const author = await getAuthor(uid.title[0].plain_text)

  return {
    uid: uid.title[0].plain_text, 
    name: name.rich_text[0].plain_text, 
    description: description.rich_text[0]?.plain_text,
    materials: materials.rich_text[0]?.plain_text,
    required: required.rich_text[0]?.plain_text,
    steps: steps.rich_text[0]?.plain_text,
    author
  }
}

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const {id} = params

  try {
    const {results} = await notion.databases.query({
      database_id: notionCommentId!,
      filter: {
        property: 'pid',
        rich_text: {
          contains: id
        }
      }
    })
    const comments = await Promise.all(results.map((page: any) => getComments(page)))

    const pageI = await getPage(id)

    const page: MenuPublic = {
      id,
      ...pageI,
      comments
    }

    return NextResponse.json({page})
  } catch (error: any) {
    return NextResponse.json({error: {code: error.code, message: error.message}})
  }
}