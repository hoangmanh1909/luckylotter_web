import React from 'react';
import styles from './drawResult.css';
import { stringToNumberFormat, getWeekdays } from '../../utils/Helper';
import moment from 'moment';

class MegaResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mega: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mega.length === 0) {
      this.setState({ mega: nextProps.result });
    }
  }
  componentDidMount() {
    if (this.state.mega.length === 0) {
      this.setState({ mega: this.props.result });
    }
  }

  renderView() {
    if (this.state.mega.length > 0) {
      return (
        <div>
          {this.state.mega.map((item, index, data) => {
            const date = new Date(item.DrawDate);

            const number = item.DrawResult.split(",");
            return (
              <div key={index}>
                <div className={styles.list_item}>
                  <div className={styles.result}>
                    <img
                      className={styles.logo}
                      src={require("../../assets/mega.png")}
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
                  </div>
                  <div
                    style={{
                      marginLeft: 8
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
    return (
      <div style={{ background: "#EEEEEE", paddingTop: 2 }}>
        {this.renderView()}
      </div>
    );
  }
}
export default MegaResult;