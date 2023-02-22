import React from 'react';
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

// Renders a PieChart showing the proportion of each emotion category
const PieChart = (props) => {
	return (
		<div className='container pie-chart'>
			<Pie data={props.data}></Pie>
		</div>
	)
}

export default PieChart;