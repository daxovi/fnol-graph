import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import { useState, useEffect } from 'react';

function App() {
  const [width, setWidth] = useState(600);
  const [datasetsNr, setDatasetsNr] = useState(2);
  const [datasets, setDatasets] = useState([{ text: "dataset jedna" }, { text: "dataset dva" }])
  const [title, setTitle] = useState("");

  useEffect(() => {


  }, [datasets])

  const closeDataset = (index) => {
    let array = [...datasets];
    array.splice(index, 1)
    setDatasets(array);
  }

  const openDataset = () => {
    let array = [...datasets];
    array.push({ text: "nový dataset" });
    setDatasets(array);
  }

  const updateDataset = (index, object) => {
    let array = [...datasets];
    array[index] = object;
    setDatasets(array);
  }


  return (
    <div className="App">
      <label>Titulek: <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /></label> <br />
      <label>Šířka grafu: <input type="number" value={width} onChange={(e) => { setWidth(e.target.value) }} /></label> <br />
      {datasets.map((e, index) => {
        return (
          <div key={index}>
            <p>ahoj {index} {e.text}</p>
            <input type="text" value={e.text} onChange={(value) => { updateDataset(index, {text: value.target.value}) }} />
            <button onClick={() => { closeDataset(index) }}>Close</button>
          </div>
        )
      })}
      <button onClick={() => { openDataset() }}>Add new</button>
      <div style={{ display: "block", width: width + "px" }} >
        <LineGraph datasets={datasets} title={title} />
      </div>
    </div>
  );
}

export default App;
