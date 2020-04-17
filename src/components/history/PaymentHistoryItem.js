import React from "react";
import { Text, Toast, Button, WingBlank, Carousel, Flex, Modal, TextareaItem } from "antd-mobile";
import {
  stringToNumberFormat,
  getPadLeft,
  getTypeNameMax4D,
  getBagName,
  getWeekdays
} from "../../utils/Helper";
import { URL_IMAGE } from "../../config";
import styles from "./History.less";
import LightBox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import moment from 'moment';
import styles2 from './History.less';
const BrowserHistory = require('history/createBrowserHistory').default;

class PaymentHistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      listValue: [],
      listImage: [],
      status: "",
      imgHeight: 400,
      photoIndex: 0,
      isOpenImg: false,
      imgCaption: "",
      order: {},
      isWin: false,
      modal1: false,
      ReasonError: '',
      modal2: false,
      drawDate: '',
      proID: 0,
      LineAStatus: '',
      LineBStatus: '',
      LineCStatus: '',
      LineDStatus: '',
      LineEStatus: '',
      LineFStatus: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`nextProps ${JSON.stringify(nextProps)}`);
    // const value = this.props.location.payload.data;
    // console.log(nextProps);
    this.setState({
      status: this.props.location.payload.data.Status,
      order: this.props.location.payload.data
    });
    if (nextProps.response.data !== undefined) {
      if (nextProps.response.data.Code === "00") {
        // console.log(`test ${JSON.stringify(nextProps.response.ListValue)}`)
        this.setState({
          listValue: nextProps.response.data.ListValue
        });
      } else {
        Toast.info(nextProps.response.data.Message, 2);
      }
    } else if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
    // console.log(this.props)
    if (nextProps.ErrorOrder.data !== undefined) {
      if (nextProps.ErrorOrder.data.Code === "00") {
        Toast.info(nextProps.ErrorOrder.data.Message, 2);
      }
    }
  }
  onChangeReasonError = (value) => {
    this.setState({ ReasonError: value })
  }

  showModal = key => (e) => {
    e.preventDefault();
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  renderItem() {
    // console.log(`test ${JSON.stringify(this.state.listValue.length)}`)
    return this.state.listValue.map((item, index, data) => {
      let value = [];
      value = this.initRow(item, index);
      return value;
    });
  }

  initNumber = item => {
    let value = [];
    let M3Result = item.M3ResultST + "," + item.M3ResultND + "," + item.M3ResultRD + "," + item.M3ResultENC;
    if (item.LineA !== null && item.LineA !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineA,
          "A",
          item.PriceA,
          item.StatusLineA,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          M3Result
        )
      );
    }
    if (item.LineB !== null && item.LineB !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineB,
          "B",
          item.PriceB,
          item.StatusLineB,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          item.M3ResultST,
          M3Result
        )
      );
    }
    if (item.LineC !== null && item.LineC !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineC,
          "C",
          item.PriceC,
          item.StatusLineC,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          M3Result
        )
      );
    }
    if (item.LineD !== null && item.LineD !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineD,
          "D",
          item.PriceD,
          item.StatusLineD,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          M3Result
        )
      );
    }
    if (item.LineE !== null && item.LineE !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineE,
          "E",
          item.PriceE,
          item.StatusLineE,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          M3Result
        )
      );
    }
    if (item.LineF !== null && item.LineF !== "") {
      value.push(
        this.renderNumberGroup(
          item.LineF,
          "F",
          item.PriceF,
          item.StatusLineF,
          item.DrawResult,
          item.ResultST,
          item.ProductID,
          M3Result
        )
      );
    }
    return value;
  };

  renderNumberGroup = (
    item,
    type,
    price,
    statusWin,
    drawResult,
    resultST,
    productID,
    M3Result
  ) => {
    // console.log(item)
    const arr = item.split(",");
    return (
      <div style={{ display: "flex" }}>
        <div>
          <Text
            className={styles.text_header}
            style={{ float: "left", width: 30, fontWeight: "bold" }}
          >
            {type}
          </Text>
        </div>
        <div>{this.renderNumber(arr, statusWin, drawResult, resultST, M3Result)}</div>
        {productID === 2 || productID === 4 || productID === 7 ? (
          <div style={{ color: "#E32E35", marginLeft: 8, fontWeight: "bold" }}>
            {stringToNumberFormat(price) + "đ"}
          </div>
        ) : (
            ""
          )}
      </div>
    );
  };

  renderNumber = (arr, statusWin, drawResult, resultST, M3Result) => {
    // console.log(this.state.order.ProductID);
    // console.log(statusWin);
    // console.log(arr);
    let _item = arr.map((item1, index1, data1) => {
      if (
        this.state.order.ProductID === 1 ||
        this.state.order.ProductID === 3
      ) {
        // console.log(drawResult);
        let result = [];
        if (drawResult !== undefined) {
          let result = drawResult.split(",");

          const check = result.some(ele => ele === getPadLeft(item1));
          if (check) {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold",
                  color: "#E32E35"
                }}
              >
                {getPadLeft(item1)}
              </Text>
            );
          } else {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold"
                }}
              >
                {getPadLeft(item1)}
              </Text>
            );
          }
        } else {
          return (
            <Text
              key={index1}
              style={{
                float: "left",
                marginRight: 5,
                fontWeight: "bold"
              }}
            >
              {getPadLeft(item1)}
            </Text>
          );
        }
      } else {
        if (this.state.order.ProductID === 2) {
          if (
            statusWin === "A" ||
            statusWin === "B" ||
            statusWin === "C" ||
            (statusWin === "D" && index1 !== 0) ||
            (statusWin === "E" && (index1 === 2 || index1 === 3)) ||
            (resultST.substr(3, 1) === item1 && index1 === 3)
          ) {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold",
                  color: "#E32E35"
                }}
              >
                {item1}
              </Text>
            );
          } else {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold"
                }}
              >
                {item1}
              </Text>
            );
          }
        }
        if (this.state.order.ProductID === 5) {
          if (
            statusWin === "A" ||
            statusWin === "B" ||
            statusWin === "C" ||
            statusWin === "D" ||
            statusWin === "E" ||
            statusWin === "F" ||
            statusWin === "G"
          ) {
            let result1 = [];
            result1 = M3Result.split(",");
            const check = result1.some(ele => ele === getPadLeft(item1));
            if (check) {
              return (
                <Text
                  key={index1}
                  style={{
                    float: "left",
                    marginRight: 5,
                    fontWeight: "bold",
                    color: "#E32E35"
                  }}
                >
                  {getPadLeft(item1)}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index1}
                  style={{
                    float: "left",
                    marginRight: 5,
                    fontWeight: "bold"
                  }}
                >
                  {getPadLeft(item1)}
                </Text>
              );
            }

          } else {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold"
                }}
              >
                {item1}
              </Text>
            );
          }
        }
        else if (this.state.order.ProductID === 7) {

          let result123 = [];
          if (drawResult !== undefined) {
            result123 = drawResult.split(",");

            const check = result123.some(ele => ele === item1);
            if (check) {
              return (
                <Text
                  key={index1}
                  style={{
                    float: "left",
                    marginRight: 5,
                    fontWeight: "bold",
                    color: "#E32E35"
                  }}
                >
                  {item1}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index1}
                  style={{
                    float: "left",
                    marginRight: 5,
                    fontWeight: "bold"
                  }}
                >
                  {item1}
                </Text>
              );
            }
          } else {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold"
                }}
              >
                {getPadLeft(item1)}
              </Text>
            );
          }
        }
        else {
          // console.log("statusWin:" + statusWin)
          if (
            statusWin !== "O" &&
            statusWin !== undefined &&
            statusWin !== ""
          ) {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold",
                  color: "#E32E35"
                }}
              >
                {item1}
              </Text>
            );
          } else {
            return (
              <Text
                key={index1}
                style={{
                  float: "left",
                  marginRight: 5,
                  fontWeight: "bold"
                }}
              >
                {item1}
              </Text>
            );
          }
        }
      }
    });
    return _item;
  };

  checkStatusWin = item => {
    let statusWin = "";
    if (item.ProductID !== 5) {
      if (item.StatusLineA !== "") {
        switch (item.StatusLineA) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "I":
            statusWin = "I";
            break;
          case "K":
            statusWin = "K";
            break;
          case "L":
            statusWin = "L";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineB !== "" && statusWin !== "A") {
        switch (item.StatusLineB) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "I":
            statusWin = "I";
            break;
          case "K":
            statusWin = "K";
            break;
          case "L":
            statusWin = "L";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineC !== "" && statusWin !== "A") {
        switch (item.StatusLineC) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "I":
            statusWin = "I";
            break;
          case "K":
            statusWin = "K";
            break;
          case "L":
            statusWin = "L";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineD !== "" && statusWin !== "A") {
        switch (item.StatusLineD) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "I":
            statusWin = "I";
            break;
          case "K":
            statusWin = "K";
            break;
          case "L":
            statusWin = "L";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineE !== "" && statusWin !== "A") {
        switch (item.StatusLineE) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "I":
            statusWin = "I";
            break;
          case "K":
            statusWin = "K";
            break;
          case "L":
            statusWin = "L";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineF !== "" && statusWin !== "A") {
        switch (item.StatusLineF) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
    }
    else {
      if (item.StatusLineA !== "") {
        switch (item.StatusLineA) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineB !== "" && statusWin !== "A") {
        switch (item.StatusLineB) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineC !== "" && statusWin !== "A") {
        switch (item.StatusLineC) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          default:
            break;
        }
      }
      if (item.StatusLineD !== "" && statusWin !== "A") {
        switch (item.StatusLineD) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          case "H":
            statusWin = "H";
            break;
          default:
            break;
        }
      }
    }
    return statusWin;
  };
  checkStatusWin2(ProductID, StatusLineA, StatusLineB, StatusLineC, StatusLineD, StatusLineE, StatusLineF) {
    let statusWin = "";
    if (ProductID !== 5) {
      if (StatusLineA !== "") {
        switch (StatusLineA) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (StatusLineB !== "" && statusWin !== "A") {
        switch (StatusLineB) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (StatusLineC !== "" && statusWin !== "A") {
        switch (StatusLineC) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (StatusLineD !== "" && statusWin !== "A") {
        switch (StatusLineD) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (StatusLineE !== "" && statusWin !== "A") {
        switch (StatusLineE) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
      if (StatusLineF !== "" && statusWin !== "A") {
        switch (StatusLineF) {
          case "O":
            statusWin = "O";
            break;
          case "A":
          case "B":
          case "C":
          case "D":
          case "E":
          case "P":
          case "J":
            statusWin = "A";
            break;
          default:
            break;
        }
      }
    }
    else {
      if (StatusLineA !== "") {
        switch (StatusLineA) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          default:
            break;
        }
      }
      if (StatusLineB !== "" && statusWin !== "A") {
        switch (StatusLineB) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          default:
            break;
        }
      }
      if (StatusLineC !== "" && statusWin !== "A") {
        switch (StatusLineC) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          default:
            break;
        }
      }
      if (StatusLineD !== "" && statusWin !== "A") {
        switch (StatusLineD) {
          case "O":
            statusWin = "O";
            break;
          case "A":
            statusWin = "A";
            break;
          case "B":
            statusWin = "B";
            break;
          case "C":
            statusWin = "C";
            break;
          case "D":
            statusWin = "D";
            break;
          case "E":
            statusWin = "E";
            break;
          case "F":
            statusWin = "F";
            break;
          case "G":
            statusWin = "G";
            break;
          default:
            break;
        }
      }
    }
    return statusWin;
  };

  renderStatusWin = item => {
    // console.log(item);
    let statusWin = this.checkStatusWin(item);
    let value;
    if (item.ProductID === 5 || item.ProductID === 7) {
      if (statusWin === "O") {
        value = <div className={styles.status_detail_item}>So kết quả</div>;
      } else if (statusWin === "B" || statusWin === "C" || statusWin === "D" || statusWin === "E" || statusWin === "F" || statusWin === "G") {
        let amount =
          item.AmountA +
          item.AmountB +
          item.AmountC +
          item.AmountD +
          item.AmountE +
          item.AmountF;
        if (amount < 10000000) {
          value = (
            <div
              style={{
                border: "1px solid #E32E35",
                color: "#E32E35",
                padding: 3,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 108,
                width: 108,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <img
                  style={{ height: "16px", width: "16px", marginRight: 2 }}
                  src={require("../../assets/cup_do.png")}
                  alt=""
                />
              </div>
              <div>Trúng thưởng</div>
            </div>
          );
        } else if (amount => 10000) {
          value = (
            <div
              style={{
                border: "1px solid #f9a71b",
                color: "#f9a71b",
                padding: 3,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 108,
                width: 108,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <img
                  style={{ height: "16px", width: "16px", marginRight: 2 }}
                  src={require("../../assets/cup_vang.png")}
                  alt=""
                />
              </div>
              <div>Trúng thưởng</div>
            </div>
          );
        }
        if (!this.state.isWin) this.setState({ isWin: true });
      } else if (statusWin === "A") {
        value = (
          <div
            style={{
              border: "1px solid #E32E35",
              color: "#E32E35",
              padding: 3,
              borderRadius: 4,
              marginLeft: "auto",
              minWidth: 108,
              width: 108,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <img
                style={{ height: "16px", width: "16px", marginRight: 2 }}
                src={require("../../assets/jp.png")}
                alt=""
              />
            </div>
            <div>Trúng thưởng</div>
          </div>
        );
      } else if (item.OrderStatus === "H") {
        value = (
          <div
            style={{
              border: "1px solid #ffe447",
              color: "#ffe447",
              padding: 3,
              borderRadius: 4,
              marginLeft: "auto",
              minWidth: 108,
              width: 108,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>Đã báo vé lỗi</div>
          </div>
        );
      }else {
        value = <div className={styles.status_detail_item}>Chưa xổ</div>;
      }
    } else {
      if (statusWin === "O") {
        value = <div className={styles.status_detail_item}>So kết quả</div>;
      } else if (statusWin === "A") {
        let amount =
          item.AmountA +
          item.AmountB +
          item.AmountC +
          item.AmountD +
          item.AmountE +
          item.AmountF;
        if (amount < 10000000) {
          value = (
            <div
              style={{
                border: "1px solid #E32E35",
                color: "#E32E35",
                padding: 3,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 108,
                width: 108,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <img
                  style={{ height: "16px", width: "16px", marginRight: 2 }}
                  src={require("../../assets/cup_do.png")}
                  alt=""
                />
              </div>
              <div>Trúng thưởng</div>
            </div>
          );
        } else if (amount => 10000) {
          value = (
            <div
              style={{
                border: "1px solid #f9a71b",
                color: "#f9a71b",
                padding: 3,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 108,
                width: 108,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div>
                <img
                  style={{ height: "16px", width: "16px", marginRight: 2 }}
                  src={require("../../assets/cup_vang.png")}
                  alt=""
                />
              </div>
              <div>Trúng thưởng</div>
            </div>
          );
        }
        if (!this.state.isWin) this.setState({ isWin: true });
      } else if (statusWin === "J" || statusWin === "P") {
        value = (
          <div
            style={{
              border: "1px solid #E32E35",
              color: "#E32E35",
              padding: 3,
              borderRadius: 4,
              marginLeft: "auto",
              minWidth: 108,
              width: 108,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>
              <img
                style={{ height: "16px", width: "16px", marginRight: 2 }}
                src={require("../../assets/jp.png")}
                alt=""
              />
            </div>
            <div>Trúng thưởng</div>
          </div>
        );
      } else if (item.OrderStatus === "H") {
        value = (
          <div
            style={{
              border: "1px solid #ffe447",
              color: "#ffe447",
              padding: 3,
              borderRadius: 4,
              marginLeft: "auto",
              minWidth: 108,
              width: 108,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div>Đã báo vé lỗi</div>
          </div>
        );
      }
      else {
        value = <div className={styles.status_detail_item}>Chưa xổ</div>;
      }
    }

    return value;
  };

  price = (item, index) => {
    return (
      <div>
        <div>
          Vé số {index + 1}:
          <span
            style={{
              color: "#E32E35",
              fontWeight: "bold",
              fontSize: "11pt"
            }}
          >
            {`${stringToNumberFormat(item.Price)} đ`}
          </span>
        </div>
      </div>
    );
  };

  logo = item => {    
    let system;
    if (item.ProductID !== 2) {
      system = getBagName(item.SystemA);
    } else system = getTypeNameMax4D(item.SystemTypeA);

    if (item.ProductID === 1) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "100%" }}>{system}</div>
          <div>
            <img
              style={{ width: 50, height: 30 }}
              src={require("../../assets/mega.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
    if (item.ProductID === 2) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "100%" }}>{system}</div>
          <div>
            <img
              style={{ width: 50, height: 30 }}
              src={require("../../assets/max4d.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
    if (item.ProductID === 3) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "100%" }}>{system}</div>
          <div>
            <img
              style={{ width: 50, height: 30 }}
              src={require("../../assets/power.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
    if (item.ProductID === 4) {
      // return (
      //   <div style={{ display: "flex", alignItems: "center" }}>
      //     <div style={{ textAlign: "center", width: "100%" }}>{system}</div>
      //     <div>
      //       <img
      //         style={{ width: 50, height: 30 }}
      //         src={require("../../assets/max3d.png")}
      //         alt=""
      //       />
      //     </div>
      //   </div>
      // );
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ textAlign: "center", width: "100%" }}
          >{`Vé thường`}</div>
          <div>
            <img
              style={{ width: 55, height: 45 }}
              src={require("../../assets/max3dcong.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
    if (item.ProductID === 5) {
      // return (
      //   <div style={{ display: "flex", alignItems: "center" }}>
      //     <div style={{ textAlign: "center", width: "100%" }}>{system}</div>
      //     <div>
      //       <img
      //         style={{ width: 50, height: 30 }}
      //         src={require("../../assets/max3dcong.png")}
      //         alt=""
      //       />
      //     </div>
      //   </div>
      // );
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ textAlign: "center", width: "100%" }}
          >{`Vé thường`}</div>
          <div>
            <img
              style={{ width: 55, height: 45 }}
              src={require("../../assets/max3dcong.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
    if (item.ProductID === 7) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "100%", fontSize: "12pt", fontWeight: "bold" }}
          >{`Xổ số điện toán 123`}</div>
          <div>
            <img
              style={{ width: 70, height: 45 }}
              src={require("../../assets/lottery_123.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
  };

  imageOrder = item => {
    if (this.state.status === "A" || this.state.status === "H" || this.state.status === "I") {
      const imgBefore = URL_IMAGE + item.ImgBefore;
      const imgAfter = URL_IMAGE + item.ImgAfter;

      const listImage = [imgBefore, imgAfter];

      return (
        <div style={{ display: "flex", margin: 4, justifyContent: "center" }}>
          <img
            style={{
              height: 176,
              maxWidth: 200,
              width: "50%",
              marginRight: 4
            }}
            src={imgBefore}
            alt=""
            onClick={() => {
              this.setState({
                isOpenImg: true,
                listImage: listImage,
                drawDate: item.DrawDate,
                proID: item.ProductID,
                LineAStatus: item.StatusLineA,
                LineBStatus: item.StatusLineB,
                LineCStatus: item.StatusLineC,
                LineDStatus: item.StatusLineD,
                LineEStatus: item.StatusLineE,
                LineFStatus: item.StatusLineF
              });
              this.renderImgSlide();
            }}
          />
          <img
            style={{
              height: 176,
              maxWidth: 200,
              width: "50%",
              marginLeft: 4
            }}
            src={imgAfter}
            alt=""
            onClick={() => {
              this.setState({
                isOpenImg: true,
                listImage: listImage,
                drawDate: item.DrawDate,
                proID: item.ProductID,
                LineAStatus: item.StatusLineA,
                LineBStatus: item.StatusLineB,
                LineCStatus: item.StatusLineC,
                LineDStatus: item.StatusLineD,
                LineEStatus: item.StatusLineE,
                LineFStatus: item.StatusLineF
              });
              this.renderImgSlide();
            }}
          />
        </div>
      );
    } else return <div />;
  };

  changeWin = item => {
    let statusWin = this.checkStatusWin(item);

    let amount = 0;

    if (statusWin === "A") {
      amount =
        item.AmountA +
        item.AmountB +
        item.AmountC +
        item.AmountD +
        item.AmountE +
        item.AmountF;
      if (amount > 10000000) {
        return (
          <div className={styles.div_change_win}>
            <div>Liên hệ nhận thưởng: 0346108989</div>
          </div>
        );
      } else {
        return (
          <div
            className={styles.div_change_win}
            onClick={() => this.props.onPlaywin()}
          >
            <div>Chuyển thưởng</div>
            <img
              src={require("../../assets/tickxanh.png")}
              style={{
                width: 18,
                height: 18,
                marginLeft: 4
              }}
            />
          </div>
        );
      }
    } else if (statusWin === "B" || statusWin === "C" || statusWin === "D" || statusWin === "E" || statusWin === "F" ||
      statusWin === "G" || statusWin === "H" || statusWin === "I" || statusWin === "K" || statusWin === "L") {
      amount =
        item.AmountA +
        item.AmountB +
        item.AmountC +
        item.AmountD;
      if (amount > 10000000) {
        return (
          <div className={styles.div_change_win}>
            <div>Liên hệ nhận thưởng: 0346108989</div>
          </div>
        );
      } else {
        return (
          <div
            className={styles.div_change_win}
            onClick={() => this.props.onPlaywin()}
          >
            <div>Chuyển thưởng</div>
            <img
              src={require("../../assets/tickxanh.png")}
              style={{
                width: 18,
                height: 18,
                marginLeft: 4
              }}
            />
          </div>
        );
      }
    }
  };

  initRow = (item, index) => {
    // let date = new Date(item.DrawDate);
    // console.log(item.DrawDate)
    let date = moment(item.DrawDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    let dateF = new Date(date);
    // console.log(dateF)
    return (
      <div key={index} className={styles.list_item}>
        {this.logo(item)}
        <div
          style={{
            paddingTop: 6,
            paddingBottom: 6,
            display: "flex",
            alignItems: "center"
          }}
        >
          <div>
            {this.initNumber(item)}
            <div style={{ fontSize: 14, marginTop: 6 }}>
              <span style={{ fontWeight: "bold" }}>Kỳ: </span>
              {`#${item.DrawCode}`}
              <span style={{ fontWeight: "bold", marginLeft: 20 }}>Ngày: </span>
              {`${getWeekdays(dateF.getDay())} ${item.DrawDate}`}
            </div>
          </div>
        </div>

        {this.imageOrder(item)}
        {/* {this.renderReportError(item)} */}
        <div
          style={{
            display: "flex",
            marginTop: 5,
            alignItems: "center",
            borderTop: "1px solid #dddddd",
            paddingTop: 8
          }}
        >
          {this.price(item, index)}
          <div
            style={{ marginLeft: "auto", alignSelf: "center" }}
            onClick={() => this.compareResult(item)}
          >
            {this.renderStatusWin(item)}
          </div>
        </div>
        {this.changeWin(item)}
      </div>
    );
  };

  compareResult = item => {
    // console.log(item)
    if (
      item.StatusLineA !== "" ||
      item.StatusLineB !== "" ||
      item.StatusLineC !== "" ||
      item.StatusLineD !== "" ||
      item.StatusLineE !== "" ||
      item.StatusLineF !== ""
    )
      this.props.onCompareResult(item);
  };

  carousel() {
    if (this.state.status === "A") {
      // console.log(`${JSON.stringify(this.state.listImage)}`);
      return (
        <Carousel autoplay={true} infinite={true}>
          {this.state.listImage.map((item, index, data) => (
            <img
              src={URL_IMAGE + item}
              key={item.ID}
              alt=""
              style={{ width: "100%", verticalAlign: "top", height: "276px" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
              }}
              onClick={() => {
                this.setState({ isOpenImg: true });
                this.renderImgSlide(item);
              }}
            />
          ))}
        </Carousel>
      );
    } else {
      return <div />;
    }
  }

  renderImgSlide = () => {
    const { photoIndex, isOpenImg } = this.state;
    const listImage = this.state.listImage;
    const drawDate = this.state.drawDate;
    const proID = this.state.proID;
    const LineAStatus = this.state.LineAStatus;
    const LineBStatus = this.state.LineBStatus;
    const LineCStatus = this.state.LineCStatus;
    const LineDStatus = this.state.LineDStatus;
    const LineEStatus = this.state.LineEStatus;
    const LineFStatus = this.state.LineFStatus;
    if (this.state.listImage.length > 0) {
      return (
        <div>
          {isOpenImg && (
            <LightBox
              mainSrc={listImage[photoIndex]}
              nextSrc={listImage[(photoIndex + 1) % listImage.length]}
              prevSrc={
                listImage[
                (photoIndex + listImage.length - 1) % listImage.length
                ]
              }
              onCloseRequest={() => this.setState({ isOpenImg: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + listImage.length - 1) % listImage.length
                })
              }
              // imageCaption={
              //   <div style={{ fontSize: 16 }}>
              //     <div>Người nhận: {this.state.order.FullName}</div>
              //     <div>Số CMND: {this.state.order.PIDNumber}</div>
              //     <div>Điện thoại: {this.state.order.MobileNumber}</div>
              //   </div>
              // }
              imageTitle={<div>{this.renderReportError(drawDate, proID, LineAStatus, LineBStatus, LineCStatus, LineDStatus, LineEStatus, LineFStatus)}</div>}
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % listImage.length
                })
              }
            />
          )}
        </div>
      );
    }
  };
  ReportError = (drawDate) => {
    this.setState({ isOpenImg: false })
    let drawDateComp = new Date(drawDate);
    let dateNowComp = new Date();
    let hoursNow = parseInt(dateNowComp.getHours());
    let minuteNow = parseInt(dateNowComp.getMinutes());
    if (dateNowComp.setHours(0, 0, 0, 0) > drawDateComp.setHours(0, 0, 0, 0)) {
      this.setState({ modal2: true });
    } else if (dateNowComp.setHours(0, 0, 0, 0) === drawDateComp.setHours(0, 0, 0, 0)) {
      if (hoursNow > 17) {
        this.setState({ modal2: true });
      } else if (hoursNow === 17) {
        if (minuteNow >= 30) {
          this.setState({ modal2: true });
        } else if (minuteNow < 30) {
          this.setState({ modal1: true });
        }
      } else if (hoursNow < 17) {
        this.setState({ modal1: true });
      }
    } else if (dateNowComp.setHours(0, 0, 0, 0) < drawDateComp.setHours(0, 0, 0, 0)) {
      this.setState({ modal1: true });
    }
  }

  renderReportError = (date, productID, statusA, statusB, statusC, statusD, statusE, statusF) => {
    let drawDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    let statusWin = this.checkStatusWin2(productID, statusA, statusB, statusC, statusD, statusE, statusF);
    if (this.state.photoIndex === 0) {
      if (statusWin === "O" || statusWin === "A" || statusWin === "B" || statusWin === "C" || statusWin === "D" || statusWin === "E" || statusWin === "F" || statusWin === "J" || statusWin === "P" || statusWin === "G") {
        return (
          <div></div>
        )
      } else {
        if (this.state.status === "A" || this.state.status === "I") {
          return (
            <div style={{ position: "fixed", zIndex: "999" }}>
              <Button style={{ background: "rgba(0, 0, 0, 0)", color: "#d2403a", width: "80px", height: "25px", lineHeight: "25px", fontSize: "15px", textAlign: "center", margin: "0 auto",  }} onClick={() => this.ReportError(drawDate)}>
                <Text>Báo vé lỗi</Text>
              </Button>
              {/* <p style={{color: "#d2403a", border:2, borderColor:"#d2403a", }}>Báo vé lỗi</p> */}
            </div>
          )
        } else {
          return (
            <div>

            </div>
          )
        }
      }
    } else {
      return (<div />)
    }
  }
  renderModal = () => {
    let ReasonError = this.state.ReasonError;
    return (
      <div>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
        >
          <div style={{ height: 270 }}>
            <div style={{ textAlign: "center", fontWeight: "bold", color: "#1dbcbb", fontSize: 18 }}>Báo vé lỗi</div>
            <p style={{ color: "red", fontSize: 11 , marginBottom: 0 }}>Nếu thông tin trên vé không đúng, quý khách vui lòng nhập lý do tại đây</p>
            <TextareaItem value={ReasonError} onChange={this.onChangeReasonError} maxLength={50} style={{ height: 130, width: 210, borderRadius: 9, backgroundColor: "#eae9ed" }} placeholder="Nhập tối đa 50 ký tự" type="text"></TextareaItem>

            <div className={styles2.primary_btn} >
              <div onClick={() => { this.setState({ modal1: false, ReasonError: "" }) }} style={{ color: "#405675", width: "100%", fontSize: 15,  }}>ĐÓNG</div>
              <div style={{ color: "black" }}>|</div>
              <div onClick={() => this.onOk()} style={{ color: "#1dbcbb", width: "100%", fontSize: 15,  }}>GỬI</div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  renderModal2 = () => {
    return (
      <div>
        <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal2')}
        >
          <div style={{ height: 190 }}>
            <div style={{ textAlign: "center",  fontWeight: "bold", color: "#1dbcbb", fontSize: 18 }}>Báo cáo vé lỗi</div>

            <div style={{ marginTop: 25, marginBottom: 25, color: "black",  }}>Vui lòng liên hệ hotline <a style={{ color: "#1dbcbb" }}>0346108989</a> để được hỗ trợ nếu thông tin trên vé không đúng</div>
            <div className={styles2.primary_btn} >
              <div onClick={() => { this.setState({ modal2: false }) }} style={{ color: "#405675", width: "100%", fontSize: 15,  }}>ĐÓNG</div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  goBack() {
    this.props.history.goBack();
  }
  onOk = () => {
    if (this.state.ReasonError === '') {
      Toast.info("Vui lòng nhập lý do báo vé lỗi", 2);
      return;
      // if(this.state.ReasonError.length > 50){
      //   Toast.info("Vui lòng nhập không quá 50 ký tự", 2);
      //   return;
      // }else{
    } else {
      this.props.onReport(this.state);
      this.setState({ modal1: false, ReasonError: '' });
      Toast.info("Báo cáo vé lỗi thành công", 2);
      this.goBack();
    }
  }
  render() {
    return (
      <div>
        {this.renderModal()}
        {this.renderModal2()}
        <div>
          {/* {this.carousel()} */}
          {this.renderImgSlide()}
        </div>
        <div style={{ padding: 8}}>
          <WingBlank style={{ margin: 0 }}>{this.renderItem()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default PaymentHistoryItem;
