import React, {useState, useEffect, Fragment} from 'react';
import {Rings} from "react-loader-spinner";
import DonutChart from './donutChart';
import axios from 'axios';

const Emotion = (props) => {
	const count = props.data.datasets[0].data[props.id];
	const label = props.data.labels[props.id];
	console.log(props.keywords);
	
	const data = {
		labels: [label, 'Others'],
		datasets: [{
			label: 'Count',
			data: [count, props.emotions.length - count],
			backgroundColor: [props.data.datasets[0].backgroundColor[props.id], 'hsl(227, 6%, 73%)']
		}]
	} 
	return (
		<div className={`emotion-box ${label.toLowerCase()}`}>
			
			<h2>{label}</h2><h3 className='percentage-txt'>{count === 0 ? 'No records found for this category...' :`${ ((count/props.emotions.length)*100).toFixed(2)}%`}</h3>
			{count === 0 ?
			<Fragment></Fragment>
			:
			props.keywords ? 
			<Fragment>
				<DonutChart data={data}></DonutChart>
				
				<ul>
					<h3 className='key-phrases'>Key Phrases</h3>
					{props.keywords.map((keyword) =>
					<li className='key-phrases-li'>{keyword[1]}</li>)}
				</ul>
			</Fragment>
			:
			<Fragment>
					<h3>loading keywords...</h3>
			</Fragment>
			}
		</div>
	)
}

const Emotions = (props) => {
	const [keyWords, setKeyWords] = useState([]);
	
	const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, props.data[i]] : acc), []);
	
	const getKeyWords = async () => {
		if (props.emotionCounts === {} || Object.values(props.emotionCounts).length === 0){
			return 0;
		}
		try {
			var instances = [];
			for (var i=0; i<props.emotionCounts.labels.length; i++){
				instances.push(indexOfAll(props.emotions, i))
			}
			const res = await axios.post('http://127.0.0.1:8000/extract', {"texts": instances})
			setKeyWords(res.data.result);
			console.log(res.data.result);
					
		} catch (error) {
			console.log(error);
		}
		
	}

	useEffect(() => {
		getKeyWords();
	}, [props.emotionCounts])

	return (
		<div className='container'>
			{props.data.length === 0 ?
				<h2>Submit an Excel/CSV file to begin analysis</h2>
				:
				props.emotions.length === 0 ?
				<Fragment>
					<h2>Performing analysis...</h2>
					<h2>This may take a few minutes...</h2>
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
						<h1>Emotion Analysis</h1>
						{
						props.emotionCounts.labels.map((label, i) => {
							return <Emotion data={props.emotionCounts} id={i} emotions={props.emotions} key={i} keywords={keyWords[i]}></Emotion>
						})}
					</Fragment>
					
			}
		</div>
	)
}

export default Emotions;