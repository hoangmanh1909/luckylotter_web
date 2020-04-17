import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class ChangeBank extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    banklist: [],
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.banklist !== undefined && nextProps.banklist.data !== undefined) {
      if (nextProps.banklist.data.Code === "00") {
        this.setState({
          banklist: nextProps.banklist.data.ListValue,
        });
      }
    }
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }

  renderList = () => {
    return (
      <div style={{ background: "#F7F4F4" }}>
        <div style={{display: 'flex' }}>
          {this.state.banklist.map((item, index, data) => {
            if (item.ID === 1)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeBankDetail("1");
                      }}
                    >
                      <img
                        src={require("../../assets/BIDV.jpg")}
                        alt=""
                        style={{ width: "100%", height: 90, borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
            if (item.ID === 2)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeBankDetail("2");
                      }}
                    >
                      <img
                        src={require("../../assets/SACOM.jpg")}
                        alt=""
                        style={{ width: "100%", height: 90, borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
              if (item.ID === 3)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeBankDetail("3");
                      }}
                    >
                      <img
                        src={require("../../assets/VIETTIN.jpg")}
                        alt=""
                        style={{ width: "100%", height: 90, borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
              if (item.ID === 4)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeBankDetail("4");
                      }}
                    >
                      <img
                        src={require("../../assets/VIETCOM.jpg")}
                        alt=""
                        style={{ width: "100%", height: 90, borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className={styles2.header}>
          <Item
            style={{ paddingTop: 10, paddingBottom: 10, background: "#BA2027" }}
          >
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>ĐỔI THƯỞNG QUA NGÂN HÀNG</div>
          </Item>
        </div>
        {this.renderList(this.state.banklist)}
        <div style={{ marginLeft: 25, marginTop: 10, display: "flex", width: "100%", fontSize: 16, color: "#ba1f25" }}>
          Lưu ý: Số tiền thanh toán mỗi lần tối thiểu là 200.000đ
        </div>
      </div>
    )
  }

}

export default ChangeBank;
