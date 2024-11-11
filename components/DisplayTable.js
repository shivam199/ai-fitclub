const DisplayTableHeader = ({colName}) => (
	<th
		className="font-medium p-4 text-left">
		{colName}
	</th>
)

const DisplayTableData = ({data, type}) => (
	<td
		className="border-b border-slate-100 p-4 text-primary-dark">
		{data}
	</td>
)

const DisplayTable = ({exercises}) => {
	return (
		<table className="border-collapse table-fixed w-full text-sm mb-3">
			<thead>
			<tr className={'border-b'}>
				<DisplayTableHeader colName={"Exercise"}/>
				<DisplayTableHeader colName={"Sets"}/>
				<DisplayTableHeader colName={"Reps"}/>
				<DisplayTableHeader colName={"Weights"}/>
				<DisplayTableHeader colName={"Rest Between Sets"}/>
			</tr>
			</thead>
			<tbody className="bg-white">
			{
				exercises.map(({exercise, sets, reps, weight, rest}, index) => (
					<tr key={index}>
						<DisplayTableData data={exercise} type={'exercise'}/>
						<DisplayTableData data={sets} type={'sets'}/>
						<DisplayTableData data={reps} type={'reps'}/>
						<DisplayTableData data={weight} type={'weight'}/>
						<DisplayTableData data={rest} type={'rest'}/>
					</tr>
				))
			}
			</tbody>
		</table>
	)
}

export default DisplayTable