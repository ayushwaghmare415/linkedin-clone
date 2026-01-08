import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	const handleLogout = () => {
		logout();
		setMobileMenuOpen(false);
	};

	return (
		<nav className='bg-secondary shadow-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-2 sm:px-4'>
				<div className='flex justify-between items-center py-2 sm:py-3'>
					<div className='flex items-center space-x-2 sm:space-x-4'>
						<Link to='/' onClick={() => setMobileMenuOpen(false)}>
							<img className='h-8 rounded' src='/small-logo.png' alt='LinkedIn' />
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-6'>
						{authUser ? (
							<>
								<Link to={"/"} className='text-neutral flex flex-col items-center hover:text-primary transition'>
									<Home size={20} />
									<span className='text-xs'>Home</span>
								</Link>
								<Link to='/network' className='text-neutral flex flex-col items-center relative hover:text-primary transition'>
									<Users size={20} />
									<span className='text-xs'>My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span className='absolute -top-1 right-4 bg-blue-500 text-white text-xs rounded-full size-4 flex items-center justify-center'>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className='text-neutral flex flex-col items-center relative hover:text-primary transition'>
									<Bell size={20} />
									<span className='text-xs'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span className='absolute -top-1 right-4 bg-blue-500 text-white text-xs rounded-full size-4 flex items-center justify-center'>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link to={`/profile/${authUser.username}`} className='text-neutral flex flex-col items-center hover:text-primary transition'>
									<User size={20} />
									<span className='text-xs'>Me</span>
								</Link>
								<button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition'
									onClick={handleLogout}
								>
									<LogOut size={20} />
									<span>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost btn-sm'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary btn-sm'>
									Join now
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						className='md:hidden text-neutral p-2'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation Menu */}
				{mobileMenuOpen && (
					<div className='md:hidden pb-4 border-t border-base-100'>
						{authUser ? (
							<>
								<Link
									to={"/"}
									className='flex items-center space-x-2 text-neutral px-4 py-3 hover:bg-base-100 rounded transition'
									onClick={() => setMobileMenuOpen(false)}
								>
									<Home size={20} />
									<span>Home</span>
								</Link>
								<Link
									to='/network'
									className='flex items-center space-x-2 text-neutral px-4 py-3 hover:bg-base-100 rounded transition relative'
									onClick={() => setMobileMenuOpen(false)}
								>
									<Users size={20} />
									<span>My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span className='ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1'>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link
									to='/notifications'
									className='flex items-center space-x-2 text-neutral px-4 py-3 hover:bg-base-100 rounded transition relative'
									onClick={() => setMobileMenuOpen(false)}
								>
									<Bell size={20} />
									<span>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span className='ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1'>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className='flex items-center space-x-2 text-neutral px-4 py-3 hover:bg-base-100 rounded transition'
									onClick={() => setMobileMenuOpen(false)}
								>
									<User size={20} />
									<span>Me</span>
								</Link>
								<button
									className='flex items-center space-x-2 text-neutral px-4 py-3 hover:bg-base-100 rounded transition w-full'
									onClick={handleLogout}
								>
									<LogOut size={20} />
									<span>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link
									to='/login'
									className='block px-4 py-2 text-center text-primary hover:bg-base-100 rounded transition'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign In
								</Link>
								<Link
									to='/signup'
									className='block px-4 py-2 text-center bg-primary text-white rounded hover:bg-blue-700 transition mt-2'
									onClick={() => setMobileMenuOpen(false)}
								>
									Join now
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};
export default Navbar;

