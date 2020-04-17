import React from 'react';
import styles from './drawResult.css';
import { stringToNumberFormat, getWeekdays } from '../../utils/Helper';
import moment from 'moment';

class KenoResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keno: []
    };
  }

  componentWillReceiveProps(nextProps) {
     console.log(nextProps.result);
    if (this.state.keno.length === 0 && nextProps.result != null) {
      this.setState({ keno: nextProps.result });
    }
  }
  componentDidMount() {
    console.log(this.props.result);
    if (this.state.keno.length === 0 && this.props.result != null) {
      this.setState({ keno: this.props.result });
    }
  }

  renderView() {
    if (this.state.keno.length > 0) {
      return (
        <div>
          {this.state.keno.map((item, index, data) => {
            const date = new Date(item.DrawDate);

            const number = item.DrawResult.split(",");
            return (
              <div key={index}>
                <div className={styles.list_item}>
                  <div className={styles.result}>
                    <img
                      className={styles.logo}
                      src={require("../../assets/keno_logo.png")}
                      alt=""
                    />
                    <div
                      style={{
                        marginLeft: 8
                      }}
                    >
                      {`Kết quả QSMT kỳ #${
                        item.DrawCode
                        }`}
                    </div>
                  </div>

                  <div className={styles.result}>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[0]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[1]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[2]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[3]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[4]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[5]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[6]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[7]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[8]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[9]}
                    </div>
                  </div>
                  <div className={styles.result}>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[10]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[11]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[12]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[13]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[14]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[15]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[16]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[17]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[18]}
                    </div>
                    <div className={index === 0 ? styles.text_number_circle_keno_1 : styles.text_number_circle_keno}>
                      {number[19]}
                    </div>
                  </div>
                  <div className={styles.keno_group_parity}>
                    <div
                      className={
                        item.EvenNumber > 12
                          ? styles.keno_parity_active
                          : styles.keno_parity
                      }
                    >{`Chẵn (${item.EvenNumber} số)`}</div>
                    <div
                      className={
                        item.OddNumber > 12
                          ? styles.keno_parity_active
                          : styles.keno_parity
                      }
                    >{`Lẻ (${item.OddNumber} số)`}</div>
                    <div className={styles.div_border}></div>
                    <div
                      className={
                        item.BigNumber > 12
                          ? styles.keno_parity_active
                          : styles.keno_parity
                      }
                    >{`Lớn (${item.BigNumber} số)`}</div>
                    <div
                      className={
                        item.SmallNumber > 12
                          ? styles.keno_parity_active
                          : styles.keno_parity
                      }
                    >{`Nhỏ (${item.SmallNumber} số)`}</div>
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
export default KenoResult;