import React from 'react';
import styles2 from '../Main.less';
import { InputItem, Text, ActivityIndicator, Toast } from 'antd-mobile';
import { stringToNumberFormat } from '../../utils/Helper';
import { API_KEY, SOURCE_CHANNEL } from '../../config.js';
import CryptoJS from 'crypto-js';
class ChangeViettelPayAccept extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            fee: 0,
            totalAmount: 0,
            animating: false,
            token_payment: ""
        }
    }

    componentWillMount() {
        this.setState({
            data: this.props.location.payload.data,
            totalAmount: (parseInt(this.props.location.payload.data.TransAmount) + parseInt(this.props.location.payload.data.Fee))
        });
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.fee !== undefined) {
        //     if (nextProps.fee.data.Code === "00") {
        //         this.setState({ fee: nextProps.fee.data.Value, totalAmount: (parseInt(this.state.data.TransAmount) + parseInt(nextProps.fee.data.Value)) })
        //     }
        // }        
        if (nextProps.resAdd !== undefined && nextProps.resAdd !== "") {
            this.setState({ animating: false })
            if (nextProps.resAdd.data.Code === "00") {
                Toast.info(
                    "Yêu cầu Chuyển thưởng của quý khách đã được ghi nhận và xử lý trong thời gian không quá 3 ngày làm việc (trừ thứ 7, chủ nhật, ngày lễ…).",
                    10
                );
                this.props.onWin();
            }
            else {
                Toast.info(nextProps.resAdd.data.Message, 2)
            }
        }
        if (nextProps.err !== undefined) {
            this.setState({ animating: false })
            Toast.info("Lỗi kết nối hệ thống", 5)
        }
        if (nextProps.token !== undefined) {
            if (nextProps.token.data.Code === "00") {
                let value = nextProps.token.data.Value;
                this.setState({
                    token_payment: value
                })
            }
        }
    }
    
    onOk = () => {
        this.setState({ animating: true })
        let data = {};
        data.MerchantID = 8;
        data.TransAmount = parseInt(this.state.data.TransAmount);
        data.TransType = 2;
        data.ChangeType = 1;
        data.MobileNumber = this.state.data.MobileNumber;
        data.Fee = this.state.data.Fee;
        data.Token_payment = this.state.token_payment;
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL).toString().toUpperCase();
        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MerchantID +
            data.TransAmount +
            data.MobileNumber +
            data.TransType +
            data.ChangeType +
            localStorage.getItem("token")
        ).toString();
        this.props.onOK(data);
        console.log('data',data);
        
    }

    render() {
        const data = this.state.data;
        return (
            <div style={{ background: "#FFFFFF", paddingBottom: 15, fontSize: "12pt" }} className={styles2.content}>
                <ActivityIndicator className={styles2.spin} animating={this.state.animating} toast>
                </ActivityIndicator>
                <div className="am-list-item am-input-item am-list-item-middle">
                    <div className="am-list-line">
                        <div style={{ width: 140, fontSize: "12pt" }} className="am-input-label am-input-label-5">
                            <div>Tổng tiền thưởng</div>
                        </div>
                        <div className="am-input-control">
                            <Text style={{ float: "right", color: "rgb(255, 0, 0)", fontSize: "12pt", fontWeight: "bold", fontFamily: "sans-serif" }}>
                                {stringToNumberFormat(data.Balance) + ' đ'}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="am-list-item am-input-item am-list-item-middle">
                    <div className="am-list-line">
                        <div style={{ width: 170, fontSize: "12pt" }} className="am-input-label am-input-label-5">
                            <div>Số tiền chuyển thưởng</div>
                        </div>
                        <div className="am-input-control">
                            <Text style={{ float: "right", color: "rgb(255, 0, 0)", fontSize: "12pt", fontWeight: "bold", fontFamily: "sans-serif" }}>
                                {stringToNumberFormat(data.TransAmount) + ' đ'}
                            </Text>
                        </div>
                    </div>
                </div>
                {/* <div className="am-list-item am-input-item am-list-item-middle">
                    <div className="am-list-line">
                        <div style={{ width: 130 ,fontSize:"12pt"}} className="am-input-label am-input-label-5">
                            <div>Phí</div>
                        </div>
                        <div className="am-input-control">
                            <Text style={{ float: "right", color: "rgb(255, 0, 0)", fontSize: 17, fontWeight: "bold", fontFamily: "sans-serif" }}>
                                {stringToNumberFormat(this.state.data.Fee) + ' đ'}
                            </Text>
                        </div>
                    </div>
                </div> */}
                <div className="am-list-item am-input-item am-list-item-middle">
                    <div className="am-list-line">
                        <div style={{ width: 130, fontSize: "12pt" }} className="am-input-label am-input-label-5">
                            <div>Thanh toán</div>
                        </div>
                        <div className="am-input-control">
                            <Text style={{ float: "right", color: "rgb(255, 0, 0)", fontSize: 17, fontWeight: "bold", fontFamily: "sans-serif" }}>
                                {stringToNumberFormat(this.state.totalAmount) + ' đ'}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="am-list-item am-input-item am-list-item-middle">
                    <div className="am-list-line">
                        <div style={{ width: 130, fontSize: "12pt" }} className="am-input-label am-input-label-5">
                            <div>Số điện thoại</div>
                        </div>
                        <div className="am-input-control">
                            <Text style={{ float: "right", fontSize: "12pt" }}>
                                {data.MobileNumber}
                            </Text>
                        </div>
                    </div>
                </div>
                <div onClick={() => this.onOk()} className={styles2.primary_btn} style={{ margin: 15, height: 40 }}>Hoàn tất</div>
            </div>
        );
    }
}
export default ChangeViettelPayAccept;