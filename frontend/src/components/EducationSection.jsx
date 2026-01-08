import { School, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow rounded-lg p-3 sm:p-6 mb-3 sm:mb-6'>
			<h2 className='text-base sm:text-xl font-semibold mb-3 sm:mb-4'>Education</h2>
			{educations.map((edu) => (
				<div key={edu._id} className='mb-3 sm:mb-4 flex justify-between items-start gap-2'>
					<div className='flex items-start gap-2 min-w-0 flex-1'>
						<School size={18} className='mt-1 flex-shrink-0' />
						<div className='min-w-0'>
							<h3 className='font-semibold text-sm sm:text-base'>{edu.fieldOfStudy}</h3>
							<p className='text-gray-600 text-xs sm:text-sm'>{edu.school}</p>
							<p className='text-gray-500 text-xs'>
								{edu.startYear} - {edu.endYear || "Present"}
							</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteEducation(edu._id)} className='text-red-500 flex-shrink-0'>
							<X size={18} />
						</button>
					)}
				</div>
			))}
			{isEditing && (
				<div className='mt-3 sm:mt-4 space-y-2'>
					<input
						type='text'
						placeholder='School'
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<input
						type='text'
						placeholder='Field of Study'
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<input
						type='number'
						placeholder='Start Year'
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<input
						type='number'
						placeholder='End Year'
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className='w-full p-2 border rounded text-sm'
					/>
					<button
						onClick={handleAddEducation}
						className='bg-primary text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 text-sm'
					>
						Add Education
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
							Edit Education
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default EducationSection;
