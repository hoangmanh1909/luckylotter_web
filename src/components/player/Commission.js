import React from "react";
import { Toast, Flex, Text, WingBlank, WhiteSpace } from "antd-mobile";
import styles2 from '../Main.less';
import { stringToNumberFormat } from "../../utils/Helper";

class Commission extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        balance: 0,
        data:[],
        pidNumber: '',
        pidDate: '',
        pidPlace: '',
        taxCode: '',
        name:'',
        email:''
      };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.balance != undefined && nextProps.balance.data != undefined) {
            if (nextProps.balance.data.Code === "00") {
              this.setState({
                balance: nextProps.balance.data.Value
              });
            } else {
              Toast.info("Không lấy được thông tin tiền hoa hồng", 2);
            }
          }
          if (nextProps.info != undefined && nextProps.info.data != undefined) {
            if (nextProps.info.data.Code === "00") {
              this.setState({ 
                pidNumber: nextProps.info.data.Value.PIdNumber,
                pidPlace: nextProps.info.data.Value.PIDPlace,
                taxCode: nextProps.info.data.Value.TaxCode,
                name: nextProps.info.data.Value.Name,
                email: nextProps.info.data.Value.EmailAddress,
                pidDate: nextProps.info.data.Value.PIDate
             })
            } else {
              Toast.info("Không lấy được thông tin người dùng", 2);
            }
          }
          if (nextProps.detail != undefined && nextProps.detail.data != undefined) {
            if (nextProps.detail.data.Code === "00") {
              this.setState({
                data: nextProps.detail.data.ListValue
              });
            }else if(nextProps.detail.data.Code === "01"){
              
            }
            else{
                Toast.info("Không lấy được lịch sử thanh toán", 2);
            }
          }
    }
    onCheck = () => {
      if(this.state.pidNumber === '' || this.state.pidPlace === '' || this.state.taxCode === '' || this.state.name === '' || this.state.email === '' || this.state.pidDate === ''){
        Toast.info("Cần cập nhật đầy đủ thông tin cá nhân trước khi yêu cầu rút hoa hồng", 5);
        this.props.onUpdateInfo();
      }else{
        this.props.onWithdrawCommission();
      }
    }
    renderDetail = () => {
      return (
        <div>
          <div style={{ padding: 12 }}>
            {this.state.data.map((item, index, data) => {
              if(item.TransType === 1){
                return (
                  <div
                    key={index}
                    style={{
                      margin: "10px 0px",
                      display: "flex",
                      fontSize: "12pt"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12pt",
                          color: "#253854"
                        }}
                      >
                        Thanh toán hoa hồng
                      </div>
                      <div style={{ color: "#696969" }}>
                        {item.TransDate}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                        color: "#39B54A"
                      }}
                    >
                      {"+" +
                        stringToNumberFormat(item.TransAmount) +
                        " đ"}
                    </div>
                  </div>
                );
            }else if(item.TransType === 2){
              if(item.ReturnCode === 0){
                return (
                  <div
                  key={index}
                  style={{ margin: "10px 0px", display: "flex",fontSize: "12pt" }}
                >
                  <div>
                    <div style={{ fontSize: "12pt", color: "#253854" }}>
                      Đã chuyển tiền
                    </div>
                    <div style={{ color: "#696969" }}>
                      {item.TransDate}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "auto",
                      color:"#E32E35"
                    }}>
                    {"-" + stringToNumberFormat(item.TransAmount) + " đ"}
                  </div>
                </div>
                );
              }else if(item.ReturnCode === 1){
                return (
                  <div
                    key={index}
                    style={{
                      margin: "10px 0px",
                      display: "flex",
                      fontSize: "12pt"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12pt",
                          color: "#253854"
                        }}
                      >
                        Chờ chuyển tiền
                      </div>
                      <div style={{ color: "#696969" }}>
                        {item.TransDate}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                        color: "#FD9007",
                        fontSize: "12pt"
                      }}
                    >
                      {"-" +
                        stringToNumberFormat(item.TransAmount) +
                        " đ"}
                    </div>
                  </div>
                );
              }else if(item.ReturnCode === 2){
                return (
                  <div
                    key={index}
                    style={{
                      margin: "10px 0px",
                      display: "flex",
                      fontSize: "12pt"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "12pt",
                          color: "#253854"
                        }}
                      >
                        Từ chối
                      </div>
                      <div style={{ color: "#696969" }}>
                        {item.TransDate}
                      </div>
                      <div style={{ color: "#E32E35" }}>
                        {item.ReasonReject}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                        color: "#9fa0a2",
                        fontSize: "12pt"
                      }}
                    >
                      {"-" +
                        stringToNumberFormat(item.TransAmount) +
                        " đ"}
                    </div>
                  </div>
                );
              }
            }
            })}
          </div>
        </div>
      );
    };

    render(){
        return(
            <div className={styles2.content}>
        <div
          style={{
            background: "#FFFFFF",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 15, 
            paddingRight: 15,
            display: "flex",
            alignItems: "center"
          }}
        >
          <div>
            <img
              style={{
                width: 36,
                height: 36,
                margin: 6,
                marginRight: 8
              }}
              src={require("../../assets/icon/icon-11.png")}
              alt=""
            />
          </div>

          <div
            
            className={styles2.text_amount}
            style={{ marginLeft: "auto" }}
          >
            {stringToNumberFormat(this.state.balance)} đ
          </div>
        </div>
        <div className={styles2.primary_btn} style={{ marginTop: 10, height: "38px", lineHeight: "38px",marginLeft: 15, marginRight: 15 }} onClick={() => this.onCheck()}>
            <Text style={{  }}>Yêu cầu rút hoa hồng</Text>
        </div>
        <div style={{ background: "#FFFFFF", marginTop: 15 }}>
        {this.renderDetail()}
        </div>
      </div>
        );
    }

}
export default Commission;
