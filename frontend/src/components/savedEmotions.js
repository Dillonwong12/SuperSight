import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SavedEmotions = (props) => {
	 const [emotions, setEmotions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('http://localhost:5000/emotions/');
				setEmotions(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchData();
	}, [])

	const emotionList = () => {
		return emotions.map(emotion => {
			return (<section className='row' key={emotion._id}>
				<ul>
					<li id='filename'>{emotion.file}</li>
					<li>{emotion.emotion}</li>
					<li>{emotion.percentage}</li>
					<li>{emotion.date.substring(0, 10)}</li>
					<li id='keywords'>{emotion.keywords}</li>
				</ul>
				
			</section>)
		})
	}

	return (
		<div className='container'>
			<h2>Saved Insights</h2>
			<section className='wrapper'>
				<main className='row title'>
					<ul>
						<li id='filename'>Filename</li>
						<li>Emotion</li>
						<li>Percentage %</li>
						<li>Date</li>
					</ul>
				</main>
				
			{emotionList()}
			</section>
			
			
			
		</div>
	)
}

export default SavedEmotions;