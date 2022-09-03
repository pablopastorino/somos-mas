import Footer from './footer'
import Navbar from './header'

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className='flex-1'>{children}</main>
			<Footer />
		</>
	)
}

export default Layout
