import React from 'react';
import { Modal, Flex, WingBlank, Text, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
//import styles from '../../utils/mega645.less';
import styles from './lottery234.less';
import { getPadLeft, padLeft } from '../../utils/Helper.js';
const numbers = [false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false];
class SelectNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: numbers
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.type !== prevProps.type) {
            const datatype = this.props.onValue(this.props.type);
            if (datatype !== undefined && datatype[0] !== "") {
                datatype.map((item, index, data) => {
                    console.log("áds",datatype);
                    
                    if (this.props.tabIndex === 2) {
                            this.updateColumn(item, item);
                    } else if (this.props.tabIndex === 3){
                        if (index === 0) {
                            this.updateColumn(item, 1);
                        } else if (index === 1) {
                            this.updateColumn(item, 1);
                        } else if (index === 2) {
                            this.updateColumn(item, 1);
                        } else if (index === 3) {
                            this.updateColumn(item, 1);
                        } 
                        else {
                            this.updateColumn(item, 1);
                        }
                    } else if (this.props.tabIndex === 4){
                        if (index === 0) {
                            this.updateColumn(item, 1);
                        } else if (index === 1) {
                            this.updateColumn(item, 1);
                        } else if (index === 2) {
                            this.updateColumn(item, 1);
                        } else if (index === 3) {
                            this.updateColumn(item, 1);
                        } 
                        else {
                            if (index === 0) {
                                this.updateColumn(item, 1);
                            } else if (index === 1) {
                                this.updateColumn(item, 1);
                            } else if (index === 2) {
                                this.updateColumn(item, 1);
                            } else if (index === 3) {
                                this.updateColumn(item, 1);
                            } 
                            else {
                                this.updateColumn(item, 1);
                            }
                        }
                    }

                });
            } else {
                this.setState({
                    data: numbers
                })
            }
            // const datanew = this.state.data.map((_item, index, data) => {
            //     return datatype.some(x => x === _index + 1);
            // })
            // this.setState({ data: datanew })

        }
    }
    updateColumn = (value, position) => {
        const fillData = numbers.map((item, index, data) => {
            return index == value ? true : false;
        });
        this.fillDataColumn(fillData, position);
    };
    fillDataColumn = (data, position) => {
        switch (position) {
            case 1:
                this.setState({ data: data[0] });
                break;
            case 2:
                this.setState({ data: data[1] });
                break;
            default:
                break;
        }
    }
//     initColumn = (column = [], position) => {
//         return column.map((item, index, data) => {
//             return (
//                 <div
//                     key={index}
//                     className={
//                         item
//                             ? styles.select_modal_number_circle
//                             : styles.modal_number_circle
//                     }
//                     onClick={() => this.onClickNumber(index, column, position)}
//                 >
//                     {index}
//                 </div>
//             );
//         });
//     };
//     onClickNumber = (number, column = [], position) => {
//         const dataNew = column.map((item, index, data) => {
//             return index === number ? (item = !item) : false;
//         });

//         this.fillDataColumn(dataNew, position);
//     };
//     initView = () => {
//         return (
//             <div style={{ display: "flex" }}>
//                 <div className={styles.column_modal}>
//                     {" "}
//                     {this.initColumn(this.state.data, 1)}
//                 </div>
//             </div>
//         );
//     };
//     checkData = (numbers = []) => {
//         return numbers.findIndex(item => {
//             return item === true;
//         });
//     };
//     ok(){
//         if (
//           this.checkData(this.state.data[0]) === -1 ||
//           this.checkData(this.state.data[1]) === -1 
//         ) {
//           Toast.info(`Vui lòng chọn ${this.props.value} số!`, 2);
//         } else {
//           const data = [
//             this.checkData(this.state.data[0]),
//             this.checkData(this.state.data[1]).toString()
//           ];
          
//           return this.props.onAccept("modal", data, this.props.type)();
//         }
//   };
    initView = () => {
        const datanew = this.state.data.map((item, index, data) => {
            if (index === data.length - 1) {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.onClickNumber(index)}>{padLeft((index + 1), 2, "0")}</Text>
                );
            }
            else {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.onClickNumber(index)}>{padLeft((index + 1), 2, "0")}</Text>
                );
            }
        });
        return (<div style={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </div>);
    }

    onClickNumber = (number) => {
        const datanew = this.state.data.map((item, index, data) => {
            return index === number ? item = !item : item;
        })
        this.setState({ data: datanew })
    }

    accept = () => {
        const numberselect = [];
        this.state.data.map((item, index) => {
            if (item)
                numberselect.push(index + 1)
            return item;
        })
        if (numberselect.length === this.props.value) {
            return this.props.onAccept('modal', numberselect, this.props.type)();
        }
        else {
            new Promise(() => {
                Toast.info(`Vui lòng chọn ${this.props.value} số!`, 2);
            })
        }
    }

    render() {
        return (
            <WingBlank>
                <Modal
                    style={{ width: "100%", marginLeft: 16, marginRight: 16 }}
                    visible={this.props.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.props.onClose('modal')}
                    title="Chọn dãy số dự thưởng"
                    footer={[
                        { text: 'Đóng', onPress: () => { this.props.onClose('modal')() } },
                        { text: 'Đồng ý', onPress: () => { this.accept() } }
                    ]}
                >
                    <Flex style={{ border: "1px solid #E32E35" }}>
                        {this.initView()}
                    </Flex>
                </Modal>
            </WingBlank>
        )
    }
}

export default SelectNumber;