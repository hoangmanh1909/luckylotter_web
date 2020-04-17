import React from 'react';
import { Text, Flex, WingBlank, Modal ,Toast} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from './max3d.less';

class SelectNumberMax3D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data_colum1: [false, false, false, false, false, false, false, false, false, false],
            data_colum2: [false, false, false, false, false, false, false, false, false, false],
            data_colum3: [false, false, false, false, false, false, false, false, false, false],
        }
    }

    checkNumber = (value = [], value1 = [], number) => {
        let isCheck = false;
        const check = value.filter((item, index, data) => {
            return index === number && item === true;
        });

        const check1 = value1.filter((item, index, data) => {
            return index === number && item === true;
        });

        if (check.length === 1 && check1.length === 1 )
            isCheck = false;
        else
            isCheck = true;
        return isCheck;
    }

    renderNumberColumn = (number) => {
        let datanew = [];
            datanew = this.state.data_colum1.map((item, index, data) => {
                return index === number ? item = !item : false;
            });
        this.setState({ data_colum1: datanew });
    }

    renderContent = () => {
        let datanew;
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
        
        return (<WingBlank style={{
            margin: 0, width: "28%",
            borderRight: "1px solid rgb(252, 24, 22)",
            borderTop: "1px solid rgb(252, 24, 22)",
            borderBottom: "1px solid rgb(252, 24, 22)",
            borderLeft: "1px solid rgb(252, 24, 22)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    renderNumberColumn1 = (number) => {
        let datanew = [];
        datanew = this.state.data_colum2.map((item, index, data) => {
            return index === number ? item = !item : false;
        });

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
            margin: 0, width: "28%",
            borderRight: "1px solid rgb(252, 24, 22)",
            borderTop: "1px solid rgb(252, 24, 22)",
            borderBottom: "1px solid rgb(252, 24, 22)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {datanew}
        </WingBlank>);
    }

    renderNumberColumn2 = (number) => {
        let datanew = [];
        datanew = this.state.data_colum3.map((item, index, data) => {
            return index === number ? item = !item : false;
        });

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
            margin: 0, width: "28%",
            borderRight: "1px solid rgb(252, 24, 22)",
            borderTop: "1px solid rgb(252, 24, 22)",
            borderBottom: "1px solid rgb(252, 24, 22)",
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

            this.setState({
                data_colum1: datanew,
                data_colum2: datanew1,
                data_colum3: datanew2
            })
        }
    }

    accept1 = () => {
        let value;
        value = this.state.data_colum1.findIndex((item) => {
            return item === true;
        })
    
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

    accept = () => {
        const value1 = this.accept1();
        const value2 = this.accept2();
        const value3 = this.accept3();

        if (value1 !== -1 && value2 !== -1 && value3 !== -1 ) {
            return this.props.onAccept('modal', [value1, value2, value3], this.props.modalType)();
        }
        else{
            new Promise(() => {
                Toast.info('Vui lòng chọn đủ 3 số!');
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

                    <Flex style={{ paddingLeft: "30px" }}>
                        {this.renderContent()}
                        {this.renderContent1()}
                        {this.renderContent2()}
                        
                    </Flex>
                </Modal>
            </WingBlank>
        );
    }
}

export default SelectNumberMax3D;