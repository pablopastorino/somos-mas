export default function MemberCard({ image, firstName, lastName, role }) {
  return (
    <div
      style={{
        background: `url(${image})`,
        backgroundSize: 'cover'
      }}
      className='col-span-1 h-44 bg-no-repeat bg-center rounded-xl flex flex-col items-center justify-end filter'
    >
      <h3 className='text-white text-lg font-semibold text-center'>{`${firstName} ${lastName}`}</h3>
      <p className='text-white text-base text-center'>{role}</p>
    </div>
  )
}
