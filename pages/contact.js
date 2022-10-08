import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object()
  .shape({
    email: yup.string('Formato inválido').email('Email inválido').required('Campo obligatorio'),
    name: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(6, 'Longitud insuficiente'),
    message: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(50, 'Longitud insuficiente')
  })
  .required()

export default function Contact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async data => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const contact = await response.json()

    reset()
  }

  return (
    <form className='w-full max-w-lg my-8 mx-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>
            ¡Contactate con nosotros!
          </h2>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block tracking-wide text-gray-900 text-sm font-medium mb-2'
            htmlFor='grid-name'
          >
            Nombre y Apellido
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-name'
            type='name'
            {...register('name')}
          />
          <p className='text-red-500 text-sm'>{errors.name?.message}</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block tracking-wide text-gray-900 text-sm font-medium mb-2'
            htmlFor='grid-email'
          >
            Email
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-email'
            type='text'
            {...register('email')}
          />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block tracking-wide text-gray-900 text-sm font-medium mb-2'
            htmlFor='grid-message'
          >
            Mensaje
          </label>
          <textarea
            rows={5}
            className='resize-y block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-message'
            {...register('message')}
          />
          <p className='text-red-500 text-sm'>{errors.message?.message}</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-medium py-2 px-4 rounded-full'
          type='submit'
        >
          Enviar Consulta
        </button>
      </div>
      <div className='flex items-center'>
        <button
          className='shadow focus:shadow-outline focus:outline-none font-medium py-2 px-4 rounded-full'
          type='submit'
        >
          Ir al inicio
        </button>
      </div>
    </form>
  )
}
