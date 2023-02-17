import React, {Fragment, useState}  from 'react';
import axios from 'axios';

const Summarize = (props) => {
	const [text, setText] = useState('');
	const [summary, setSummary] = useState('');

	const onChangeText = (e) => {
		setText(e.target.value);
		console.log(e);
		console.log(text);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:5000/api/generate", {"text": text});
			setSummary(res.data.result);
		} catch (error) {
			console.log(error);
		}
		console.log(summary);
	}

	return (
		<div className='container'>
			<h1>Generative AI Summarizer</h1>
			<form onSubmit={onSubmit}>
				<textarea id="" cols="30" rows="10" placeholder="Simply copy paste text here" required onChange={onChangeText}></textarea>
				<div className="form-group">
          <input type="submit" value="Generate Summary" className="btn btn-primary" />
        </div>
			</form>
			{
				summary !== '' ?
				<div className='mainBox'>
					<h4>{summary}</h4>
				</div>
				:
				<Fragment></Fragment>
			}
			
			

		</div>
		

	)
}

export default Summarize;