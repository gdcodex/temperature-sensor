import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Line } from "react-chartjs-2";
import "./home.css";

function Home() {
  const [from, onChangeFrom] = useState("");
  const [to, onChangeTo] = useState("");
  const [chartData, setchartData] = useState({});
  const chart = () => {
    setchartData({
      labels: ["monday","tuesday", "wednesday","thursday", "friday"],
      datasets: [
        {
          label: "Temperatures",
          data: [20, -30, 35, 40, 69],
          backgroundColor: ["#835858"],
          borderWidth: 4,
        },
      ],
    });
  };
  const http =(sensor)=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer kwyo07m02ndy3nx9nayzo11q");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:5000/api/temperatures?sensor=${sensor}&from=${from.toUTCString()}&to=${to.toUTCString()}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result)))
  .catch(error => console.log('error', error));
  }
  React.useEffect(() => {
    chart();
    if(from && to){
      console.log("from"+from.toUTCString())
      console.log("to"+to.toUTCString())
    }
  }, [from,to]);
  return (
    <div className="home">
      <header>
        <h3>Temperature visualizer</h3>
      </header>
      <div className="home-body">
        <section className="picker-section">
          <div className="picker-top">
            <div className="pickers">
              <h5>From</h5>
              <DateTimePicker onChange={onChangeFrom} value={from} />
            </div>
            <div className="pickers">
              <h5>To</h5>
              <DateTimePicker onChange={onChangeTo} value={to} />
            </div>
          </div>
          <div className="sensor-list">
          <p key={1} onClick={()=>{http("sensor1")}}>Sensor 1</p>
          <p key={2} onClick={()=>{http("sensor2")}}>Sensor 2</p>
          <p key={3} onClick={()=>{http("sensor3")}}>Sensor 3</p>
          </div>
        </section>
        <section className="graph">
        <Line
          data={chartData}
          options={{
            responsive: "true",
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  ticks:{
                    autoSkip:true,
                    maxTicksLimit:4
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
        </section>
      </div>
    </div>
  );
}

export default Home;
