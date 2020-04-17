import React from "react";
import styles from "./drawResult.css";
import { stringToNumberFormat, getWeekdays } from "../../utils/Helper";
import moment from "moment";

class Max4DResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max4d: []
    };
  }

  componentDidMount() {
    if (this.state.max4d.length === 0) {
      this.setState({ max4d: this.props.result });
    }
  }

  renderView() {
    if (this.state.max4d.length > 0) {
      return (
        <div>
          {this.state.max4d.map((item, index, data) => {
            const date = new Date(item.DrawDate);
            const resultNd = item.ResultND.split(",");
            const resultRD = item.ResultRD.split(",");

            return (
              <div key={index}>
                <div className={styles.list_item}>
                  <img
                    className={styles.logo_max4d}
                    src={require("../../assets/max4d.png")}
                    alt=""
                  />
                  <div>
                    <div className={styles.text_header}>
                      Giải nhất
                    </div>
                    <div className={styles.result_max4d}>
                      <div className={styles.text_number_circle_st}>
                        {item.ResultST.toString().substr(0, 1)}
                      </div>
                      <div className={styles.text_number_circle_st}>
                        {item.ResultST.toString().substr(1, 1)}
                      </div>
                      <div className={styles.text_number_circle_st}>
                        {item.ResultST.toString().substr(2, 1)}
                      </div>
                      <div className={styles.text_number_circle_st}>
                        {item.ResultST.toString().substr(3, 1)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.text_header}>
                      Giải nhì
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_nd1}
                      >
                        {resultNd[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd1}
                      >
                        {resultNd[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd1}
                      >
                        {resultNd[0].toString().substr(2, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd1}
                      >
                        {resultNd[0].toString().substr(3, 1)}
                      </div>

                      <div
                        style={{
                          borderRight: "1px solid gray",
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_nd2}
                      >
                        {resultNd[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd2}
                      >
                        {resultNd[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd2}
                      >
                        {resultNd[1].toString().substr(2, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd2}
                      >
                        {resultNd[1].toString().substr(3, 1)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.text_header}>
                      Giải ba
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_rd1}
                      >
                        {resultRD[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd1}
                      >
                        {resultRD[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd1}
                      >
                        {resultRD[0].toString().substr(2, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd1}
                      >
                        {resultRD[0].toString().substr(3, 1)}
                      </div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_rd2}
                      >
                        {resultRD[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd2}
                      >
                        {resultRD[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd2}
                      >
                        {resultRD[1].toString().substr(2, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd2}
                      >
                        {resultRD[1].toString().substr(3, 1)}
                      </div>

                      <div
                        style={{
                          borderRight: "1px solid gray",
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_rd3}
                      >
                        {resultRD[2].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd3}
                      >
                        {resultRD[2].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd3}
                      >
                        {resultRD[2].toString().substr(2, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd3}
                      >
                        {resultRD[2].toString().substr(3, 1)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <div>
                        <div className={styles.text_header}>
                          Giải khuyến khích 1
                        </div>
                        <div className={styles.result_max4d}>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            x
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            {item.ResultENC1.toString().substr(
                              0,
                              1
                            )}
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            {item.ResultENC1.toString().substr(
                              1,
                              1
                            )}
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            {item.ResultENC1.toString().substr(
                              2,
                              1
                            )}
                          </div>

                          <div
                            style={{
                              borderRight: "1px solid gray",
                              height: 22,
                              alignSelf: "center",
                              margin: "0px 4px"
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className={styles.text_header}>
                          Giải khuyến khích 2
                        </div>
                        <div className={styles.result_max4d}>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            x
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            x
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            {item.ResultENC2.toString().substr(
                              0,
                              1
                            )}
                          </div>
                          <div
                            className={
                              styles.text_number_circle_enc
                            }
                          >
                            {item.ResultENC2.toString().substr(
                              1,
                              1
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      margin: "4px 0px"
                    }}
                  >
                    {`Kỳ quay #${item.DrawCode}. ${getWeekdays(
                      date.getDay()
                    )}, ${moment(item.DrawDate).format(
                      "DD/MM/YYYY"
                    )}`}
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
export default Max4DResult;
