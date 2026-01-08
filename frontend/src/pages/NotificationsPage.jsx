import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});

	const renderNotificationIcon = (type) => {
		switch (type) {
			case "like":
				return <ThumbsUp className='text-blue-500' />;

			case "comment":
				return <MessageSquare className='text-green-500' />;
			case "connectionAccepted":
				return <UserPlus className='text-purple-500' />;
			default:
				return null;
		}
	};

	const renderNotificationContent = (notification) => {
		switch (notification.type) {
			case "like":
				return (
					<span>
						<strong>{notification.relatedUser.name}</strong> liked your post
					</span>
				);
			case "comment":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						commented on your post
					</span>
				);
			case "connectionAccepted":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						accepted your connection request
					</span>
				);
			default:
				return null;
		}
	};

	const renderRelatedPost = (relatedPost) => {
		if (!relatedPost) return null;

		return (
			<Link
				to={`/post/${relatedPost._id}`}
				className='mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors'
			>
				{relatedPost.image && (
					<img src={relatedPost.image} alt='Post preview' className='w-10 h-10 object-cover rounded' />
				)}
				<div className='flex-1 overflow-hidden'>
					<p className='text-sm text-gray-600 truncate'>{relatedPost.content}</p>
				</div>
				<ExternalLink size={14} className='text-gray-400' />
			</Link>
		);
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
			<div className='col-span-1 hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>
			<div className='col-span-1 md:col-span-3 lg:col-span-3'>
				<div className='bg-white rounded-lg shadow p-3 sm:p-6'>
					<h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Notifications</h1>

					{isLoading ? (
						<p className='text-sm'>Loading notifications...</p>
					) : notifications && notifications.data.length > 0 ? (
						<ul className='space-y-2 sm:space-y-4'>
							{notifications.data.map((notification) => (
								<li
									key={notification._id}
									className={`bg-white border rounded-lg p-3 sm:p-4 transition-all hover:shadow-md ${
										!notification.read ? "border-blue-500 bg-blue-50" : "border-gray-200"
									}`}
								>
									<div className='flex items-start justify-between gap-2'>
										<div className='flex items-start gap-2 sm:gap-4 min-w-0 flex-1'>
											<Link to={`/profile/${notification.relatedUser.username}`}>
												<img
													src={notification.relatedUser.profilePicture || "/avatar.png"}
													alt={notification.relatedUser.name}
													className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0'
												/>
											</Link>

											<div className='min-w-0 flex-1'>
												<div className='flex items-center gap-2 mb-1'>
													<div className='p-1 bg-gray-100 rounded-full flex-shrink-0'>
														{renderNotificationIcon(notification.type)}
													</div>
													<p className='text-xs sm:text-sm'>{renderNotificationContent(notification)}</p>
												</div>
												<p className='text-xs text-gray-500 mt-1'>
													{formatDistanceToNow(new Date(notification.createdAt), {
														addSuffix: true,
													})}
												</p>
												{renderRelatedPost(notification.relatedPost)}
											</div>
										</div>

										<div className='flex gap-1 flex-shrink-0'>
											{!notification.read && (
												<button
													onClick={() => markAsReadMutation(notification._id)}
													className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
													aria-label='Mark as read'
												>
													<Eye size={14} />
												</button>
											)}

											<button
												onClick={() => deleteNotificationMutation(notification._id)}
												className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
												aria-label='Delete notification'
											>
												<Trash2 size={14} />
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className='text-sm text-gray-600'>No notification at the moment.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationsPage;
