'use client'
import { IconArrowNarrowLeft } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Back() {
  const router = useRouter()

  return (
    <IconArrowNarrowLeft 
      size='20px' 
      className="text-neutral-800 cursor-pointer"
      onClick={() => router.back()}
    />
  )
}