import React from 'react';
import { Toast,WingBlank,InputItem, Text, List,DatePicker,LocaleProvider, WhiteSpace } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import styles2 from '../Main.less';


class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pidNumber: '',
            mobileNumber: '',
            pidDate: '',
            pidPlace: '',
            taxCode: '',
            name:'',
            email:''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.info !== undefined) {
            if (nextProps.info.data.Code === "00" ) {
                this.setState({ 
                    pidNumber: nextProps.info.data.Value.PIdNumber,
                    mobileNumber: nextProps.info.data.Value.MobileNumber,
                    pidPlace: nextProps.info.data.Value.PIDPlace,
                    taxCode: nextProps.info.data.Value.TaxCode,
                    name: nextProps.info.data.Value.Name,
                    email: nextProps.info.data.Value.EmailAddress,
                 })
                 if(nextProps.info.data.Value.PIDDate !== "" && nextProps.info.data.Value.PIDDate !== null){
                    this.setState({pidDate: new Date(nextProps.info.data.Value.PIDDate)})
                 }
            }
        }
        if(nextProps.updateInf !== undefined && nextProps.updateInf.data !== undefined
            && nextProps.updateInf.data !== ""){
                if (nextProps.updateInf.data.Code === "00" ) {
                    Toast.info("Cập nhật thông tin thành công", 3);
                    this.props.history.goBack();
                }else{
                    Toast.info("Cập nhật thông tin không thành công", 3)
                }
          }
        if (nextProps.err !== undefined) {
            this.setState({ animating: false })
            Toast.info("Lỗi kết nối hệ thống", 5)
        }
    }
    onChangePIDNumber = (value) => {
        this.setState({ pidNumber: value })
    }
    onChangePIDPlace = (value) => {
        this.setState({ pidPlace: value })
    }
    onChangeTaxCode = (value) => {
        this.setState({ taxCode: value })
    }
    onChangeName = (value) => {
        this.setState({ name: value })
    }
    onChangeEmail = (value) => {
        this.setState({ email: value })
    }
    onOk = () => {
        if (this.state.name === '') {
            Toast.info("Vui lòng nhập họ tên", 2);
            return;
        }

        if (this.state.pidNumber === '') {
            Toast.info("Vui lòng nhập số chứng minh nhân dân", 2);
            return;
        }

        if (this.state.mobileNumber === '') {
            Toast.info("Vui lòng nhập số điện thoại", 2);
            return;
        }
        if (this.state.pidPlace === '') {
            Toast.info("Vui lòng nhập nơi cấp CMND", 2);
            return;
        }
        if (this.state.pidDate === '') {
            Toast.info("Vui lòng nhập ngày cấp CMND", 2);
            return;
        }
        if (this.state.taxCode === '') {
            Toast.info("Vui lòng nhập mã số thuế", 2);
            return;
        }
        
        this.props.onUpdatePersonalInfo(this.state);
    }
    render() {
        return (
            <div style={{fontFamily:"Helvetica"}}>
                <WingBlank >
                    <div>
                    <InputItem labelNumber={3} type="number" disabled={true} value={this.state.mobileNumber} clear placeholder="Nhập số điện thoại" style={{ textAlign: "left", color: "rgb(37, 56, 84)",  fontWeight:"bold" }}>
                        <img
                            src={require("../../assets/icon/icon-09.png")}
                            alt=""
                            style={{width:40, height:35, textAlign:"right"}}
                            />
                    </InputItem>
                    </div>
                <WhiteSpace>
                </WhiteSpace>
                    <div>
                    <div style={{borderBottom:"2px solid #f2f2f2"}}>
                        <InputItem value={this.state.name} onChange={this.onChangeName} clear placeholder="Nhập họ tên" style={{ textAlign: "right", color: "rgb(37, 56, 84)", fontSize:14 }}>
                        <img
                            src={require("../../assets/icon/icon-01.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                            <Text style={{color: "rgb(37, 56, 84)", fontSize:14 }}>Họ tên</Text>
                        </InputItem>
                        </div>
                        <InputItem value={this.state.email} onChange={this.onChangeEmail} clear placeholder="Nhập email" style={{ textAlign: "right",  color: "rgb(37, 56, 84)", fontSize:14 }}>
                        <img
                            src={require("../../assets/icon/icon-02.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                            <Text style={{ color: "rgb(37, 56, 84)", fontSize:14 }}>Email</Text>
                            </InputItem>
                    </div>
                <WhiteSpace>
                </WhiteSpace>
                <div>
                <div style={{borderBottom:"2px solid #f2f2f2"}}>
                    <InputItem value={this.state.pidNumber} onChange={this.onChangePIDNumber} clear placeholder="Nhập số CMND" style={{ textAlign: "right",  color: "rgb(37, 56, 84)", fontSize:14 }}>
                    <img
                            src={require("../../assets/icon/icon-03.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                        <Text style={{ color: "rgb(37, 56, 84)", fontSize:14 }}>CMND</Text>
                        </InputItem>
                </div>
                <div style={{borderBottom:"2px solid #f2f2f2"}}>
                    <InputItem value={this.state.pidPlace} onChange={this.onChangePIDPlace} clear placeholder="Nhập nơi cấp" style={{ textAlign: "right", color: "rgb(37, 56, 84)", fontSize:14 }}>
                    <img
                            src={require("../../assets/icon/icon-04.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                        <Text style={{ color: "rgb(37, 56, 84)", fontSize:14 }}>Nơi cấp</Text>
                        </InputItem>
                </div>
                    <DatePicker
                        mode="date"
                        locale={enUs}
                        title="Chọn ngày cấp"
                        extra="Chọn ngày cấp"
                        value={this.state.pidDate}
                        onChange={pidDate => this.setState({ pidDate })}
                        >
                        <List.Item arrow="horizontal" style={{borderBottom:"2px solid #f2f2f2"}}>
                        <img
                        src={require("../../assets/icon/icon-05.png")}
                        alt=""
                        style={{width:20, height:20, paddingRight: 15}}
                        />
                            <Text style={{ color: "rgb(37, 56, 84)", fontSize:14 }}>Ngày cấp</Text>
                        </List.Item>
                    </DatePicker>

                    <div style={{borderBottom:"2px solid #f2f2f2"}}>
                    <InputItem labelNumber={7} value={this.state.taxCode} onChange={this.onChangeTaxCode} clear placeholder="Nhập mã số thuế" style={{ textAlign: "right", color: "rgb(37, 56, 84)", fontSize:14 }}>
                    <img
                            src={require("../../assets/icon/icon-06.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                        <Text style={{ color: "rgb(37, 56, 84)", fontSize:14, width:100 }}>Mã số thuế</Text></InputItem>
                        </div>
                    <WhiteSpace>
                </WhiteSpace>
                {/* <div>
                    <InputItem labelNumber={7} value={this.state.refCode} onChange={this.onChangeRefCode} clear placeholder="Nhập mã giới thiệu" style={{ textAlign: "right", color: "rgb(37, 56, 84)", fontSize:14 }}>
                    <img
                            src={require("../../assets/icon/icon-07.png")}
                            alt=""
                            style={{width:20, height:20, paddingRight: 15}}
                            />
                        <Text style={{ color: "rgb(37, 56, 84)", fontSize:14 }}>Mã giới thiệu</Text>
                        </InputItem>
                </div> */}
                    
                </div>

            </WingBlank>
            <div className={styles2.fixed_bottom}>
                <WingBlank>
                    <div className={styles2.primary_btn} style={{ marginTop: 10, height: "38px", lineHeight: "38px" }} onClick={() => this.onOk()}><Text style={{  }}>Cập nhật</Text></div>
                </WingBlank>
            </div>
        </div>
        );
    }
}
export default UpdateInfo;