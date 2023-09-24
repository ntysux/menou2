import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

interface Props {
  id: string
  name: string
  description?: string
  status: boolean
  library: string[][]
}

export async function POST(request: NextRequest) {
  const {id: pageId, name, status, description, library}: Props = await request.json()
  const [materials, required, steps] = library.map(field => field.join('|'))

  const {id} = await notion.pages.update({
    page_id: pageId,
    properties: {
      name: {
        rich_text: [{
          text: {
            content: name
          }
        }]
      },
      description: {
        rich_text: description ? [{
          text: {
            content: description
          }
        }] : []
      },
      materials: {
        rich_text: materials ? [{
          text: {
            content: materials
          }
        }] : []
      },
      required: {
        rich_text: required ? [{
          text: {
            content: required
          }
        }] : []
      },
      steps: {
        rich_text: steps ? [{
          text: {
            content: steps
          }
        }] : []
      },
      status: {
        checkbox: status
      }
    }
  })
  
  return NextResponse.json({id})
}