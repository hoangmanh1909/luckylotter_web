import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Toast,
    ListView,
    Carousel,
    WingBlank,
    Text,
    Button,
    PullToRefresh,
    Icon
} from "antd-mobile";
import { ColorCarousel, ColorButton } from "../../utils/ColorBase";
import { stringToNumberFormat, getOrderStatusName } from "../../utils/Helper";
import styles from "./History.less";

const height = window.innerHeight;

class TabGift extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            tabA: true,
            tabB: false,
            type: 2,
            data: [],
            dataSource: ds.cloneWithRows([]),
            refreshing: false,
        };
    }

    componentWillMount() {
        if (this.props.activeTab == 3) {
            if (localStorage.getItem("dataGift") != null) {
                const data = JSON.parse(localStorage.getItem("dataGift"));
                // console.log(data)
                this.setState({
                    data: data.data,
                    dataSource: this.state.dataSource.cloneWithRows(data.data),
                    refreshing: data.refreshing,
                    tabA: data.tabA,
                    tabB: data.tabB,
                    type: data.type
                });
                localStorage.removeItem("dataGift");
            } else {
                let data = {};
                data.Type = this.state.type;
                this.props.onAnimating();
                this.props.onGetGift(data);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataGift != undefined) {
            let rData = [];
            if (this.state.refreshing) {
                rData = [...this.state.data, ...nextProps.dataGift];
            } else rData = [...nextProps.dataGift];
            if (this.props.activeTab == 3) {
                this.setState({
                    data: rData,
                    dataSource: this.state.dataSource.cloneWithRows(rData),
                    refreshing: false
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        //   console.log(this.state.type)
        //   console.log( prevProps.activeTab)
        if (prevProps.activeTab != this.props.activeTab) {
            if (this.props.activeTab == 3) {
                let data = {};
                data.Type = this.state.type;
                this.props.onAnimating();
                this.props.onGetGift(data);
            }
        }
    }

    renderRow = (rowData, rowID) => {
        let pathLogo = "";
        if (rowData.ProductID === 1) {
            pathLogo = require("../../assets/mega.png");
        } else if (rowData.ProductID === 2) {
            pathLogo = require("../../assets/max4d.png");
        } else if (rowData.ProductID === 4) {
            pathLogo = require("../../assets/max3d.png");
        } else if (rowData.ProductID === 5) {
            pathLogo = require("../../assets/max3dcong.png");
        } else if (rowData.ProductID === 6) {
            pathLogo = require("../../assets/keno_logo.png");
        } else if (rowData.ProductID === 7) {
            pathLogo = require("../../assets/lottery_123.png");
        } else if(rowData.ProductID === 8){
            pathLogo = require("../../assets/lottery_234.png");
        }else {
            pathLogo = require("../../assets/power.png");
        }
        return (
            <div
                key={rowID}
                className={styles.h_list_item}
                onClick={() => this.onItem(rowData)}
            >
                <div className={styles.h_item}>
                    <img
                        className={
                            rowData.ProductID === 7 ? styles.img_logo_123 : styles.img_logo
                        }
                        src={pathLogo}
                        alt=""
                    />
                    <div className={styles.div_border} />
                    <div className={styles.div_left}>
                        {this.state.type === 1 ? (
                            <div className={styles.div_name}>{`Gửi tặng: ${rowData.FullName}`}</div>) :
                            this.state.type === 2 ? (<div className={styles.div_name}>{`Nhận từ: ${rowData.FullName}`}</div>) : ("")}
                        <div>
                            <span>Đại lý giữ hộ</span>
                        </div>
                        <div className={styles.date}>
                            {rowData.OrderDate.substring(0, 16)}
                        </div>
                    </div>

                    <div className={styles.div_right}>
                        <div className={styles.div_code}>#{rowData.OrderCode}</div>
                        <div className={styles.div_status}>
                            {rowData.StatusWin === "Y" ? (
                                <img
                                    className={styles.img_status_win}
                                    src={require("../../assets/cup_xanh_la.png")}
                                    alt=""
                                />
                            ) : rowData.StatusWin === "P" || this.state.tabC ? (
                                <img
                                    className={styles.img_status_win}
                                    src={require("../../assets/computer.png")}
                                    alt=""
                                />
                            ) : (
                                        ""
                                    )}
                            {this.renderStatusPayment(rowData.Status)}
                        </div>
                        <div className={styles.amount_item_viettel}>
                            <img
                                className={styles.img_viettel}
                                src={require("../../assets/viettelpay.jpg")}
                                alt=""
                            />
                            <Text>{`${stringToNumberFormat(rowData.Amount)} đ`}</Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    onItem = rowData => {
        rowData.type = this.state.type;
        this.props.onItem(rowData);
        let data = {};
        data.data = this.state.data;
        data.refreshing = this.state.refreshing;
        data.tabA = this.state.tabA;
        data.tabB = this.state.tabB;
        data.type = this.state.type;
        localStorage.setItem("dataGift", JSON.stringify(data));
    };

    renderStatusPayment = code => {
        let name = getOrderStatusName(code);
        if (code === "A") {
            return (
                <Text
                    style={{
                        border: "1px solid #39B54A",
                        color: "#39B54A",
                        padding: 2,
                        borderRadius: 4,
                        minWidth: 81,
                        textAlign: "center"
                    }}
                >
                    {name}
                </Text>
            );
        } else {
            return (
                <Text
                    style={{
                        border: "1px solid #FFC125",
                        color: "#FFC125",
                        padding: 2,
                        borderRadius: 4,
                        minWidth: 81,
                        textAlign: "center"
                    }}
                >
                    {name}
                </Text>
            );
        }
    };

    separator = (sectionID, rowID) => (
        <div
            key={`${sectionID}-${rowID}`}
            style={{
                backgroundColor: "#F5F5F9",
                height: 1,
                borderTop: "1px solid #ECECED",
                borderBottom: "1px solid #ECECED"
            }}
        />
    );

    onRefresh() {
        // console.log(this.state.data.length);
        // console.log(this.state.totalRow);
        // console.log(this.props.activeTab);
        if (this.state.data.length < this.state.totalRow) {
            if (this.props.activeTab == 3) {
                let data = {};
                data.Type = this.state.type;
                this.setState({ refreshing: true });
                this.props.onAnimating();
                this.props.onGetGift(data);
            }
        }
    }

    onGetData = index => {
        if (index == 0) {
            this.setState({ tabA: true, tabB: false, type: 2 });
            let data = {};
            data.Type = 2;
            this.props.onAnimating();
            this.props.onGetGift(data);
        } else {
            this.setState({ tabA: false, tabB: true, type: 1 });
            let data = {};
            data.Type = 1;
            this.props.onAnimating();
            this.props.onGetGift(data);
        }
    };

    renderList() {
        if (this.state.data.length) {
            return (
                <ListView
                    ref={el => (this.lv = el)}
                    key={"1"}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) =>
                        this.renderRow(rowData, rowID)
                    }
                    renderSeparator={this.separator}
                    contentContainerStyle={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center"
                    }}
                    className="am-list"
                    style={{
                        height: document.documentElement.clientHeight
                    }}
                    pullToRefresh={
                        <PullToRefresh
                            refreshing={this.state.refreshing}
                            direction="up"
                            onRefresh={() => this.onRefresh()}
                            indicator={{
                                activate: "Bắt đầu tải",
                                release: <Icon type="loading" />,
                                finish: "Hoàn thành",
                                deactivate: "Kết thúc"
                            }}
                        />
                    }
                    useBodyScroll
                    pageSize={100}
                />
            );
        } else {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: height
                    }}
                >
                    Danh sách trống
        </div>
            );
        }
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <WingBlank
                    style={{
                        marginLeft: 5,
                        marginRight: 5
                    }}
                >
                    <div className={styles.group_btn_history}>
                        <div
                            className={this.state.tabA ? styles.button_s_bg : styles.button_s}
                            onClick={() => this.onGetData(0)}
                        >
                            Được tặng
            </div>
                        <div
                            className={this.state.tabB ? styles.button_s_bg : styles.button_s}
                            onClick={() => this.onGetData(1)}
                        >
                            Đã tặng
            </div>
                    </div>
                    {this.renderList()}
                </WingBlank>
            </div>
        );
    }
}
export default TabGift;
