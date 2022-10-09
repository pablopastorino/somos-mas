import React from 'react'
import Logo from './common/logo'
import Navbar from './common/navbar'
import SocialIcons from './footer/socialIcons'
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

const Footer = () => {
  const router = useRouter()

  return (
    <footer className='flex flex-col justify-between bg-slate-200'>
      <div className='h-14 border-b-4 border-black flex justify-center items-center'>
        <div className='relative top-1/2 px-10 bg-slate-200'>
          <Logo />
        </div>
      </div>
      <div className='hidden sm:flex sm:h-36 items-center justify-center sm:border-b-4 sm:pt-5 border-black'>
        <ul className='flex justify-center w-full items-center'>
          {navLinks.map(link => (
            <li key={link.title} className='mx-4 h-12'>
              <Link href={link.path} as={`/${link.title.toLowerCase()}`}>
                <a className={router.pathname === link.path ? 'font-bold' : ''}>{link.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className='h-32 sm:h-28 flex items-center sm:items-start'>
          <SocialIcons />
        </div>
        <div className='h-20 text-lg text-center flex items-center justify-center'>
          <span className='font-bold block sm:inline-block'>
            {new Date().getFullYear()} by Alkemy.
          </span>
          <span className='block sm:inline-block ml-1'>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
