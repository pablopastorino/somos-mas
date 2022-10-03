export default function NewItem({ newItem: { _id, name, image, content } }) {
  return (
    <div className='w-full max-w-8xl my-8'>
      <div className='flex flex-wrap mb-6 justify-center'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>Novedades</h2>
        </div>
        <div
          className='w-full h-56 sm:h-72 md:h-96 bg-no-repeat bg-center'
          style={{ background: `url(${image})`, backgroundSize: 'cover' }}
        ></div>
        <div className='sm:w-1/2 mx-4 sm:mx-0 mt-8'>
          <h3 className='text-3xl font-medium text-gray-900 my-2'>{name}</h3>
          <div>{content}</div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/news', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
  const { data } = await res.json()

  const paths = data.map(newItem => ({ params: { id: newItem._id.toString() } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/news/${params.id}`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: newItem } = await res.json()

  return { props: { newItem } }
}
