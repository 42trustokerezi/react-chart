import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const DisplayChart = () => {
    const [chart, setChart] = useState([])

    var baseUrl  = 'https://coinranking1.p.rapidapi.com/coins/?limit=20'
    
    useEffect(() => {
        const fetchCoins = async () => {
            await fetch(`${baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': '83b76aa387mshf0fda19515001f8p1dff42jsn936d46847973',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Credentials" : true 
                }
            }).then((res) => {
                res.json().then((json) => {
                    console.log(json)
                    setChart(json.data)
                })
            }).catch(err => {
                console.error(err)
            })
        }
        fetchCoins();
    }, [baseUrl, ])

    var data = {
        labels: chart?.coins.map(i => i.name),
        datasets: [{
            label: `${chart?.coins.length} Coins`,
            data: chart?.coins.map(i => i.price),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

        var options = {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            legend: {
                labels: {
                    fontSize: 26
                }
            }
        }
    
  return (
    <div>
        <h1>Bar Chart</h1>
              <div>
                  <Bar
                    data={data}
                    height={400}
                    options={options}
                  />
              </div>
    </div>
  )
}

export default DisplayChart