import { Link } from "react-router-dom";
import { Home, UserPlus, Bell } from "lucide-react";

export default function Sidebar({ user }) {
	return (
		<div className='bg-secondary rounded-lg shadow'>
			<div className='p-3 sm:p-4 text-center'>
				<div
					className='h-12 sm:h-16 rounded-t-lg bg-cover bg-center'
					style={{
						backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
					}}
				/>
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || "/avatar.png"}
						alt={user.name}
						className='w-16 sm:w-20 h-16 sm:h-20 rounded-full mx-auto mt-[-32px] sm:mt-[-40px] border-4 border-secondary'
					/>
					<h2 className='text-base sm:text-xl font-semibold mt-2'>{user.name}</h2>
				</Link>
				<p className='text-info text-xs sm:text-sm line-clamp-2'>{user.headline}</p>
				<p className='text-info text-xs mt-1'>{user.connections.length} connections</p>
			</div>
			<div className='border-t border-base-100 p-3 sm:p-4'>
				<nav>
					<ul className='space-y-1 sm:space-y-2'>
						<li>
							<Link
								to='/'
								className='flex items-center py-2 px-3 rounded-md hover:bg-primary hover:text-white transition-colors text-sm sm:text-base'
							>
								<Home className='mr-2 flex-shrink-0' size={18} /> Home
							</Link>
						</li>
						<li>
							<Link
								to='/network'
								className='flex items-center py-2 px-3 rounded-md hover:bg-primary hover:text-white transition-colors text-sm sm:text-base'
							>
								<UserPlus className='mr-2 flex-shrink-0' size={18} /> My Network
							</Link>
						</li>
						<li>
							<Link
								to='/notifications'
								className='flex items-center py-2 px-3 rounded-md hover:bg-primary hover:text-white transition-colors text-sm sm:text-base'
							>
								<Bell className='mr-2 flex-shrink-0' size={18} /> Notifications
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className='border-t border-base-100 p-3 sm:p-4'>
				<Link to={`/profile/${user.username}`} className='text-xs sm:text-sm font-semibold hover:text-primary transition'>
					Visit your profile
				</Link>
			</div>
		</div>
	);
}

