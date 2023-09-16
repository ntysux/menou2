import Nav from "../nav"
import Sidebar from "../sidebar"
import Dashboard from "./dashboard"

export default function MenuBase({children}: {children: React.ReactNode}) {
  return (
    <div className="sm:flex sm:space-x-5 sm:w-screen sm:max-w-6xl sm:mx-auto">
      <Sidebar />
      <div className="sm:flex-1">
        <Nav>
          <Dashboard />
        </Nav>
        <div className="mx-3 sm:mx-0">
          {children}
        </div>
      </div>
    </div>
  )
}