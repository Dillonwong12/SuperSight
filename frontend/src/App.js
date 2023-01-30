import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Upload from "./components/upload";
import * as XLSX from "xlsx";

const App = () => {
  const [data, setData] = useState([]);
	const [uploadLabel, setUploadLabel] = useState('');

  const addFile = (event) => {
    let file = event.target.files[0];
		setUploadLabel(event.target.files[0].name);
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      let arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = [];
      for (var i = 0; i !== data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet));
      //localStorage.setItem("data", XLSX.utils.sheet_to_json(worksheet, { raw: true }))
      var json_data = XLSX.utils.sheet_to_json(worksheet)
      var result = [];
      for(var j in json_data)
        result.push([j, json_data[j]]);
      console.log(Object.values(json_data));
      setData(Object.values(json_data));
      //setData(JSON.stringify(XLSX.utils.sheet_to_json(worksheet)));
      //var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    };
  }

  useEffect(() => {
    console.log(data.length);
  }, [data])


  return (
    <Router>
      <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"  /> 
          <Route path="upload" element={<Upload uploadLabel={uploadLabel} data={data} addFile={addFile} />}/> 
          <Route path="insights"  /> 
          <Route path="saved"  /> 
        </Routes>
      </main>
      </div>
    </Router>
    
  );
}

export default App;
