import React from "react";
import { List, Modal, Text, WhiteSpace, ListView, Toast } from "antd-mobile";
import styles from "../OverrideCssAntd.less";
import { stringToNumberFormat } from "../../utils/Helper";

const height = window.innerHeight;

let dataBlob = {};
let sectionIDs = [];
let rowIDs = [];

function genData(ds, listValue) {
    for (let i = 0; i < listValue.length; i++) {
        sectionIDs.push(listValue[i].lbl);
        dataBlob[listValue[i].lbl] = listValue[i].lbl;
        rowIDs[i] = [];

        for (let j = 0; j < listValue[i].val.length; j++) {
            for (let jj = 0; jj < listValue[i].val[j].length; jj++) {
                const rowName = `S${i}, R${listValue[i].val[j][jj].MobileNumberReferral}`;
                rowIDs[i].push(rowName);
                dataBlob[rowName] = rowName;
            }
        }
    }
}

class CommissionMonth extends React.Component {
    constructor(props) {
        super(props);

        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            mobileNumber: localStorage.getItem("mobileNumber"),
            balanceObj: {},
            userInfo: {},
            ListOrrderReferral: [],
            isLoading: true,
            dataSource
        };
    }

    componentWillMount() {
        dataBlob = {};
        sectionIDs = [];
        rowIDs = [];
        if (this.props.location.payload != undefined) {
            this.setState({ balanceObj: this.props.location.payload });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.ListOrrderReferral !== prevState.ListOrrderReferral) {
            this.setState({ ListOrrderReferral: this.state.ListOrrderReferral });
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.state);
        if (
            nextProps.response !== undefined &&
            nextProps.response.data !== undefined
        ) {
            if (nextProps.response.data.Code === "00") {
                console.log(nextProps.response.data.ListValue);
                this.setState({
                    OrderReferral: nextProps.response.data.Value,
                    ListOrrderReferral: nextProps.response.data.ListValue
                });

                let listValue = this.groupBy(
                    nextProps.response.data.ListValue,
                    "MonthlySale"
                );
                console.log(listValue);
                // console.log("Object.keys(listValue)", Object.keys(listValue));
                const keysSorted = Object.keys(listValue).sort((a, b) => b - a);

                const arr = [];

                for (let i = 0; i < keysSorted.length; i++) {
                    let obj = {};
                    obj.lbl = keysSorted[i];
                    obj.val = [];
                    obj.val.push(listValue[keysSorted[i]]);
                    arr.push(obj);
                }

                console.log(arr);

                genData(this.state.dataSource, arr);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(
                        dataBlob,
                        sectionIDs,
                        rowIDs
                    ),
                    isLoading: false
                });
            }
        }
        if (
            nextProps.balance !== undefined &&
            nextProps.balance.data !== undefined
        ) {
            if (nextProps.balance.data.Code === "00") {
                const value = nextProps.balance.data.Value;
                this.setState({
                    BalanceCommission: value.BalanceReferral
                });
            }
        }
        if (nextProps.err !== undefined) {
            Toast.info("Lỗi kết nối hệ thống", 5);
        }
    }

    groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            var key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    render() {
        if (this.state.ListOrrderReferral.length > 0) {
            let index = this.state.ListOrrderReferral.length - 1;

            const separator = (sectionID, rowID) => (
                <div
                    key={rowID}
                    style={{
                        backgroundColor: "#F5F5F9",
                        height: 2,
                        borderTop: "1px solid #ECECED",
                        borderBottom: "1px solid #ECECED"
                    }}
                />
            );

            const row = (rowData, sectionID, rowID) => {
                if (index < 0) {
                    index = this.state.ListOrrderReferral.length - 1;
                }
                const item = this.state.ListOrrderReferral[index--];

                return (
                    <div>
                        <div
                            style={{
                                background: "#FFFFFF",
                                display: "flex",
                                marginTop: 10,
                                fontSize: "17px"
                            }}
                        >
                            <div
                                style={{ margin: "10px 0px", display: "flex", width: "100%" }}
                            >
                                <div
                                    style={{
                                        color: "#253854",
                                        marginLeft: 25,
                                        marginRight: 25,
                                        width: "100%"
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            {item.NameWinner}{" "}
                                            <span style={{ color: "#ba1f25" }}>
                                                {stringToNumberFormat(
                                                    item.Commission != null ? item.Commission : 0
                                                ) + "đ"}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                color: "#BA2027",
                                                marginTop: 5,
                                                fontSize: 16,
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            {item.MobileNumberReferral}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            };
            return (
                <ListView
                    ref={el => (this.lv = el)}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    className={styles.list_referral}
                    renderSectionHeader={sectionData => (
                        <div style={{ background: "#E6E6E6" }}>
                            <img
                                src={require("../../assets/icon_date.png")}
                                alt=""
                                style={{ width: 26, height: 26, paddingRight: 5 }}
                            />
                            {`Tháng ${sectionData.substring(0, sectionData.length - 4)}`}
                            {"/"}

                            {sectionData.substring(
                                sectionData.length - 4,
                                sectionData.length
                            )}
                        </div>
                    )}
                    renderSeparator={separator}
                    style={{
                        height: height
                    }}
                    pullToRefresh={false}
                    useBodyScroll
                    pageSize={500}
                />
            );
        } else {
            return <div></div>;
        }
    }
}

export default CommissionMonth;
