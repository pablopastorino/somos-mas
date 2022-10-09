import Link from 'next/link'

export default function Help() {
  return (
    <div
      className='w-full h-screen flex flex-col justify-center pl-8'
      style={{
        background:
          'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <h2 className='text-4xl font-bold text-white'>¡Cambiá su mundo!</h2>
      <p className='text-2xl font-bold text-white py-4'>
        Podés cambiar el futuro de una niña o niño hoy
      </p>
      <div className='flex items-center'>
        <Link href={'/contact'} as={'/contacto'}>
          <a
            className='shadow focus:shadow-outline focus:outline-none font-medium py-2 px-4 rounded-full bg-red-600 text-white hover:bg-red-500'
            type='submit'
          >
            Contacto
          </a>
        </Link>
      </div>
    </div>
  )
}
