import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
		<div className='bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center w-full'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-2 sm:mb-4'
				/>
				<h3 className='font-semibold text-sm sm:text-lg text-center line-clamp-2'>{user.name}</h3>
			</Link>
			<p className='text-gray-600 text-xs sm:text-sm text-center line-clamp-2'>{user.headline}</p>
			<p className='text-xs text-gray-500 mt-1 sm:mt-2'>{user.connections?.length} connections</p>
			<button className='mt-2 sm:mt-4 bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition-colors w-full text-xs sm:text-sm'>
			{isConnection ? 'Connected' : 'Connect'}
		</button>
	</div>
	);
}

export default UserCard;