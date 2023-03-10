import React from 'react';

/*
Renders the Upload page, which is used to upload Excel/CSV files for analysis. Prints the first 100 records from
the uploaded file.
*/
const Upload = (props) => {

	return (
			<div className='upload'>
				<label htmlFor='input-tag' className="upload-btn">
				Upload Excel/CSV<br/>
					<svg width="277" height="62" z-index='0'>
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
						onChange={props.addFile}
					/>
	
			<div className='container'>
				<ul className='table'>
					{props.uploadLabel !== '' &&
						<li className='table-title'>Displaying 100/{props.data.length} rows from {props.uploadLabel}</li>
					}
					
					{props.data.slice(0, 100).map((item, i) => (
						<li key={i} className='table-row'>
							<div >{item} </div>
						</li>
					))}
				</ul>
			</div> 
					
			</div>
	)
}

export default Upload;