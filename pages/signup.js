import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
    password: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .min(6, 'Longitud insuficiente'),
    confirmPassword: yup
      .string('Formato inválido')
      .required('Campo obligatorio')
      .oneOf([yup.ref('password'), null], 'No coinciden'),
    city: yup.string('Formato inválido').required('Campo obligatorio'),
    state: yup.string('Formato inválido').required('Campo obligatorio'),
    zip: yup.string('Formato inválido').required('Campo obligatorio'),
    terms: yup.bool().oneOf([true], 'Debes aceptar para completar el registro')
  })
  .required()

export default function Signup() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => {
    console.log(data)
    reset()
  }

  return (
    <form className='w-full max-w-lg my-8 mx-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3 mb-6'>
          <h2 className='text-4xl font-medium text-gray-900 text-center'>¡Creá tu cuenta!</h2>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-first-name'
          >
            Nombre
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-first-name'
            type='text'
            {...register('firstName')}
          />
          <p className='text-red-500 text-sm'>{errors.firstName?.message}</p>
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-last-name'
          >
            Apellido
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3  leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-last-name'
            type='text'
            {...register('lastName')}
          />
          <p className='text-red-500 text-sm'>{errors.lastName?.message}</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
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

      <div className='flex flex-wrap -mx-3 md:mb-6'>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-city'
          >
            Ciudad
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-city'
            type='text'
            {...register('city')}
          />
          <p className='text-red-500 text-sm'>{errors.city?.message}</p>
        </div>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-state'
          >
            Estado
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-state'
            type='text'
            {...register('state')}
          />
          <p className='text-red-500 text-sm'>{errors.state?.message}</p>
        </div>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-zip'
          >
            Código Postal
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-zip'
            type='text'
            {...register('zip')}
          />
          <p className='text-red-500 text-sm'>{errors.zip?.message}</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
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
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-confirm'
          >
            Confirmar Contraseña
          </label>
          <input
            className='appearance-none block w-full  text-gray-900 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-confirm'
            type='password'
            {...register('confirmPassword')}
          />
          <p className='text-red-500 text-sm'>{errors.confirmPassword?.message}</p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <input
            className='text-gray-900 border border-gray-200 px-4 mr-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='grid-terms'
            type='checkbox'
            {...register('terms')}
          />
          <label
            className='uppercase tracking-wide text-gray-900 text-sm font-bold mb-2'
            htmlFor='grid-terms'
          >
            Aceptar Términos y Condiciones
          </label>
          <p className='text-red-500 text-sm'>{errors.terms?.message}</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <button
          className='shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full'
          type='submit'
        >
          Registrarse
        </button>
      </div>
    </form>
  )
}
