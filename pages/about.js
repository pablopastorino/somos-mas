import MemberCard from '../components/about/MemberCard'

function About({ members }) {
  return (
    <div className='w-full max-w-4xl my-8 mx-2'>
      <div className='flex flex-wrap md:-mx-3 mb-6'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>¡Nuestro Staff!</h2>
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-5 gap-4 mb-16'>
          <div className='col-span-2 md:col-span-3 md:h-96 flex flex-col justify-center'>
            <h2 className='text-3xl font-bold'>
              {members[0].firstName} {members[0].lastName}
            </h2>
            <p className='text-3xl'>{members[0].role}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sit et molestias
              consectetur perferendis voluptates corporis. Impedit soluta porro corporis accusamus
              ullam dolorum, illo quod eveniet, nulla unde ex aliquam. Molestiae, possimus velit
              aliquam voluptas officiis excepturi ullam expedita? Quo magni incidunt fugiat nisi sed
              vero, iusto blanditiis praesentium. Veritatis itaque unde minus nesciunt distinctio
              illum commodi soluta rem eius eligendi. Vero voluptas, ipsam sunt sed eos maiores odio
              dolore accusamus fugit officia porro, omnis quisquam! Non debitis dicta soluta.
            </p>
          </div>
          <div
            className='col-span-2 h-96 md:h-96 rounded-3xl'
            style={{
              background: `url(${members[0].image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>
        <div className='w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {members.slice(1).map(({ _id, firstName, lastName, role, image }) => (
            <MemberCard
              key={_id}
              role={role}
              firstName={firstName}
              lastName={lastName}
              image={image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/members', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: members } = await response.json()

  return {
    props: {
      members
    }
  }
}

export default About
