import React from 'react';
import { Modal, Checkbox, WingBlank, List, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from '../../utils/mega645.less';

const CheckboxItem = Checkbox.CheckboxItem;

class SelectSystemMega645 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            systemValue: []
        }
    }

    onChangeItem = (val) => event => {
        // console.log("event", event)
        // console.log("val",val);
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

    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            if (this.props.value.length > 0)
                this.setState({ systemValue: this.props.value })
        }
        if(this.props.system !== prevProps.system){
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
              style={{ width: "100%", margin: "0px 10px", maxWidth: 450 }}
              visible={this.props.modal}
              transparent
              maskClosable={false}
              onClose={this.props.onClose("modalSystem")}
              title="Chọn kỳ quay"
              footer={[
                {
                  text: "Đóng",
                  onPress: () => {
                    this.props.onClose("modalSystem")();
                  }
                },
                {
                  text: "Đồng ý",
                  onPress: () => {
                    this.onAcceptSystem();
                  }
                }
              ]}
            >
              <List>{this.listCheckBox()}</List>
            </Modal>
          </WingBlank>
        );
    }
}

export default SelectSystemMega645;