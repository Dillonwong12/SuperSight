import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Upload from "./components/upload";
import Insights from "./components/insights";
import Emotions from "./components/emotions";
import Summarize from "./components/summarize";
import SavedEmotions from "./components/savedEmotions"
import * as XLSX from "xlsx";
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
	const [uploadLabel, setUploadLabel] = useState('');
	const [emotions, setEmotions] = useState([]);
	const [emotionCounts, setEmotionCounts] = useState({});

	/*
	Processes uploaded Excel/CSV files, then passes the data to the backend to make classify records by emotion.
	*/
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
      //localStorage.setItem("data", XLSX.utils.sheet_to_json(worksheet, { raw: true }))
      var json_data = XLSX.utils.sheet_to_json(worksheet)
      var result = [];
      for(var j in json_data)
        result.push([j, json_data[j]]);
			var json_data_filtered = json_data.filter((row) => {return row.text !== undefined})
      console.log(Object.values(json_data_filtered));
			console.log(json_data_filtered);
			var texts = json_data_filtered.map((record) => record.text)
			setData(texts);
			const input = {"texts": texts}
			axios.post('http://127.0.0.1:8000/predict', input)
				.then(res => {
					setEmotions(res.data.result)
					})
				.catch(err => console.log(err))
    };
  }

  useEffect(() => {
    console.log(data.length);
  }, [data])

	/*
	Counts the number of records classified to each emotion category, returning a list of the frequency counts
	*/
	const emotionCounter = () => {
		console.log('in emotioncounter');
		console.log(emotions)
		var counts = {"0":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0};
		for (const label of emotions){
			counts[label] = counts[label] ? counts[label] + 1 : 1;
		}
		Object.keys(counts).sort();
		console.log(counts);
		return Object.values(counts)
	}

	useEffect(() => {
		console.log('emotions changed');
		// `emotionCounts` will be used to display charts and calculate percentages
		setEmotionCounts({
			labels: ['Anger', 'Concern', 'Disappointment', 'Fear', 'Joy', 'Sadness', 'Surprise', 'Neutral'],
			datasets: [{
				label: 'Count',
				data: emotionCounter(),
				backgroundColor: ['#f94144', '#5e548e', '#184e77', '#f9c74f', '#43aa8b', '#168aad', '#f8961e', '#dee2e6']
			}]
		})
	}, [emotions])

  return (
    <Router>
      <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"  /> 
          <Route path="upload" element={<Upload uploadLabel={uploadLabel} data={data} addFile={addFile} />}/> 
          <Route path="insights" element={<Insights data={data} emotions={emotions} emotionCounts={emotionCounts}/>}/>
					<Route path="insights/emotions" element={<Emotions uploadLabel={uploadLabel} data={data} emotions={emotions} emotionCounts={emotionCounts}/>}/>
					<Route path="insights/summarize" element={<Summarize/>}/> 
          <Route path="saved" element={<SavedEmotions/>}/> 
        </Routes>
      </main>
      </div>
    </Router>
    
  );
}

export default App;
