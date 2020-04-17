import React from "react";
import {
  Text,
  Toast,
  Button,
  WingBlank,
  Carousel,
  Flex,
  Modal,
  TextareaItem
} from "antd-mobile";
import styles from "./History.less";
import { stringToNumberFormat, getPadLeft, getNameKenoParity } from "../../utils/Helper";
import { URL_IMAGE } from "../../config";
import LightBox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ItemKeno extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderCode: "",
      orderItem: [],
      listImage: [],
      countItem: 0,
      countDX: 0,
      amountWin: 0,
      status: "",
      isOpenImg: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("OrderItem") != null) {
      const data = JSON.parse(localStorage.getItem("OrderItem"));
      this.setState({ orderCode: data.Code, status: data.Status });
      this.props.getOrderItem(data.Code);
      localStorage.removeItem("OrderItem");
    } else {
      if (this.props.location.payload.data != undefined) {
        this.setState({
          status: this.props.location.payload.data.Status,
          orderCode: this.props.location.payload.data.OrderCode
        });
        this.props.getOrderItem(this.props.location.payload.data.OrderCode);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err !== undefined) {
      Toast.info("Lỗi kết nối hệ thống", 5);
    }

    if (nextProps.response !== undefined) {
      if (nextProps.response.data !== undefined) {
        if (nextProps.response.data.Code === "00") {
          const value = nextProps.response.data.Value;          
          this.setState({
            orderItem: nextProps.response.data.ListValue,
            countDX: value.CountDX,
            countItem: value.CountItem,
            amountWin: value.AmountWin
          });
        } else {
          Toast.info(nextProps.response.data.Message, 2);
        }
      }
    }

    if (nextProps.ErrorOrder.data !== undefined) {
      if (nextProps.ErrorOrder.data.Code === "00") {
        Toast.info(nextProps.ErrorOrder.data.Message, 2);
      }
    }
  }

  lightBoxImg = () => {
    const { isOpenImg } = this.state;
    const listImage = this.state.listImage;
    if (this.state.listImage.length > 0) {
      return (
        <div>
          {isOpenImg && (
            <LightBox
              mainSrc={listImage[0]}
              onCloseRequest={() => this.setState({ isOpenImg: false })}
            />
          )}
        </div>
      );
    }
  };

  imageOrder() {
    if (
      (this.state.status === "A" ||
        this.state.status === "H" ||
        this.state.status === "I") &&
      this.state.orderItem.length > 0
    ) {
      const listImage = [URL_IMAGE + this.state.orderItem[0].KenoImg];

      return (
        <div
          style={{
            display: "flex",
            margin: 4,
            justifyContent: "center",
            padding: "10px 0px"
          }}
        >
          <img
            style={{
              height: 200,
              maxWidth: 200,
              width: "100%"
            }}
            src={listImage[0]}
            alt=""
            onClick={() => {
              this.setState({
                isOpenImg: true,
                listImage: listImage
              });
              this.lightBoxImg();
            }}
          />
        </div>
      );
    } else return <div />;
  }

  renderTable() {
    let value = [];
    const item = this.state.orderItem[0];
    if (item != undefined) {
      if (item.LineA != "") {
        value.push(this.renderRow("A", item.LineA, item.PriceA, item.ItemType));
      }
      if (item.LineB != "") {
        value.push(this.renderRow("B", item.LineB, item.PriceB, item.ItemType));
      }
      if (item.LineC != "") {
        value.push(this.renderRow("C", item.LineC, item.PriceC, item.ItemType));
      }
      if (item.LineD != "") {
        value.push(this.renderRow("D", item.LineD, item.PriceD, item.ItemType));
      }
      if (item.LineE != "") {
        value.push(this.renderRow("E", item.LineE, item.PriceE, item.ItemType));
      }
      if (item.LineF != "") {
        value.push(this.renderRow("F", item.LineF, item.PriceF, item.ItemType));
      }
    }
    return value;
  }

  renderRow = (type, item, price, ItemType) => {
    if (ItemType == 1) {
      const arr = item.split(",");
      return (
        <div key={type}>
          <div className={styles.keno_row}>
            <div className={styles.text_header_row}>{type}</div>
            <div className={styles.keno_number_group}>
              {arr.map((item, index, data) => {
                return (
                  <div key={index} className={styles.keno_number}>
                    {getPadLeft(item)}
                  </div>
                );
              })}
            </div>
            <div className={styles.right_row}>
              <div style={{ color: "#F15E22" }}>Bậc {arr.length}</div>
              <div style={{ color: "#e32e35", marginTop: 4 }}>
                {stringToNumberFormat(price) + "đ"}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={type}>
          <div className={styles.keno_row}>
            <div className={styles.text_header_row}>{type}</div>
            <div className={styles.keno_number_group}>
              <div className={styles.keno_number}>
                {getNameKenoParity(item)}
              </div>
            </div>
            <div className={styles.right_row}>
              <div style={{ color: "#e32e35", marginTop: 4 }}>
                {stringToNumberFormat(price) + "đ"}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  renderWin() {
    return (
      <div style={{ display: "flex" }}>
        <img
          style={{ height: "16px", width: "16px", marginRight: 2 }}
          src={require("../../assets/cup_do.png")}
          alt=""
        />
        <div style={{ color: "#e32e35" }}>
          {stringToNumberFormat(this.state.amountWin) + "đ"}
        </div>
      </div>
    );
  }

  renderDrawWin = id => {
    let data = {};
    data.ID = id;
    return (
      <div
        className={styles.item_button_draw_win}
        onClick={() => this.compareResult(data)}
      >
        <img
          style={{ height: "16px", width: "16px", margin: "0px 2px" }}
          src={require("../../assets/cup_do.png")}
          alt=""
        />
        <div>Trúng thưởng</div>
      </div>
    );
  };

  compareResult = data => {
    let value = {};
    value.Code = this.state.orderCode;
    value.Status = this.state.status;

    // console.log(value)
    localStorage.setItem("OrderItem", JSON.stringify(value));

    this.props.onCompareResult(data);
  };
  renderDrawItem = (isResult, id) => {
    if (isResult == "N") {
      return (
        <div className={styles.item_button_draw}>
          <div>Chưa xổ</div>
        </div>
      );
    } else {
      let data = {};
      data.ID = id;
      return (
        <div
          className={styles.item_button_draw_not_win}
          onClick={() => this.compareResult(data)}
        >
          <div>So kết quả</div>
        </div>
      );
    }
  };

  renderDraw() {
    return this.state.orderItem.map((item, index, data) => {
      return (
        <div key={index}>
          <div className={styles.item_draw}>
            <div style={{ display: "flex" }}>
              <div style={{ fontWeight: "bold" }}>Kỳ: </div>
              <span>{`#${item.DrawCode}`}</span>
            </div>
            {item.StatusResult == "W"
              ? this.renderDrawWin(item.ID)
              : this.renderDrawItem(item.StatusResult, item.ID)}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div
          style={{ marginRight: "5px", background: "#FFFFFF" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 10
            }}
          >
            <div
              style={{ textAlign: "center", width: "100%", fontSize: "12pt" }}
            >
              Keno
            </div>
            <div>
              <img
                style={{ width: 50, height: 35 }}
                src={require("../../assets/keno_logo.png")}
                alt=""
              />
            </div>
          </div>
          <div className={styles.item_cal_draw}>
            <div>{`Đã quay ${this.state.countDX}/${this.state.countItem}`}</div>
            <div>{this.renderWin()}</div>
          </div>
          <div>{this.renderTable()}</div>
          <div>{this.imageOrder()}</div>
          {this.lightBoxImg()}
        </div>
        {this.renderDraw()}
      </div>
    );
  }
}

export default ItemKeno;
