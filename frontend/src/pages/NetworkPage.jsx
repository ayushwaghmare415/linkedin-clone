import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
			<div className='col-span-1 hidden lg:block lg:col-span-1'>
				<Sidebar user={user} />
			</div>
			<div className='col-span-1 md:col-span-3 lg:col-span-3'>
				<div className='bg-secondary rounded-lg shadow p-3 sm:p-6 mb-3 sm:mb-6'>
					<h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>My Network</h1>

					{connectionRequests?.data?.length > 0 ? (
						<div className='mb-6 sm:mb-8'>
							<h2 className='text-base sm:text-xl font-semibold mb-2 sm:mb-4'>Connection Request</h2>
							<div className='space-y-3 sm:space-y-4'>
								{connectionRequests.data.map((request) => (
									<FriendRequest key={request.id} request={request} />
								))}
							</div>
						</div>
					) : (
						<div className='bg-white rounded-lg shadow p-4 sm:p-6 text-center mb-6'>
							<UserPlus size={40} className='mx-auto text-gray-400 mb-4 sm:size-48' />
							<h3 className='text-base sm:text-xl font-semibold mb-2'>No Connection Requests</h3>
							<p className='text-gray-600 text-sm sm:text-base'>
								You don&apos;t have any pending connection requests at the moment.
							</p>
							<p className='text-gray-600 text-sm sm:text-base mt-2'>
								Explore suggested connections below to expand your network!
							</p>
						</div>
					)}
					{connections?.data?.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-base sm:text-xl font-semibold mb-3 sm:mb-4'>My Connections</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
								{connections.data.map((connection) => (
									<UserCard key={connection._id} user={connection} isConnection={true} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default NetworkPage;
