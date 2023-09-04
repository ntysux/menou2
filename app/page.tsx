import Signin from "@/components/signin"

export default function InitPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-3">
          <h2>Menoú</h2>
          <Signin />
          <button>Tạo tài khoản</button>
        </div>
      </div>
    </>    
  )
}
