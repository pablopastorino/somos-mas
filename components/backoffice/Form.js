import React, { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = yup
  .object()
  .shape({
    name: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(2, 'Longitud insuficiente'),
    image: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(6, 'Longitud insuficiente'),
    content: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(10, 'Longitud insuficiente')
  })
  .required()

const NewsModal = ({ hidden, setModal }) => {
  const { user, dispatch } = useContext(AuthContext)
  const router = useRouter()

  const parseJwt = token => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }

  useLayoutEffect(() => {
    if (user && parseJwt(user).role !== 'admin') router.push('/')
  }, [router, user])

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const response = await fetch('/api/auth', {
      method: 'POST',
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
          <form action='#' className='relative bg-white rounded-lg shadow'>
            {/* Modal Header */}
            <div className='flex justify-between items-start p-4 rounded-t border-b'>
              <h3 className='text-xl font-semibold text-gray-900'>Edit user</h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white'
                data-modal-toggle='editUserModal'
                onClick={() => setModal(false)}
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
                  <label
                    htmlhtmlFor='first-name'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='Bonnie'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='last-name'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='Green'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='example@company.com'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='phone-number'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Phone Number
                  </label>
                  <input
                    type='number'
                    name='phone-number'
                    id='phone-number'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='e.g. +(12)3456 789'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='department'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Department
                  </label>
                  <input
                    type='text'
                    name='department'
                    id='department'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='Development'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Company
                  </label>
                  <input
                    type='number'
                    name='company'
                    id='company'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='123456'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='current-password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Current Password
                  </label>
                  <input
                    type='password'
                    name='current-password'
                    id='current-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='••••••••'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlhtmlFor='new-password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='new-password'
                    id='new-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                    placeholder='••••••••'
                    required=''
                  />
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className='flex items-center p-6 space-x-2 rounded-b border-t border-gray-200'>
              <button
                type='submit'
                className='text-white bg-indigo-400 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewsModal
