import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { compare } from 'bcrypt'
import { Client } from "@notionhq/client"
import { sign } from 'jsonwebtoken'

const notion = new Client({auth: process.env.NOTION_KEY})
const notionAccountId = process.env.NOTION_ACCOUNT

interface Props {
  values: {
    username: string
    password: string
  }
}

export async function POST(request: NextRequest) {
  const {values: {username, password}}: Props = await request.json()

  const {results}: any = await notion.databases.query({
    database_id: notionAccountId!,
    filter: {
      property: 'username',
      rich_text: {
        contains: username
      }
    }
  })

  if (results.length) {
    const passwordHashed: string = results[0].properties.password.rich_text[0].plain_text
    const result: boolean = await compare(password, passwordHashed)

    if (result) {
      const {id}: {id: string} = results[0]
      const token: string = sign({id}, process.env.SECRET_KEY!, {algorithm: 'HS256'})
      return NextResponse.json({id}, {status: 200, headers: {'Set-Cookie': `token=${token}; Path=/`}})
    }
  }
  return NextResponse.json({error: 'Tài khoản hoặc mật khẩu không đúng'})
}