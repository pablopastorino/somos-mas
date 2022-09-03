import React from 'react'
import Logo from './common/logo'
import Navbar from './common/navbar'
import SocialIcons from './footer/socialIcons'

const Footer = () => {
	return (
		<footer className='flex flex-col justify-between bg-zinc-400'>
			<div className='h-16 border-b-4 border-black flex justify-center items-center'>
				<div className='relative top-1/2 bg-zinc-400 px-10'>
					<Logo />
				</div>
			</div>
			<div className='sm:h-36 flex items-center justify-center border-b-4 border-black'>
				<Navbar hidden={false} buttons={false} center={true} />
			</div>

			<div>
				<div className='h-28'>
					<SocialIcons />
				</div>
				<div className='h-32 text-lg text-center'>
					{new Date().getFullYear()} by Alkemy. All rights reserved.
				</div>
			</div>
		</footer>
	)
}

export default Footer
