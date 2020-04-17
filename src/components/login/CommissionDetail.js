import React from "react";
import { List, Modal, Text, WhiteSpace, Flex, Toast } from "antd-mobile";
import styles2 from "../Main.less";
import { stringToNumberFormat } from "../../utils/Helper";

const Item = List.Item;
const prompt = Modal.prompt;

class OrderReferral extends React.Component {
    state = {
        mobileNumber: localStorage.getItem("mobileNumber"),
        balanceObj: {},
        userInfo: {},
        ListOrrderReferral: [],
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
                    OrderReferral: nextProps.response.data.Value,
                    ListOrrderReferral: nextProps.response.data.ListValue,
                });
            }
        }
        if (nextProps.balance !== undefined && nextProps.balance.data !== undefined) {
            if (nextProps.balance.data.Code === "00") {
                const value = nextProps.balance.data.Value;
                this.setState({
                    BalanceCommission: value.BalanceReferral,
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
                        <div style={{ fontSize: "20px", color: "white", textAlign: "center" }}>GIỚI THIỆU BẠN BÈ</div>
                    </Item>
                </div>

                <div
                    style={{
                        background: "#FFFFFF",
                        display: "flex",
                        marginTop: 10,
                        fontSize: "17px"
                    }}
                >

                    <div style={{ marginLeft: 25, alignSelf: "center" }}>
                        <div style={{ fontSize: "20px", marginTop: 10, marginBottom: 10, color: "#ba1f25" }}>
                            TK HH: {stringToNumberFormat(
                            this.state.BalanceCommission != null
                                ? this.state.BalanceCommission
                                : 0
                        ) + " đ"}
                        </div>
                    </div>
                    <div style={{
                        fontSize: "14px", marginTop: 10, marginBottom: 10, borderRadius: 4, color: "white", backgroundColor: "#ba1f25", textAlign: "center", height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                        width: 150, marginLeft: "auto", marginRight: 10
                    }}
                        onClick={() => {
                            this.props.onComissionPayment();
                        }}
                    >
                        Thanh toán hoa hồng
            </div>
                </div>

                <div onClick={() => {
                    this.props.onComissionMonth();
                }}>
                    {this.state.ListOrrderReferral.map((item, index, data) => {
                        return (
                            <div key={item.ID} >
                                <div style={{
                                    background: "#E6E6E6",
                                    display: "flex",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    fontSize: "17px",
                                    marginLeft: 25,
                                    alignItems: "center"
                                }}>
                                    <img
                                        src={require("../../assets/icon_date.png")}
                                        alt=""
                                        style={{ width: 26, height: 26, paddingRight: 5 }}
                                    />
                                Tháng {item.MonthlySale}</div>
                                <div style={{
                                    background: "#FFFFFF",
                                    display: "flex",
                                    marginTop: 0,
                                    fontSize: "17px"
                                }} >
                                    <div
                                        style={{ margin: "10px 0px", display: "flex", width: "100%", }}
                                    >
                                        <div
                                            style={{ color: "#253854", marginLeft: 25, marginRight: 25, width: "100%", }}
                                        ><div>
                                                <div
                                                    style={{ display: "flex", justifyContent: "space-between" }}
                                                >
                                                    Hoa hồng <span style={{ color: "#ba1f25" }}>{stringToNumberFormat(
                                                    item.Commission != null
                                                        ? item.Commission
                                                        : 0
                                                ) + " đ"}</span></div>
                                            </div>
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

export default OrderReferral;
