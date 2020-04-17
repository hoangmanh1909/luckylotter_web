import React from "react";
import styles from "./drawResult.css";
import { stringToNumberFormat, getWeekdays } from "../../utils/Helper";
import moment from "moment";

class Lottery123Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lottery_123: []
    };
  }

  componentWillReceiveProps(nextProps) {
    //  console.log(nextProps.result);
    if (this.state.lottery_123.length === 0 && nextProps.result != null) {
      this.setState({ lottery_123: nextProps.result });
    }
  }
  componentDidMount() {
    // console.log(this.props.result);
    if (this.state.lottery_123.length === 0 && this.props.result != null) {
      this.setState({ lottery_123: this.props.result });
    }
  }

  renderView() {
    if (this.state.lottery_123.length > 0) {
      return (
        <div >
          {this.state.lottery_123.map((item, index, data) => {
            const dateParts = item.DrawDate.split("/");
            const date = new Date(
              dateParts[2],
              dateParts[1] - 1,
              dateParts[0]
            ); 

            const number = item.DrawResult.split(",");
            return (
              <div key={index}>
                <div className={styles.list_item}>
                  <div className={styles.result}>
                    <img
                      className={styles.logo_123}
                      src={require("../../assets/lottery_123.png")}
                      alt=""
                    />
                  </div>

                  <div className={styles.result}>
                    <div
                      className={
                        index === 0
                          ? styles.text_number_circle_lottery_123
                          : styles.text_number_circle_lottery_123_1
                      }
                    >
                      {number[0]}
                    </div>
                    <div
                      className={
                        index === 0
                          ? styles.text_number_circle_lottery_123_sc
                          : styles.text_number_circle_lottery_123_1_sc
                      }
                    >
                      {number[1]}
                    </div>
                    <div
                      className={
                        index === 0
                          ? styles.text_number_circle_lottery_123_th
                          : styles.text_number_circle_lottery_123_1_th
                      }
                    >
                      {number[2]}
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: 8
                    }}
                  >
                    {`Kỳ quay #${item.DrawCode}. ${getWeekdays(
                      date.getDay()
                    )}, ${item.DrawDate}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div style={{ background: "#EEEEEE", paddingTop: 2 }}>
        {this.renderView()}
      </div>
    );
  }
}
export default Lottery123Result;
