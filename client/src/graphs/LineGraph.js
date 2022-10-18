import React from 'react';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { defaults } from 'chart.js';
import { useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

defaults.font.family = "Open Sans";


const LineGraph = (props) => {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (id) {
      // získej data z DB
      console.log("DEBUG: Načtený graf ID: " + id);
      setTitle("Načtený graf");
      setShowTitle(true);
      setDatasets([{ label: "dataset jedna", data: [1, 2, 3, 4] }, { label: "dataset dva", data: [3, 1, 4, 2] }]);
      setLabels(["leden", "únor", "březen", "duben"]);
    }

    if (props.title) {
      setShowTitle(true);
      setTitle(props.title);
    }

    if (props.datasets) {
      setDatasets(props.datasets);
    }

    if (props.labels) {
      setLabels(props.labels);
    }
  }, [props.datasets, props.title, props.labels])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
        }
      },
      title: {
        display: showTitle,
        text: title.toUpperCase(),
        color: "#244a90",
        font: {
          weight: 700,
          size: 16,
        }
      },
    },
  };

  const getOrderedData = (data) => {
    let orderedData = [];
    data.map((number, index) => {
      if (data.length > labels.length) {
        orderedData.push(data[data.length - labels.length + index])
      } else {
        orderedData.push(number);
      }
    })
    return orderedData;
  }

  const colors = ["#4786c0", "#6ba23e", "#e3a619", "#b31217", "#76a4bd", "#8c9399"];

  const data = {
    labels,
    datasets: datasets.map((item, index) => {
      return ({
        label: item.label,
        data: getOrderedData(item.data),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
      })
    }),
  };

  return (
    <Line options={options} data={data} />
  );
}

export default LineGraph