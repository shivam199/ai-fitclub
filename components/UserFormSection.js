import { BiSolidSend } from "react-icons/bi";
import InputBox from "@/components/form/InputBox";
import Select from "@/components/form/Select";
import {  FITNESS_LEVELS, GENDERS, GOALS, EQUIPMENT } from "@/data";
import toast from "react-hot-toast";
import { useState } from "react";

const GENERATE_URL = "/api/create";

export default function UserFormSection({ setData, setLoading, loading }) {
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

		const height = event.target.elements.height.value;
		const weight = event.target.elements.weight.value;
		const age = event.target.elements.age.value;
		const gender = event.target.elements.gender.value;
		const fitnessLevel = event.target.elements.fitnessLevel.value;
		const goal = event.target.elements.goal.value;

		const formData = {
			height,
			weight,
			age,
			gender,
			fitnessLevel,
			goal,
			equipment: selectedEquipment,
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
			className="w-full my-10 mt-6 p-6 border border-gray-200 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-gray-50"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<hr className="my-5 border-t border-gray-300" />
			<div className="flex flex-wrap -mx-3 mb-4">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputBox label="Height (cm)" id="height" />
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputBox label="Weight (kg)" id="weight" />
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<InputBox label="Age (yr)" id="age" />
				</div>
			</div>

			<div className="flex flex-wrap -mx-3 mb-4">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<Select id="gender" label="Gender" values={GENDERS} />
				</div>

				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<Select id="fitnessLevel" label="Fitness Level" values={FITNESS_LEVELS} />
				</div>

				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<Select id="goal" label="Goal" values={GOALS} />
				</div>
			</div>

			{/* Equipment Checkboxes */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4 text-gray-700">Select Equipment</h3>
				<div className="flex flex-wrap gap-4">
					{EQUIPMENT.map((item) => (
						<label
							key={item.id}
							className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg shadow-sm cursor-pointer transition-all transform hover:scale-105
								${selectedEquipment.includes(item.id)
									? 'bg-blue-100 text-blue-700 border-blue-400'
									: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
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
					className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 disabled:bg-blue-300 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
