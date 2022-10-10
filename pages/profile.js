import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(2, 'Longitud insuficiente'),
    lastName: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(2, 'Longitud insuficiente'),
    email: yup.string('Formato inválido').email('Email inválido').required('Campo obligatorio'),
    city: yup.string('Formato inválido').required('Campo obligatorio'),
    state: yup.string('Formato inválido').required('Campo obligatorio'),
    zip: yup.string('Formato inválido').required('Campo obligatorio')
  })
  .required()

const Profile = () => {
  let userObject
  const router = useRouter()
  const { user, dispatch } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const parseJwt = token => {
    if (!token) return
    return JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString())
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, touchedFields },
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!user) router.push('/login')
  }, [router, user])

  useEffect(() => {
    console.log(touchedFields)
    console.log(isDirty)
  }, [touchedFields, isDirty])

  useEffect(() => {
    userObject = parseJwt(user)

    reset({
      _id: userObject?._id || '',
      firstName: userObject?.firstName || '',
      lastName: userObject?.lastName || '',
      email: userObject?.email || '',
      city: userObject?.city || '',
      state: userObject?.state || '',
      zip: userObject?.zip || ''
    })
  }, [user, reset])

  const onSubmit = async data => {
    setLoading(true)

    const response = await fetch(`/api/users/${parseJwt(user)._id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const { success, data: token = '' } = await response.json()

    if (success) {
      localStorage.setItem('user', JSON.stringify(token))
      dispatch({ type: 'LOGIN', payload: token })
      router.replace('/')
    } else {
      toast.error('Credenciales inválidas')
    }

    setLoading(false)
    reset()
  }

  const handleDelete = async () => {
    setLoadingDelete(true)

    const response = await fetch(`/api/users/${parseJwt(user)._id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(response)
    if (response.ok) {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      router.replace('/')
    } else {
      toast.error('Credenciales inválidas')
    }

    setLoading(false)
    reset()
  }

  return (
    <>
      <div className='relative p-4 w-full max-w-2xl h-full md:h-auto my-6'>
        {/* Modal Content */}
        <form className='relative bg-white rounded-lg shadow' onSubmit={handleSubmit(onSubmit)}>
          {/* Modal Header */}
          <div className='flex justify-between items-start p-4 rounded-t border-b'>
            <h3 className='text-xl font-semibold text-gray-900'>Mi Perfil</h3>
          </div>
          {/* Modal Body */}
          <div className='p-6 space-y-6'>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='first' className='block mb-2 text-sm font-medium text-gray-900'>
                  Nombre
                </label>
                <input
                  type='text'
                  name='first'
                  id='first'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.firstName?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('firstName')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.firstName?.message}</p>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='last' className='block mb-2 text-sm font-medium text-gray-900'>
                  Apellido
                </label>
                <input
                  type='text'
                  name='last'
                  id='last'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.lastName?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('lastName')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.lastName?.message}</p>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                  Email
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.email?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('email')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.email?.message}</p>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='city' className='block mb-2 text-sm font-medium text-gray-900'>
                  Ciudad
                </label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.city?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('city')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.city?.message}</p>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='zip' className='block mb-2 text-sm font-medium text-gray-900'>
                  Código Postal
                </label>
                <input
                  type='text'
                  name='zip'
                  id='zip'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.zip?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('zip')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.zip?.message}</p>
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='state' className='block mb-2 text-sm font-medium text-gray-900'>
                  Provincia
                </label>
                <input
                  type='text'
                  name='state'
                  id='state'
                  className={`shadow-sm bg-gray-50 border ${
                    errors.state?.message ? 'border-red-600' : 'border-gray-300'
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  {...register('state')}
                />
                <p className='text-red-500 text-sm mt-1'>{errors.state?.message}</p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className='flex items-center justify-between p-6 space-x-2 rounded-b border-t border-gray-200'>
            <button
              onClick={handleDelete}
              type='button'
              className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150'
            >
              {loadingDelete && (
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              )}
              Eliminar Cuenta
            </button>
            <button
              type='submit'
              className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150'
              disabled={!isDirty ? true : false}
            >
              {loading && (
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              )}
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Profile
