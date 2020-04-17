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
        console.log('ListReferral', nextProps.response.data.ListValue);

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
                        fontSize: "17px",
                        with: "100%",
                        justifyContent: "flex-end"
                    }}
                >

                    <div style={{ marginRight: 25, alignSelf: "center", display: "flex", with: "100%", }}>
                        <div style={{ fontSize: "18px", marginTop: 10, marginBottom: 10, color: "#ba1f25", display: "flex", justifyContent: "flex-end" }}>
                            {stringToNumberFormat(
                                this.state.OrderReferral != null
                                    ? this.state.OrderReferral
                                    : 0
                            ) + " đ"}
                        </div>
                    </div>
                </div>

                <div>
                    {this.state.ListOrrderReferral.map((item, index, data) => {
                        return (
                            <div style={{
                                background: "#FFFFFF",
                                display: "flex",
                                marginTop: 10,
                                fontSize: "17px"
                            }} >
                                <div
                                    key={item.ID}
                                    style={{ margin: "10px 0px", display: "flex", width: "100%", }}
                                >
                                    <div
                                        style={{ color: "#253854", marginLeft: 25, marginRight: 25, width: "100%", }}
                                    ><div>
                                            <div
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                            >
                                                {item.NameWinner} <span style={{ color: "#ba1f25" }}>{stringToNumberFormat(
                                                    item.OrderAmount != null
                                                        ? item.OrderAmount
                                                        : 0
                                                ) + " đ"}</span></div>
                                            <div style={{ marginTop: 5, fontSize: 18, display: "flex", justifyContent: "space-between", color: "#ba1f25" }}>{item.MobileNumberReferral}</div>
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
