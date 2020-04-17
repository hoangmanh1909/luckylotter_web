import React from 'react';
import { WingBlank, Text, InputItem, Button, ActivityIndicator, Toast, Radio, Flex, Picker, List, WhiteSpace,DatePicker } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import styles2 from '../Main.less';
import {getMerchantNameByID} from '../../utils/Helper';
import  SOURCE_CHANNEL  from '../../config';
import CryptoJS from 'crypto-js';
import { stringToNumberFormat } from '../../utils/Helper';

const data = [
    {
        label: 'Qua TKNH',
        value: 1,
    },
    {
        label: "Qua ví",
        value: 2,
    }
  ];

class WithdrawCommission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            pidNumber: '',
            pidDate:'',
            pidPlace: '',
            taxCode: '',
            name: '',
            accountNumber: '',
            bankBranch:'',
            sValue: [1, 2],
            bankList: [],
            bankID: 0,
            withdrawAmount: 0
        }
    }
    
    componentWillReceiveProps(nextProps) {

        if (nextProps.info !== undefined && nextProps.info.data !== undefined) {
            if (nextProps.info.data.Code === "00" ) {
                this.setState({  
                    pidNumber: nextProps.info.data.Value.PIdNumber,
                    pidPlace: nextProps.info.data.Value.PIDPlace,
                    taxCode: nextProps.info.data.Value.TaxCode,
                    name: nextProps.info.data.Value.Name
                 })
                 if(nextProps.info.data.Value.PIDDate !== ""){
                    this.setState({pidDate: new Date(nextProps.info.data.Value.PIDDate)})
                 }
            }
        }
        if(nextProps.balance !== undefined && nextProps.balance.data !== undefined){
            if(nextProps.balance.data.Code === "00"){
                const balance = nextProps.balance.data.Value;
                this.setState({
                  balance: balance,
                  withdrawAmount: balance
                });
            }
        }
        if(nextProps.bank !== undefined && nextProps.bank.data !== undefined){
            if(nextProps.bank.data.Code === "00"){
                const bank = nextProps.bank.data.ListValue.map((item, index, data) => {
                    let value = {};
                    value.value = item.ID;
                    value.label = item.Code;
                    return value;
                })

                this.setState({ bankList: bank })
            } else {
                Toast.info("Không lấy được thông tin ngân hàng", 2)
            }
        }

        if (nextProps.fee !== undefined && nextProps.fee.data !== undefined) {
            if (nextProps.fee.data.Code === "00") {
                let data = {};
                data.MobileNumber = localStorage.getItem("mobileNumber");
                data.TransAmount = this.state.withdrawAmount;
                data.MerchantID = localStorage.getItem("merchant_id"); 
                data.FullName = this.state.name;
                data.Balance = this.state.balance;
                if(this.state.sValue[0] === 2){
                    data.WithdrawalType = 1;
                    data.BankID = 0;
                    data.AccountNumber = "";
                    data.BranchName = "";
                    data.TransDetail = "";
                }else if (this.state.sValue[0] === 1){
                    data.WithdrawalType = 2;
                    data.BankID = this.state.bankID;
                    data.BranchName = this.state.bankBranch;
                    data.AccountNumber = this.state.accountNumber;
                    data.TransDetail = this.state.accountNumber;
                }
                data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL).toString().toUpperCase();
                data.Fee = nextProps.fee.data.Value;
              this.props.onOK(data);
            }
            else{
              Toast.info(nextProps.fee.data.Message, 2);
            }
          }
        if (nextProps.err !== undefined) {
            this.setState({ animating: false })
            Toast.info("Lỗi kết nối hệ thống", 5)
        }
    }
    onChangeWithdrawAmount = (value) => {
        this.setState({ withdrawAmount: value });
    }
    onChangeAccountNumber = (value) => {
        this.setState({ accountNumber: value });
    }
    onChangeBankBranch = (value) => {
        this.setState({ bankBranch: value });
    }

    renderWithdrawType = () => {
        if(this.state.sValue[0] === 1){
            return (
              <div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={this.state.name}
                    editable={false}
                    labelNumber={7}
                    clear
                    placeholder="Tên chủ TK"
                    style={{ textAlign: "right", fontSize: 14 }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Tên chủ tài khoản
                    </Text>
                  </InputItem>
                </div>
                <Picker
                  title="Ngân hàng"
                  extra="Ngân hàng"
                  data={this.state.bankList}
                  cols={1}
                  className="forss"
                  okText="Chọn"
                  dismissText="Đóng"
                  disabled={false}
                  onChange={v => this.setState({ bankID: v[0] })}
                  value={[this.state.bankID]}
                  onOk={v => this.setState({ bankID: v[0] })}
                >
                  <List.Item
                    style={{ borderBottom: "2px solid #f2f2f2" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Ngân hàng
                    </Text>
                  </List.Item>
                </Picker>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={this.state.accountNumber}
                    onChange={this.onChangeAccountNumber}
                    labelNumber={7}
                    clear
                    style={{ textAlign: "right", fontSize: "12pt" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Số tài khoản
                    </Text>
                  </InputItem>
                </div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={this.state.bankBranch}
                    onChange={this.onChangeBankBranch}
                    labelNumber={7}
                    clear
                    style={{ textAlign: "right", fontSize: "12pt" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Chi nhánh
                    </Text>
                  </InputItem>
                </div>
              </div>
            );
        }else {
            return(<div></div>)
        }
    }

    onOk = () => {
        if(this.state.withdrawAmount === 0){
            Toast.info("Bạn chưa nhập số tiền", 2);
            return;
        }
        if(this.state.withdrawAmount > this.state.balance){
            Toast.info("Bạn không thể rút nhiều hơn số tiền hiện có", 2);
            return;
        }
        // if(this.state.withdrawAmount < 1000000){
        //     Toast.info("Số tiền yêu cầu phải lớn hơn hoặc bằng 1.000.000đ", 2);
        //     return;
        // }
        if (this.state.sValue[0] === 1)
        {
          if (this.state.bankID === "" || this.state.bankID === null) {
            Toast.info("Bạn chưa chọn ngân hàng", 2);
            return;
          }
          if (
            this.state.accountNumber === "" ||
            this.state.accountNumber === null
          ) {
            Toast.info("Bạn chưa nhập số tài khoản", 2);
            return;
          }
          if (
            this.state.bankBranch === "" ||
            this.state.bankBranch === null
          ) {
            Toast.info("Bạn chưa chọn chi nhảnh", 2);
            return;
          }
        }
        let data = {};
        data.MobileNumber = localStorage.getItem("mobileNumber");
        data.TransAmount = this.state.withdrawAmount;
        data.MerchantID = localStorage.getItem("merchant_id"); 
        if(this.state.sValue[0] === 2){
            data.WithdrawalType = 1;
        }else if (this.state.sValue[0] === 1){
            data.WithdrawalType = 2;
        }

        this.props.onFee(data);
    }

    render(){
        return (
          <div>
            <WingBlank>
              <div style={{  }}>
                <div
                  style={{
                    backgroundColor: "#E8E8E8",
                    marginTop: 12,
                    padding: 8,
                    color: "rgb(37, 56, 84)"
                  }}
                >
                  THÔNG TIN CHUYỂN TIỀN
                </div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={stringToNumberFormat(this.state.balance)}
                    editable={false}
                    labelNumber={7}
                    clear
                    placeholder="Tổng tiền"
                    style={{
                      textAlign: "right",
                      color: "red",
                      fontSize: "12pt"
                    }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Số dư
                    </Text>
                  </InputItem>
                </div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={stringToNumberFormat(
                      this.state.withdrawAmount
                    )}
                    labelNumber={7}
                    onChange={this.onChangeWithdrawAmount}
                    type="number"
                    clear
                    style={{ textAlign: "right", fontSize: "12pt" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Số tiền rút
                    </Text>
                  </InputItem>
                </div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={this.state.pidNumber}
                    editable={false}
                    labelNumber={7}
                    clear
                    placeholder="CMND"
                    style={{ textAlign: "right", fontSize: "12pt" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Số CMND
                    </Text>
                  </InputItem>
                </div>
                <div style={{ borderBottom: "2px solid #f2f2f2" }}>
                  <InputItem
                    value={this.state.pidPlace}
                    editable={false}
                    labelNumber={7}
                    clear
                    placeholder="Nơi cấp"
                    style={{ textAlign: "right", fontSize: "12pt" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Nơi cấp
                    </Text>
                  </InputItem>
                </div>
                <DatePicker
                  mode="date"
                  locale={enUs}
                  title="Chọn ngày cấp"
                  extra="Ngày cấp"
                  value={this.state.pidDate}
                  disabled={true}
                  onChange={pidDate => this.setState({ pidDate })}
                >
                  <List.Item
                    style={{ borderBottom: "2px solid #f2f2f2" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Ngày cấp
                    </Text>
                  </List.Item>
                </DatePicker>
                <InputItem
                  value={this.state.taxCode}
                  editable={false}
                  labelNumber={7}
                  clear
                  placeholder="Mã số thuế"
                  style={{ textAlign: "right", fontSize: "12pt" }}
                >
                  <Text
                    style={{
                      color: "rgb(37, 56, 84)",
                      fontSize: "12pt"
                    }}
                  >
                    Mã số thuế
                  </Text>
                </InputItem>
              </div>
            </WingBlank>

            <WhiteSpace />

            <WingBlank>
              <div style={{  }}>
                <div
                  style={{
                    backgroundColor: "#E8E8E8",
                    marginTop: 12,
                    padding: 8,
                    color: "rgb(37, 56, 84)"
                  }}
                >
                  HÌNH THỨC CHUYỂN TIỀN
                </div>
                <Picker
                  data={data}
                  extra="Chọn"
                  okText="Chọn"
                  dismissText="Hủy"
                  value={this.state.sValue}
                  onChange={v => this.setState({ sValue: v })}
                  onOk={v => this.setState({ sValue: v })}
                  cols={1}
                >
                  <List.Item
                    arrow="horizontal"
                    style={{ borderBottom: "2px solid #f2f2f2" }}
                  >
                    <Text
                      style={{
                        color: "rgb(37, 56, 84)",
                        fontSize: "12pt"
                      }}
                    >
                      Hình thức
                    </Text>
                  </List.Item>
                </Picker>
                {this.renderWithdrawType()}
              </div>
            </WingBlank>

            <div className={styles2.fixed_bottom}>
              <WingBlank>
                <div
                  className={styles2.primary_btn}
                  style={{
                    marginTop: 10,
                    ,
                    height: "38px",
                    lineHeight: "38px"
                  }}
                  onClick={() => this.onOk()}
                >
                  <Text style={{  }}>
                    Tiếp tục
                  </Text>
                </div>
              </WingBlank>
            </div>
          </div>
        );
    }
}
export default WithdrawCommission;