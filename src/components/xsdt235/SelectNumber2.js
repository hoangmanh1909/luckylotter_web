import React from "react";
import { Modal, Flex, WingBlank, Text, Toast } from "antd-mobile";
import styles from "./lottery235.less";

const columns = [
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
];
class SelectNumber2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_column1_2: columns,
      data_column2_2: columns
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      const dataNumber = this.props.onValue2(this.props.type);
      if (dataNumber !== undefined && dataNumber[0] !== "") {
        dataNumber.map((item, index, data) => {
        if(this.props.tabIndex == 1){
            if (index === 0) {
              this.updateColumn(item, 1);
            } else if (index === 1) {
              this.updateColumn(item.substr(0, 1), 2);
         }}
        });

      } else {
        this.setState({
          data_column1_2: columns,
          data_column2_2: columns
        });
      }
    }
  }

  updateColumn = (value, position) => {
    const fillData = columns.map((item, index, data) => {
      return index == value ? true : false;
    });
    this.fillDataColumn(fillData, position);
  };

  initColumn = (column = [], position) => {
    return column.map((item, index, data) => {
      return (
        <div
          key={index}
          className={
            item
              ? styles.select_modal_number_circle
              : styles.modal_number_circle
          }
          onClick={() => this.onClickNumber(index, column, position)}
        >
          {index}
        </div>
      );
    });
  };

  fillDataColumn = (data, position) => {
    switch (position) {
      case 1:
        this.setState({ data_column1_2: data });
        break;
      case 2:
        this.setState({ data_column2_2: data });
        break;
      default:
        break;
    }
  };

  onClickNumber = (number, column = [], position) => {
    const dataNew = column.map((item, index, data) => {
      return index === number ? (item = !item) : false;
    });

    this.fillDataColumn(dataNew, position);
  };

  initView = () => {
        return (
          <div style={{ display: "flex" }}>
            <div className={styles.column_modal}>
              {" "}
              {this.initColumn(this.state.data_column1_2, 1)}
            </div>
            <div className={styles.column_modal}>
              {" "}
              {this.initColumn(this.state.data_column2_2, 2)}
            </div>
          </div>
        );}

  checkData = (column = []) => {
    return column.findIndex(item => {
      return item === true;
    });
  };

  ok(){
    console.log(this.props);
    if (
      this.checkData(this.state.data_column1_2) === -1 ||
      this.checkData(this.state.data_column2_2) === -1
    ) {
      Toast.info(`Vui lòng chọn 2 số!`, 2);
    } else {
      const data = [
        this.checkData(this.state.data_column1_2),
        this.checkData(this.state.data_column2_2).toString()
      ];
      return this.props.onAccept("modal", data, this.props.type)();
    }
}

  render() {
    return (
      
      <div>
        <Modal
          visible={this.props.modal}
          transparent
          maskClosable={false}
          onClose={this.props.onClose("modal")}
          title={"Chọn dãy số dự thưởng"}
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
                this.ok();
              }
            }
          ]}
        >
          <Flex>
            
            {this.initView()}</Flex>
        </Modal>
      </div>
    );
  }
}

export default SelectNumber2;
