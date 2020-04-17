import React from "react";
import {
  Toast,
  Flex,
  Text,
  WingBlank,
  WhiteSpace,
  InputItem
} from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

class CommissionManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.commissionList != undefined &&
      nextProps.commissionList.data != undefined
    ) {
      if (nextProps.commissionList.data.Code === "00") {
        this.setState({
          data: nextProps.commissionList.data.ListValue
        });
      }
    }
  }
  renderList = () => {
    return (
      <div>
        <div style={{ paddingTop: 12, paddingBottom: 12 }}>
          {this.state.data.map((item, index, data) => {
            return (
              <div id={index} style={{  }}>
                <div
                  style={{
                    backgroundColor: "#E8E8E8",
                    marginTop: 12,
                    padding: 8,
                    color: "rgb(37, 56, 84)",
                    display:"flex",
                    alignItems:"center"
                  }}
                >
                  <img
                    src={require("../../assets/icon/icon-05.png")}
                    alt=""
                    style={{
                      width: 23,
                      height: 20,
                      paddingRight: 10
                    }}
                  />
                  <div>
                    Tháng {item.MonthlySale.toString().slice(0, 1)}/
                    {item.MonthlySale.toString().slice(1, 5)}
                  </div>
                </div>
                <InputItem
                  value={
                    stringToNumberFormat(item.OrderAmount) + " đ"
                  }
                  editable={false}
                  labelNumber={7}
                  clear
                  style={{
                    textAlign: "right",
                    color: "red",
                    fontSize: 14
                  }}
                >
                  <Text
                    style={{
                      color: "rgb(37, 56, 84)",
                      fontSize: 14
                    }}
                  >
                    Doanh thu
                  </Text>
                </InputItem>

                <InputItem
                  value={
                    stringToNumberFormat(item.Commission) + " đ"
                  }
                  editable={false}
                  labelNumber={7}
                  clear
                  style={{ textAlign: "right", fontSize: 14 }}
                >
                  <Text
                    style={{
                      color: "rgb(37, 56, 84)",
                      fontSize: 14
                    }}
                  >
                    Hoa hồng(1%)
                  </Text>
                </InputItem>

                <InputItem
                  value={
                    stringToNumberFormat(item.CommissionVAT) + " đ"
                  }
                  editable={false}
                  labelNumber={7}
                  clear
                  style={{ textAlign: "right", fontSize: 14 }}
                >
                  <Text
                    style={{
                      color: "rgb(37, 56, 84)",
                      fontSize: 14
                    }}
                  >
                    Thuế TNCN(10%)
                  </Text>
                </InputItem>

                <InputItem
                  value={
                    stringToNumberFormat(item.TransAmount) + " đ"
                  }
                  editable={false}
                  labelNumber={7}
                  clear
                  style={{ textAlign: "right", fontSize: 14 }}
                >
                  <Text
                    style={{
                      color: "rgb(37, 56, 84)",
                      fontSize: 14
                    }}
                  >
                    Thực nhận
                  </Text>
                </InputItem>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    return <div style={{  }}>{this.renderList()}</div>;
  }
}
export default CommissionManager;
