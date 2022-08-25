import Link from 'next/link'

const Navbar = () => {
	return (
		<nav>
			<ul className='flex justify-between'>
				<li>
					<Link href={'/'}>
						<a>Inicio</a>
					</Link>
				</li>
				<li>
					<Link href={'/about'}>
						<a>Nosotros</a>
					</Link>
				</li>
				<li>
					<Link href={'/news'}>
						<a>Novedades</a>
					</Link>
				</li>
				<li>
					<Link href={'/testimonials'}>
						<a>Testimonios</a>
					</Link>
				</li>
				<li>
					<Link href={'/contact'}>
						<a>Contacto</a>
					</Link>
				</li>
				<li>
					<Link href={'/help'}>
						<a>Contribuye</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
