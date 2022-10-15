import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import { useState, useEffect } from 'react';

function App() {
  const [width, setWidth] = useState(600);
  const [datasets, setDatasets] = useState([{ label: "dataset jedna", data: [1, 2, 3, 4] }, { label: "dataset dva", data: [1, 2, 3, 4] }])
  const [title, setTitle] = useState("");
  const [labelText, setLabelText] = useState("leden, únor");
  const [labels, setLabels] = useState(["leden", "únor"]);
  const [dataText, setDataText] = useState("1, 2, 3");
  const [data, setData] = useState([1, 2, 3]);

  useEffect(() => {


  }, [datasets])

  const closeDataset = (index) => {
    let array = [...datasets];
    array.splice(index, 1)
    setDatasets(array);
  }

  const openDataset = () => {
    let array = [...datasets];
    array.push({ label: "nový dataset", data: [1, 2, 3] });
    setDatasets(array);
  }

  const updateDataset = (index, object) => {
    let array = [...datasets];
    array[index] = object;
    setDatasets(array);
  }

  const updateLabel = (text) => { 
    setLabelText(text);
    let reducedText = text.replaceAll(", ", ",");
    let array = reducedText.split(",");
    console.log(array);
    setLabels(array);
   }

   const updateData = (index, text) => { 
    let reducedText = text.replaceAll(", ", ",");
    let array = reducedText.split(",");
    updateDataset(index, {label: datasets[index].label, data: array});
    }


  return (
    <div className="App">
      <label>Titulek: <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /></label> <br />
      <label>Šířka grafu: <input type="number" value={width} onChange={(e) => { setWidth(e.target.value) }} /></label> <br />
      <label>Label: <input type="text" value={labelText} onChange={(e) => { updateLabel(e.target.value) }} /></label> <br />
      {datasets.map((e, index) => {
        return (
          <div key={index}>
            <p>{index} {e.label}</p>
            <input type="text" value={e.label} onChange={(value) => { updateDataset(index, {label: value.target.value, data: e.data}) }} />
            <input type="text" value={e.data.join(", ")} onChange={(value) => { updateData(index, value.target.value) }} />
            <button onClick={() => { closeDataset(index) }}>Close</button>
          </div>
        )
      })}
      <button onClick={() => { openDataset() }}>Add new</button>
      <div style={{ display: "block", width: width + "px" }} >
        <LineGraph datasets={datasets} title={title} labels={labels} />
      </div>
    </div>
  );
}

export default App;
