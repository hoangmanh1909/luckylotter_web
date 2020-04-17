import React, { Component } from "react";
import Countdown from "react-countdown-now";
import moment from "moment";

const date = new Date();

const dayMT = () => {
  const h = date.getHours();
  let d = date.getDay();
  let day = 0;
  switch (d) {
    case 0:
      day = 1;
      break;
    case 1:
      if (h > 17) day = 2;
      else day = 0;
      break;
    case 2:
      day = 1;
      break;
    case 3:
      if (h > 17) day = 2;
      else day = 0;
      break;
    case 4:
      day = 1;
      break;
    case 5:
      if (h > 17) day = 3;
      else day = 0;
      break;
    case 6:
      day = 2;
      break;
    default:
      break;
  }
  const newDate = moment(date)
    .add(day, "d")
    .format("YYYY-MM-DD");
  return newDate;
};

class CountDownMax3D extends Component {
  render() {
    const future = moment().format("YYYY-MM-DD HH:mm:ss");
    const currentDate = moment([dayMT(), 18, 0, 0], "YYYY-MM-DD HH:mm:ss");
    const sec = currentDate.diff(future, "milliseconds");
    return (
      <div
        style={{
          fontSize: "11pt"
        }}
      >
        <Countdown date={Date.now() + sec}></Countdown>
      </div>
    );
  }
}

export default CountDownMax3D;
