import Nav from "../nav"
import Sidebar from "../sidebar"
import Dashboard from "./dashboard"

export default function MenuBase({children}: {children: React.ReactNode}) {
  return (
    <div className="flex space-x-5 w-screen max-w-6xl mx-auto">
      <Sidebar />
      <div className="flex-1">
        <Nav>
          <Dashboard />
        </Nav>
        {children}
      </div>
    </div>
  )
}