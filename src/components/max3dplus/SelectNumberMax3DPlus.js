import React from "react";
import { Text, Flex, WingBlank, Modal, Toast } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import styles from "../max3d/max3d.less";

class SelectNumberMax3DPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_colum1: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      data_colum2: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      data_colum3: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      data_colum4: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      data_colum5: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      data_colum6: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
  }

  renderNumberColumn1 = number => {
    let datanew = [];
    datanew = this.state.data_colum1.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });
    this.setState({ data_colum1: datanew });
  };

  renderContent1 = () => {
    let datanew;
    datanew = this.state.data_colum1.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn1(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn1(index)}
          >
            {index}
          </Text>
        );
      }
    });

    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };

  renderNumberColumn2 = number => {
    let datanew = [];
    datanew = this.state.data_colum2.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.setState({ data_colum2: datanew });
  };

  renderContent2 = () => {
    const datanew = this.state.data_colum2.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn2(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn2(index)}
          >
            {index}
          </Text>
        );
      }
    });
    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };

  renderNumberColumn3 = number => {
    let datanew = [];
    datanew = this.state.data_colum3.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.setState({ data_colum3: datanew });
  };

  renderContent3 = () => {
    const datanew = this.state.data_colum3.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn3(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn3(index)}
          >
            {index}
          </Text>
        );
      }
    });
    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          borderRight: "1px solid rgb(252, 24, 22)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };

  renderNumberColumn4 = number => {
    let datanew = [];
    datanew = this.state.data_colum4.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.setState({ data_colum4: datanew });
  };

  renderContent4 = () => {
    const datanew = this.state.data_colum4.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn4(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn4(index)}
          >
            {index}
          </Text>
        );
      }
    });
    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };
  renderNumberColumn5 = number => {
    let datanew = [];
    datanew = this.state.data_colum5.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.setState({ data_colum5: datanew });
  };

  renderContent5 = () => {
    const datanew = this.state.data_colum5.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn5(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn5(index)}
          >
            {index}
          </Text>
        );
      }
    });
    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };
  renderNumberColumn6 = number => {
    let datanew = [];
    datanew = this.state.data_colum6.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.setState({ data_colum6: datanew });
  };

  renderContent6 = () => {
    const datanew = this.state.data_colum6.map((item, index, data) => {
      if (index === data.length - 1) {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle_last
                : styles.modal_number_circle_last
            }
            onClick={() => this.renderNumberColumn6(index)}
          >
            {index}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            className={
              item
                ? styles.select_modal_number_circle
                : styles.modal_number_circle
            }
            onClick={() => this.renderNumberColumn6(index)}
          >
            {index}
          </Text>
        );
      }
    });
    return (
      <WingBlank
        style={{
          margin: 0,
          width: "28%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {datanew}
      </WingBlank>
    );
  };
  componentDidUpdate(prevProps) {
    if (this.props.modalType !== prevProps.modalType) {
      const datatype = this.props.onValue(this.props.modalType);

      let datanew = [];
      datanew = this.state.data_colum1.map((item, index, data) => {
        const _index = parseInt(datatype[0]);
        return index === _index ? true : false;
      });

      const datanew1 = this.state.data_colum2.map((item, index, data) => {
        const _index = parseInt(datatype[1]);
        return index === _index ? true : false;
      });
      const datanew2 = this.state.data_colum3.map((item, index, data) => {
        const _index = parseInt(datatype[2]);
        return index === _index ? true : false;
      });

      const datanew4 = this.state.data_colum4.map((item, index, data) => {
        const _index = parseInt(datatype[3]);
        return index === _index ? true : false;
      });

      const datanew5 = this.state.data_colum5.map((item, index, data) => {
        const _index = parseInt(datatype[4]);
        return index === _index ? true : false;
      });

      const datanew6 = this.state.data_colum6.map((item, index, data) => {
        const _index = parseInt(datatype[5]);
        return index === _index ? true : false;
      });
      this.setState({
        data_colum1: datanew,
        data_colum2: datanew1,
        data_colum3: datanew2,
        data_colum4: datanew4,
        data_colum5: datanew5,
        data_colum6: datanew6
      });
    }
  }

  accept1 = () => {
    let value;
    value = this.state.data_colum1.findIndex(item => {
      return item === true;
    });

    return value;
  };

  accept2 = () => {
    const value = this.state.data_colum2.findIndex(item => {
      return item === true;
    });
    return value;
  };

  accept3 = () => {
    const value = this.state.data_colum3.findIndex(item => {
      return item === true;
    });
    return value;
  };

  accept4 = () => {
    let value;
    value = this.state.data_colum4.findIndex(item => {
      return item === true;
    });

    return value;
  };

  accept5 = () => {
    const value = this.state.data_colum5.findIndex(item => {
      return item === true;
    });
    return value;
  };

  accept6 = () => {
    const value = this.state.data_colum6.findIndex(item => {
      return item === true;
    });
    return value;
  };

  accept = () => {
    const value1 = this.accept1();
    const value2 = this.accept2();
    const value3 = this.accept3();
    const value4 = this.accept4();
    const value5 = this.accept5();
    const value6 = this.accept6();

    if (
      value1 !== -1 &&
      value2 !== -1 &&
      value3 !== -1 &&
      value4 !== -1 &&
      value5 !== -1 &&
      value6 !== -1
    ) {
      return this.props.onAccept(
        "modal",
        [value1, value2, value3, value4, value5, value6],
        this.props.modalType
      )();
    } else {
      new Promise(() => {
        Toast.info("Vui lòng chọn đủ 6 số!");
      });
    }
  };

  render() {
    return (
      <WingBlank>
        <Modal
          visible={this.props.modal}
          transparent
          maskClosable={false}
          onClose={this.props.onClose("modal")}
          title="Chọn dãy số dự thưởng"
          footer={[
            {
              text: "Đóng",
              onPress: () => {
                this.props.onClose("modal")();
              }
            },
            {
              text: "Đồng ý",
              onPress: () => {
                this.accept();
              }
            }
          ]}
        >
          <Flex>
            {this.renderContent1()}
            {this.renderContent2()}
            {this.renderContent3()}
            {this.renderContent4()}
            {this.renderContent5()}
            {this.renderContent6()}
          </Flex>
        </Modal>
      </WingBlank>
    );
  }
}

export default SelectNumberMax3DPlus;
