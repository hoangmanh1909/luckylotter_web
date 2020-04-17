import React, { Component } from "react";
import { ListView, WingBlank, Text } from "antd-mobile";
import { stringToNumberFormat, getOrderStatusName } from "../../utils/Helper";
import styles from "./History.less";

const height = window.innerHeight - 197;

class TabPaymentPending extends Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const ds = new ListView.DataSource({
      getSectionHeaderData: getSectionData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      isKeno: false,
      data: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab != this.props.activeTab) {
      if (this.props.activeTab == 0) {
        this.props.onAnimating();
        this.props.onGetPending(0);
      }
    }
  }

  componentWillMount() {
    if (this.props.activeTab == 0) {
      if (localStorage.getItem("dataPending") != null) {
        const data = JSON.parse(localStorage.getItem("dataPending"));
        this.setState({
          data: data.data,
          dataSource: this.state.dataSource.cloneWithRows(data.data),
          isKeno: data.isKeno
        });
        localStorage.removeItem("dataPending");
      } else {
        this.props.onAnimating();
        this.props.onGetPending(0);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataPending != undefined && this.props.activeTab == 0) {
      this.setState({
        data: nextProps.dataPending,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataPending)
      });
    }
  }

  onItem = rowData => {
    this.props.onItem(rowData);
    // let data = {};
    // data.data = this.state.data;
    // data.isKeno = this.state.isKeno;
    // localStorage.setItem("dataPending", JSON.stringify(data));
  };

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
    } else if(rowData.ProductID === 7){
      pathLogo = require("../../assets/lottery_123.png");
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
              ) : rowData.StatusWin === "P" ? (
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

  renderStatusPayment = code => {
    let name = getOrderStatusName(code);
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

  onGetData = index => {
    if (index == 0) {
      this.setState({ isKeno: true });
      this.props.onAnimating();
      this.props.onGetPending(6);
    } else {
      this.setState({ isKeno: false });
      this.props.onAnimating();
      this.props.onGetPending(0);
    }
  };

  renderList() {
    if (this.state.data.length) {
      return (
        <ListView
          className={styles.content}
          ref={(el) => (this.lv = el)}
          key={"0"}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            this.renderRow(rowData, rowID)
          }
          renderSeparator={this.separator}
          style={{
            height: height,
          }}
          pullToRefresh={false}
          useBodyScroll
          pageSize={500}
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
          {this.renderList()}
        </WingBlank>
      </div>
    );
  }
}
export default TabPaymentPending;
