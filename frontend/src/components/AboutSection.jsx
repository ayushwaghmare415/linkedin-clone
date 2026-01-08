import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};
	return (
		<div className='bg-white shadow rounded-lg p-3 sm:p-6 mb-3 sm:mb-6'>
			<h2 className='text-base sm:text-xl font-semibold mb-3 sm:mb-4'>About</h2>
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className='w-full p-2 border rounded text-sm'
								rows='4'
							/>
							<button
								onClick={handleSave}
								className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-sm'
							>
								Save
							</button>
						</>
					) : (
						<>
							<p className='text-sm'>{userData.about}</p>
							<button
								onClick={() => setIsEditing(true)}
								className='mt-2 text-primary hover:text-blue-700 transition duration-300 text-sm'
							>
								Edit About
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default AboutSection;