import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { JwtPayload, decode } from 'jsonwebtoken'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

interface Props {
  values: {
    name: string
    status: boolean
    library: string[][]
  }
}

export async function POST(request: NextRequest) {
  const {values: {name, status, library}}: Props = await request.json(),
    [materials, required, steps] = library.map(field => field.join('|')),
    cookie: RequestCookie | undefined = request.cookies.get('token')

  if(cookie) {
    const {value: token} = cookie
    const tokenDecoded: string | JwtPayload | null = decode(token)
    
    if(typeof tokenDecoded !== 'string' && tokenDecoded !== null) {
      const uid: string = tokenDecoded['id']

      const {id} = await notion.pages.create({
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
            rich_text: materials ? [
              {
                text: {
                  content: materials
                }
              }
            ] : []
          },
          required: {
            rich_text: required ? [
              {
                text: {
                  content: required
                }
              }
            ] : []
          },
          steps: {
            rich_text: steps ? [
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

      const page = {
        id, uid, name, status,
        deleted: false,
        materials: materials.length ? materials : undefined,
        required: required.length ? required : undefined,
        steps: steps.length ? steps : undefined
      }

      return NextResponse.json({page})
    }
  }

  return NextResponse.json({error: 'Unknown user'})
}