'use client'
import { useAppSelector } from "@/redux/hooks"
import { IconDiamonds, IconSwipe, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

interface Feature {
  name: string
  href: string
  icon: React.ReactNode,
  color: string
  command?: number
}

export default function Sidebar() {
  const menu = useAppSelector(state => state.menu)
  const menuDeleted = menu.filter(menu => menu.deleted).length
  const menuNotDeleted = menu.length - menuDeleted

  const features: Feature[] = [
    {name: 'Menu', href: '/menu', icon: <IconSwipe size='17px' strokeWidth='2.7' />, color: 'text-sky-400', command: menuNotDeleted},
    {name: 'Thùng rác', href: '/trash', icon: <IconTrash size='17px' strokeWidth='2.7' />, color: 'text-rose-400', command: menuDeleted},
    {name: 'Premium', href: '/premium', icon: <IconDiamonds size='17px' strokeWidth='2.7' />, color: 'text-purple-400'}
  ]

  return (
    <div className="h-screen sticky top-0">
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
            <li className="flex items-center justify-between space-x-11 py-2.5 px-5 rounded-xl min-w-max hover:bg-sky-100">
              <div className="flex items-center space-x-3">
                <span className='text-neutral-300'>
                  {feature.icon}
                </span>
                <p className="p-1 rounded-md text-sm text-neutral-800 font-medium">
                  {feature.name}
                </p>
              </div>
              {
                typeof feature.command === 'number' &&
                <div className="text-xs text-sky-800 font-semibold px-2 py-0.5 bg-sky-100 rounded-md">
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