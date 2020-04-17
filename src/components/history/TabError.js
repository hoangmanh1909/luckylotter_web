import React, { Component } from "react";
import {
  Toast,
  ListView,
  Carousel,
  WingBlank,
  Text,
  Button
} from "antd-mobile";
import { ColorCarousel, ColorButton } from "../../utils/ColorBase";
import { stringToNumberFormat, getOrderStatusName } from "../../utils/Helper";
import styles from "./History.less";

const height = window.innerHeight - 208;

class TabError extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      // getSectionHeaderData: getSectionData,
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      data: [],
      dataSource,
      userName: ""
    };
  }

  componentWillMount() {
    if (this.props.activeTab == 2) {
      if (localStorage.getItem("dataError") != null) {
        const data = JSON.parse(localStorage.getItem("dataError"));
        this.setState({
          data: data,
          dataSource: this.state.dataSource.cloneWithRows(data)
        });
        localStorage.removeItem("dataError");
      } else {
        this.props.onAnimating();
        this.props.onGetError();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataError != undefined) {
      this.setState({
        data: nextProps.dataError,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataError)
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTab != this.props.activeTab) {
      if (this.props.activeTab == 2) {
        this.props.onAnimating();
        this.props.onGetError();
      }
    }
  }

  onItem = rowData => {
    this.props.onItem(rowData);
    // localStorage.setItem("dataError", JSON.stringify(this.state.data));
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
          border: "1px solid #E32E35",
          color: "#E32E35",
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

  renderList() {
    if (this.state.data.length) {
      return (
        <ListView
          ref={el => (this.lv = el)}
          key={"2"}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            this.renderRow(rowData, rowID)
          }
          renderSeparator={this.separator}
          style={{
            height: height
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
            marginRight: 5,
            marginTop: 10
          }}
        >
          {this.renderList()}
        </WingBlank>
      </div>
    );
  }
}
export default TabError;
