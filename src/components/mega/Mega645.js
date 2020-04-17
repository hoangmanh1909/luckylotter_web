import React from "react";
import {
  Text,
  Carousel,
  WingBlank,
  Button,
  WhiteSpace,
  Flex,
  Picker,
  Toast,
  ActivityIndicator
} from "antd-mobile";
import { ColorButton } from "../../utils/ColorBase";
import styles1 from "../../index.css";
import "antd-mobile/dist/antd-mobile.css";
import styles from "../../utils/mega645.less";
import CustomeIcon from "../../utils/CustomeIcon";
import {
  stringToNumberFormat,
  bag,
  getBagName,
  initBag,
  getPriceByBag,
  getWeekdaysShort
} from "../../utils/Helper";
import SelectNumberMega645 from "./SelectNumberMega645";
import SelectSystemMega645 from "./SelectSystemMega645";
import styles2 from "../Main.less";
import CountDownMega from "../../utils/countDownMega";
import CustomeTrashIcon from "../../utils/CustomeTrashIcon";
import button from "./../Button.less";
const random = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
class Mega645 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aNumber: ["", "", "", "", "", ""],
      aIsCheck: false,
      bNumber: ["", "", "", "", "", ""],
      bIsCheck: false,
      cNumber: ["", "", "", "", "", ""],
      cIsCheck: false,
      dNumber: ["", "", "", "", "", ""],
      dIsCheck: false,
      eNumber: ["", "", "", "", "", ""],
      eIsCheck: false,
      fNumber: ["", "", "", "", "", ""],
      fIsCheck: false,
      totalAmount: 0,
      price: 10000,
      modal: false,
      modalType: "",
      modalSystem: false,
      system: [],
      systemInit: [],
      bagitem: 6,
      productID: 1,
      animating: true,
      amtMega: 0
    };
  }

  componentDidMount() {
    if (
      this.props.location.payload !== undefined &&
      this.props.location.payload !== null
    ) {
      this.setState(this.props.location.payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`nextProps ${JSON.stringify(nextProps)}`)
    if (nextProps.response !== undefined) {
      if (nextProps.response.data.Code === "00") {
        this.setState({ animating: false });
        const sys = nextProps.response.data.ListValue.map((item, index, data) => {
          // { value: "00016", label: "12/10/2010" },
          let dataNew = {};
          dataNew.value = item.DrawCode;
          dataNew.text = item.DrawDate;
          const dateParts = item.DrawDate.split("/");
          const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
          dataNew.label = (
            <Text>
              Kỳ: #{item.DrawCode} - {getWeekdaysShort(date.getDay())}{" "}
              {item.DrawDate}
            </Text>
          );
          return dataNew;
        });
        this.setState({ systemInit: sys, system: [sys[0]] });
      } else {
        Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
        this.props.onBack();
      }
    } else if (nextProps.err !== undefined) {
      Toast.info("Không tải được thông tin kỳ mở thưởng", 5);
      this.props.onBack();
    }
    if (
      nextProps.tutorialMega !== undefined &&
      nextProps.tutorialMega.data !== undefined
    ) {
      if (nextProps.tutorialMega.data.Code === "00") {
        this.setState({
          tutorialMega: nextProps.tutorialMega.data.Value
        });
      }
    }
    this.setState({ amtMega: localStorage.getItem("amountMega") });
  }

  randomNumber = (except = []) => {
    let num = Math.floor(Math.random() * 45) + 1;
    return except.some(x => x === num) ? this.randomNumber(except) : num;
  };

  randommega645 = type => {
    let number = [];
    let numbertmp = [];

    switch (type) {
      case "A":
        number = this.state.aNumber.map((item, index, data) => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          aNumber: number.sort((a, b) => a - b),
          aIsCheck: true
        });
        break;
      case "B":
        number = this.state.bNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          bNumber: number.sort((a, b) => a - b),
          bIsCheck: true
        });
        break;
      case "C":
        number = this.state.aNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          cNumber: number.sort((a, b) => a - b),
          cIsCheck: true
        });
        break;
      case "D":
        number = this.state.dNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          dNumber: number.sort((a, b) => a - b),
          dIsCheck: true
        });
        break;
      case "E":
        number = this.state.eNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          eNumber: number.sort((a, b) => a - b),
          eIsCheck: true
        });
        break;
      case "F":
        number = this.state.fNumber.map(() => {
          let rannumber = this.randomNumber(numbertmp);
          numbertmp.push(rannumber);
          return rannumber;
        });
        this.setState({
          fNumber: number.sort((a, b) => a - b),
          fIsCheck: true
        });
        break;
      default:
        break;
    }
    const _totalAmount =
      this.state.totalAmount + this.state.price * this.state.system.length;
    this.setState({ totalAmount: _totalAmount });
  };

  randomFast() {
    let number = [];
    let numbertmp = [];
    if (!this.state.aIsCheck) {
      number = this.state.aNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        aNumber: number.sort((a, b) => a - b),
        aIsCheck: true
      });
    } else if (!this.state.bIsCheck) {
      number = this.state.bNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        bNumber: number.sort((a, b) => a - b),
        bIsCheck: true
      });
    } else if (!this.state.cIsCheck) {
      number = this.state.cNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        cNumber: number.sort((a, b) => a - b),
        cIsCheck: true
      });
    } else if (!this.state.dIsCheck) {
      number = this.state.dNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        dNumber: number.sort((a, b) => a - b),
        dIsCheck: true
      });
    } else if (!this.state.eIsCheck) {
      number = this.state.eNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        eNumber: number.sort((a, b) => a - b),
        eIsCheck: true
      });
    } else if (!this.state.fIsCheck) {
      number = this.state.fNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      const _totalAmount =
        this.state.totalAmount + this.state.price * this.state.system.length;
      this.setState({
        totalAmount: _totalAmount,
        fNumber: number.sort((a, b) => a - b),
        fIsCheck: true
      });
    }
  }

  randomAll() {
    let number = [];
    let numbertmp = [];
    if (!this.state.aIsCheck) {
      number = this.state.aNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ aNumber: number.sort((a, b) => a - b), aIsCheck: true });
    }
    if (!this.state.bIsCheck) {
      number = this.state.bNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ bNumber: number.sort((a, b) => a - b), bIsCheck: true });
    }
    if (!this.state.cIsCheck) {
      number = this.state.cNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ cNumber: number.sort((a, b) => a - b), cIsCheck: true });
    }
    if (!this.state.dIsCheck) {
      number = this.state.dNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ dNumber: number.sort((a, b) => a - b), dIsCheck: true });
    }
    if (!this.state.eIsCheck) {
      number = this.state.eNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ eNumber: number.sort((a, b) => a - b), eIsCheck: true });
    }
    if (!this.state.fIsCheck) {
      number = this.state.fNumber.map((item, index, data) => {
        let rannumber = this.randomNumber(numbertmp);
        numbertmp.push(rannumber);
        return rannumber;
      });
      this.setState({ fNumber: number.sort((a, b) => a - b), fIsCheck: true });
    }
    const _totalAmount =
      this.state.totalAmount + this.state.price * this.state.system.length * 6;
    this.setState({ totalAmount: _totalAmount });
    // aNumber: number.sort((a, b) => a - b), aIsCheck: true , bNumber: number.sort((a, b) => a - b), bIsCheck: true , cNumber: number.sort((a, b) => a - b), cIsCheck: true ,dNumber: number.sort((a, b) => a - b), dIsCheck: true, eNumber: number.sort((a, b) => a - b), eIsCheck: true , fNumber: number.sort((a, b) => a - b), fIsCheck: true
  }

  clearData = type => {
    switch (type) {
      case "A":
        this.setState({
          aNumber: initBag(this.state.bagitem),
          aIsCheck: false
        });
        break;
      case "B":
        this.setState({
          bNumber: initBag(this.state.bagitem),
          bIsCheck: false
        });
        break;
      case "C":
        this.setState({
          cNumber: initBag(this.state.bagitem),
          cIsCheck: false
        });
        break;
      case "D":
        this.setState({
          dNumber: initBag(this.state.bagitem),
          dIsCheck: false
        });
        break;
      case "E":
        this.setState({
          eNumber: initBag(this.state.bagitem),
          eIsCheck: false
        });
        break;
      case "F":
        this.setState({
          fNumber: initBag(this.state.bagitem),
          fIsCheck: false
        });
        break;
      default:
        break;
    }
    const _totalAmount =
      this.state.totalAmount - this.state.price * this.state.system.length;
    this.setState({ totalAmount: _totalAmount });
  };

  initaNumber = () => {
    const number = this.state.aNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "A")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          A
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("A")}
      </div>
    );
  };

  initbNumber = () => {
    const number = this.state.bNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "B")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          B
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("B")}
      </div>
    );
  };

  initcNumber = () => {
    const number = this.state.cNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "C")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          C
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("C")}
      </div>
    );
  };

  initdNumber = () => {
    const number = this.state.dNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "D")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          D
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("D")}
      </div>
    );
  };

  initeNumber = () => {
    const number = this.state.eNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "E")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          E
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("E")}
      </div>
    );
  };

  initfNumber = () => {
    const number = this.state.fNumber.map((item, index, data) => {
      return (
        <Text
          key={index}
          className={styles.text_number_circle}
          onClick={this.showModal("modal", "F")}
        >
          {item}
        </Text>
      );
    });
    return (
      <div className={styles.row_number}>
        <Text
          className={styles.text_header}
          style={{ float: "left", width: 40 }}
        >
          F
        </Text>
        <div style={{ width: "100%" }}>{number}</div>
        {this.isCheckNumber("F")}
      </div>
    );
  };

  buttonBeforeNumber = type => {
    return (
      <div className={random}>
        <div
          className={button.button_tc}
          onClick={() => this.randommega645(type)}
        >
          <Text>TC</Text>
        </div>
      </div>
    );
  };

  buttonAfterNumber = type => {
    return (
      <div className={random}>
        <div
          className={button.button_clear}
          onClick={() => this.clearData(type)}
        >
          <CustomeTrashIcon
            type={require("../../assets/trash.svg")}
          ></CustomeTrashIcon>
        </div>
      </div>
    );
  };

  isCheckNumber = type => {
    let showType = null;
    switch (type) {
      case "A":
        showType =
          this.state.aIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "B":
        showType =
          this.state.bIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "C":
        showType =
          this.state.cIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "D":
        showType =
          this.state.dIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "E":
        showType =
          this.state.eIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      case "F":
        showType =
          this.state.fIsCheck === true
            ? this.buttonAfterNumber(type)
            : this.buttonBeforeNumber(type);
        break;
      default:
        showType = this.buttonBeforeNumber(type);
        break;
    }
    return showType;
  };

  onPutValue = type => {
    let value = [];
    switch (type) {
      case "A":
        value = this.state.aNumber;
        break;
      case "B":
        value = this.state.bNumber;
        break;
      case "C":
        value = this.state.cNumber;
        break;
      case "D":
        value = this.state.dNumber;
        break;
      case "E":
        value = this.state.eNumber;
        break;
      case "F":
        value = this.state.fNumber;
        break;
      default:
        break;
    }
    return value;
  };

  showModal = (key, type) => e => {
    e.preventDefault();
    this.setState({
      modalType: type,
      [key]: true
    });
  };

  //function = (param) => (event) => {...}
  onCloseModal = key => () => {
    this.setState({
      modalType: "",
      [key]: false
    });
  };

  onAcceptModal = (key, data, type) => () => {
    switch (type) {
      case "A":
        if (!this.state.aIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ aNumber: data, aIsCheck: true });
        break;
      case "B":
        if (!this.state.bIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ bNumber: data, bIsCheck: true });
        break;
      case "C":
        if (!this.state.cIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ cNumber: data, cIsCheck: true });
        break;
      case "D":
        if (!this.state.dIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ dNumber: data, dIsCheck: true });
        break;
      case "E":
        if (!this.state.eIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ eNumber: data, eIsCheck: true });
        break;
      case "F":
        if (!this.state.fIsCheck) {
          const _totalAmount =
            this.state.totalAmount +
            this.state.price * this.state.system.length;
          this.setState({ totalAmount: _totalAmount });
        }
        this.setState({ fNumber: data, fIsCheck: true });
        break;
      default:
        break;
    }

    this.setState({
      modalType: "",
      [key]: false
    });
  };
  //Modal select number
  modalView = () => {
    return (
      <SelectNumberMega645
        value={this.state.bagitem}
        type={this.state.modalType}
        modal={this.state.modal}
        onValue={this.onPutValue}
        onClose={this.onCloseModal}
        onAccept={this.onAcceptModal}
      />
    );
  };

  showSystemModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };

  //function = (param) => (event) => {...}
  onCloseSystemModal = key => () => {
    this.setState({
      modalSystem: "",
      [key]: false
    });
  };

  onAcceptSystemModal = (key, data) => () => {
    if (data.length !== this.state.system.length) {
      let _totalAmount =
        (this.state.totalAmount / this.state.system.length) * data.length;
      this.setState({ totalAmount: _totalAmount });
    }
    this.setState({
      system: data,
      [key]: false
    });
  };
  //Modal select number
  modalSystemView = () => {
    return (
      <SelectSystemMega645
        system={this.state.systemInit}
        value={this.state.system}
        modal={this.state.modalSystem}
        onClose={this.onCloseSystemModal}
        onAccept={this.onAcceptSystemModal}
      />
    );
  };

  onChangeBag = value => {
    this.setState({
      aNumber: initBag(value),
      bNumber: initBag(value),
      cNumber: initBag(value),
      dNumber: initBag(value),
      eNumber: initBag(value),
      fNumber: initBag(value),
      price: getPriceByBag(value),
      aIsCheck: false,
      bIsCheck: false,
      cIsCheck: false,
      dIsCheck: false,
      eIsCheck: false,
      fIsCheck: false,
      totalAmount: 0
    });
  };

  checkPaymega645() {
    if (
      (this.state.aIsCheck ||
        this.state.bIsCheck ||
        this.state.cIsCheck ||
        this.state.dIsCheck ||
        this.state.eIsCheck ||
        this.state.fIsCheck) &&
      this.state.system.length > 0
    ) {
      this.props.onAccept(this.state);
    }
  }
  RandomAllButton = () => {
    if (this.state.bagitem !== 6) {
      return <div style={{ display: "none" }}></div>;
    } else if (
      this.state.aIsCheck === true ||
      this.state.bIsCheck === true ||
      this.state.cIsCheck === true ||
      this.state.dIsCheck === true ||
      this.state.eIsCheck === true ||
      this.state.fIsCheck === true
    ) {
      return (
        <Button
          className={button.button_primary_full}
          style={{ color: "#FFFFFF" }}
          disabled={true}
        >
          <Text>CHỌN NHANH 6 DÃY</Text>
        </Button>
      );
    } else {
      return (
        <Button
          className={button.button_primary_full}
          onClick={() => this.randomAll()}
        >
          <Text>CHỌN NHANH 6 DÃY</Text>
        </Button>
      );
    }
  };
  render() {
    return (
      <div className={styles2.content}>
        <ActivityIndicator
          className={styles1.spin}
          animating={this.state.animating}
          toast
        ></ActivityIndicator>
        {this.modalView()}
        {this.modalSystemView()}
        <div
          className={styles2.div_button}
          style={{ marginLeft: 6, marginRight: 6 }}
        >
          <div style={{ display: "flex", padding: "4px 0" }}>
            <div>
              <img
                className={styles2.div_img}
                src={require("../../assets/mega.png")}
                alt=""
              />
              <div className={styles2.div_img_text}>
                <CountDownMega />
              </div>
            </div>
            <div className={styles2.div_border}></div>
            <div className={styles2.div_group_text}>
              <div className={styles2.div_text_amt}>
                {this.state.amtMega
                  .toString()
                  .substring(0, this.state.amtMega.toString().length - 9)}
                <span className={styles2.span_text}>Tỷ VND</span>
              </div>
            </div>
          </div>
        </div>
        <WingBlank style={{ marginLeft: 6, marginRight: 6 }}>
          <div style={{ marginTop: 8 }}>
            <Flex>
              <div style={{ width: "50%" }}>
                <Picker
                  data={bag}
                  cols={1}
                  className={styles2.modal_view}
                  okText="Chọn"
                  dismissText="Đóng"
                  value={[this.state.bagitem]}
                  onChange={v => this.onChangeBag(v[0])}
                  onOk={v => this.setState({ bagitem: v[0] })}
                >
                  <Button
                    className={styles.button_drop_down}
                    style={{ width: "100%" }}
                  >
                    <Text> {getBagName(this.state.bagitem)}</Text>
                    <CustomeIcon
                      className={styles2.drop}
                      type={require("../../assets/caret_down.svg")}
                    ></CustomeIcon>
                  </Button>
                </Picker>
              </div>
              <Button
                onClick={this.showSystemModal("modalSystem")}
                className={styles.button_drop_down}
                style={{ marginLeft: 4 }}
              >
                <Text>
                  {this.state.system.length === 1
                    ? this.state.system[0].text
                    : "..."}
                </Text>
                <CustomeIcon
                  className={styles2.drop}
                  type={require("../../assets/caret_down.svg")}
                ></CustomeIcon>
              </Button>
            </Flex>
          </div>

          <div style={{ padding: 8, marginTop: 8, background: "#FFF" }}>
            {this.initaNumber()}
            {this.initbNumber()}
            {this.initcNumber()}
            {this.initdNumber()}
            {this.initeNumber()}
            {this.initfNumber()}
            <WhiteSpace />
            <Flex style={{ padding: 8 }}>
              <Text style={{ fontSize: 20 }}>Tạm tính</Text>
              <Flex.Item className={styles.amount}>
                <Text>{stringToNumberFormat(this.state.totalAmount)} đ</Text>
              </Flex.Item>
            </Flex>

            <Button
              className={button.button_primary}
              onClick={() => this.randomFast()}
            >
              <Text>CHỌN NHANH</Text>
            </Button>
            <Flex>{this.RandomAllButton()}</Flex>
            <div
              className={styles2.primary_btn}
              style={{ margin: 8 }}
              onClick={() => {
                this.checkPaymega645();
              }}
            >
              <Text>ĐẶT VÉ</Text>
            </div>
            <div
              className={styles2.tutorial}
              onClick={() => this.props.onTutorial(this.state.tutorialMega)}
            >
              <span style={{ borderBottom: "1px solid #0cb3ff" }}>
                Hướng dẫn cách chơi
              </span>
            </div>
          </div>
        </WingBlank>
      </div>
    );
  }
}
export default Mega645;
