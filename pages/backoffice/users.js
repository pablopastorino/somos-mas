import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FaTrashAlt } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import UsersModal from '../../components/backoffice/UsersModal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Users = ({ users }) => {
  const [modal, setModal] = useState(false)
  const [values, setValues] = useState({})
  const router = useRouter()

  const handleDelete = async id => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      toast.success('Elemento eliminado'),
        {
          onClose: router.push('/backoffice/users', '/backoffice/usuarios')
        }
    } else toast.error('Error: elemento no eliminado')
  }

  const handleUpdate = async id => {
    const selectedUser = users.filter(user => user._id === id).pop()
    setValues(selectedUser)
    setModal(true)
  }

  return (
    <>
      <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-gray-900'>
          <caption className='p-5 text-lg font-semibold text-left text-gray-900 relative'>
            <div>
              <span className='text-2xl'>Usuarios</span>
              <p className='mt-1 text-sm font-normal text-gray-500'>
                Creá, edita o eliminá las usuarios de la organización.
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
                Nombre
              </th>
              <th scope='col' className='py-3 px-6'>
                Apellido
              </th>
              <th scope='col' className='py-3 px-6'>
                Email
              </th>
              <th scope='col' className='py-3 px-6'>
                Ciudad
              </th>
              <th scope='col' className='py-3 px-6'>
                Provincia
              </th>
              <th scope='col' className='py-3 px-6'>
                Código Postal
              </th>
              <th scope='col' className='py-3 px-6'>
                Rol
              </th>
              <th scope='col' className='py-3 px-6'>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr className='border-b hover:bg-gray-50 max-h-10' key={index}>
                <td className='py-4 px-6'>{index + 1}</td>
                <td className='py-4 px-6'>{item.firstName}</td>
                <td className='py-4 px-6'>{item.lastName}</td>
                <td className='py-4 px-6'>{item.email}</td>
                <td className='py-4 px-6'>{item.city}</td>
                <td className='py-4 px-6'>{item.state}</td>
                <td className='py-4 px-6'>{item.zip}</td>
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
      <UsersModal hidden={!modal} setModal={setModal} values={values} setValues={setValues} />
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

export default Users

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

  const { data: users } = await response.json()

  return {
    props: {
      users
    }
  }
}
