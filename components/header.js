import { useEffect, useState } from 'react'
import Logo from './common/logo'
import MenuButton from './header/menuButton'
import Navbar from './common/navbar'
import useWindowSize from '../hooks/useWindowSize'

export default function Header() {
  const [hidden, setHidden] = useState(true)
  const windowSize = useWindowSize()

  useEffect(() => {
    setHidden(true)
  }, [windowSize])

  return (
    <header className='flex items-center justify-between px-4 pl-6 w-full shadow-lg bg-white'>
      <Logo />
      <MenuButton onClick={() => setHidden(!hidden)} />
      <Navbar hidden={windowSize.width < 1024 && hidden} />
    </header>
  )
}
