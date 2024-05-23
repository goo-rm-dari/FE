import { useEffect, useState } from 'react';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineGraph({
  data,
  title = '',
}: {
  data: { x: number; y: number; z: number }[];
  title?: string;
}) {
  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const [graphData, setGraphData] = useState({
    labels: data.map(() => ''),
    datasets: [
      {
        label: 'X',
        data: data.map(item => item.x),
        borderColor: '#2e82ff',
        backgroundColor: '#2e82ff',
      },
      {
        label: 'Y',
        data: data.map(item => item.y),
        borderColor: '#ff462e',
        backgroundColor: '#ff462e',
      },
      {
        label: 'Z',
        data: data.map(item => item.z),
        borderColor: '#54ff2e',
        backgroundColor: '#54ff2e',
      },
    ],
  });

  useEffect(() => {
    setGraphData({
      labels: data.map(() => ''),
      datasets: [
        {
          label: 'X',
          data: data.map(item => item.x),
          borderColor: '#2e82ff',
          backgroundColor: '#2e82ff',
        },
        {
          label: 'Y',
          data: data.map(item => item.y),
          borderColor: '#ff462e',
          backgroundColor: '#ff462e',
        },
        {
          label: 'Z',
          data: data.map(item => item.z),
          borderColor: '#54ff2e',
          backgroundColor: '#54ff2e',
        },
      ],
    });
  }, [data]);

  return (
    <div>
      <Line options={options} data={graphData} />
    </div>
  );
}

export { LineGraph };
