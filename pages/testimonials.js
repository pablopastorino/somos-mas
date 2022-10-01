import TestimonialCard from '../components/testimonials/TestimonialCard'

function Testimonials({ testimonials }) {
  return (
    <div className='w-full max-w-5xl my-8 mx-2'>
      <div className='flex flex-wrap md:-mx-3 mb-6'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>Testimonios</h2>
        </div>
        <div className='w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
          {testimonials.map(({ _id, firstName, lastName, image, content }) => (
            <TestimonialCard
              key={_id}
              firstName={firstName}
              lastName={lastName}
              image={image}
              content={content}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/testimonials', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: testimonials } = await response.json()

  return {
    props: {
      testimonials
    }
  }
}

export default Testimonials
