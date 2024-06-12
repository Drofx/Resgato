function generateSineWaveData(points, amplitude, frequency, offset) {
    const data = [];
    for (let i = 0; i < points; i++) {
      const value = amplitude * Math.sin((2 * Math.PI * frequency * i) / points) + offset;
      data.push(value);
    }
    return data;
  }

export const charts = {
    labels: Array.from({ length: 365 }, (_, i) => ""),
    datasets: [
      {
        label: 'Dataset 1',
        data: generateSineWaveData(365, 280, 3, 500),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 1',
        data: generateSineWaveData(365, 500, 2.7, 500),
        borderColor: 'rgb(138,43,226)',
        backgroundColor: 'rgb(138,43,226)',
      },
    ],
  };
