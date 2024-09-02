import Link from 'next/link'
import { Avatar } from '@readyplayerme/visage'
import { AvatarType } from '@/types/types'

const AvatarCard = ({
	phygitalId,
	url,
}: {
	phygitalId: string
	url: string
}) => {
	return (
		<>
			<Link href={`https://webxr.myriadflow.com/${phygitalId}`}>
				<div className=' rounded-md shadow-md bg-white overflow-hidden cursor-pointer relative'>
					<Avatar
						modelSrc={url}
						cameraInitialDistance={0.5}
						className='bg-white'
					/>
				</div>
			</Link>
		</>
	)
}

export default AvatarCard
