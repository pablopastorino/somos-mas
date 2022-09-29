import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='min-h-max flex items-center justify-center'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
