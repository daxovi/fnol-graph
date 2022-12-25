import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadGraph } from './loadGraph';

function EditGraph() {
  const [datasets, setDatasets] = useState([{ label: "dataset jedna", data: [1, 2, 3, 4] }, { label: "dataset dva", data: [1, 2, 3, 4] }])
  const [title, setTitle] = useState("");
  const [labelText, setLabelText] = useState("leden, únor");
  const [labels, setLabels] = useState(["leden", "únor"]);
  const [loaded, setLoaded] = useState(false)
  const [loadedGraph, setLoadedGraph] = useState();
  const [idGraph, setIdGraph] = useState();

  let { id } = useParams();

  const updateDB = () => {
    loadGraph().then((value) => {
      value.forEach(element => {
        if (element._id === id && !loaded) {
          console.log(element);
          setLoadedGraph(element);
          setTitle(element.title);
          setDatasets(element.datasets);
          setLabelText(element.label);
          setLabels(element.label.split(", "));
          setLoaded(true);
          setIdGraph(element._id);
        }
      });
    });
  }

  useEffect(() => {
    if (id && !loaded) {
      updateDB();
      console.log("DEBUG: Načtený graf ID: " + id);
    }
  }, [])

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

  const updateGraph = () => {
    console.log("update grafu");
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("label: " + labelText);
    console.log("datasets: ");
    console.dir(datasets);

    fetch("http://127.0.0.1:5000/save-graph" + `/${idGraph}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { title: title, label: labelText, datasets: datasets }
      )
    }).then((data) => {
      return data.json();
    }).then((finaldata) => {
      console.log(finaldata);
    })
  }

  const saveGraph = () => {
    console.log("uložení nového grafu");
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("label: " + labelText);
    console.log("datasets: ");
    console.dir(datasets);

    fetch("http://127.0.0.1:5000/save-graph", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(
        { title: title, label: labelText, datasets: datasets }
      )
    }).then((data) => {
      return data.json();
    }).then((finaldata) => {
      console.log(finaldata.msg);
      setIdGraph(finaldata.data);
    })
  }

  return (
    <div className="App">
      <label>Titulek: <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /></label> <br />
      <label>Id: {idGraph}</label> <br />
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
      <button onClick={() => { idGraph ? updateGraph() : saveGraph() }}>Uložit graf</button>
      <div style={{ display: "block"}} >
        <LineGraph datasets={datasets} title={title} labels={labels} />

      </div>
    </div>
  );
}

export default EditGraph;