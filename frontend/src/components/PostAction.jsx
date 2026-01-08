export default function PostAction({ icon, text, onClick }) {
	return (
		<button className='flex items-center hover:text-primary transition gap-1 text-xs sm:text-sm' onClick={onClick}>
			<span>{icon}</span>
			<span>{text}</span>
		</button>
	);
}
