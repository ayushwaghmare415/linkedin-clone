import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
	const queryClient = useQueryClient();

	const { data: connectionStatus, isLoading } = useQuery({
		queryKey: ["connectionStatus", user._id],
		queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
	});

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success("Connection request sent successfully");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const renderButton = () => {
		if (isLoading) {
			return (
				<button className='px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-gray-200 text-gray-500 whitespace-nowrap' disabled>
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
			case "pending":
				return (
					<button
						className='px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-yellow-500 text-white flex items-center whitespace-nowrap'
						disabled
					>
						<Clock size={14} className='mr-1' />
						<span className='hidden sm:inline'>Pending</span>
						<span className='sm:hidden'>Pending</span>
					</button>
				);
			case "received":
				return (
					<div className='flex gap-1 sm:gap-2 justify-center'>
						<button
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white flex-shrink-0`}
							title='Accept'
						>
							<Check size={14} />
						</button>
						<button
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white flex-shrink-0`}
							title='Reject'
						>
							<X size={14} />
						</button>
					</div>
				);
			case "connected":
				return (
					<button
						className='px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-500 text-white flex items-center whitespace-nowrap'
						disabled
					>
						<UserCheck size={14} className='mr-1' />
						<span className='hidden sm:inline'>Connected</span>
						<span className='sm:hidden'>Connected</span>
					</button>
				);
			default:
				return (
					<button
						className='px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center whitespace-nowrap'
						onClick={handleConnect}
					>
						<UserPlus size={14} className='mr-1' />
						<span className='hidden sm:inline'>Connect</span>
						<span className='sm:hidden'>Connect</span>
					</button>
				);
		}
	};

	const handleConnect = () => {
		if (connectionStatus?.data?.status === "not_connected") {
			sendConnectionRequest(user._id);
		}
	};

	return (
		<div className='flex items-center justify-between mb-2 sm:mb-4 gap-2 min-h-[60px] sm:min-h-[70px]'>
			<Link to={`/profile/${user.username}`} className='flex items-center flex-grow min-w-0'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 flex-shrink-0'
				/>
				<div className='min-w-0'>
					<h3 className='font-semibold text-xs sm:text-sm line-clamp-1'>{user.name}</h3>
					<p className='text-xs text-info line-clamp-1'>{user.headline}</p>
				</div>
			</Link>
			<div className='flex-shrink-0 ml-2'>{renderButton()}</div>
		</div>
	);
};
export default RecommendedUser;
