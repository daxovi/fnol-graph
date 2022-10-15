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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = (props) => {
  const [title, setTitle] = useState("");
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (props.title) {
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
      },
      title: {
        display: props.title ? true : false,
        text: title,
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

  const data = {
    labels,
    datasets: datasets.map((item) => {
      return ({
        label: item.label,
        data: getOrderedData(item.data),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      })
    }),
  };

  return (
    <Line options={options} data={data} />
  );
}

export default LineGraph