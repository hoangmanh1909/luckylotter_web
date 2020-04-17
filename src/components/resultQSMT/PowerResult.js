import React from 'react';
import styles from './drawResult.css';
import {stringToNumberFormat,getWeekdays} from '../../utils/Helper';
import moment from 'moment';

class PowerResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.state.power.length === 0 && this.state.power != nextProps.result) {
      this.setState({ power: nextProps.result });
    }
  }
  // componentDidMount() {
  //   console.log("componentDidMount");
  //   if (this.state.power.length === 0) {
  //     this.setState({ power: this.props.result });
  //   }
  // }

  renderView() {
    if (this.state.power.length > 0) {
      return (
        <div>
          {this.state.power.map((item, index, data) => {
            const date = new Date(item.DrawDate);
            const number = item.DrawResult.split(",");
            return (
              <div key={index}>
                <div className={styles.list_item}>
                  <div className={styles.result}>
                    <img
                      className={styles.logo}
                      src={require("../../assets/power.png")}
                      alt=""
                    />
                    
                  </div>
                  <div className={styles.result}>
                  <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[0]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[1]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[2]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[3]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[4]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_1 : styles.text_number_circle}>
                      {number[5]}
                    </div>
                    <div
                      className={styles.text_number_circle_bonus}
                    >
                      {item.BonusNumber}
                    </div>
                  </div>
                  <div
                      style={{
                        marginLeft: 4
                      }}
                    >
                      {`Kỳ quay #${
                        item.DrawCode
                      }. ${getWeekdays(date.getDay())}, ${moment(
                        item.DrawDate
                      ).format("DD/MM/YYYY")}`}
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
    // console.log("render");
    return (
      <div style={{ background: "#EEEEEE", paddingTop: 2 }}>
        {this.renderView()}
      </div>
    );
  }
}
export default PowerResult;