import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users, X } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import { useState } from "react";

const HomePage = () => {
	const [showSidebarMobile, setShowSidebarMobile] = useState(false);
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			return res.data;
		},
	});

	console.log("posts", posts);

	return (
		<>
			{/* Mobile Sidebar Modal */}
			{showSidebarMobile && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden' onClick={() => setShowSidebarMobile(false)}>
					<div className='absolute left-0 top-0 h-full w-80 max-w-full bg-base-100 shadow-lg' onClick={(e) => e.stopPropagation()}>
						<div className='flex justify-between items-center p-4 border-b border-base-200'>
							<h2 className='font-semibold'>Profile</h2>
							<button onClick={() => setShowSidebarMobile(false)} className='text-neutral'>
								<X size={24} />
							</button>
						</div>
						<div className='overflow-y-auto h-[calc(100vh-70px)]'>
							<Sidebar user={authUser} />
						</div>
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
				{/* Desktop Sidebar */}
				<div className='hidden lg:block lg:col-span-1'>
					<Sidebar user={authUser} />
				</div>

				{/* Main Feed */}
				<div className='col-span-1 md:col-span-2 lg:col-span-2 order-first lg:order-none'>
					<PostCreation user={authUser} />

					{posts?.map((post) => (
						<Post key={post._id} post={post} />
					))}

					{posts?.length === 0 && (
						<div className='bg-white rounded-lg shadow p-6 sm:p-8 text-center'>
							<div className='mb-6'>
								<Users size={48} className='mx-auto text-blue-500 sm:size-64' />
							</div>
							<h2 className='text-lg sm:text-2xl font-bold mb-4 text-gray-800'>No Posts Yet</h2>
							<p className='text-sm sm:text-base text-gray-600 mb-6'>Connect with others to start seeing posts in your feed!</p>
						</div>
					)}
				</div>

				{/* Recommended Users */}
				{recommendedUsers?.length > 0 && (
					<div className='col-span-1 hidden md:block'>
						<div className='bg-secondary rounded-lg shadow p-3 sm:p-4 sticky top-20'>
							<h2 className='font-semibold text-sm sm:text-base mb-4'>People you may know</h2>
							<div className='space-y-3 max-h-[calc(100vh-150px)] overflow-y-auto'>
								{recommendedUsers?.map((user) => (
									<RecommendedUser key={user._id} user={user} />
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
export default HomePage;

