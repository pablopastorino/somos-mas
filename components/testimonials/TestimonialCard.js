export default function TestimonialCard({ firstName, lastName, image, content }) {
  return (
    <div className='col-span-1 flex flex-col items-start justify-start bg-yellow-100 rounded-2xl p-4'>
      <div
        style={{
          background: `url(${image})`,
          backgroundSize: 'cover'
        }}
        className='rounded-full w-24 h-24 bg-no-repeat bg-center filter mb-2'
      ></div>
      <h3 className='text-gray-900 text-lg font-medium text-center'>{`${firstName} ${lastName}`}</h3>
      <p className='text-gray-900 text-base text-left line-clamp-5'>{content}</p>
    </div>
  )
}
