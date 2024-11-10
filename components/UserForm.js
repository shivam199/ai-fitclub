import { BiSolidSend } from "react-icons/bi";
import InputText from "@/components/form/InputText";
import CustomSelect from "@/components/form/CustomSelect";
import { AI_SOURCES, FITNESS_LEVELS, GENDERS, GOALS, EQUIPMENT } from "@/constants";
import toast from "react-hot-toast";
import { useState } from "react";

const GENERATE_URL = "/api/generate";

export default function UserForm({ setData, setLoading, loading }) {
	const [selectedEquipment, setSelectedEquipment] = useState([]);

	const handleEquipmentChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedEquipment([...selectedEquipment, value]);
		} else {
			setSelectedEquipment(selectedEquipment.filter((item) => item !== value));
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		// Retrieve the form field values
		const height = event.target.elements.height.value;
		const weight = event.target.elements.weight.value;
		const age = event.target.elements.age.value;
		const gender = event.target.elements.gender.value;
		const fitnessLevel = event.target.elements.fitnessLevel.value;
		const goal = event.target.elements.goal.value;

		// Create an object with the form values, including selected equipment
		const formData = {
			height,
			weight,
			age,
			gender,
			fitnessLevel,
			goal,
			equipment: selectedEquipment, // Add selected equipment to form data
		};

		let response = await fetch(GENERATE_URL, {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-type": "application/json",
			},
		});

		if (response.ok) {
			response = await response.json();
			setLoading(false);
			setData(response.result);
			toast.success("Workout generated!");
		} else {
			response = await response.json();
			console.error("error");
			setLoading(false);
			toast.error(response.error.message);
		}
	};

	return (
		<form
			className="w-full my-10 mt-6 p-4 border border-gray-100 rounded-xl shadow-md"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<hr className="my-5" />
			<div className="flex flex-wrap -mx-3 mb-3">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputText label="Height (cm)" id="height" />
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputText label="Weight (kg)" id="weight" />
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputText label="Age (yr)" id="age" />
				</div>
			</div>

			<div className="flex flex-wrap -mx-3 mb-2">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<CustomSelect id="gender" label="Gender" values={GENDERS} />
				</div>

				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<CustomSelect id="fitnessLevel" label="Fitness Level" values={FITNESS_LEVELS} />
				</div>

				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<CustomSelect id="goal" label="Goal" values={GOALS} />
				</div>
			</div>

			{/* Equipment Checkboxes */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4">Select Equipment</h3>
				<div className="flex flex-wrap gap-4">
					{EQUIPMENT.map((item) => (
						<label
							key={item.id}
							className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg shadow-sm cursor-pointer transition-all 
          ${selectedEquipment.includes(item.id)
									? 'bg-primary-light text-primary-main border-primary-main'
									: 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
						>
							<input
								type="checkbox"
								value={item.id}
								onChange={handleEquipmentChange}
								className="hidden"
							/>
							<span className="font-medium">{item.label}</span>
						</label>
					))}
				</div>
			</div>


			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					disabled={loading}
					className="rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark disabled:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{loading ? (
						"Please wait..."
					) : (
						<div className="flex justify-center items-center gap-2">
							Submit <BiSolidSend />
						</div>
					)}
				</button>
			</div>
		</form>
	);
}
