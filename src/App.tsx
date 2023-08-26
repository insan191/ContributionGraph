import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.scss'

function App() {
	const [data, setData] = useState([])

	useEffect(() => {
		axios.get(import.meta.env.VITE_BASE_API_URL).then(res => setData(res.data))
	}, [])

	const graph = () => {
		const days = []
		for (let i = 1; i <= 357; i++) {
			days.push(i)
		}
		return days
	}
	return (
		<div className='app'>
			<div className='container'>
				<div className='graph'>
					<ul className='graph__months'>
						<li className='graph__months-item'>я</li>
						<li className='graph__months-item'>ф</li>
						<li className='graph__months-item'>м</li>
						<li className='graph__months-item'>а</li>
						<li className='graph__months-item'>м</li>
						<li className='graph__months-item'>и</li>
						<li className='graph__months-item'>и</li>
						<li className='graph__months-item'>а</li>
						<li className='graph__months-item'>с</li>
						<li className='graph__months-item'>о</li>
						<li className='graph__months-item'>н</li>
						<li className='graph__months-item'>д</li>
					</ul>
					<ul className='graph__week'>
						<li className='graph__week-item'>пн</li>
						<li className='graph__week-item'>ср</li>
						<li className='graph__week-item'>пт</li>
					</ul>
					<ul className='graph__squares'>
						{graph().map(day => (
							<li className='square' key={day}></li>
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
