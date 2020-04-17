import React from 'react';
import { Text, Flex, WingBlank, Modal ,Toast} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from '../../utils/max4d.less';

class SelectNumberMax4D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_colum1: [false, false, false, false, false, false, false, false, false, false],
            data_colum2: [false, false, false, false, false, false, false, false, false, false],
            data_colum3: [false, false, false, false, false, false, false, false, false, false],
            data_colum4: [false, false, false, false, false, false, false, false, false, false],
            data_roll: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        }
    }


    checkNumber = (value = [], value1 = [], value2 = [], number) => {
        let isCheck = false;
        const check = value.filter((item, index, data) => {
            return index === number && item === true;
        });

        const check1 = value1.filter((item, index, data) => {
            return index === number && item === true;
        });
        const check2 = value2.filter((item, index, data) => {
            return index === number && item === true;
        });

        if (check.length === 1 && check1.length === 1 && check2.length === 1)
            isCheck = false;
        else
            isCheck = true;
        return isCheck;
    }

    renderNumberColumn = (number) => {
        let datanew = [];

        if (this.props.type === 4 || this.props.type === 5) {
            if (!this.checkNumber(this.state.data_colum2, this.state.data_colum3, this.state.data_colum4, number)) {
                datanew = this.state.data_colum1.map((item, index, data) => {
                    return item;
                });
            }
            else {
                datanew = this.state.data_colum1.map((item, index, data) => {
                    return index === number ? item = !item : false;
                });
            }
        }
        else {
            datanew = this.state.data_colum1.map((item, index, data) => {
                return index === number ? item = !item : false;
            });
        }

        this.setState({ data_colum1: datanew });
    }

    renderContent = () => {
        let datanew;
        if (this.state.data_colum1[0] === '*') {
            datanew = this.state.data_colum1.map((item, index, data) => {
                if (index === data.length - 1) {
                    return (
                        <Text key={index} className={styles.modal_number_circle_last} >{item}</Text>
                    );
                }
                else {
                    return (
                        <Text key={index} className={styles.modal_number_circle} >{item}</Text>);
                }
            });
        }
        else {
            datanew = this.state.data_colum1.map((item, index, data) => {
                if (index === data.length - 1) {
                    return (
                        <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.renderNumberColumn(index)}>{index}</Text>
                    );
                }
                else {
                    return (
                        <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.renderNumberColumn(index)}>{index}</Text>);
                }
            });
        }

        return (<WingBlank style={{
            margin: 0, width: "25%",
            borderRight: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    renderNumberColumn1 = (number) => {
        let datanew = [];

        if (this.props.type === 4 || this.props.type === 5) {
            if (!this.checkNumber(this.state.data_colum1, this.state.data_colum3, this.state.data_colum4, number)) {
                datanew = this.state.data_colum2.map((item, index, data) => {
                    return item;
                });
            }
            else {
                datanew = this.state.data_colum2.map((item, index, data) => {
                    return index === number ? item = !item : false;
                });
            }
        }
        else {
            datanew = this.state.data_colum2.map((item, index, data) => {
                return index === number ? item = !item : false;
            });
        }

        this.setState({ data_colum2: datanew });
    }

    renderContent1 = () => {
        const datanew = this.state.data_colum2.map((item, index, data) => {
            if (index === data.length - 1) {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.renderNumberColumn1(index)}>{index}</Text>
                );
            }
            else {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.renderNumberColumn1(index)}>{index}</Text>);
            }
        });
        return (<WingBlank style={{
            margin: 0, width: "25%",
            borderRight: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    renderNumberColumn2 = (number) => {
        let datanew = [];

        if (this.props.type === 4 || this.props.type === 5) {
            if (!this.checkNumber(this.state.data_colum1, this.state.data_colum2, this.state.data_colum4, number)) {
                datanew = this.state.data_colum3.map((item, index, data) => {
                    return item;
                });
            }
            else {
                datanew = this.state.data_colum3.map((item, index, data) => {
                    return index === number ? item = !item : false;
                });
            }
        }
        else {
            datanew = this.state.data_colum3.map((item, index, data) => {
                return index === number ? item = !item : false;
            });
        }

        this.setState({ data_colum3: datanew });
    }

    renderContent2 = () => {
        const datanew = this.state.data_colum3.map((item, index, data) => {
            if (index === data.length - 1) {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.renderNumberColumn2(index)}>{index}</Text>
                );
            }
            else {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.renderNumberColumn2(index)}>{index}</Text>);
            }
        });
        return (<WingBlank style={{
            margin: 0, width: "25%",
            borderRight: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    renderNumberColumn3 = (number) => {
        let datanew = [];

        if (this.props.type === 4 || this.props.type === 5) {
            if (!this.checkNumber(this.state.data_colum1, this.state.data_colum2, this.state.data_colum3, number)) {
                datanew = this.state.data_colum4.map((item, index, data) => {
                    return item;
                });
            }
            else {
                datanew = this.state.data_colum4.map((item, index, data) => {
                    return index === number ? item = !item : false;
                });
            }
        }
        else {
            datanew = this.state.data_colum4.map((item, index, data) => {
                return index === number ? item = !item : false;
            });
        }

        this.setState({ data_colum4: datanew });
    }

    renderContent3 = () => {
        let datanew;
        if (this.state.data_colum4[0] === '*') {
            datanew = this.state.data_colum4.map((item, index, data) => {
                if (index === data.length - 1) {
                    return (
                        <Text key={index}  className={styles.modal_number_circle_last}>{item}</Text>
                    );
                }
                else {
                    return (
                        <Text key={index} className={styles.modal_number_circle}>{item}</Text>);
                }
            });
        }
        else {
            datanew = this.state.data_colum4.map((item, index, data) => {
                if (index === data.length - 1) {
                    return (
                        <Text key={index}  className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.renderNumberColumn3(index)}>{index}</Text>
                    );
                }
                else {
                    return (
                        <Text key={index}  className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.renderNumberColumn3(index)}>{index}</Text>);
                }
            });
        }
        return (<WingBlank style={{
            margin: 0, width: "25%",
            borderRight: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    componentDidUpdate(prevProps) {
        if (this.props.modalType !== prevProps.modalType) {
            const datatype = this.props.onValue(this.props.modalType);

            let datanew = [];
            if (this.props.type === 2) {
                datanew = [...this.state.data_roll]
            }
            else {
                datanew = this.state.data_colum1.map((item, index, data) => {
                    const _index = parseInt(datatype[0]);
                    return index === _index ? true : false;
                });
            }

            const datanew1 = this.state.data_colum2.map((item, index, data) => {
                const _index = parseInt(datatype[1]);
                return index === _index ? true : false;
            });
            const datanew2 = this.state.data_colum3.map((item, index, data) => {
                const _index = parseInt(datatype[2]);
                return index === _index ? true : false;
            });
            let datanew3 = [];
            if (this.props.type === 3) {
                datanew3 = [...this.state.data_roll]
            }
            else {
                datanew3 = this.state.data_colum4.map((item, index, data) => {
                    const _index = parseInt(datatype[3]);
                    return index === _index ? true : false;
                });
            }

            this.setState({
                data_colum1: datanew,
                data_colum2: datanew1,
                data_colum3: datanew2,
                data_colum4: datanew3
            })
        }
    }

    accept1 = () => {
        let value;
        if (this.state.data_colum1[0] === '*') {
            value = 0;
        }
        else {
            value = this.state.data_colum1.findIndex((item) => {
                return item === true;
            })
        }

        return value;
    }

    accept2 = () => {
        const value = this.state.data_colum2.findIndex((item) => {
            return item === true;
        })
        return value;
    }

    accept3 = () => {
        const value = this.state.data_colum3.findIndex((item) => {
            return item === true;
        })
        return value;
    }

    accept4 = () => {
        let value;
        if (this.state.data_colum4[0] === '*') {
            value = 0;
        }
        else {
            value = this.state.data_colum4.findIndex((item) => {
                return item === true;
            })
        }

        return value;
    }

    accept = () => {
        const value1 = this.accept1();
        const value2 = this.accept2();
        const value3 = this.accept3();
        const value4 = this.accept4();

        if (value1 !== -1 && value2 !== -1 && value3 !== -1 && value4 !== -1) {
            return this.props.onAccept('modal', [value1, value2, value3, value4], this.props.modalType)();
        }
        else {
            let count = 0;
            if(this.props.type === 2 || this.props.type === 3){
                count = 3;
            }
            else{
                count = 4;
            }

            new Promise(() => {
                Toast.info(`Vui lòng chọn ${count} số!`, 2);
            })
        }
    }

    render() {
        return (
            <WingBlank>
                <Modal
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

                    <Flex style={{ border: "1px solid red" }}>
                        {this.renderContent()}
                        {this.renderContent1()}
                        {this.renderContent2()}
                        {this.renderContent3()}
                    </Flex>
                </Modal>
            </WingBlank>
        );
    }
}

export default SelectNumberMax4D;