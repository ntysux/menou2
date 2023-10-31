import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

export const dynamic = 'force-dynamic'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionCommentId = process.env.NOTION_COMMENT

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
  const {uid, comment} = await request.json()

  const {id} = await notion.pages.create({
    parent: {
      database_id: notionCommentId!
    },
    properties: {
      pid: {
        title: [{
          text: {
            content: params.id
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
      }
    }
  })

  return NextResponse.json({id})
}