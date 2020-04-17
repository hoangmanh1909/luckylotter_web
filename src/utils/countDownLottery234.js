import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown-now";
import moment from "moment";

const date = new Date();

const dayMT = () => {
  const h = date.getHours();
  const m = date.getMinutes();
  let d = date.getDay();
  let day = 0;
  if (h > 17) day = 1;
  const newDate = moment(date)
    .add(day, "d")
    .format("YYYY-MM-DD");
  return newDate;
};

class CountDownLottery234 extends Component {
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      <Countdown date={Date.now() + 24 * 60 * 60 * 1000}></Countdown>;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}
        </span>
      );
    }
  };
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
        <Countdown date={Date.now() + sec} renderer={this.renderer}></Countdown>
      </div>
    );
  }
}

export default CountDownLottery234;
