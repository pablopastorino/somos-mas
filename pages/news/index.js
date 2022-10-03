import NewCard from '../../components/news/NewCard'

function News({ news }) {
  return (
    <div className='w-full max-w-5xl my-8 mx-2'>
      <div className='flex flex-wrap md:-mx-3 mb-6'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>Novedades</h2>
        </div>
        <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {news.map(({ _id, name, image, content }) => (
            <NewCard key={_id} id={_id} name={name} image={image} content={content} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/news', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: news } = await response.json()

  return {
    props: {
      news
    }
  }
}

export default News
