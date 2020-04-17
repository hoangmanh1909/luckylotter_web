import React from "react";
import styles from "./../components/Main.less";
import { getPadLeft } from "./../utils/Helper";

let _isMount;

class CountDownKeno extends React.Component {
  constructor() {
    super();
    this.state = {
      time: {
        h: 0,
        m: 0,
        s: 0
      },
      seconds: 600
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentWillMount() {
    this._isMount = true;
    if (this.props.downTime > 0) {
      this.setState({ seconds: this.props.downTime, type: this.props.type });
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  setState(params) {
    if (this._isMount) super.setState(params);
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      this.setState({
        time: this.secondsToTime(600),
        seconds: 600
      });
      if (this.state.type != 1) this.props.nextPeriod();
    }
  }

  renderKeno() {
    let minutes = getPadLeft(this.state.time.m.toString());
    let second = getPadLeft(this.state.time.s.toString());
    if (this.state.type != 1) {
      return (
        <div style={{ display: "flex" }}>
          <div className={styles.count_down_minutes}>
            {minutes.substr(0, 1)}
          </div>
          <div className={styles.count_down_minutes}>
            {minutes.substr(1, 1)}
          </div>
          <div style={{ color: "#60605B", marginRight: -2 }}>:</div>
          <div className={styles.count_down_second}>{second.substr(0, 1)}</div>
          <div className={styles.count_down_second}>{second.substr(1, 1)}</div>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex" }}>
          <div>{minutes.substr(0, 1)}</div>
          <div>{minutes.substr(1, 1)}</div>
          <div>:</div>
          <div>{second.substr(0, 1)}</div>
          <div>{second.substr(1, 1)}</div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderKeno()}</div>;
  }
}

export default CountDownKeno;
