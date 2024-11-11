import Link from "next/link";

export default function FooterSection() {
	return (
		<div className="flex-shrink-0 text-center text-md p-4 border-t bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
			<p className="text-gray-600">
				Created by{' '}
				<Link
					className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300 ease-in-out"
					href="#"
					target="_blank"
					rel="noopener noreferrer"
				>
					Laxman
				</Link>
			</p>
		</div>
	);
}
