import React, {useState}  from 'react';
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
			const res = await axios.post('http://127.0.0.1:8000/summarize', {"text": text});
			setSummary(res.data.result);
			console.log(summary);
		} catch (error) {
			console.log(error);
		}
		
	}

	return (
		<div>
			<h1>Generative AI Summarizer</h1>
			<form onSubmit={onSubmit}>
				<textarea id="" cols="30" rows="10" placeholder="Simply copy paste text here" required onChange={onChangeText}></textarea>
				<div className="form-group">
          <input type="submit" value="Generate Summary" className="btn btn-primary" />
        </div>
			</form>
			<h3>{summary}</h3>

		</div>
		

	)
}

export default Summarize;