import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadGraph } from './loadGraph';
import './EditGraph.css';


function EditGraph() {
  const [datasets, setDatasets] = useState([{ label: "dataset jedna", data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)) }, { label: "dataset dva", data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)) }])
  const [title, setTitle] = useState("");
  const [labelText, setLabelText] = useState("leden, únor, březen, duben, červen, červenec, srpen, září, říjen, listopad, prosinec");
  const [labels, setLabels] = useState(["leden", "únor", "březen", "duben", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec" ]);
  const [loaded, setLoaded] = useState(false)
  const [loadedGraph, setLoadedGraph] = useState();
  const [idGraph, setIdGraph] = useState();
  const [editing, setEditing] = useState(false);

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

  const typewatch = function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    }
  }();

  const closeDataset = (index) => {
    let array = [...datasets];
    array.splice(index, 1)
    setDatasets(array);
  }

  const openDataset = () => {
    let array = [...datasets];
    array.push({ label: "nový dataset", data: Array.from({length: 12}, () => Math.floor(Math.random() * 20)) });
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
      <div className="main-color">
        <div className="content">
          <div className="header">
            <img src="http://127.0.0.1:3000/fnol.svg" alt="" />
            <h1>Editace grafu</h1>
          </div>
          <div className="settings">
            <label for="last_name">Název: </label>
            <input name="last_name" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />

            <label for="last_name">Kód pro vložení: </label>
            <input name="last_name" type="text" value={idGraph} onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div className="save">
            <button className='btn-hi' onClick={() => { idGraph ? updateGraph() : saveGraph() }}>Uložit graf</button>

          </div>

        </div>
      </div>
      <div className="low-color">
        <div className="content">
          <div className="row">
            <label for="label">Legenda na ose X:</label> <input name='label' type="text" value={labelText} onChange={(e) => { updateLabel(e.target.value) }} />
          </div>
        </div>
      </div>
      <div className="low-color">
        <div className="content">
          <div className="table">
            <div className="non-mobile">Název datasetu</div>
            <div className="non-mobile">Hodnoty</div>
            <div className="non-mobile"></div>
          </div>
          {datasets.map((e, index) => {
            return (
              <div className='table' key={index}>
                <div className="mobile">Název datasetu</div>
                <div><input type="text" value={e.label} onChange={(value) => { updateDataset(index, { label: value.target.value, data: e.data }) }} /></div>
                <div className="mobile">Hodnoty</div>
                <div><input type="text" value={e.data.join(", ")} onChange={(value) => { updateData(index, value.target.value) }} /></div>
                <div className='close'><a className='btn-low btn-low__delete' href='#' onClick={() => { closeDataset(index) }}><i class="bi bi-x"></i> odstranit dataset</a></div>
              </div>
            )
          })}

          <div className="table">
            <a className='btn-low btn-low__new' href='#' onClick={() => { openDataset() }}><i class="bi bi-plus-circle"></i> přidat dataset</a>
          </div>
        </div>
      </div>
      <div className="low-color"></div>
      <div className="content--white">
        <div className="content">
          <div className="graph">
            <LineGraph datasets={datasets} title={title} labels={labels} />

          </div>
        </div>
      </div>



      <div className="footer">
        <div className="content">
          <label>Id: {idGraph}</label>
        </div></div>
    </div>
  );
}

export default EditGraph;