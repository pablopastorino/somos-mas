import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { uploadFile } from '../../utils/S3'

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
    role: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(2, 'Longitud insuficiente'),
    image: yup
      .mixed()
      .nullable()
      .required('Campo obligatorio')
      .test(
        'Fichier taille',
        'Tamaño no soportado',
        value => value || (value && value.size >= 1024 * 1024)
      )
      .test(
        'format',
        'Formato no soportado',
        value =>
          value ||
          (value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type))
      )
  })
  .required()

const MembersModal = ({ hidden, setModal, values, setValues }) => {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const parseJwt = token => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
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
    if (user && parseJwt(user).role !== 'admin') router.push('/')
  }, [router, user])

  useEffect(() => {
    console.log(touchedFields)
    console.log(isDirty)
  }, [touchedFields, isDirty])

  useEffect(() => {
    reset({
      firstName: values.firstName || '',
      lastName: values.lastName || '',
      image: values.image || '',
      role: values.role || ''
    })
  }, [reset, values])

  const handleClose = () => {
    setValues({})
    setModal(false)
  }

  const onSubmit = async data => {
    setLoading(true)

    const isUpdate = !!Object.keys(values).length
    const uploadedImage = typeof data.image === 'object'

    if (uploadedImage) {
      const file = data.image[0]
      const { Location } = await uploadFile(file)

      data.image = Location
    }

    const response = await fetch(`/api/members/${isUpdate ? values._id : ''}`, {
      method: isUpdate ? 'PUT' : 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const { success } = await response.json()
    if (success) {
      setModal(false)
      router.push('/backoffice/members', '/backoffice/miembros')
    } else {
      toast.error('Credenciales inválidas')
    }

    setLoading(false)
    reset()
  }

  return (
    <>
      <div
        className={`top-0 left-0 fixed w-screen h-screen z-10 bg-white opacity-80 ${
          hidden ? 'hidden' : ''
        }`}
      ></div>
      <div
        id='defaultModal'
        tabIndex='-1'
        aria-hidden='true'
        className={`${
          hidden ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center`}
      >
        <div className='relative p-4 w-full max-w-2xl h-full md:h-auto'>
          {/* Modal Content */}
          <form className='relative bg-white rounded-lg shadow' onSubmit={handleSubmit(onSubmit)}>
            {/* Modal Header */}
            <div className='flex justify-between items-start p-4 rounded-t border-b'>
              <h3 className='text-xl font-semibold text-gray-900'>Novedad</h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white'
                data-modal-toggle='editUserModal'
                onClick={() => handleClose()}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
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
                    name='firstName'
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
                    name='lastName'
                    id='last'
                    className={`shadow-sm bg-gray-50 border ${
                      errors.lastName?.message ? 'border-red-600' : 'border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                    {...register('lastName')}
                  />
                  <p className='text-red-500 text-sm mt-1'>{errors.lastName?.message}</p>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='role' className='block mb-2 text-sm font-medium text-gray-900'>
                    Rol
                  </label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    className={`shadow-sm bg-gray-50 border ${
                      errors.role?.message ? 'border-red-600' : 'border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                    {...register('role')}
                  />
                  <p className='text-red-500 text-sm mt-1'>{errors.role?.message}</p>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='image' className='block mb-2 text-sm font-medium text-gray-900'>
                    Imagen
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    className={`appearance-none shadow-sm bg-gray-50 border ${
                      errors.image?.message ? 'border-red-600' : 'border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full text-base p-2 bg-gray-50 border border-gray-300 cursor-pointer focus:outline-none`}
                    {...register('image')}
                  />
                  <p className='text-red-500 text-sm mt-1'>{errors.image?.message}</p>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className='flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200'>
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
      </div>
    </>
  )
}

export default MembersModal
