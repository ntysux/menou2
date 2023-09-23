'use client'
import { useAppSelector } from "@/redux/hooks"
import { IconDiamonds, IconDiscountCheckFilled, IconSettings, IconSwipe, IconTrash, IconWorld } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import Link from "next/link"
import { usePathname } from "next/navigation"

const url = process.env.NEXT_PUBLIC_APP_URL

async function getUser(cookie: RequestCookie | undefined) {
  const response = await fetch(`${url}/community/user`, {
    headers: {cookie: `token=${cookie?.value}`}
  })
  const result = await response.json()
  return result
}

interface Feature {
  name: string
  href: string
  icon: React.ReactNode
  command?: number
}

export default function Sidebar() {
  // const cookie = cookies().get('token')
  // const result = await getUser(cookie)

  const menu = useAppSelector(state => state.menu),
    menuDeleted = menu.filter(menu => menu.deleted).length,
    menuNotDeleted = menu.length - menuDeleted,
    pathname = usePathname()

  const features: Feature[] = [
    {name: 'Menu', href: '/menu', icon: <IconSwipe size='17px' strokeWidth='2.7' />, command: menuNotDeleted},
    {name: 'Thùng rác', href: '/menu/trash', icon: <IconTrash size='17px' strokeWidth='2.7' />, command: menuDeleted},
    {name: 'Cài đặt', href: '/menu/settings', icon: <IconSettings size='17px' strokeWidth='2.7' />}
  ]

  const routes = [
    {name: 'Cộng đồng', href: '/community', icon: <IconWorld size='17px' strokeWidth='2.7' />},
    {name: 'Premium', href: '/premium', icon: <IconDiamonds size='17px' strokeWidth='2.7' />}
  ]

  return (
    <div className="space-y-3">
      {
        pathname === '/community' &&
        <div className="p-3 rounded-xl shadow shadow-neutral-200">
          <div className="flex items-center space-x-1 p-5">
            <IconDiscountCheckFilled size='17px' className="text-sky-400" />
            <p className="text-sm text-neutral-800 font-bold">
              Ntysux
            </p>
          </div>
        </div>
      }
      <ul className='list-none p-3 rounded-xl shadow shadow-neutral-200'>
        {features.map((feature, index) =>
          <Link
            key={index}
            href={feature.href} 
          >
            <li className="flex items-center justify-between space-x-11 py-2.5 px-5 rounded-xl min-w-max">
              <div className="flex items-center space-x-3">
                <span className='text-neutral-300'>
                  {feature.icon}
                </span>
                <p className="p-1 rounded-md text-sm text-neutral-800 font-medium">
                  {feature.name}
                </p>
              </div>
              {
                feature.command !== undefined &&
                <div className="px-2.5 py-0.5 text-xs text-sky-800 font-semibold bg-sky-100 rounded-md">
                  {feature.command}
                </div>
              }
            </li>
          </Link>
        )}
      </ul>
      <ul className='list-none p-3 rounded-xl shadow shadow-neutral-200'>
        {routes.map((route, index) =>
          <Link
            key={index}
            href={route.href} 
          >
            <li className="flex items-center justify-between space-x-11 py-2.5 px-5 rounded-xl min-w-max">
              <div className="flex items-center space-x-3">
                <span className='text-neutral-300'>
                  {route.icon}
                </span>
                <p className="p-1 rounded-md text-sm text-neutral-800 font-medium">
                  {route.name}
                </p>
              </div>
            </li>
          </Link>
        )}
      </ul>
    </div>
  )
}