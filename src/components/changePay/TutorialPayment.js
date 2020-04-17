import React from "react";
import styles from "./../Main.less";

class TutorialPayment extends React.Component {
  state = {
    message: ""
  };
  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.location.message !== undefined) {
      this.setState({ message: this.props.location.message });
    }
  }
  createMarkup() {
    return { __html: this.state.message };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  render() {
    return (
      <div
        style={{ background: "#FFF", padding: 12 }}
        className={styles.content}
      >
        {this.rulesText()}
      </div>
    );
  }
}

export default TutorialPayment;
