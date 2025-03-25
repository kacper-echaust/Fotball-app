import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useGetApi } from '../../hooks/useGetApi'
import { SingleGameType } from '../../types'

function filterByDateRange(games: SingleGameType[] | undefined, startDate: Date, endDate: Date) {
	if (!games) return []
	return games.filter(game => {
		const gameDate = new Date(game.date)
		return gameDate >= startDate && gameDate <= endDate
	})
}
function aggregateData(data: SingleGameType[]) {
	const aggregation: Record<string, number> = {}
	data.forEach(game => {
		if (aggregation[game.date]) {
			aggregation[game.date] += 1
		} else {
			aggregation[game.date] = 1
		}
	})
	return Object.keys(aggregation).map(date => ({
		date: date,
		count: aggregation[date],
	}))
}
const Chart = () => {
	const { games } = useGetApi()
	const [startDate, setStartDate] = useState(new Date('2023-01-01'))
	const [endDate, setEndDate] = useState(new Date('2025-12-31'))

	const handleStartDateChange = (date: string) => setStartDate(new Date(date))
	const handleEndDateChange = (date: string) => setEndDate(new Date(date))

	const filteredData = filterByDateRange(games, startDate, endDate)
	const data = aggregateData(filteredData)
	return (
		<div className='p-4'>
			<div className='mb-4 flex gap-4'>
				<div>
					<label>Data od: </label>
					<input
						type='date'
						value={startDate.toISOString().split('T')[0]}
						onChange={e => handleStartDateChange(e.target.value)}
						className='p-2 border rounded'
					/>
				</div>
				<div>
					<label>Data do: </label>
					<input
						type='date'
						value={endDate.toISOString().split('T')[0]}
						onChange={e => handleEndDateChange(e.target.value)}
						className='p-2 border rounded'
					/>
				</div>
			</div>
			<ResponsiveContainer width='100%' height={400}>
				<LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type='monotone' dataKey='count' stroke='#8884d8' activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
export { Chart }
