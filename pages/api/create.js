import { generateText } from "@/gemini2Services";

const createPrompt = (userData) => {
	return `
		Based on the user data below, generate an exercise plan for a week.
		User data:
		${JSON.stringify(userData)}
		
		Generate 7 exercises per day.
		Saturday and Sunday are rest days.
		
		Sample output JSON:
		[
			{"day": "Monday", "exercises": [{"exercise": "...", "sets": "...", "reps": "...", "weight": "...", "rest": "..."}]}
		]
		
		"reps" in JSON is a string representing the number of reps, with weight if needed.
		"rest" in JSON is the rest time between sets.
		"weight" in JSON is the weight to be used for the exercise, with units if applicable (e.g., "10 lbs"); otherwise, use "---".
		
		For rest days, return a single JavaScript object in the exercises array with the "exercise" field as "Rest Day" and the remaining fields as "---".
		
		Answer:
	`;
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { height, weight, age, gender, fitnessLevel, goal, equipment } = req.body;
			const prompt = createPrompt({ height, weight, age, gender, fitnessLevel, goal, equipment });
			
			const result = await generateText(prompt);
			return res.status(200).json({ result });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}
}
