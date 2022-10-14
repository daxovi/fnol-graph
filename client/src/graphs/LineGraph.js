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
  const [datasets, setDatasets] = useState([1, 3]);

  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
    }

    if (props.datasets) {
      let array = [];
      for (let i = 0; i < props.datasets; i++) {
        array[i] = props.datasets
      }
      setDatasets(array);
    }
  }, [props.datasets, props.title])

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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  const data = {
    labels,
    datasets: datasets.map(() => {
      return ({
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * 10)),
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