import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";
import historyCommission from "../../models/historyCommission";

const Item = List.Item;
const prompt = Modal.prompt;

class HistoryCommission extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    balanceObj: {},
    userInfo: {},
    ListReferral: [],
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.response !== undefined && nextProps.response.data !== undefined) {
      if (nextProps.response.data.Code === "00") {
        this.setState({
          NumberReferral: nextProps.response.data.Value,
          ListReferral: nextProps.response.data.ListValue,
        });
      }
    }

    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }

  render() {
    return (
      <div>
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>LỊCH SỬ</div>
          </Item>
        </div>

        <div>
          {this.state.ListReferral.map((item, index, data) => {
            return (
              <div style={{
                background: "#FFFFFF",
                display: "flex",
                marginTop: 10,
                fontSize: "17px"
              }} >
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex", width: "100%", }}
                >
                  <div
                    style={{ color: "#253854", marginLeft: 25, marginRight: 25, width: "100%", }}
                  ><div>
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        {item.ReturnCode === 0
                            ? "Đã chuyển tiền"
                            : item.ReturnCode === 1
                              ? "Chờ chuyển tiền"
                              : "Chuyển tiền không thành công"} <span style={{ color: "#ba1f25" }}>
                                {"-" + stringToNumberFormat(
                                item.TransAmount != null
                                  ? item.TransAmount
                                  : 0
                              ) + " đ"}</span></div>
                      <div style={{ marginTop: 5, fontSize: 14, display: "flex", justifyContent: "space-between" }}>{item.TransDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HistoryCommission;
