import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import { useState, useEffect } from 'react';

function App() {
  const [width, setWidth] = useState(600);
  const [datasetsNr, setDatasetsNr] = useState(2);
  const [datasets, setDatasets] = useState([{text: "dataset jedna"}, {text: "dataset dva"}])
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (datasetsNr > datasets.length) {
      setDatasets(datasets.concat([{text: "nový dataset"}]));
      console.log(datasets);
    } 
    if (datasetsNr < datasets.length) {
      setDatasets(datasets.slice(0, datasets.length-1));
      console.log(datasets);
    } 

  }, [datasetsNr])
  

  return (
    <div className="App">
      <label>Titulek: <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /></label> <br />
      <label>Počet datasetů: <input type="number" value={datasetsNr} onChange={(e) => { setDatasetsNr(e.target.value) }} /></label> <br />
      <label>Šířka grafu: <input type="number" value={width} onChange={(e) => { setWidth(e.target.value) }} /></label> <br />
      {datasets.map((e, index) => {
        return (
          <p key={index}>ahoj {index} {e.text}</p>
        )
      })}
      <div style={{display: "block", width: width + "px" }} >
        <LineGraph datasets={datasets} title={title} />
      </div>
    </div>
  );
}

export default App;
