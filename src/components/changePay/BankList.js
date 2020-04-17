import React from "react";
import { Modal, Toast, List, Text, Button } from "antd-mobile";
import { stringToNumberFormat } from "../../utils/Helper";
import styles from "../Main.less";
import ListItem from "antd-mobile/lib/list/ListItem";
const Item = List.Item;
const heightDevice = window.innerHeight;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            data: [],
            bankList: [],
            modal: false,
            modal1: false
        };
    }
componentWillReceiveProps(nextProps) {
    if (nextProps.banklist !== undefined) {
        if (nextProps.banklist.data.Code === "00") {
             console.log(nextProps.banklist)
            this.setState({ bankList: nextProps.banklist.data.ListValue });
        } else {
            Toast.info("Lỗi tải danh mục ngân hàng", 5);
        }
    }
    if (nextProps.err != undefined) {
        Toast.info("Lỗi kết nối hệ thống", 2);
    }
}

showModal = key => e => {
    e.preventDefault();
    this.setState({
        [key]: true
    });
};

onClose = key => () => {
    this.setState({
        [key]: false
    });
};

renderList = () => {
    return (
      <div style={{background:"#F7F4F4"}}>
        <div style={{ padding: 12 }}>
          {this.state.bankList.map((item, index, data) => {
              if(item.ID === 1)
                return (
                <div onClick={this.showModal} style={{
                    padding: 12, border: "2px outset #cccccc", backgroundColor: "#ffffff", margin: "10px 10px",
                    borderRadius: "10px",fontSize: "12pt"
                }}>
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div
                      style={{ fontSize: "10pt", color: "#253854" }}
                    >
                      <img
                            src={require("../../assets/BIDV.jpg")}
                            alt=""
                            style={{ width: 60, height: 50, paddingRight: 30 }}
                        />
                    </div>
                    <div style={{ color: "#696969" }}>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "auto"
                    }}
                  ><div>
                    <div>Chủ TK: <span style = {{fontWeight :"bolder",fontSize:"15px"}}>CÔNG TY CỔ PHẦN MOBILOTT</span></div>
                    <div>{item.Name}</div>
                    <div>Chi nhánh: {item.Branch}</div>
                    <div>Số tài khoản: <span style = {{fontWeight :"bolder"}}>{item.AccountNumber}</span></div>
                    </div>
                  </div>
                </div>
                </div>
              );
              if(item.ID === 2)
                return (
                <div onClick={this.showModal} style={{
                    padding: 12, border: "2px outset #cccccc", backgroundColor: "#ffffff", margin: "10px 10px",
                    borderRadius: "10px",fontSize: "12pt"
                }}>
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div
                      style={{ fontSize: "10pt", color: "#253854" }}
                    >
                      <img
                            src={require("../../assets/SACOM.jpg")}
                            alt=""
                            style={{ width: 70, height: 50, paddingRight: 20 }}
                        />
                    </div>
                    <div style={{ color: "#696969" }}>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "auto"
                    }}
                  ><div>
                    <div>Chủ TK: <span style = {{fontWeight :"bolder",fontSize:"15px"}}>CÔNG TY CỔ PHẦN MOBILOTT</span></div>
                    <div>{item.Name}</div>
                    <div>Chi nhánh: {item.Branch}</div>
                    <div>Số tài khoản: <span style = {{fontWeight :"bolder"}}>{item.AccountNumber}</span></div>
                    </div>
                  </div>
                </div>
                </div>
              );
              if(item.ID === 3)
                return (
                <div onClick={this.showModal} style={{
                    padding: 12, border: "2px outset #cccccc", backgroundColor: "#ffffff", margin: "10px 10px",
                    borderRadius: "10px",fontSize: "12pt"
                }}>
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div
                      style={{ fontSize: "10pt", color: "#253854" }}
                    >
                      <img
                            src={require("../../assets/VIETTIN.jpg")}
                            alt=""
                            style={{ width: 70, height: 50, paddingRight: 20 }}
                        />
                    </div>
                    <div style={{ color: "#696969" }}>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "auto"
                    }}
                  ><div>
                    <div>Chủ TK: <span style = {{fontWeight :"bolder",fontSize:"15px"}}>CÔNG TY CỔ PHẦN MOBILOTT</span></div>
                    <div>{item.Name}</div>
                    <div>Chi nhánh: {item.Branch}</div>
                    <div>Số tài khoản: <span style = {{fontWeight :"bolder"}}>{item.AccountNumber}</span></div>
                    </div>
                  </div>
                </div>
                </div>
              );
              if(item.ID === 4)
                return (
                <div onClick={this.showModal} style={{
                    padding: 12, border: "2px outset #cccccc", backgroundColor: "#ffffff", margin: "10px 10px",
                    borderRadius: "10px",fontSize: "12pt"
                }}>
                <div
                  key={item.ID}
                  style={{ margin: "10px 0px", display: "flex" }}
                >
                  <div>
                    <div
                      style={{ fontSize: "10pt", color: "#253854" }}
                    >
                      <img
                            src={require("../../assets/VIETCOM.jpg")}
                            alt=""
                            style={{ width: 70, height: 50, paddingRight: 20 }}
                        />
                    </div>
                    <div style={{ color: "#696969" }}>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "auto"
                    }}
                  ><div>
                    <div>Chủ TK: <span style = {{fontWeight :"bolder",fontSize:"15px"}}>CÔNG TY CỔ PHẦN MOBILOTT</span></div>
                    <div>{item.Name}</div>
                    <div>Chi nhánh: {item.Branch}</div>
                    <div>Số tài khoản: <span style = {{fontWeight :"bolder"}}>{item.AccountNumber}</span></div>
                    </div>
                  </div>
                </div>
                </div>
              );
          })}
        </div>
      </div>
    );
  };

showModal = () => {
    this.setState({
        visible: true,
    });
};

handleOk = e => {
    this.setState({
        visible: false,
    });
};

handleCancel = e => {
    this.setState({
        visible: false,
    });
};

render() {
    console.log("list11",this.state.bankList);
    return (
        <div className={styles.content}
            style={{ height: heightDevice, backgroundColor: "#F7F4F4" }}
        >
            <div
                style={{ padding: "5px 10px", display: "flex", backgroundColor: "#f2f2f2"}}
            >
                <div style={{borderRadius:"5px",backgroundColor: "#ffffff", padding: "5px"}}>
                    <div
                        style={{ fontSize: "12pt", color: "#253854", textAlign:"center"}}
                    >
                        <div style={{textAlign:"justify"}}>LUCKY LOTTER hỗ trợ nạp tiền qua hình thức chuyển khoản ngân hàng với nội dung chuyển khoản
    
                        </div>
                        <div style={{color:"red", marginTop:"10px"}}> NAP  &lt;SĐT&gt; <br></br><span style={{fontSize:"12pt"}}><i>VD: NAP 0911111111</i></span></div>
                    </div>
                </div>
            </div>
            <div style={{ background: "#F7F4F4" }}>
                <div style={{textAlign:"center", paddingTop:"10px",color:"#404040"}}><b>Danh sách tài khoản ngân hàng của LUCKY LOTTER</b></div>
                {this.renderList(this.state.bankList)}
            </div>
        </div>
    );
  }
}
export default Main;
