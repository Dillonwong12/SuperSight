import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

const DonutChart = (props) => {
	return (
		<div className='donut-chart'>
			<Doughnut data={props.data}></Doughnut>
		</div>
	)
}

export default DonutChart;