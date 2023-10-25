import Nav from "@/components/nav"

export default async function CommunityLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='sm:w-screen sm:max-w-5xl sm:mx-auto'>
      <Nav />
      <div className='m-3 my-9 sm:mx-0'>
        {children}
      </div>
    </div>
  )
}
