import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})
const notionCommentId = process.env.NOTION_COMMENT

interface Props {
  uid: string
  comment: string
}

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
  const {id} = params
  const {uid, comment}: Props = await request.json()
  
  const {id: idResponse} = await notion.pages.create({
    parent: {
      database_id: notionCommentId!
    },
    properties: {
      pid: {
        title: [{
          text: {
            content: id
          }
        }]
      },
      uid: {
        rich_text: [{
          text: {
            content: uid
          }
        }]
      },
      comment: {
        rich_text: [{
          text: {
            content: comment
          }
        }]
      },
    }
  })

  return NextResponse.json({idResponse})
}