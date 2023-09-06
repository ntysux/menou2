import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { JwtPayload, decode } from 'jsonwebtoken'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

export async function POST(request: NextRequest) {
  const {values: {name, status, library}} = await request.json()
  const materials = library[0].join('|')
  const required = library[1].join('|')
  const steps = library[2].join('|')

  const cookie: RequestCookie | undefined = request.cookies.get('token')

  if(cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)
    
    if(typeof tokenDecoded !== 'string' && tokenDecoded !== null) {
      const uid: string = tokenDecoded['id']

      const newPageResponse: any = await notion.pages.create({
        parent: {
          database_id: notionMenouId!
        },
        properties: {
          uid: {
            title: [{
              text: {
                content: uid
              }
            }]
          },
          name: {
            rich_text: [{
              text: {
                content: name
              }
            }]
          },
          materials: {
            rich_text: materials.length ? [
              {
                text: {
                  content: materials
                }
              }
            ] : []
          },
          required: {
            rich_text: required.length ? [
              {
                text: {
                  content: required
                }
              }
            ] : []
          },
          steps: {
            rich_text: steps.length ? [
              {
                text: {
                  content: steps
                }
              }
            ] : []
          },
          status: {
            checkbox: status
          }
        }
      })

      const {id} = newPageResponse

      return NextResponse.json({
        id, 
        uid, 
        name,
        deleted: false,
        materials: materials.length ? materials : undefined,
        required: required.length ? required : undefined,
        steps: steps.length ? steps : undefined,
        status
      })
    }
  }

  return NextResponse.json({error: 'An unknown error'})
}