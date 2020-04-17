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

const height = window.innerHeight - 233;

class TabPaymentSuccess extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });

    this.state = {
      tabA: true,
      tabB: false,
      tabC: false,
      tabIndex: 1,
      data: [],
      dataSource: ds.cloneWithRows([]),
      pageIndex: 1,
      totalRow: 0,
      refreshing: false
    };
  }

  componentWillMount() {
    if (this.props.activeTab == 1) {
      if (localStorage.getItem("dataSuccess") != null) {
        const data = JSON.parse(localStorage.getItem("dataSuccess"));
        // console.log(data)
        this.setState({
          data: data.data,
          dataSource: this.state.dataSource.cloneWithRows(data.data),
          pageIndex: data.pageIndex,
          totalRow: data.totalRow,
          refreshing: data.refreshing,
          tabA: data.tabA,
          tabB: data.tabB,
          tabC: data.tabC,
          tabIndex: data.tabIndex
        });
        localStorage.removeItem("dataSuccess");
      } else {
        let data = {};
        data.TabIndex = this.state.tabIndex;
        data.PageIndex = this.state.pageIndex;
        this.props.onAnimating();
        this.props.onGetSuccess(data);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSuccess != undefined) {
      let rData = [];
      if (this.state.refreshing) {
        rData = [...this.state.data, ...nextProps.dataSuccess];
      } else rData = [...nextProps.dataSuccess];
      if (this.props.activeTab == 1) {
        this.setState({
          data: rData,
          dataSource: this.state.dataSource.cloneWithRows(rData),
          totalRow: nextProps.totalRow,
          refreshing: false
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab != this.props.activeTab) {
      if (this.props.activeTab == 1) {
        let data = {};
        data.TabIndex = this.state.tabIndex;
        data.PageIndex = this.state.pageIndex;
        this.props.onAnimating();
        this.props.onGetSuccess(data);
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
    } else {
      pathLogo = require("../../assets/power.png");
    }
    return (
      <div
        key={rowID}
        className={styles.h_list_item}
        onClick={() => this.onItem(rowData)}
      >
        <div className={styles.h_item}>
          <img className={styles.img_logo} src={pathLogo} alt="" />
          <div className={styles.div_border} />
          <div className={styles.div_left}>
            <div className={styles.div_name}>{`Nhận: ${rowData.FullName}`}</div>
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
                src={require("../../assets/lotter.png")}
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
    this.props.onItem(rowData);
    // let data = {};
    // data.data = this.state.data;
    // data.pageIndex = this.state.pageIndex;
    // data.totalRow = this.state.totalRow;
    // data.refreshing = this.state.refreshing;
    // data.tabA = this.state.tabA;
    // data.tabB = this.state.tabB;
    // data.tabC = this.state.tabC;
    // data.tabIndex = this.state.tabIndex;
    // localStorage.setItem("dataSuccess", JSON.stringify(data));
  };

  renderStatusPayment = code => {
    let name = getOrderStatusName(code);
    if (code === "H") {
      return (
        <Text
          style={{
            border: "1px solid red",
            color: "red",
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
      if (this.props.activeTab == 1) {
        let data = {};
        data.TabIndex = this.state.tabIndex;
        data.PageIndex = this.state.pageIndex + 1;
        this.setState({ refreshing: true });
        this.props.onAnimating();
        this.props.onGetSuccess(data);
        this.setState({ pageIndex: this.state.pageIndex + 1 });
      }
    }
  }

  onGetData = index => {
    if (index == 0) {
      this.setState({ tabA: true, tabB: false, tabC: false, tabIndex: 1 });
      let data = {};
      data.TabIndex = 1;
      data.PageIndex = this.state.pageIndex;
      this.props.onAnimating();
      this.props.onGetSuccess(data);
    } else if (index == 1) {
      this.setState({ tabA: false, tabB: true, tabC: false, tabIndex: 2 });
      let data = {};
      data.TabIndex = 2;
      data.PageIndex = this.state.pageIndex;
      this.props.onAnimating();
      this.props.onGetSuccess(data);
    } else {
      this.setState({ tabA: false, tabB: false, tabC: true, tabIndex: 3 });
      let data = {};
      data.TabIndex = 3;
      data.PageIndex = this.state.pageIndex;
      this.props.onAnimating();
      this.props.onGetSuccess(data);
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
            height: height 
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
              Chưa xổ
            </div>
            <div
              className={this.state.tabB ? styles.button_s_bg : styles.button_s}
              onClick={() => this.onGetData(1)}
            >
              Trúng thưởng
            </div>
            <div
              className={this.state.tabC ? styles.button_s_bg : styles.button_s}
              onClick={() => this.onGetData(2)}
            >
              Đã xổ
            </div>
          </div>
          {this.renderList()}
        </WingBlank>
      </div>
    );
  }
}
export default TabPaymentSuccess;
