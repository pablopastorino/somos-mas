import { IconContext } from 'react-icons'
import { FiFacebook } from 'react-icons/fi'
import { GrInstagram } from 'react-icons/gr'
import { FaLinkedinIn } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import SocialIcon from './socialIcon'

const SocialIcons = () => {
	return (
		<div className='flex w-full justify-center h-24 items-end'>
			<IconContext.Provider value={{ color: 'white', className: 'hover:text-yellow-500' }}>
				<SocialIcon>
					<GrInstagram />
				</SocialIcon>
				<SocialIcon>
					<FiFacebook />
				</SocialIcon>
				<SocialIcon>
					<BsTwitter />
				</SocialIcon>
				<SocialIcon>
					<FaLinkedinIn />
				</SocialIcon>
			</IconContext.Provider>
		</div>
	)
}

export default SocialIcons
