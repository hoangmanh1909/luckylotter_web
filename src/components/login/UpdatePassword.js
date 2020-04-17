import React from 'react';
import { Toast, WingBlank, InputItem, Text, List, DatePicker, LocaleProvider, WhiteSpace, Button, Modal } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import styles2 from '../Main.less';
const Item = List.Item;
const alert = Modal.alert;

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PasswordOld: '',
      PasswordNew: '',
      rePasswordNew: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.info !== undefined) {
    //     if (nextProps.info.data.Code === "00") {
    //         this.setState({
    //             pidNumber: nextProps.info.data.Value.PIdNumber,
    //             mobileNumber: nextProps.info.data.Value.MobileNumber,
    //             pidPlace: nextProps.info.data.Value.PIDPlace,
    //             taxCode: nextProps.info.data.Value.TaxCode,
    //             name: nextProps.info.data.Value.Name,
    //             email: nextProps.info.data.Value.EmailAddress,
    //         })
    //         if (nextProps.info.data.Value.PIDDate !== "" && nextProps.info.data.Value.PIDDate !== null) {
    //             this.setState({ pidDate: new Date(nextProps.info.data.Value.PIDDate) })
    //         }
    //     }
    // }
    console.log(nextProps.updatePass);

    if (nextProps.updatePass !== undefined && nextProps.updatePass.data !== undefined
      && nextProps.updatePass.data !== "") {
      if (nextProps.updatePass.data.Code === "00") {
        Toast.info("Đổi mật khẩu thành công", 4);
        this.props.onBack();
      } else {
        Toast.info(nextProps.updatePass.data.Message, 4);
      }
    }
    if (nextProps.err !== undefined) {
      this.setState({ animating: false })
      Toast.info("Lỗi kết nối hệ thống", 5)
    }

  }
  onChangePasswordOld = (value) => {
    this.setState({ PasswordOld: value })
  }
  onChangePasswordNew = (value) => {
    this.setState({ PasswordNew: value })
  }
  onChangeRePasswordNew = (value) => {
    this.setState({ rePasswordNew: value })
  }
  onOk = () => {

    this.props.onUpdatePassword(this.state);
  }

  showAlert = () => {
    if (this.state.PasswordOld === "") {
      Toast.info("Vui lòng nhập mật khẩu cũ", 2);
      return;
    }

    if (this.state.PasswordNew === "") {
      Toast.info("Vui lòng nhập mật khẩu mới", 2);
      return;
    }

    if (this.state.rePasswordNew === "") {
      Toast.info("Vui lòng nhập xác nhận mật khẩu mới", 2);
      return;
    }

    if (this.state.PasswordNew.length !== 6) {
      Toast.info("Mật khẩu gồm 6 ký tự số", 2);
      return;
    }

    if (this.state.PasswordNew !== this.state.rePasswordNew) {
      Toast.info("Mật khẩu không khớp", 2);
      return;
    }

    const alertInstance = alert('Bạn muốn đổi mật khẩu', '', [
      { text: 'Hủy bỏ', onPress: () => console.log('cancel'), style: 'default' },
      { text: 'Đổi mật khẩu', onPress: () => this.onOk() },
    ]);
    setTimeout(() => {
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };
  render() {
    return (
      <div style={{}}>
        <div style={{ padding: 10 }}>THAY ĐỔI MẬT KHẨU</div>
        <div style={{ margin: "0px 15px", background: "#FFFFFF" }}>
          <div style={{ borderBottom: "2px solid #f2f2f2" }}>
            <div className="am-list-item am-input-item am-list-item-middle">
              <div className="am-list-line" style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ width: 130, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Mật khẩu hiện tại</div>
                </div>
                <InputItem
                  type="number"
                  minLength={6}
                  maxLength={6}
                  onChange={this.onChangePasswordOld}
                  clear
                  placeholder="Nhập mật khẩu cũ"
                  style={{
                    WebkitTextSecurity: "disc",
                    marginTop: "5px",
                    textAlign: "right",
                    color: "rgb(37, 56, 84)",
                    fontSize: 14
                  }}
                >
                </InputItem>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "2px solid #f2f2f2" }}>
            <div className="am-list-item am-input-item am-list-item-middle">
              <div className="am-list-line" style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ width: 130, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Mật khẩu mới</div>
                </div>
                <InputItem
                  type="number"
                  minLength={6}
                  maxLength={6}
                  onChange={this.onChangePasswordNew}
                  clear
                  placeholder="Nhập mật khẩu mới"
                  style={{
                    WebkitTextSecurity: "disc",
                    textAlign: "right",
                    color: "rgb(37, 56, 84)",
                    fontSize: 14
                  }}
                >
                </InputItem>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "2px solid #f2f2f2" }}>
            <div className="am-list-item am-input-item am-list-item-middle">
              <div className="am-list-line" style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{ width: 130, fontSize: "12pt" }}
                  className="am-input-label am-input-label-5"
                >
                  <div>Xác nhận</div>
                </div>
                <InputItem
                  type="number"
                  minLength={6}
                  maxLength={6}
                  onChange={this.onChangeRePasswordNew}
                  clear
                  placeholder="Xác nhận mật khẩu mới"
                  style={{
                    WebkitTextSecurity: "disc",
                    textAlign: "right",
                    color: "rgb(37, 56, 84)",
                    fontSize: 14
                  }}
                >
                </InputItem>
              </div>
            </div>
          </div>
          <div
            className={styles2.primary_btn}
            style={{ marginTop: 10 }}
            onClick={this.showAlert}
          >
            ĐỔI MẬT KHẨU
              </div>
        </div>
      </div>
    );
  }
}
export default UpdatePassword;