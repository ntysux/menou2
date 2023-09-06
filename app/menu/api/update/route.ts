import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

export async function POST(request: NextRequest) {
  const {id, name, status, library} = await request.json()
  const materials = library[0].join('|')
  const required = library[1].join('|')
  const steps = library[2].join('|')

  const pageUpdated = await notion.pages.update({
    page_id: id,
    properties: {
      name: {
        rich_text: [{
          text: {
            content: name
          }
        }]
      },
      materials: {
        rich_text: materials.length ? [{
          text: {
            content: materials
          }
        }] : []
      },
      required: {
        rich_text: required.length ? [{
          text: {
            content: required
          }
        }] : []
      },
      steps: {
        rich_text: steps.length ? [{
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
  
  return NextResponse.json({id: pageUpdated.id})
}