import axios from 'axios'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import './App.scss'

interface ContributionData {
	[date: string]: number
}

interface ContributionDay {
	date: string
	contributions: number
}

function App() {
	const [data, setData] = useState<ContributionData>({})

	useEffect(() => {
		axios
			.get<ContributionData>(import.meta.env.VITE_BASE_API_URL)
			.then(res => setData(res.data))
	}, [])

	const days = (): ContributionDay[] => {
		const startDate = new Date()
		const endDate = new Date(startDate)
		endDate.setDate(startDate.getDate() - 357)

		const days: ContributionDay[] = []
		for (
			let currentDate = startDate;
			currentDate > endDate;
			currentDate.setDate(currentDate.getDate() - 1)
		) {
			const formatDay = format(new Date(currentDate), 'yyyy-MM-dd')
			days.push({
				date: formatDay,
				contributions: data[formatDay] ?? 0,
			})
		}

		return days.reverse()
	}

	const giveClassName = (contributions: number): string => {
		if (contributions > 29) {
			return 'lvl4'
		}
		if (contributions > 19) {
			return 'lvl3'
		}
		if (contributions > 9) {
			return 'lvl2'
		}
		if (contributions > 0) {
			return 'lvl1'
		}
		return ''
	}

	return (
		<div className='app'>
			<div className='container'>
				<div className='graph'>
					<ul className='graph__months'>
						{Array.from({ length: 12 }, (_, index) => (
							<li className='graph__months-item' key={index}>
								Авг
							</li>
						))}
					</ul>
					<ul className='graph__week'>
						<li className='graph__week-item'>пн</li>
						<li className='graph__week-item'>ср</li>
						<li className='graph__week-item'>пт</li>
					</ul>
					<ul className='graph__squares'>
						{days().map(({ date, contributions }) => (
							<li
								className={`square ${giveClassName(contributions)}`}
								key={date}
							></li>
						))}
					</ul>
				</div>
				<div className='example'>
					<div className='example__txt'>
						<p>Меньше</p>
					</div>
					<ul className='example__squares'>
						<li className='square'></li>
						<li className='square lvl1'></li>
						<li className='square lvl2'></li>
						<li className='square lvl3'></li>
						<li className='square lvl4'></li>
					</ul>
					<div className='example__txt'>
						<p>Больше</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
