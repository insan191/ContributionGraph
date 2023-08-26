import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import './App.scss'

interface ContributionData {
	[date: string]: number
}

interface ContributionDay {
	date: string
	contributions: number
}

const API_URL = import.meta.env.VITE_BASE_API_URL

const CONTRIBUTION_LEVELS = {
	lvl4: 30,
	lvl3: 20,
	lvl2: 10,
	lvl1: 1,
}

function App() {
	const [data, setData] = useState<ContributionData>({})

	useEffect(() => {
		axios
			.get<ContributionData>(API_URL)
			.then((res: AxiosResponse<ContributionData>) => setData(res.data))
			.catch(error => {
				console.error('Error fetching data:', error)
			})
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

	const month = () => {
		const startMonth = new Date()
		const endMonth = new Date(startMonth)
		endMonth.setMonth(startMonth.getMonth() - 12)

		const month = []
		for (
			let currentMonth = startMonth;
			currentMonth > endMonth;
			currentMonth.setMonth(currentMonth.getMonth() - 1)
		) {
			const formatMonth = format(new Date(currentMonth), 'LLL', { locale: ru })
			month.push(formatMonth)
		}

		return month.reverse()
	}

	const giveClassName = (contributions: number): string => {
		for (const [className, threshold] of Object.entries(CONTRIBUTION_LEVELS)) {
			if (contributions > threshold) {
				return className
			}
		}
		return ''
	}

	return (
		<div className='app'>
			<div className='graph'>
				<ul className='graph__months'>
					{month().map(m => (
						<li className='graph__months-item' key={m}>
							{m}
						</li>
					))}
				</ul>
				<ul className='graph__week'>
					<li className='graph__week-item'>пн</li>
					<li className='graph__week-item'>ср</li>
					<li className='graph__week-item'>пт</li>
				</ul>
				<div className='graph__squares'>
					{days().map(({ date, contributions }) => (
						<Popover key={date} placement='top'>
							<PopoverTrigger>
								<div className={`square ${giveClassName(contributions)}`}></div>
							</PopoverTrigger>
							<PopoverContent
								_focus={{ boxShadow: 'none' }}
								bg={'black'}
								color='white'
							>
								<PopoverArrow bg='black' />
								<PopoverBody>
									<div className='square__body'>
										<p className='square__contributions'>
											{contributions} contributions
										</p>
										<p className='square__date'>
											{format(new Date(date), 'PPPP', { locale: ru })}
										</p>
									</div>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					))}
				</div>
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
	)
}

export default App
