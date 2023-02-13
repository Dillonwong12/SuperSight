import React, {Fragment} from 'react';
import {Rings} from "react-loader-spinner";
import PieChart from './pieChart';

const Insights = (props) => {
	return (
		<div className='container'>
			{props.data.length === 0 ?
				<h2>Submit an Excel/CSV file to begin analysis</h2>
				:
				props.emotions.length === 0 ?
				<Fragment>
					<h2>Performing analysis...</h2>
					<div className='ring-loader'>
						<br></br>
						<Rings className='ring-loader'
						height="100"
						width="100"
						color="#00BFFF"
						radius="100"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="rings-loading"
						/>
					</div>
				</Fragment>
					:
					<Fragment>
						<h1>OVERVIEW</h1>
						<PieChart data={props.emotionCounts}></PieChart>
					</Fragment>
					
			}
		</div>
	)
}

export default Insights;