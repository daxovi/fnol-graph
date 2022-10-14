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
    } else if (datasetsNr < datasets.length && 0 < datasetsNr) {
      setDatasets(datasets.pop());
      console.log(datasets);
    }

  }, [datasetsNr])
  

  return (
    <div className="App">
      <label>Titulek: <input type="text" onChange={(e) => { setTitle(e.target.value) }} /></label> <br />
      <label>Počet datasetů: <input type="number" onChange={(e) => { setDatasetsNr(e.target.value) }} /></label> <br />
      <label>Šířka grafu: <input type="number" onChange={(e) => { setWidth(e.target.value) }} /></label> <br />
      {datasets.map((e) => {
        return (
          <p key={Math.floor(Math.random() * 100)}>ahoj {e.text}</p>
        )
      })}
      <div style={{display: "block", width: width + "px" }} >
        <LineGraph datasets={datasetsNr} title={title} />
      </div>
    </div>
  );
}

export default App;
