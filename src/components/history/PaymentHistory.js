import React from "react";
import {
  Toast,
  ListView,
  Carousel,
  WingBlank,
  Text,
  Button,
  Tabs,
  ActivityIndicator,
} from "antd-mobile";
import TabError from "./TabError";
import TabPaymentPending from "./TabPaymentPending";
import TabPaymentSuccess from "./TabPaymentSuccess";
import styles from "./History.less";

const tabs = [{ title: "Đang chờ" }, { title: "Đã mua" }, { title: "Đã hủy" }];

class PaymentHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab:
        localStorage.getItem("activeTab") != null
          ? parseInt(localStorage.getItem("activeTab"))
          : 0,
      dataPending: [],
      dataSuccess: [],
      totalRowSuccess: 0,
      dataError: [],
      animating: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("activeTab") != null) {
      localStorage.removeItem("activeTab");
    }
    // window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ animating: false });
    console.log(nextProps)
    if (nextProps.dataPending != undefined) {
      this.setState({
        dataPending: nextProps.dataPending,
      });
    }
    if (nextProps.dataSuccess != undefined) {
      // console.log(nextProps.success);
      this.setState({
        dataSuccess: nextProps.dataSuccess,
        totalRowSuccess: parseInt(nextProps.totalRowSuccess),
      });
    }
    if (nextProps.dataError != undefined) {
      this.setState({
        dataError: nextProps.dataError,
      });
    }
  }

  onAnimating = () => {
    this.setState({ animating: true });
  };

  onItem = (item) => {
    localStorage.setItem("activeTab", this.state.activeTab);
    // console.log(item)
    if (item.ProductID == 6) this.props.onItemKeno(item);
    else this.props.onItem(item);
  };

  onGetPending = (productID) => {
    this.props.onGetPending(productID);
  };

  onGetSuccess = (pageIndex) => {
    // console.log(pageIndex)
    this.props.onGetSuccess(pageIndex);
  };

  onGetError = () => {
    this.props.onGetError();
  };

  onTabClick = (tab, index) => {
    this.setState({ activeTab: index });
  };

  render() {
    return (
      <div style={{ background: "#ffffff" }}>
        <ActivityIndicator
          className={styles.spin}
          animating={this.state.animating}
          toast
        />
        <Tabs
          tabs={tabs}
          initialPage={this.state.activeTab}
          swipeable={false}
          onTabClick={(tab, index) => this.onTabClick(tab, index)}
        >
          <TabPaymentPending
            onItem={this.onItem}
            onGetPending={this.onGetPending}
            dataPending={this.state.dataPending}
            activeTab={this.state.activeTab}
            onAnimating={this.onAnimating}
          />
          <TabPaymentSuccess
            onItem={this.onItem}
            onGetSuccess={this.onGetSuccess}
            onAnimating={this.onAnimating}
            dataSuccess={this.state.dataSuccess}
            activeTab={this.state.activeTab}
            totalRow={this.state.totalRowSuccess}
          />
          <TabError
            onItem={this.onItem}
            onGetError={this.onGetError}
            dataError={this.state.dataError}
            activeTab={this.state.activeTab}
            onAnimating={this.onAnimating}
          />
        </Tabs>
      </div>
    );
  }
}

export default PaymentHistory;
