import React from "react";
import { Checkbox } from "antd-mobile";
import styles from "../Main.less";
import "antd-mobile/dist/antd-mobile.css";

const AgreeItem = Checkbox.AgreeItem;
const height = window.innerHeight - 135;
class RulesPaymentText extends React.Component {
  state = {
    message: "",
    balance: 0,
    isCheck: false
  };
  componentWillMount() {
    if (this.props.location.message !== undefined) {
      this.setState({
        message: this.props.location.message,
        balance: this.props.location.balance
      });
    }
  }
  createMarkup() {
    return { __html: this.state.message };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  onChange = val => {
    this.setState({ isCheck: val.target.checked });
  };

  onNext() {
    if (this.state.isCheck) this.props.onViettel(this.state.balance);
  }

  render() {
    return (
      <div style={{ background: "#FFF" }}>
        <div className={styles.content} style={{ height: height, padding: 12 }}>
          {this.rulesText()}
        </div>
        <div
          style={{
            WebkitBoxShadow: "0 -5px 5px 0 rgba(0, 0, 0, .21)",
            padding: 15
          }}
        >
          <AgreeItem onChange={e => this.onChange(e)}>
            Tôi đồng ý với các Quy định chuyển thưởng
          </AgreeItem>
          <div className={styles.primary_btn} onClick={() => this.onNext()}>
            Tiếp tục
          </div>
        </div>
      </div>
    );
  }
}

export default RulesPaymentText;
