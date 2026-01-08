import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (newExperience.title && newExperience.company && newExperience.startDate) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				title: "",
				company: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyWorking: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className='bg-white shadow rounded-lg p-3 sm:p-6 mb-3 sm:mb-6'>
			<h2 className='text-base sm:text-xl font-semibold mb-3 sm:mb-4'>Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className='mb-3 sm:mb-4 flex justify-between items-start gap-2'>
					<div className='flex items-start gap-2 min-w-0 flex-1'>
						<Briefcase size={18} className='mt-1 flex-shrink-0' />
						<div className='min-w-0'>
							<h3 className='font-semibold text-sm sm:text-base'>{exp.title}</h3>
							<p className='text-gray-600 text-xs sm:text-sm'>{exp.company}</p>
							<p className='text-gray-500 text-xs'>
								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
							</p>
							<p className='text-gray-700 text-xs sm:text-sm'>{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className='text-red-500 flex-shrink-0'>
							<X size={18} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className='mt-3 sm:mt-4 space-y-2'>
					<input
						type='text'
						placeholder='Title'
						value={newExperience.title}
						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<input
						type='text'
						placeholder='Company'
						value={newExperience.company}
						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<input
						type='date'
						placeholder='Start Date'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<div className='flex items-center'>
						<input
							type='checkbox'
							id='currentlyWorking'
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className='mr-2'
						/>
						<label htmlFor='currentlyWorking' className='text-sm'>I currently work here</label>
					</div>
					{!newExperience.currentlyWorking && (
						<input
							type='date'
							placeholder='End Date'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className='w-full p-2 border rounded text-sm'
						/>
					)}
					<textarea
						placeholder='Description'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<button
						onClick={handleAddExperience}
						className='bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-sm'
					>
						Add Experience
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-3 sm:mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-sm'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-3 sm:mt-4 text-primary hover:text-blue-700 transition duration-300 text-sm'
						>
							Edit Experiences
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default ExperienceSection;
