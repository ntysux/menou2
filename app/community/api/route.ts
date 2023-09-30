import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { Client } from "@notionhq/client"
import { MenuPublic } from '@/redux/menu.public/types'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionMenouId = process.env.NOTION_MENOU

async function getPageWithNameUser(page: any): Promise<MenuPublic> {
  const {
    properties: {
      name: {rich_text: [{plain_text}]},
      verified: {checkbox}
    }
  }: any = await notion.pages.retrieve({
    page_id: page.uid
  })

  return {
    ...page,
    author: {
      name: plain_text,
      verified: checkbox
    }
  }
}

export async function GET(request: NextRequest) {
  try {
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
  
    const pagesI = [...results.map((page: any) => {
      const {id, properties: {uid, name, description}} = page
  
      return {
        id,
        uid: uid.title[0].plain_text,
        name: name.rich_text[0].plain_text,
        description: description.rich_text[0]?.plain_text
      }
    })]
  
    const pages = await Promise.all(pagesI.map(page => getPageWithNameUser(page)))
  
    return NextResponse.json({pages})
  } catch (error) {
    return NextResponse.json({error: 'Something wrong'})
  }
}