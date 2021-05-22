export const State = {
    labels: ['Monday', 'Tuesday', 'Wednesday',
             'Thursday', 'Friday', 'Saturday', 'Sunday'
            ],
      
    datasets: [
      {
        label: 'Total Penalties',
        fill: true,
        lineTension: 0.5,
        backgroundColor: '#ff9999',
        borderColor: '#ff9999',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 100, 20],
        pointBackgroundColor: '#0a3176',
        pointRadius: 4,
      },
      
      {
        label: 'Total Vehicles',
        fill: true,
        lineTension: 0.5,
        pointRadius: 4,
        backgroundColor: '#ff3333',
        borderColor: '#ff3333',
        borderWidth: 1,
        data: [10, 100, 150, 120, 90, 135, 200],
        pointBackgroundColor: '#00cc00',
      }
    ]
  }