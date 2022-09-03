export default function MenuButton({onClick}) {
	return (
		<div className='block lg:hidden'>
			<button
				className='flex items-center p-3 border rounded shadow-sm'
				onClick={onClick}
			>
				<svg
					className='fill-current h-5 w-5'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>Menu</title>
					<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
				</svg>
			</button>
		</div>
	)
}
