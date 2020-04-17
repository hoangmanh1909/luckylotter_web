import React from 'react';
import { Modal, Flex, WingBlank, Text,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from './keno.less';

class SelectNumberKeno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false
            ],
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
                    <Text key={index} className={item ? styles.select_modal_number_circle_last : styles.modal_number_circle_last} onClick={() => this.onClickNumber(index)}>{(index + 1).toString().padStart(2,'0')}</Text>
                );
            }
            // else if(index > 30 && index < 39){
            //     return(
            //         <div style={{marginBottom: -3, paddingRight:5, paddingBottom: 6}}>
            //             <Text key={index} className={item ? styles.select_modal_number_circle_non_border : styles.modal_number_circle_non_border} onClick={() => this.onClickNumber(index)}>{(index + 1).toString().padStart(2,'0')}</Text>
            //         </div>
            //     );
            // }
            // else if(index > 39 && index < 48){
            //     return(
            //         <div style={{borderTop: "1px solid gray", paddingRight:5}}>
            //             <Text key={index} className={item ? styles.select_modal_number_circle_border : styles.modal_number_circle_border} onClick={() => this.onClickNumber(index)}>{(index + 1).toString().padStart(2,'0')}</Text>
            //         </div>
            //     );
            // }
            else {
                return (
                    <Text key={index} className={item ? styles.select_modal_number_circle : styles.modal_number_circle} onClick={() => this.onClickNumber(index)}>{(index + 1).toString().padStart(2,'0')}</Text>);
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
        const numberSelect = [];
        this.state.data.map((item, index) => {
          if (item) numberSelect.push(index + 1);
          return item;
        });

        if(numberSelect.length > 0 && numberSelect.length < 11){
            return this.props.onAccept('modal', numberSelect, this.props.type)();
        }
        else if(numberSelect.length === 0)
        {
            new Promise(() => {
                Toast.info(`Vui lòng chọn số!`, 2);
            })
        }else{
            new Promise(() => {
                Toast.info(`Vui lòng chọn tối đa 10 số!`, 2);
            })
        }
    }

    render() {
        const arrSelect = this.state.data.filter(item => item == true);
        // console.log(arrSelect)
        return (
          <WingBlank>
            <Modal
              style={{
                width: "100%",
                padding: "0px 10px",
                maxWidth:450
              }}
              visible={this.props.modal}
              transparent
              maskClosable={false}
              onClose={this.props.onClose("modal")}
              title={
                <div>
                  <div style={{ fontSize: "12pt" }}>
                    Hãy chọn bộ số may mắn của bạn
                  </div>
                  <div
                    style={{
                      fontSize: "10pt",
                      color: "#E32E35",
                      fontStyle: "italic",
                      marginTop: 4
                    }}
                  >
                    (Tối thiểu 01 bộ số, tối đa 10 bộ số)
                  </div>
                </div>
              }
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
              <Flex>{this.initView()}</Flex>
              <div
                style={{ color: "#42423C" }}
              >{`Bạn đã chọn : ${arrSelect.length}`}</div>
            </Modal>
          </WingBlank>
        );
    }
}

export default SelectNumberKeno;