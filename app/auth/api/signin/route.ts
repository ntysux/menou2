import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { compare } from 'bcrypt'
import { Client } from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})
const notionAccountId = process.env.NOTION_ACCOUNT

interface Props {
  username: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const {username, password}: Props = await request.json()

    // Check account on Notion by username
    const {results}: any = await notion.databases.query({
      database_id: notionAccountId!,
      filter: {
        property: 'username',
        rich_text: {contains: username}
      }
    })

    if (results.length) {
      const { 
        id,
        properties: {
          password: passwordReturned,
          name,
          verified,
          premium
        } 
      } = results[0]

      const passwordHashed: string = passwordReturned.rich_text[0].plain_text
      // Compare password with password hashed
      const passwordComparisonResults: boolean = await compare(password, passwordHashed)

      if (passwordComparisonResults) {
        return NextResponse.json({
          user: {
            id, 
            name: name.rich_text[0].plain_text, 
            verified: verified.checkbox,
            premium: premium.checkbox
          }
        })
      }
    }

    // Message returned if user or password is wrong
    return NextResponse.json({error: 'Tên đăng nhập hoặc mật khẩu không đúng !'}, {status: 401})
  } catch (error: any) {
    // Message returned if something wrong
    return NextResponse.json({error: error.message}, {status: 500})
  }
}