import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href={'/'}>
      <a className='w-24 mr-auto flex-shrink-0 flex'>
        <Image src={'/logo.svg'} width='100%' height='100%' alt='Logo Somos Más' />
      </a>
    </Link>
  )
}
