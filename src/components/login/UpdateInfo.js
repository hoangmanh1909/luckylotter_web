import React, { useState } from "react";
import {
  Toast,
  InputItem,
  Text,
  List
} from "antd-mobile";
import styles2 from "../Main.less";

const Item = List.Item;

class UpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pidNumber: "",
      pidDate: "",
      pidPlace: "",
      taxCode: "",
      name: "",
      email: ""
    };
  }

  componentWillMount(){
    console.log(this.props);
    
  }

  componentWillReceiveProps(nextProps) {
      console.log(nextProps);
      
    if (nextProps.info !== undefined) {
      if (nextProps.info.data.Code === "00") {
        this.setState({
          pidNumber: nextProps.info.data.Value.PIdNumber,
          mobileNumber: nextProps.info.data.Value.MobileNumber,
          pidPlace: nextProps.info.data.Value.PIDPlace,
          taxCode: nextProps.info.data.Value.TaxCode,
          name: nextProps.info.data.Value.Name,
          email: nextProps.info.data.Value.EmailAddress
        });
        if (
          nextProps.info.data.Value.PIDDate !== "" &&
          nextProps.info.data.Value.PIDDate !== null
        ) {
          this.setState({
            pidDate: new Date(nextProps.info.data.Value.PIDDate)
          });
        }
      }
    }
    if (
      nextProps.updateInf !== undefined &&
      nextProps.updateInf.data !== undefined &&
      nextProps.updateInf.data !== ""
    ) {
      if (nextProps.updateInf.data.Code === "00") {
        Toast.info("Cập nhật thông tin thành công", 3);
        this.props.history.goBack();
      } else {
        Toast.info("Cập nhật thông tin không thành công", 3);
      }
    }
    if (nextProps.err !== undefined) {
      this.setState({ animating: false });
      Toast.info("Lỗi kết nối hệ thống", 5);
    }
  }
  onChangePIDNumber = value => {
    const re = /^[0-9\b]+$/;
    const check = re.test(String(value));
    if (check) {
      this.setState({ pidNumber: value });
    }
  };
  onChangeName = value => {
    this.setState({ name: value });
  };
  onChangeEmail = value => {
    this.setState({ email: value });
  };

  onOk = () => {
    if (this.state.name === "") {
      Toast.info("Vui lòng nhập họ tên", 2);
      return;
    }

    if (this.state.pidNumber === "") {
      Toast.info("Vui lòng nhập số chứng minh nhân dân", 2);
      return;
    }

    const numberPID = this.state.pidNumber;
    if (numberPID.length <= 8) {
      Toast.info(
        "Vui lòng kiểm tra lại Số chứng minh nhân dân người nhận vé",
        2
      );
      return;
    } else if (numberPID.length == 10) {
      Toast.info(
        "Vui lòng kiểm tra lại Số chứng minh nhân dân người nhận vé",
        2
      );
      return;
    }

    this.props.onUpdatePersonalInfo(this.state);
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
      <div style={{  }}>
        <div style={{ padding: 10 }}>CẬP NHẬT THÔNG TIN CÁ NHÂN</div>

        <div style={{ background: "#FFFFFF", padding: 15 }}>
          <div style={{ borderBottom: "2px solid #f2f2f2" }}>
            <div style={{ borderBottom: "2px solid #f2f2f2" }}>
              <InputItem
                value={this.state.name}
                onChange={this.onChangeName}
                clear
                placeholder="Nhập họ tên"
                style={{
                  textAlign: "right",
                  color: "rgb(37, 56, 84)",
                  fontSize: 14
                }}
              >
                <img
                  src={require("../../assets/icon/icon-01.png")}
                  alt=""
                  style={{ width: 20, height: 20, paddingRight: 15 }}
                />
                <Text style={{ color: "rgb(37, 56, 84)", fontSize: 14 }}>
                  Họ tên
                </Text>
              </InputItem>
            </div>
            <InputItem
              value={this.state.email}
              onChange={this.onChangeEmail}
              clear
              placeholder="Nhập email"
              style={{
                textAlign: "right",
                color: "rgb(37, 56, 84)",
                fontSize: 14
              }}
            >
              <img
                src={require("../../assets/icon/icon-02.png")}
                alt=""
                style={{ width: 20, height: 20, paddingRight: 15 }}
              />
              <Text style={{ color: "rgb(37, 56, 84)", fontSize: 14 }}>
                Email
              </Text>
            </InputItem>
          </div>
          <div style={{ borderBottom: "2px solid #f2f2f2" }}>
            <InputItem
              minLength={9}
              maxLength={11}
              value={this.state.pidNumber}
              onChange={this.onChangePIDNumber}
              clear
              placeholder="Nhập số CMND"
              style={{
                textAlign: "right",
                color: "rgb(37, 56, 84)",
                fontSize: 14
              }}
            >
              <img
                src={require("../../assets/icon/icon-card.png")}
                alt=""
                style={{ width: 20, height: 20, paddingRight: 15 }}
              />
              <Text style={{ color: "rgb(37, 56, 84)", fontSize: 14 }}>
                CMND
              </Text>
            </InputItem>
          </div>

          <div
            onClick={this.onOk}
            className={styles2.primary_btn}
            style={{ marginTop: 15 }}
          >
            <Text style={{  }}>CẬP NHẬT</Text>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateInfo;
