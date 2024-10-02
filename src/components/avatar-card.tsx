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
		<div className='relative inline-block'>
			<Link href={`https://webxr.myriadflow.com/${phygitalId}`} target='_blank'>
				<div className='w-330 rounded-full shadow-md overflow-hidden cursor-pointer relative'>
					<div className='absolute top-0 left-0 right-0 bottom-0 rounded-full bg-white opacity-30 pointer-events-none z-1' />
					<div className='relative z-2'>
						<Avatar modelSrc={url} cameraInitialDistance={0.5} />
					</div>
				</div>
			</Link>
		</div>
	)
}

export default AvatarCard
