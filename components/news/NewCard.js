import Link from 'next/link'

export default function NewCard({ id, name, image, content }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch justify-center bg-indigo-200 rounded-2xl p-4'>
      <div
        style={{
          background: `url(${image})`,
          backgroundSize: 'cover'
        }}
        className='w-full rounded-lg bg-no-repeat bg-center filter flex-1 h-72 md:h-full'
      ></div>
      <div className='flex flex-col'>
        <h3 className='text-gray-900 text-lg font-medium'>{`${name}`}</h3>
        <p className='text-gray-900 text-base text-left line-clamp-6'>{content}</p>
        <div className='flex items-center justify-center'>
          <Link href={`/news/${id}`}>
            <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full text-center'>
              Ver novedad
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
