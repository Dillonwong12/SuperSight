import React, {useState} from 'react';

const Upload = (props) => {

	const [uploadLabel, setUploadLabel] = useState('');

	const uploadHandler = (e) => {
		props.addFile(e);
		console.log(e.target.files[0].name);
		setUploadLabel(e.target.files[0].name);
	}
	return (
			<div className='upload'>
				<label htmlFor='input-tag' className="upload-btn">
				Upload Excel/CSV<br/>
					<svg width="277" height="62">
    				<defs>
        			<linearGradient id="grad1">
								<stop offset="0%" stopColor="#ED5523"/>
								<stop offset="50%" stopColor="white"/>
								<stop offset="100%" stopColor="#3C92BE" />
							</linearGradient>
						</defs>
						<rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
					</svg>
				</label>
				<input
						id='input-tag'
						type="file"
						placeholder="Upload file to get started!"
						accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						onChange={uploadHandler}
					/>
					
			{/* {Object.entries(props.data).map(([key, value]) => (
			<div className="item" key={key}>
				{value}
				</div>
			))} */}
			{/* <h1>{props.data}</h1> */}
			<div className='container'>
				{/* {uploadLabel}
			{props.data.map((item, i) => (
				<div key={i}>{item.text} </div>
			))}*/}
				<ul className='table'>
					{uploadLabel !== '' &&
						<li className='table-title'>Displaying 100/{props.data.length} rows from {uploadLabel}</li>
					}
					
					{props.data.slice(0, 100).map((item, i) => (
						<li className='table-row'>
							<div key={i}>{item.text} </div>
						</li>
					))}
				</ul>
			</div> 
					
			</div>
	)
}

export default Upload;