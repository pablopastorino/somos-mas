import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

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
  const { user, dispatch } = useContext(AuthContext)

  const parseJwt = token => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('user')
    router.replace('/')
  }

  return (
    <nav
      className={`z-10 flex flex-col lg:flex-row items-center h-12 bg-white lg:static transition-all ${
        !center ? 'lg: ml-auto' : ''
      } bg-inherit ${hidden ? 'hidden' : 'absolute top-24 left-0 w-full lg:w-auto'} lg:visible`}
    >
      <ul className='flex flex-col lg:flex-row justify-between w-full items-center lg:items-baseline lg:w-auto bg-white rounded-b-lg'>
        {navLinks.map(link => (
          <li
            key={link.title}
            className='mx-4 h-12 w-full lg:h-auto flex items-center justify-center hover:bg-yellow-300 lg:hover:bg-white hover:text-2xl lg:hover:text-base lg:hover:border-b-4 lg:hover:border-red-600 transition-all'
          >
            <Link href={link.path} as={`/${link.title.toLowerCase()}`}>
              <a
                className={`w-full h-full flex items-center justify-center ${
                  router.pathname === link.path ? 'font-bold' : ''
                }`}
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
        {buttons && (
          <>
            {user && parseJwt(user).role === 'admin' && (
              <li className='mx-4 h-12 w-full lg:h-auto flex items-center justify-center hover:bg-yellow-300 lg:hover:bg-white hover:text-2xl lg:hover:text-base lg:hover:border-b-4 lg:hover:border-red-600 transition-all'>
                <Link href='/backoffice'>
                  <a
                    className={`w-full h-full flex items-center justify-center ${
                      router.pathname === '/backoffice' ? 'font-bold' : ''
                    }`}
                  >
                    Backoffice
                  </a>
                </Link>
              </li>
            )}
            <li className='h-12 w-full lg:h-auto flex items-center'>
              {user ? (
                <Link href='profile' as='perfil'>
                  <a className='w-full h-full flex items-center justify-center mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 lg:border hover:bg-yellow-300 lg:hover:bg-white lg:hover:text-indigo-400 hover:text-2xl lg:hover:text-base transition-all lg:bg-indigo-400 lg:text-white lg:font-semibold lg:whitespace-nowrap'>
                    {parseJwt(user).firstName}
                  </a>
                </Link>
              ) : (
                <Link href='login'>
                  <a className='w-full h-full flex items-center justify-center mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 lg:border hover:bg-yellow-300 lg:hover:bg-white hover:text-2xl lg:hover:text-base transition-all lg:border-black lg:whitespace-nowrap'>
                    Log in
                  </a>
                </Link>
              )}
            </li>
            <li className='h-12 w-full lg:h-auto flex items-center'>
              {user ? (
                <button
                  onClick={handleLogout}
                  className='w-full h-full flex items-center justify-center mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 hover:bg-yellow-300 hover:text-2xl lg:hover:text-base transition-all lg:bg-red-600 lg:hover:bg-red-500 lg:text-white rounded-b-lg'
                >
                  Salir
                </button>
              ) : (
                <Link href='signup' as='registrate'>
                  <a className='w-full h-full flex items-center justify-center mx-4 lg:rounded-full lg:mx-2 lg:px-4 lg:py-2 hover:bg-yellow-300 hover:text-2xl lg:hover:text-base transition-all lg:bg-red-600 lg:hover:bg-red-500 lg:text-white rounded-b-lg'>
                    Registrate
                  </a>
                </Link>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
