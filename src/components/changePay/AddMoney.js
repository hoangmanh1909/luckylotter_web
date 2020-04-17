import React from "react";
import { Modal, Toast, List, Text, Button } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";
import styles from "../Main.less";
import ListItem from "antd-mobile/lib/list/ListItem";
const Item = List.Item;
const heightDevice = window.innerHeight;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      data: [],
      modal: false,
      modal1: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.balance !== undefined) {
    //     if (nextProps.balance.data.Code === "00") {
    //         this.setState({
    //             balance: nextProps.balance.data.Value.Balance
    //         });
    //     }
    // }
    if (
      nextProps.tutorialPayment !== undefined &&
      nextProps.tutorialPayment.data !== undefined
    ) {
      if (nextProps.tutorialPayment.data.Code === "00") {
        this.setState({
          tutorialPayment: nextProps.tutorialPayment.data.Value
        });
      }
    }
    console.log(this.state.tutorialPayment);

    if (nextProps.err != undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
  }

  showModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false
    });
  };

  renderList = () => {
    return (
      <div>
        <div
          onClick={this.showModal}
          style={{
            padding: 12,
            border: "2px outset #cccccc",
            backgroundColor: "#ffffff",
            margin: "10px 10px",
            borderRadius: "10px"
          }}
        >
          <div style={{ margin: "10px 10px", display: "flex" }}>
            <div>
              <img
                src={require("../../assets/bank_add.PNG")}
                alt=""
                style={{ width: 35, height: 30, paddingRight: 20 }}
              />
            </div>
            <div
              style={{
                width: "80%",
                alignItems: "center",
                margin: "auto",
                textAlign: "center"
              }}
            >
              <Text
                style={{
                  color: "#253854",
                  textAlign: "center",
                  fontSize: "17px"
                }}
              >
                Qua tài khoản ngân hàng
              </Text>
            </div>
          </div>
        </div>
        <div
          className={styles.tutorial}
          onClick={() => this.props.onTutorial(this.state.tutorialPayment)}
        >
          <span style={{ borderBottom: "1px solid #0cb3ff" }}>
            Hướng dẫn nạp tiền
          </span>
        </div>
      </div>
    );
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div
        className={styles.content}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          style={{
            fontSize: "13pt",
            padding: 15,
            display: "flex",
            backgroundColor: "#BA2027",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderBottom: "1px outset #f2f2f2"
          }}
        >
          <div>Số dư tài khoản</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto"
            }}
          >
            {stringToNumberFormat(this.state.balance) + " đ"}
          </div>
        </div>
        <div style={{ background: "#FFFFFF" }}>{this.renderList()}</div>

        <div>
          <Modal
            style={{
              transition: "none",
              width: "350px",
              height: "200px",
              borderRadius: "5px",
              verticalAlign: "middle"
            }}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ margin: "auto" }}>
              <p style={{ color: "black", fontSize: "15px" }}>
                <b>LƯU Ý</b>
              </p>
              <p style={{ color: "black" }}>
                Khi nạp tiền bằng hình thức chuyển khoản ngân hàng:<br></br>
                <span
                  style={{
                    textAlign: "left",
                    float: "left",
                    paddingLeft: "15px",
                    marginBottom: "15px"
                  }}
                >
                  + Nội dung chuyển khoản NAP "SĐT"<br></br>+ Số tiền tối thiểu
                  mỗi lần chuyển là 50.000vnđ
                </span>
              </p>
              <div style={{ marginTop: "10px" }}>
                <Button
                  type="warning"
                  size="small"
                  style={{
                    width: "42%",
                    float: "left",
                    margin: "0px 10px"
                  }}
                  onClick={() => this.handleCancel()}
                >
                  <b>Hủy</b>
                </Button>
                <Button
                  type="primary"
                  size="small"
                  style={{
                    width: "42%",
                    float: "left",
                    margin: "0px 10px"
                  }}
                  onClick={() => this.props.onBankList()}
                >
                  <b>Xác nhận</b>
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Main;
