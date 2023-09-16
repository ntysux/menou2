'use client'
import { useAppSelector } from "@/redux/hooks"
import { IconSettings, IconSwipe, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

interface Feature {
  name: string
  href: string
  icon: React.ReactNode
  command?: number
}

export default function Sidebar() {
  const menu = useAppSelector(state => state.menu)
  const menuDeleted = menu.filter(menu => menu.deleted).length
  const menuNotDeleted = menu.length - menuDeleted

  const features: Feature[] = [
    {name: 'Menu', href: '/menu', icon: <IconSwipe size='17px' strokeWidth='2.7' />, command: menuNotDeleted},
    {name: 'Thùng rác', href: '/menu/trash', icon: <IconTrash size='17px' strokeWidth='2.7' />, command: menuDeleted},
    {name: 'Cài đặt', href: '/menu/settings', icon: <IconSettings size='17px' strokeWidth='2.7' />}
  ]

  return (
    <div className="h-screen sticky top-0 hidden sm:block">
      <div className="py-[13px]">
        <h1 className='text-xl text-neutral-800 tracking-widest'>
          Menoú
        </h1>
      </div>
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
    </div>
  )
}