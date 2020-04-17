import React from 'react';
import { Modal, Flex, WingBlank, Text,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from '../../utils/mega645.less';

class SelectNumberPower655 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false
            ]
        }
    }

    componentDidUpdate(prevProps) {

        if (this.props.type !== prevProps.type) {
            const datatype = this.props.onValue(this.props.type);
            const datanew = this.state.data.map((_item, _index, _data) => {
                return datatype.some(x => x === _index + 1);
            })
            this.setState({ data: datanew })
        }
    }

    initView = () => {
        const datanew = this.state.data.map((item, index, data) => {
            if (index === data.length - 1) {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.onClickNumber(index)}>{index + 1}</Text>
                );
            }
            else {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.onClickNumber(index)}>{index + 1}</Text>);
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
        this.state.data.map((item,index ) => {
            if (item)
                numberselect.push(index + 1)
            return item;
        })
        if(numberselect.length === this.props.value){
            return this.props.onAccept('modal', numberselect, this.props.type)();
        }
        else
        {
            new Promise(() => {
                Toast.info(`Vui lòng chọn ${this.props.value} số!`, 2);
            })
        }
    }

    render() {
        return (
            <WingBlank>
                <Modal
                    style={{ width: "100%", margin: "0px 10px",maxWidth:450 }}
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

export default SelectNumberPower655;