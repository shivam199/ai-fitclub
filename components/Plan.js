import DisplayTable from "@/components/DisplayTable";

const WorkoutDay = ({ day }) => (
	<div className="w-full text-xl text-center py-3 font-semibold border-b bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700">
		{day}
	</div>
);

export default function Plan({ data }) {
	return (
		data.length > 0 ? (
			<div className="space-y-6">
				{data.map(({ day, exercises }) => (
					<div
						key={day}
						className="bg-white mb-10 shadow-lg border border-gray-200 rounded-xl overflow-hidden"
					>
						<WorkoutDay day={day} />
						<DisplayTable exercises={exercises} />
					</div>
				))}
			</div>
		) : null
	);
}
