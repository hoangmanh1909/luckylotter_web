import React from 'react';
import { Modal, Checkbox, WingBlank, List, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const CheckboxItem = Checkbox.CheckboxItem;

class SelectSystemMax4D extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data: [{ value: "00015", label: "#Kỳ 34 ngày 10/10/2010" },
            // { value: "00016", label: "#Kỳ 35 ngày 12/10/2010" },
            // { value: "00017", label: "#Kỳ 36 ngày 14/10/2010" },
            // { value: "00018", label: "#Kỳ 37 ngày 16/10/2010" },
            // { value: "00019", label: "#Kỳ 38 ngày 18/10/2010" },
            // { value: "00020", label: "#Kỳ 39 ngày 20/10/2010" }],
            data: [],
            systemValue: []
        }
    }

    onChangeItem = (val) => event => {
        // console.log("event", event)
        // console.log("val",this.state.systemValue.length);
        // if (this.state.systemValue.length !== 1 && !event.target.checked) {
            let arr = [...this.state.systemValue];
            this.state.data.map((item, index, data) => {

                if (item.value === val.value && event.target.checked) {
                    arr.push(val);
                }
                else if (item.value === val.value && !event.target.checked) {
                    arr = arr.filter(sys => sys.value !== item.value);
                }
                return item;
            });
            this.setState({ systemValue: arr })
        // }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            if (this.props.value.length > 0)
                this.setState({ systemValue: this.props.value })
        }
        if (this.props.system !== prevProps.system) {
            this.setState({ data: this.props.system })
        }
    }

    listCheckBox() {
        const value = this.state.data.map((i, index, data) => {
            if (this.state.systemValue.some(a => a.value === i.value)) {
                return (<CheckboxItem key={i.value} onChange={this.onChangeItem(i)} defaultChecked>
                    {i.label}
                </CheckboxItem>)
            }
            else {
                return (<CheckboxItem key={i.value} onChange={this.onChangeItem(i)}>
                    {i.label}
                </CheckboxItem>)
            }
        })
        return value;
    }

    onAcceptSystem = () => {
        if (this.state.systemValue.length > 0) {
            this.props.onAccept('modalSystem', this.state.systemValue)();
        }
        else {
            new Promise(() => {
                Toast.info('Vui lòng chọn kỳ quay!', 2);
            })
        }

    }

    render() {
        return (
            <WingBlank>
                <Modal
                    style={{ width: "100%",margin:"0px 10px",maxWidth:450 }}
                    visible={this.props.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.props.onClose('modalSystem')}
                    title="Chọn kỳ quay"
                    footer={[
                        { text: 'Đóng', onPress: () => { this.props.onClose('modalSystem')() } },
                        {
                            text: 'Đồng ý', onPress: () => {
                                this.onAcceptSystem()
                            }
                        }
                    ]}

                >
                    <List>
                        {this.listCheckBox()}
                    </List>
                </Modal>
            </WingBlank>
        )
    }
}

export default SelectSystemMax4D;