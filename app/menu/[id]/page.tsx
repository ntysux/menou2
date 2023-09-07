const url = process.env.NEXT_PUBLIC_APP_URL

async function getPage(id: string) {
  const res = await fetch(`${url}/menu/${id}/api`, {next: {revalidate: 0}})
  const rs = await res.json()

  return rs
}

export default async function ViewPage({params}: {params: {id: string}}) {
  const {id} = params
  const rs = await getPage(id)

  return (
    <>
      <h2>{rs.name}</h2>
      <h3 className="font-bold">Nguyên liệu</h3>
      <ul>
        {
          rs.materials?.split('|').map((material: any, index: number) => 
            <li key={index}>{material}</li> 
          )
          ??
          <div>Trống</div>
        }
      </ul>
      <h3 className="font-bold">Chuẩn bị</h3>
      <ul>
        {
          rs.required?.split('|').map((require: any, index: number) => 
            <li key={index}>{require}</li> 
          )
          ??
          <div>Trống</div>
        }
      </ul>
      <h3 className="font-bold">Chế biến</h3>
      <ul>
        {
          rs.steps?.split('|').map((step: any, index: number) => 
            <li key={index}>{step}</li> 
          )
          ??
          <div>Trống</div>
        }
      </ul>
    </>
  )
}