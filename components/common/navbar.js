import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = [
  { title: 'Inicio', path: '/' },
  { title: 'Nosotros', path: '/about' },
  { title: 'Novedades', path: '/news' },
  { title: 'Testimonios', path: '/testimonials' },
  { title: 'Contacto', path: '/contact' },
  { title: 'Contribuye', path: '/help' }
]

const Navbar = ({ hidden = true, buttons = true, center = false }) => {
  const router = useRouter()

  return (
    <nav
      className={`flex flex-col lg:flex-row items-center h-12 bg-white lg:static ${
        !center ? 'lg: ml-auto' : ''
      } bg-inherit ${hidden ? 'hidden' : 'absolute top-24 left-0 w-full lg:w-auto'} lg:visible`}
    >
      <ul className='flex flex-col lg:flex-row justify-between w-full items-center lg:items-baseline lg:w-auto'>
        {navLinks.map(link => (
          <li key={link.title} className='mx-4 h-12 lg:h-auto'>
            <Link href={link.path} as={link.title.toLowerCase()}>
              <a className={router.pathname === link.path ? 'font-bold' : ''}>{link.title}</a>
            </Link>
          </li>
        ))}
        {buttons && (
          <>
            <li className='h-12 lg:h-auto'>
              <Link href='login'>
                <a className='mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 lg:border lg:border-black lg:whitespace-nowrap'>
                  Log in
                </a>
              </Link>
            </li>
            <li className='h-12 lg:h-auto'>
              <Link href='signup' as='registrate'>
                <a className='mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 lg:bg-red-600 hover:bg-red-500 lg:text-white'>
                  Registrate
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
