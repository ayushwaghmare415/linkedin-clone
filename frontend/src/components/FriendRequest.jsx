import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	const { mutate: rejectConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	return (
		<div className='bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all hover:shadow-md'>
			<div className='flex items-center gap-2 sm:gap-4 min-w-0'>
				<Link to={`/profile/${request.sender.username}`}>
					<img
						src={request.sender.profilePicture || "/avatar.png"}
						alt={request.name}
						className='w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover flex-shrink-0'
					/>
				</Link>

				<div className='min-w-0'>
					<Link to={`/profile/${request.sender.username}`} className='font-semibold text-sm sm:text-lg'>
						{request.sender.name}
					</Link>
					<p className='text-gray-600 text-xs sm:text-sm line-clamp-1'>{request.sender.headline}</p>
				</div>
			</div>

			<div className='flex gap-2 flex-shrink-0'>
				<button
					className='bg-primary text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-sm'
					onClick={() => acceptConnectionRequest(request._id)}
				>
					Accept
				</button>
				<button
					className='bg-gray-200 text-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-gray-300 transition-colors text-sm'
					onClick={() => rejectConnectionRequest(request._id)}
				>
					Reject
				</button>
			</div>
		</div>
	);
};
export default FriendRequest;
