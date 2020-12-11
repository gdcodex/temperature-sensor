import React from "react";
import DateTimePicker from "react-datetime-picker";

function Picker(props) {
  return (
    <>
      <div className="picker-top">
        <div className="pickers">
          <h5>From</h5>
          <DateTimePicker
            onChange={props.picker.onChangeFrom}
            value={props.picker.from}
          />
        </div>
        <div className="pickers">
          <h5>To</h5>
          <DateTimePicker
            onChange={props.picker.onChangeTo}
            value={props.picker.to}
          />
        </div>
      </div>
      <div className="sensor-list">
        <p
          key={1}
          onClick={() => {
            props.picker.http("sensor1");
          }}
        >
          Sensor 1
        </p>
        <p
          key={2}
          onClick={() => {
            props.picker.http("sensor2");
          }}
        >
          Sensor 2
        </p>
        <p
          key={3}
          onClick={() => {
            props.picker.http("sensor3");
          }}
        >
          Sensor 3
        </p>
      </div>
    </>
  );
}

export default Picker;
