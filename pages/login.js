import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object()
  .shape({
    email: yup.string('Formato inválido').email('Email inválido').required('Campo obligatorio'),
    password: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(6, 'Longitud insuficiente')
  })
  .required()

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async data => {
    const response = await fetch('/api/users', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const user = await response.json()
    console.log(user)
    reset()
  }

  return (
    <div className='grid grid-cols-2 w-full h-fit'>
      <form
        className='col-span-2 md:col-span-1 w-full mx-2 flex flex-col justify-center items-center md:min-h-screen py-16 md:py-0'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3 mb-6'>
            <h2 className='text-4xl font-medium text-gray-900 text-center'>
              ¡Iniciá sesión en tu cuenta!
            </h2>
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
              htmlFor='grid-password'
            >
              Contraseña
            </label>
            <input
              className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-password'
              type='password'
              {...register('password')}
            />
            <p className='text-red-500 text-sm'>{errors.password?.message}</p>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-medium py-2 px-4 rounded-full'
            type='submit'
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className='hidden md:block sm:col-span-1'>
        <div
          style={{
            background: `url(${'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
          className='w-full h-full bg-no-repeat bg-center filter'
        ></div>
      </div>
    </div>
  )
}
