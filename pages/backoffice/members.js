import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import MembersModal from '../../components/backoffice/MembersModal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Members = ({ members }) => {
  const [modal, setModal] = useState(false)
  const [values, setValues] = useState({})
  const router = useRouter()

  const handleDelete = async id => {
    const response = await fetch(`/api/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      toast.success('Elemento eliminado'),
        {
          onClose: router.push('/backoffice/members', '/backoffice/miembros')
        }
    } else toast.error('Error: elemento no eliminado')
  }

  const handleUpdate = async id => {
    const selectedMember = members.filter(member => member._id === id).pop()
    setValues(selectedMember)
    setModal(true)
  }

  return (
    <>
      <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-gray-900'>
          <caption className='p-5 text-lg font-semibold text-left text-gray-900 relative'>
            <div>
              <span className='text-2xl'>Miembros</span>
              <p className='mt-1 text-sm font-normal text-gray-500'>
                Creá, edita o eliminá los miembros de la organización.
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
                Nombre
              </th>
              <th scope='col' className='py-3 px-6'>
                Apellido
              </th>
              <th scope='col' className='py-3 px-6'>
                Rol
              </th>
              <th scope='col' className='py-3 px-6'>
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => (
              <tr className='border-b hover:bg-gray-50 max-h-10' key={index}>
                <td className='py-4 px-6'>{index + 1}</td>
                <td className='relative'>
                  <Image
                    src={item.image}
                    alt={item.firstName}
                    width={64}
                    height={64}
                    objectFit='cover'
                    className='rounded-2xl'
                  />
                </td>
                <td className='py-4 px-6'>{item.firstName}</td>
                <td className='py-4 px-6'>{item.lastName}</td>
                <td className='py-4 px-6'>{item.role}</td>
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
      <MembersModal hidden={!modal} setModal={setModal} values={values} setValues={setValues} />
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

export default Members

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/members', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: members } = await response.json()

  return {
    props: {
      members
    }
  }
}
