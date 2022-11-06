import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadGraph } from './loadGraph';

function EditGraph() {
  const [width, setWidth] = useState(600);
  const [datasets, setDatasets] = useState([{ label: "dataset jedna", data: [1, 2, 3, 4] }, { label: "dataset dva", data: [1, 2, 3, 4] }])
  const [title, setTitle] = useState("");
  const [labelText, setLabelText] = useState("leden, únor");
  const [labels, setLabels] = useState(["leden", "únor"]);
  const [loaded, setLoaded] = useState(false)
  const [loadedGraph, setLoadedGraph] = useState();

  let { id } = useParams();

  const updateDB = () => {
    loadGraph().then((value) => {
      if (value) {
        console.log(value);
        setLoadedGraph(value);
      }
    });
  }

  useEffect(() => {
    if (id && !loaded) {
      updateDB();
      console.log("DEBUG: Načtený graf ID: " + id);
      setTitle("Načtený graf");
      setDatasets([{ label: "dataset jedna", data: [1, 2, 3, 4] }, { label: "dataset dva", data: [3, 1, 4, 2] }]);
      setLabelText("leden, únor, březen, duben");
      setLabels(["leden", "únor", "březen", "duben"]);
      setLoaded(true);
    }
  }, [datasets, loadedGraph])

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
    updateDataset(index, { label: datasets[index].label, data: array });
  }

  const saveGraph = () => {
    console.log("uložení grafu");
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("width: " + width);
    console.log("label: " + labelText);
    console.log("datasets: ");
    console.dir(datasets);
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
            <input type="text" value={e.label} onChange={(value) => { updateDataset(index, { label: value.target.value, data: e.data }) }} />
            <input type="text" value={e.data.join(", ")} onChange={(value) => { updateData(index, value.target.value) }} />
            <button onClick={() => { closeDataset(index) }}>Close</button>
          </div>
        )
      })}
      <button onClick={() => { openDataset() }}>Add new</button>
      <button onClick={() => { saveGraph() }}>Uložit graf</button>
      <div style={{ display: "block", width: width + "px" }} >
        <LineGraph datasets={datasets} title={title} labels={labels} />

      </div>
    </div>
  );
}

export default EditGraph;