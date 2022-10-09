import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import NewsModal from '../../components/backoffice/NewsModal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const News = ({ news }) => {
  const [modal, setModal] = useState(false)
  const [values, setValues] = useState({})
  const router = useRouter()

  const handleDelete = async id => {
    const response = await fetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      toast.success('Elemento eliminado'),
        {
          onClose: router.push('/backoffice/news', '/backoffice/novedades')
        }
    } else toast.error('Error: elemento no eliminado')
  }

  const handleUpdate = async id => {
    const selectedNew = news.filter(n => n._id === id).pop()
    setValues(selectedNew)
    console.log(selectedNew.name)
    setModal(true)
  }

  return (
    <>
      <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-gray-900'>
          <caption className='p-5 text-lg font-semibold text-left text-gray-900 relative'>
            <div>
              <span className='text-2xl'>Novedades</span>
              <p className='mt-1 text-sm font-normal text-gray-500'>
                Creá, edita o eliminá las novedades de la organización.
              </p>
            </div>
            <span
              onClick={() => setModal(true)}
              className='button ml-auto absolute right-6 top-6 rounded bg-blue-500 px-4 py-2 cursor-pointer hover:bg-blue-700 text-white'
            >
              Agregar
            </span>
          </caption>
          <thead className='text-gray-900 bg-gray-200'>
            <tr>
              <th scope='col' className='p-4'>
                N°
              </th>
              <th scope='col' className='py-3 px-6'>
                Imagen
              </th>
              <th scope='col' className='py-3 px-6'>
                Título
              </th>
              <th scope='col' className='py-3 px-6'>
                Descripción
              </th>
              <th scope='col' className='py-3 px-6'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {news.map((item, index) => (
              <tr className='border-b hover:bg-gray-50 max-h-10' key={index}>
                <td className='py-4 px-6'>{index + 1}</td>
                <td className='relative'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={512}
                    height={512}
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </td>
                <td className='py-4 px-6'>{item.name}</td>
                <td className='py-4 px-6'>{item.content}</td>

                <td className='flex items-center py-4 px-6 space-x-3'>
                  <button
                    className='text-xl hover:text-blue-600 border-2 p-2 rounded border-gray-300'
                    onClick={() => handleUpdate(item._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='text-xl hover:text-red-600 border-2 p-2 rounded border-gray-300'
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewsModal hidden={!modal} setModal={setModal} values={values} setValues={setValues} />
      <ToastContainer
        theme='light'
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default News

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/news', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: news } = await response.json()

  return {
    props: {
      news
    }
  }
}
