import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { genSalt, hash } from 'bcrypt'
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const notionAccountId = process.env.NOTION_ACCOUNT

interface Props {
  values: {
    username: string
    password: string
    name: string
  }
}

export async function POST(request: NextRequest) {
  const {values: {username, password, name}}: Props = await request.json()

  const {results} = await notion.databases.query({
    database_id: notionAccountId!,
    filter: {
      property: 'username',
      rich_text: {
        contains: username
      }
    }
  })
  
  // return if username already exists
  if(results.length) {
    return NextResponse.json({username: 'Tên đăng nhập đã tồn tại.'})
  } else {
    // hash password with Bcrypt
    const salt: string = await genSalt(10)
    const passwordHashed: string = await hash(password, salt)

    // store account into Notion
    const {id} = await notion.pages.create({
      parent: {
        database_id: notionAccountId!
      },
      properties: {
        username: {
          title: [{
            text: {
              content: username
            }
          }]
        },
        password: {
          rich_text: [{
            text: {
              content: passwordHashed
            }
          }]
        },
        name: {
          rich_text: [{
            text: {
              content: name
            }
          }]
        }
      }
    })

    // create token
    const token: string = jwt.sign({id}, process.env.SECRET_KEY!, {algorithm: 'HS256'})
    return NextResponse.json({id}, {status: 200, headers: {'Set-Cookie': `token=${token}; Path=/`}})
  }
}