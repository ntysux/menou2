import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { genSalt, hash } from 'bcrypt'
import { Client as NotionClient } from "@notionhq/client"

const notion = new NotionClient({auth: process.env.NOTION_KEY})
const notionAccountId = process.env.NOTION_ACCOUNT

interface Props {
  username?: string
  password?: string
  name: string
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const {username, password, name, email}: Props = await request.json()

    // Google
    if (email) {
      const {results} = await notion.databases.query({
        database_id: notionAccountId!,
        filter: {
          property: 'email',
          email: {
            contains: email
          }
        }
      })

      // Return id if account already exist
      if (results.length) { 
        return NextResponse.json({id: results[0].id})
      } 

      // Create new account & return id if account doesn't exist
      else {
        const {id} = await notion.pages.create({
          parent: {
            database_id: notionAccountId!
          },
          properties: {
            name: {
              rich_text: [{
                text: {
                  content: name
                }
              }]
            },
            email: {
              email
            }
          }
        })

        return NextResponse.json({id})
      }
    } 
    
    // Credentials
    else {
      const {results} = await notion.databases.query({
        database_id: notionAccountId!,
        filter: {
          property: 'username',
          rich_text: {
            contains: username!
          }
        }
      })

      // Error returned if username already exists
      if(results.length) {
        return NextResponse.json({error: 'Tên đăng nhập đã tồn tại !'})
      } 

      // Create new account & return id if account doesn't exist
      else {
        // Hash password
        const salt: string = await genSalt(10)
        const passwordHashed: string = await hash(password!, salt)

        // Create account
        const {id} = await notion.pages.create({
          parent: {
            database_id: notionAccountId!
          },
          properties: {
            username: {
              title: [{
                text: {
                  content: username!
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

        return NextResponse.json({id})
      }
    }
  } catch (error: any) {
    // Return error if something wrong
    return NextResponse.json({error: error.message}, {status: 500})
  }
}