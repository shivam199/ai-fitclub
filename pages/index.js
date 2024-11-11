import {useState} from "react";
import Head from "next/Head";
import Header from "@/components/HeaderSection";
import Heading from "@/components/Heading";
import FooterSection from "@/components/FooterSection";
import UserFormSection from "@/components/UserFormSection";
import PDFConverter from "@/components/PDFConverter";


export default function Home() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<main className="flex flex-col min-h-screen">
			<Head>
				<title>AI FitClub</title>
			</Head>
			<div className={'w-full flex-grow'}>
				<Header/>
				<div className={'mt-24 px-4 my-6'}>
					<div className={'max-w-5xl mx-auto'}>
						<Heading/>
						<div className={'w-full'}>
							<UserFormSection setData={setData} setLoading={setLoading} loading={loading}/>
						</div>
						{
							loading
								? <div className={'w-full text-center text-secondary-light p-2 text-xl font-normal'}>Working on it...</div>
								: data.length > 0
									? <PDFConverter data={data}/>
									: undefined
						}
					</div>
				</div>
			</div>
			<FooterSection/>
		</main>
	);
}
