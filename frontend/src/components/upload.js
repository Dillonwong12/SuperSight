import React from 'react';

const Upload = (props) => {
    return (
        <div className='container'>
            <input
            type="file"
            placeholder="Upload file"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(event) => {
            props.addFile(event)
            }}
        />
        {/* {Object.entries(props.data).map(([key, value]) => (
        <div className="item" key={key}>
          {value}
         </div>
       ))} */}
       {/* <h1>{props.data}</h1> */}
       <div>
        {props.data.map((item, i) => (
          <div key={i}>{item.text} {item.emotion}</div>
        ))}
      </div>
            
        </div>
    )
}

export default Upload;