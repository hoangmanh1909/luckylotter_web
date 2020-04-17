import React from "react";
import { InputItem, Text, ActivityIndicator, Toast } from "antd-mobile";
import MegaResult from "../resultQSMT/MegaResult";
import Max4DResult from "../resultQSMT/Max4DResult";
import PowerResult from "../resultQSMT/PowerResult";
import Max3DResult from "../resultQSMT/Max3DResult";
import KenoResult from "../resultQSMT/KenoResult";
import Lottery123Result from "../resultQSMT/Lottery123Result";
import styles from "./CompareResult.css";
import styles2 from "../Main.less";
import styles1 from "../../utils/mega645.less";
import {
  stringToNumberFormat,
  getPadLeft,
  getNameWin,
  getNameWinMax3DPlus,
  getNameKenoParity,
  getNameWinMax3DPlusByNum
} from "../../utils/Helper";

class CompareResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== undefined) {
      if (nextProps.response.Code === "00") {
        this.setState({ data: nextProps.response.ListValue });
      } else {
        Toast.info(nextProps.response.Message, 2);
      }
    }

    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
  }

  renderProduct = () => {
    if (this.state.data.length > 0) {
      let result;
      const item = this.state.data[0];
      let productView;
      if (this.state.data[0].ProductID === 1) {
        result = this.state.data.map(item => {
          const value = {};
          value.DrawResult = item.DrawResult;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          value.Type = 2;
          return value;
        });
        productView = <MegaResult result={result} />;
      } else if (
        this.state.data[0].ProductID === 4 ||
        this.state.data[0].ProductID === 5
      ) {
        result = this.state.data.map(item => {
          const value = {};
          value.Result_ST = item.M3ResultST;
          value.Result_ND = item.M3ResultND;
          value.Result_RD = item.M3ResultRD;
          value.Result_ENC = item.M3ResultENC;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          return value;
        });
        productView = <Max3DResult result={result} />;
      } else if (this.state.data[0].ProductID === 2) {
        result = this.state.data.map(item => {
          const value = {};
          value.Result_ENC1 = item.ResultENC1;
          value.Result_ENC2 = item.ResultENC2;
          value.Result_ND = item.ResultND;
          value.Result_RD = item.ResultRD;
          value.Result_ST = item.ResultST;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          return value;
        });
        productView = <Max4DResult result={result} />;
      } else if (this.state.data[0].ProductID === 6) {
        result = this.state.data.map(item => {
          const value = {};
          value.DrawResult = item.DrawResult;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          value.EvenNumber = item.EvenNumber;
          value.OddNumber = item.OddNumber;
          value.BigNumber = item.BigNumber;
          value.SmallNumber = item.SmallNumber;
          return value;
        });
        productView = <KenoResult result={result} />;
      } else if (this.state.data[0].ProductID === 7) {
        result = this.state.data.map(item => {
          const value = {};
          value.DrawResult = item.DrawResult;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          return value;
        });
        productView = <Lottery123Result result={result} />;
      } else {
        result = this.state.data.map(item => {
          const value = {};
          value.Draw_Result = item.DrawResult;
          value.DrawCode = item.DrawCode;
          value.DrawDate = item.DrawDate;
          value.BonusNumber = item.BonusNumber;
          value.Type = 2;
          return value;
        });
        productView = <PowerResult result={result} />;
      }
      return (
        <div>
          {productView}
          <div className={styles.line} />
          <div className={styles.order}>
            <div className={styles.title}>Các vé bạn đã mua trong kỳ</div>
            <div className={styles.box}>
              <div>{this.renderOrderItem(item)}</div>
              <div style={{ marginTop: 6 }}>{this.amountWin(item)}</div>
            </div>
          </div>
        </div>
      );
    }
  };

  renderOrderItem = item => {
    let value = [];
    let resultST;
    let Amount = item;
    if (item.ProductID === 2) {
      resultST = item.ResultST;
    } else if (item.ProductID === 4) {
      resultST = item.M3ResultST;
    } else if (item.ProductID === 5) {
      resultST =
        item.M3ResultST +
        "," +
        item.M3ResultND +
        "," +
        item.M3ResultRD +
        "," +
        item.M3ResultENC;
    }
    if (item.LineA !== null && item.LineA !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineA,
            "A",
            item.LineAStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountA
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineA,
            "A",
            item.LineAStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountA
          )
        );
      }
    }
    if (item.LineB !== null && item.LineB !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineB,
            "B",
            item.LineBStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountB
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineB,
            "B",
            item.LineBStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountB
          )
        );
      }
    }
    if (item.LineC !== null && item.LineC !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineC,
            "C",
            item.LineCStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountC
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineC,
            "C",
            item.LineCStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountC
          )
        );
      }
    }
    if (item.LineD !== null && item.LineD !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineD,
            "D",
            item.LineDStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountD
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineD,
            "D",
            item.LineDStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountD
          )
        );
      }
    }
    if (item.LineE !== null && item.LineE !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineE,
            "E",
            item.LineEStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountE
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineE,
            "E",
            item.LineEStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountE
          )
        );
      }
    }
    if (item.LineF !== null && item.LineF !== "") {
      if (item.ProductID == 6 && item.ItemType == 2) {
        value.push(
          this.renderKenoNumberGroup(
            item.LineF,
            "F",
            item.LineFStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountF
          )
        );
      } else {
        value.push(
          this.renderNumberGroup(
            item.LineF,
            "F",
            item.LineFStatus,
            resultST,
            Amount,
            item.ProductID,
            item.AmountF
          )
        );
      }
    }
    return value;
  };

  renderKenoNumberGroup = (
    item,
    type,
    statusWin,
    resultST,
    Amount,
    ProductID,
    amountInput
  ) => {
    const arr = item.split(",");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "4px 0px"
        }}
      >
        <div>
          <Text
            className={styles1.text_header}
            style={{ float: "left", width: 30, fontWeight: "bold" }}
          >
            {type}
          </Text>
        </div>
        {statusWin == "A" || statusWin == "B" ? (
          <div
            style={{
              margin: "4px 0px",
              float: "left",
              marginRight: 5,
              fontWeight: "bold",
              color: "#E32E35"
            }}
          >
            {getNameKenoParity(item)}
          </div>
        ) : (
            <div
              style={{
                margin: "4px 0px",
                float: "left",
                marginRight: 5,
                fontWeight: "bold"
              }}
            >
              {getNameKenoParity(item)}
            </div>
          )}
        {this.renderWin(statusWin, Amount, type, ProductID, amountInput)}
      </div>
    );
  };

  renderNumberGroup = (
    item,
    type,
    statusWin,
    resultST,
    Amount,
    ProductID,
    amountInput
  ) => {
    const arr = item.split(",");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "4px 0px"
        }}
      >
        <div>
          <Text
            className={styles1.text_header}
            style={{ float: "left", width: 30, fontWeight: "bold" }}
          >
            {type}
          </Text>
        </div>
        <div style={{ margin: "4px 0px" }}>
          {this.renderNumber(arr, statusWin, resultST)}
        </div>
        {this.renderWin(statusWin, Amount, type, ProductID, amountInput)}
      </div>
    );
  };

  renderWin = (status, Amount, type, ProductID, amountInput) => {
    if (ProductID !== 5 && ProductID !== 6 && ProductID !== 7) {
      if (status !== "O" && status !== "") {
        let amount =
          Amount.AmountA +
          Amount.AmountB +
          Amount.AmountC +
          Amount.AmountD +
          Amount.AmountE +
          Amount.AmountF;
        if (amount < 10000000) {
          return (
            <div
              style={{
                color: "#E32E35",
                padding: 2,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 80,
                display: "flex"
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{ height: "18px", width: "18px", marginRight: 2 }}
                  src={require("../../assets/cup_do.png")}
                  alt=""
                />
              </div>
              <div>{getNameWin(status)}</div>
            </div>
          );
        } else if (amount >= 10000000 && status !== "J" && status !== "P") {
          return (
            <div
              style={{
                color: "#fd9007",
                padding: 2,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 80,
                display: "flex"
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{ height: "18px", width: "18px", marginRight: 2 }}
                  src={require("../../assets/cup_vang.png")}
                  alt=""
                />
              </div>
              <div>{getNameWin(status)}</div>
            </div>
          );
        } else if (status === "J" || status === "P") {
          return (
            <div
              style={{
                color: "#E32E35",
                padding: 2,
                borderRadius: 4,
                marginLeft: "auto",
                minWidth: 80,
                display: "flex"
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  style={{ height: "18px", width: "18px", marginRight: 2 }}
                  src={require("../../assets/jp.png")}
                  alt=""
                />
              </div>
              <div>{getNameWin(status)}</div>
            </div>
          );
        }
      }
    } else {
      if (ProductID === 6) {
        if (amountInput > 0) {
          return (
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <img
                style={{ height: "18px", width: "18px", marginRight: 2 }}
                src={require("../../assets/cup_do.png")}
                alt=""
              />
            </div>
          );
        }
      } else {
        if (status !== "O" && status !== "") {
          let amount =
            Amount.AmountA +
            Amount.AmountB +
            Amount.AmountC +
            Amount.AmountD +
            Amount.AmountE +
            Amount.AmountF;
          if (amount < 10000000) {
            return (
              <div
                style={{
                  color: "#E32E35",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/cup_do.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlus(status)}</div>
              </div>
            );
          } else if (amount >= 10000000 && status !== "A") {
            return (
              <div
                style={{
                  color: "#fd9007",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/cup_vang.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlus(status)}</div>
              </div>
            );
          } else if (status === "A") {
            return (
              <div
                style={{
                  color: "#E32E35",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/jp.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlus(status)}</div>
              </div>
            );
          }
        }
      }
      if (ProductID === 7) {
        if (amountInput > 0) {
          return (
            <div style={{ display: "flex", marginLeft: "auto" }}>
              <img
                style={{ height: "18px", width: "18px", marginRight: 2 }}
                src={require("../../assets/cup_do.png")}
                alt=""
              />
            </div>
          );
        }
      } else {
        if (status !== "O" && status !== "") {
          let amount =
            Amount.AmountA +
            Amount.AmountB +
            Amount.AmountC +
            Amount.AmountD +
            Amount.AmountE +
            Amount.AmountF;
          if (amount < 10000000) {
            return (
              <div
                style={{
                  color: "#E32E35",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/cup_do.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlusByNum(status)} </div>
              </div>
            );
          } else if (amount >= 10000000 && status !== "A") {
            return (
              <div
                style={{
                  color: "#fd9007",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/cup_vang.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlusByNum(status)}</div>
              </div>
            );
          } else if (status === "A") {
            return (
              <div
                style={{
                  color: "#E32E35",
                  padding: 2,
                  borderRadius: 4,
                  marginLeft: "auto",
                  minWidth: 80,
                  display: "flex"
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    style={{ height: "18px", width: "18px", marginRight: 2 }}
                    src={require("../../assets/jp.png")}
                    alt=""
                  />
                </div>
                <div>{getNameWinMax3DPlusByNum(status)}</div>
              </div>
            );
          }
        }
      }
    }
  };

  renderNumber = (arr, statusWin, resultST) => {
    let _item = arr.map((item1, index1, data1) => {
      if (
        this.state.data[0].ProductID === 1 ||
        this.state.data[0].ProductID === 3 ||
        this.state.data[0].ProductID === 6
      ) {
        let drawResult = [];
        drawResult = this.state.data[0].DrawResult.split(",");
        const check = drawResult.some(ele => ele === getPadLeft(item1));
        // console.log(drawResult);
        // console.log(item1)
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
        if (this.state.data[0].ProductID === 2) {
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
        if (this.state.data[0].ProductID === 5) {
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
            result1 = resultST.split(",");
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
        if (this.state.data[0].ProductID === 7) {
          let result123 = [];
          result123 = this.state.data[0].DrawResult.split(",");

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

  amountWin = item => {
    let amount = 0;
    let contact = "";
    let status = "";

    amount =
      item.AmountA +
      item.AmountB +
      item.AmountC +
      item.AmountD +
      item.AmountE +
      item.AmountF;

    if (item.ProductID == 6) {
      if (item.LineAStatus == "S" ||
        item.LineBStatus == "S" ||
        item.LineCStatus == "S" ||
        item.LineDStatus == "S" ||
        item.LineEStatus == "S" ||
        item.LineFStatus == "S")
        status = "S";
    }
    if (amount > 10000000 || status == "S") {
      contact = "Liên hệ nhận thưởng : 0346108989";
    }
    return (
      <div>
        <div>
          Tiền thưởng :{" "}
          <span style={{ color: "#E32E35", fontWeight: "bold" }}>
            {stringToNumberFormat(amount) + "đ"}
          </span>
        </div>
        <div
          style={{
            background: "#E32E35",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "32px",
            borderRadius: "4px",
            margin: "6px 0px"
          }}
        >
          {contact}
        </div>
      </div>
    );
  };

  render() {
    return <div className={styles.font}>{this.renderProduct()}</div>;
  }
}

export default CompareResult;
