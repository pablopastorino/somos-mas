import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { BsNewspaper, BsPeopleFill, BsDiagram3 } from 'react-icons/bs'
import { FaPeopleCarry } from 'react-icons/fa'
import { GiTalk } from 'react-icons/gi'
import { GoChecklist } from 'react-icons/go'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { TbSlideshow } from 'react-icons/tb'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  const parseJwt = token => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }

  useEffect(() => {
    if (user && parseJwt(user).role !== 'admin') router.push('/')
  }, [router, user])

  return (
    user && (
      <div className='grid grid-cols-2 sm:grid-cols-4 w-full py-4 sm:py-0'>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Novedades</h2>
          <BsNewspaper style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/news'} as={'/backoffice/novedades'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Actividades</h2>
          <HiOutlineClipboardList style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/activities'} as={'/backoffice/actividades'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Categorias</h2>
          <GoChecklist style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/categories'} as={'/backoffice/categorias'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Testimonios</h2>
          <GiTalk style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/testimonials'} as={'/backoffice/testimonios'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Organización</h2>
          <BsDiagram3 style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/organization'} as={'/backoffice/organizacion'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Slides</h2>
          <TbSlideshow style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/slides'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Usuarios</h2>
          <FaPeopleCarry style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/users'} as={'/backoffice/usuarios'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
        <div className='h-40 sm:h-60 md:h-80 col-span-1 flex flex-col items-center justify-center'>
          <h2 className='text-lg font-semibold text-indigo-500'>Miembros</h2>
          <BsPeopleFill style={{ width: '60%', height: '40%', color: '#9AC9FB' }} />
          <Link href={'/backoffice/members'} as={'/backoffice/miembros'}>
            <a className='button bg-indigo-500 hover:bg-indigo-300 text-white px-2 py-1 sm:px-4 sm:py-2 rounded my-2'>
              Ver más
            </a>
          </Link>
        </div>
      </div>
    )
  )
}
