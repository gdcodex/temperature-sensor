import React, { useState } from "react";
import Picker from "../picker/picker";
import Chart from "../chart/chart";
import "./home.css";

function Home() {
  const [from, onChangeFrom] = useState(
    new Date("Fri Dec 11 2020 12:00:00 GMT+0530")
  );
  const [to, onChangeTo] = useState(
    new Date("Fri Dec 11 2020 18:00:00 GMT+0530")
  );
  const [chartData, setchartData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [value, setvalue] = useState(false);
  const chart = (labelArray, dataArray) => {
    setchartData({
      labels: labelArray,
      datasets: [
        {
          label: "Temperatures(in C)",
          data: dataArray,
          backgroundColor: ["#835858"],
          borderWidth: 4,
        },
      ],
    });
  };
  const http = (sensor) => {
    setloading(true);
    seterror(false);
    setvalue(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer kwyo07m02ndy3nx9nayzo11q");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/temperatures?sensor=${sensor}&from=${from.toUTCString()}&to=${to.toUTCString()}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setloading(false);
        let val = JSON.parse(result)
        console.log(JSON.parse(result));
        if(val.temperature.length===0) setvalue(true);
        const labelArray = [];
        const dataArray = [];
        val.temperature.map((e, i) => {
          labelArray.push(i);
          dataArray.push(e.temperature);
        });
        chart(labelArray, dataArray);
      })
      .catch((error) => {
        seterror(error); // error handling
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    http("sensor3");
  }, []);
  return (
    <div className="home">
      <header>
        <h3>Temperature visualizer</h3>
      </header>
      <div className="home-body">
        <section className="picker-section">
          <Picker picker={{ from, to, onChangeFrom, onChangeTo, http }} />
        </section>
        <section className="graph">
          {!loading&& !value && !error && <Chart chartData={chartData} />}
          {loading && <h3>Loading...</h3>}
          {error && <h3>{error}</h3>}
          {value && <h5 id="no-data">No data found for the given range</h5>}
        </section>
      </div>
    </div>
  );
}

export default Home;
