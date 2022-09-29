import React from 'react'
import Logo from './common/logo'
import Navbar from './common/navbar'
import SocialIcons from './footer/socialIcons'

const Footer = () => {
  return (
    <footer className='flex flex-col justify-between bg-zinc-400'>
      <div className='h-14 border-b-4 border-black flex justify-center items-center'>
        <div className='relative top-1/2 bg-zinc-400 px-10'>
          <Logo />
        </div>
      </div>
      <div className='sm:h-36 flex items-center justify-center md:border-b-4 border-black'>
        <Navbar hidden={false} buttons={false} center={true} />
      </div>

      <div>
        <div className='h-32 sm:h-28 flex items-center sm:items-start'>
          <SocialIcons />
        </div>
        <div className='h-20 text-lg text-center flex items-center justify-center'>
          <span className='font-bold block sm:inline-block'>
            {new Date().getFullYear()} by Alkemy.{' '}
          </span>
          <span className='block sm:inline-block'>All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
