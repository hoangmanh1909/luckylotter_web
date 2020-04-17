import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class ChangeMerchant extends React.Component {
  state = {
    mobileNumber: localStorage.getItem("mobileNumber"),
    listmerchant: [],
  };

  componentWillMount() {
    if (this.props.location.payload != undefined) {
      this.setState({ balanceObj: this.props.location.payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listmerchant !== undefined && nextProps.listmerchant.data !== undefined) {
      if (nextProps.listmerchant.data.Code === "00") {
        this.setState({
          listmerchant: nextProps.listmerchant.data.ListValue,
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
        <div style={{ display: 'flex', justifyContent: "space-around" }}>
          {this.state.listmerchant.map((item, index, data) => {
            if (item.ID === 1)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeMerchantDetail("1");
                      }}
                    >
                      <img
                        src={require("../../assets/icon_viettel.png")}
                        alt=""
                        style={{borderRadius: 10, border: "2px solid #E6E6E6" }}
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
                        this.props.onChangeMerchantDetail("2");
                      }}
                    >
                      <img
                        src={require("../../assets/icon_apay.png")}
                        alt=""
                        style={{borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
            if (item.ID === 5)
              return (
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div style={{ margin: 10 }}
                      onClick={() => {
                        this.props.onChangeMerchantDetail("5");
                      }}
                    >
                      <img
                        src={require("../../assets/icon_viviet.png")}
                        alt=""
                        style={{borderRadius: 10, border: "2px solid #E6E6E6" }}
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
                        this.props.onChangeMerchantDetail("4");
                      }}
                    >
                      <img
                        src={require("../../assets/icon_zalo.png")}
                        alt=""
                        style={{borderRadius: 10, border: "2px solid #E6E6E6" }}
                      />
                    </div>
                  </div>
                </div>
              );
            // if (item.ID === 143)
            // return (
            //   <div
            //     key={item.ID}
            //     style={{ margin: "10px 0px", display: "flex" }}
            //   >
            //     <div>
            //       <div style={{ margin: 10 }}
            //         onClick={() => {
            //           this.props.onChangeMerchantDetail("143");
            //         }}
            //       >
            //         <img
            //           src={require("../../assets/icon_momo.jpg")}
            //           alt=""
            //           style={{ height: 90, borderRadius: 10, border: "2px solid #E6E6E6" }}
            //         />
            //       </div>
            //     </div>
            //   </div>
            // );
          })}
        </div>
        <div>
          <div>
            <div style={{ marginLeft: 20 }}
              onClick={() => {
                this.props.onChangeMerchantDetail("143");
              }}
            >
              <img
                src={require("../../assets/icon_momo.png")}
                alt=""
                style={{borderRadius: 10, border: "2px solid #E6E6E6" }}
              />
            </div>
          </div>
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
            <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>ĐỔI THƯỞNG QUA VÍ</div>
          </Item>
        </div>
        {this.renderList(this.state.listmerchant)}
        <div style={{ marginLeft: 25, marginTop: 10, display: "flex", width: "100%", fontSize: 16, color: "#ba1f25" }}>
          Lưu ý: Số tiền thanh toán mỗi lần tối thiểu là 10000 đ
        </div>
      </div>
    )
  }

}

export default ChangeMerchant;
