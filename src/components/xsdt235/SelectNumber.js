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
class SelectNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data_column1: columns,
      data_column2: columns,
      data_column3: columns,
      data_column4: columns,
      data_column5: columns
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      const dataNumber = this.props.onValue(this.props.type);
      if (dataNumber !== undefined && dataNumber[0] !== "") {
        dataNumber.map((item, index, data) => {
        if(this.props.tabIndex == 3){
            if (index === 0) {
              this.updateColumn(item, 1);
            } else if (index === 1) {
              this.updateColumn(item.substr(0, 1), 2);
            } else if (index === 2) {
              this.updateColumn(item.substr(0, 1), 3);
            } else if (index === 3) {
              this.updateColumn(item.substr(0, 1), 4);
            } else {
              this.updateColumn(item.substr(0, 1), 5);
            }
          } 
      //     else if(this.props.tabIndex == 2){
      //       if (index === 0) {
      //         this.updateColumn(item, 1);
      //       } else if (index === 1) {
      //         this.updateColumn(item.substr(0, 1), 2);
      //       } else if (index === 2) {
      //         this.updateColumn(item.substr(0, 1), 3);
      //       }
      //    } else if(this.props.tabIndex == 1){
      //       if (index === 0) {
      //         this.updateColumn(item, 1);
      //       } else if (index === 1) {
      //         this.updateColumn(item.substr(0, 1), 2);
      //    }
      //  }

        });
      } else {
        this.setState({
          data_column1: columns,
          data_column2: columns,
          data_column3: columns,
          data_column4: columns,
          data_column5: columns
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
        this.setState({ data_column1: data });
        break;
      case 2:
        this.setState({ data_column2: data });
        break;
      case 3:
        this.setState({ data_column3: data });
        break;
      case 4:
        this.setState({ data_column4: data });
        break;
      case 5:
        this.setState({ data_column5: data });
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
          {this.initColumn(this.state.data_column1, 1)}
        </div>
        <div className={styles.column_modal}>
          {" "}
          {this.initColumn(this.state.data_column2, 2)}
        </div>
        <div className={styles.column_modal}>
          {" "}
          {this.initColumn(this.state.data_column3, 3)}
        </div>
        <div className={styles.column_modal}>
          {" "}
          {this.initColumn(this.state.data_column4, 4)}
        </div>
        <div className={styles.column_modal}>
          {" "}
          {this.initColumn(this.state.data_column5, 5)}
        </div>
      </div>
    );};

  checkData = (column = []) => {
    return column.findIndex(item => {
      return item === true;
    });
  };

  ok(){
        if (
          this.checkData(this.state.data_column1) === -1 ||
          this.checkData(this.state.data_column2) === -1 ||
          this.checkData(this.state.data_column3) === -1 ||
          this.checkData(this.state.data_column4) === -1 ||
          this.checkData(this.state.data_column5) === -1
        ) {
          Toast.info(`Vui lòng chọn 5 số!`, 2);
        } else {
          const data = [
            this.checkData(this.state.data_column1),
            this.checkData(this.state.data_column2).toString(),
              this.checkData(this.state.data_column3).toString(),
            this.checkData(this.state.data_column4).toString(),
              this.checkData(this.state.data_column5).toString()
          ];
          
          return this.props.onAccept("modal", data, this.props.type)();
        }
  };

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

export default SelectNumber;
