import React from 'react';
import { WingBlank, Text, InputItem, Button, ActivityIndicator, Toast, Radio, Flex, Picker, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import styles from './Payment.css';
import { stringToNumberFormat } from '../utils/Helper';
import styles2 from './Main.less';

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            name: '',
            pidNumber: '',
            mobileNumber: '',
            email: '',
            animating: false,
            amount: 0,
            totalAmount: 0,
            feeAmount: 0,
            feePOS: true,
            feeDelivery: false,
            provinceList: [],
            provinceID: 0,
            districtList: [],
            districtID: 0,
            wardList: [],
            wardID: 0,
            street: '',
            feeCollectAmount: 0
        }
    }

    componentWillMount() {
        // console.log(this.props.location.payload)
        if (this.props.location.payload !== undefined) {
            let amount;
            if (this.props.location.payload.productID === 2) {
                amount = this.props.location.payload.amountPayment;
            }
            else
                amount = this.props.location.payload.totalAmount;
            const dataPay = this.props.location.payload;

            let value;
            if (this.props.location.payload.productID === 2)
                value = this.checkNumber(dataPay);
            else
                value = this.checkNumberMegaNPower(dataPay);

            const feeCollectAmount = amount * 2 / 100;
            const totalAmount = amount + feeCollectAmount;
            this.setState({ data: value, amount: amount, totalAmount: totalAmount, mobileNumber: localStorage.getItem("mobileNumber"), feeCollectAmount: feeCollectAmount })
        }
    }

    componentDidUpdate() {
        // console.log(this.state.provinceList)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // if (nextProps.province !== undefined) {
        //     if (nextProps.province.data !== undefined) {
        //         if (nextProps.province.data.Code === "00") {
        //             const province = nextProps.province.data.ListValue.map((item, index, data) => {
        //                 let value = {};
        //                 value.value = item.ID;
        //                 value.label = item.Name;
        //                 return value;
        //             })

        //             this.setState({ provinceList: province })
        //         }
        //         else {
        //             Toast.info("Không lấy được thông tin Tỉnh/TP", 2)
        //         }
        //     }
        // }
        // if (nextProps.district !== undefined) {
        //     if (nextProps.district.data !== undefined) {
        //         if (nextProps.district.data.Code === "00") {
        //             const district = nextProps.district.data.ListValue.map((item, index, data) => {
        //                 let value = {};
        //                 value.value = item.ID;
        //                 value.label = item.Name;
        //                 return value;
        //             })

        //             this.setState({ districtList: district })
        //         }
        //         else {
        //             Toast.info("Không lấy được thông tin Quận/Huyện", 2)
        //         }
        //     }
        // }
        // if (nextProps.ward !== undefined) {
        //     if (nextProps.ward.data !== undefined) {
        //         if (nextProps.ward.data.Code === "00") {
        //             const ward = nextProps.ward.data.ListValue.map((item, index, data) => {
        //                 let value = {};
        //                 value.value = item.ID;
        //                 value.label = item.Name;
        //                 return value;
        //             })

        //             this.setState({ wardList: ward })
        //         }
        //         else {
        //             Toast.info("Không lấy được thông tin Xã/Phường", 2)
        //         }
        //     }
        // }
        // if (nextProps.fee !== undefined) {
        //     if (nextProps.fee.data.Code === "00") {
        //         let _feeAmount = nextProps.fee.data.Value;
        //         const _totalAmount = parseInt(_feeAmount) + this.state.amount;
        //         this.setState({ totalAmount: _totalAmount, feeAmount: _feeAmount })
        //     }
        //     // else {
        //     //     Toast.info(nextProps.fee.data.Message, 2)
        //     // }
        // }
        // console.log(nextProps.response.data);
        if (nextProps.response !== undefined && nextProps.response.data !== undefined && nextProps.response.data !== "") {
            // console.log(nextProps.response)
            this.setState({ animating: false });
            if (nextProps.response.data.Code === "00") {
                window.location.href = nextProps.response.data.Value;
            } else {
                Toast.info(nextProps.response.data.Message, 2);
            }
        }

        if (nextProps.player !== undefined) {
            if (nextProps.player.data.Code === "00") {
                const value = nextProps.player.data.Value;
                this.setState({
                    name: value.Name,
                    pidNumber: value.PIdNumber,
                    email: value.EmailAddress
                })
            }
        }

        if (nextProps.err !== undefined) {
            Toast.info("Lỗi kết nối hệ thống", 5)
        }
    }

    checkNumber = (value = {}) => {
        if (!value.aIsNumber && !value.aIsAmount) {
            if (value.bIsNumber && value.bIsAmount) {
                value.aIsAmount = value.bIsAmount;
                value.aIsNumber = value.bIsNumber;
                value.aNumber = value.bNumber;
                value.aAmount = value.bAmount;

                value.bIsAmount = false;
                value.bIsNumber = false;
            }
            else {
                if (value.cIsNumber && value.cIsAmount) {
                    value.aIsAmount = value.cIsAmount;
                    value.aIsNumber = value.cIsNumber;
                    value.aNumber = value.cNumber;
                    value.aAmount = value.cAmount;

                    value.cIsAmount = false;
                    value.cIsNumber = false;
                }
                else {
                    if (value.dIsNumber && value.dIsAmount) {
                        value.aIsAmount = value.dIsAmount;
                        value.aIsNumber = value.dIsNumber;
                        value.aNumber = value.dNumber;
                        value.aAmount = value.dAmount;

                        value.dIsAmount = false;
                        value.dIsNumber = false;
                    }
                    else {
                        if (value.eIsNumber && value.eIsAmount) {
                            value.aIsAmount = value.eIsAmount;
                            value.aIsNumber = value.eIsNumber;
                            value.aNumber = value.eNumber;
                            value.aAmount = value.eAmount;

                            value.eIsAmount = false;
                            value.eIsNumber = false;
                        }
                        else {
                            if (value.fIsNumber && value.fIsAmount) {
                                value.aIsAmount = value.fIsAmount;
                                value.aIsNumber = value.fIsNumber;
                                value.aNumber = value.fNumber;
                                value.aAmount = value.fAmount;

                                value.fIsAmount = false;
                                value.fIsNumber = false;
                            }
                        }
                    }
                }
            }
        }

        if (!value.bIsNumber && !value.bIsAmount) {
            if (value.cIsNumber && value.cIsAmount) {
                value.bIsAmount = value.cIsAmount;
                value.bIsNumber = value.cIsNumber;
                value.bNumber = value.cNumber;
                value.aAmount = value.cAmount;

                value.cIsAmount = false;
                value.cIsNumber = false;
            }
            else {
                if (value.dIsNumber && value.dIsAmount) {
                    value.bIsAmount = value.dIsAmount;
                    value.bIsNumber = value.dIsNumber;
                    value.bNumber = value.dNumber;
                    value.bAmount = value.dAmount;

                    value.dIsAmount = false;
                    value.dIsNumber = false;
                }
                else {
                    if (value.eIsNumber && value.eIsAmount) {
                        value.bIsAmount = value.eIsAmount;
                        value.bIsNumber = value.eIsNumber;
                        value.bNumber = value.eNumber;
                        value.bAmount = value.eAmount;

                        value.eIsAmount = false;
                        value.eIsNumber = false;
                    }
                    else {
                        if (value.fIsNumber && value.fIsAmount) {
                            value.bIsAmount = value.fIsAmount;
                            value.bIsNumber = value.fIsNumber;
                            value.bNumber = value.fNumber;
                            value.bAmount = value.fAmount;

                            value.fIsAmount = false;
                            value.fIsNumber = false;
                        }
                    }
                }
            }
        }

        if (!value.cIsNumber && !value.cIsAmount) {
            if (value.dIsNumber && value.dIsAmount) {
                value.cIsAmount = value.dIsAmount;
                value.cIsNumber = value.dIsNumber;
                value.cNumber = value.dNumber;
                value.cAmount = value.dAmount;

                value.dIsAmount = false;
                value.dIsNumber = false;
            }
            else {
                if (value.eIsNumber && value.eIsAmount) {
                    value.cIsAmount = value.eIsAmount;
                    value.cIsNumber = value.eIsNumber;
                    value.cNumber = value.eNumber;
                    value.cAmount = value.eAmount;

                    value.eIsAmount = false;
                    value.eIsNumber = false;
                }
                else {
                    if (value.fIsNumber && value.fIsAmount) {
                        value.cIsAmount = value.fIsAmount;
                        value.cIsNumber = value.fIsNumber;
                        value.cNumber = value.fNumber;
                        value.cAmount = value.fAmount;

                        value.fIsAmount = false;
                        value.fIsNumber = false;
                    }
                }
            }
        }

        if (!value.dIsNumber && !value.dIsAmount) {
            if (value.eIsNumber && value.eIsAmount) {
                value.dIsAmount = value.eIsAmount;
                value.dIsNumber = value.eIsNumber;
                value.dNumber = value.eNumber;
                value.dAmount = value.eAmount;

                value.eIsAmount = false;
                value.eIsNumber = false;
            }
            else {
                if (value.fIsNumber && value.fIsAmount) {
                    value.dIsAmount = value.fIsAmount;
                    value.dIsNumber = value.fIsNumber;
                    value.dNumber = value.fNumber;
                    value.dAmount = value.fAmount;

                    value.fIsAmount = false;
                    value.fIsNumber = false;
                }
            }
        }

        if (!value.eIsNumber && !value.eIsAmount) {
            if (value.fIsNumber && value.fIsAmount) {
                value.eIsAmount = value.fIsAmount;
                value.eIsNumber = value.fIsNumber;
                value.eNumber = value.fNumber;
                value.eAmount = value.fAmount;

                value.fIsAmount = false;
                value.fIsNumber = false;
            }
        }
        return value;
    }

    checkNumberMegaNPower = (value = {}) => {
        if (!value.aIsCheck) {
            if (value.bIsCheck) {
                value.aIsCheck = value.bIsCheck;
                value.aNumber = value.bNumber;
                value.bIsCheck = false;
            }
            else {
                if (value.cIsCheck) {
                    value.aIsCheck = value.cIsCheck;
                    value.aNumber = value.cNumber;
                    value.cIsCheck = false;
                }
                else {
                    if (value.dIsCheck) {
                        value.aIsCheck = value.dIsCheck;
                        value.aNumber = value.dNumber;
                        value.dIsCheck = false;
                    }
                    else {
                        if (value.eIsCheck) {
                            value.aIsCheck = value.eIsCheck;
                            value.aNumber = value.eNumber;
                            value.eIsCheck = false;
                        }
                        else {
                            if (value.fIsCheck) {
                                value.aIsCheck = value.fIsCheck;
                                value.aNumber = value.fNumber;
                                value.fIsCheck = false;
                            }
                        }
                    }
                }
            }
        }

        if (!value.bIsCheck) {
            if (value.cIsCheck) {
                value.bIsCheck = value.cIsCheck;
                value.bNumber = value.cNumber;
                value.cIsCheck = false;
            }
            else {
                if (value.dIsCheck) {
                    value.bIsCheck = value.dIsCheck;
                    value.bNumber = value.dNumber;
                    value.dIsCheck = false;
                }
                else {
                    if (value.eIsCheck) {
                        value.bIsCheck = value.eIsCheck;
                        value.bNumber = value.eNumber;
                        value.eIsCheck = false;
                    }
                    else {
                        if (value.fIsCheck) {
                            value.bIsCheck = value.fIsCheck;
                            value.bNumber = value.fNumber;
                            value.fIsCheck = false;
                        }
                    }
                }
            }
        }

        if (!value.cIsCheck) {
            if (value.dIsCheck) {
                value.cIsCheck = value.dIsCheck;
                value.cNumber = value.dNumber;
                value.dIsCheck = false;
            }
            else {
                if (value.eIsCheck) {
                    value.cIsCheck = value.eIsCheck;
                    value.cNumber = value.eNumber;
                    value.eIsCheck = false;
                }
                else {
                    if (value.fIsCheck) {
                        value.cIsCheck = value.fIsCheck;
                        value.cNumber = value.fNumber;
                        value.fIsCheck = false;
                    }
                }
            }
        }

        if (!value.dIsCheck) {
            if (value.eIsCheck) {
                value.dIsCheck = value.eIsCheck;
                value.dNumber = value.eNumber;
                value.eIsCheck = false;
            }
            else {
                if (value.fIsCheck) {
                    value.dIsCheck = value.fIsCheck;
                    value.dNumber = value.fNumber;
                    value.fIsCheck = false;
                }
            }
        }


        if (!value.eIsCheck) {
            if (value.fIsCheck) {
                value.eIsCheck = value.fIsCheck;
                value.eNumber = value.fNumber;
                value.fIsCheck = false;
            }
        }
        return value;
    }

    provinceClick() {
        this.props.onSelectProvince(this.props);
    }

    onChangeName = (value) => {
        this.setState({ name: value })
    }

    onChangePIDNumber = (value) => {
        this.setState({ pidNumber: value })
    }

    onChangeMobileNumber = (value) => {
        this.setState({ mobileNumber: value })
    }

    onChangeEmail = (value) => {
        this.setState({ email: value })
    }


    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onChangeStreet = (value) => {
        this.setState({ street: value })
    }


    onOk = () => {
        if (this.state.name === '') {
            Toast.info("Vui lòng nhập Họ tên người nhận vé", 2);
            return;
        }

        if (this.state.pidNumber === '') {
            Toast.info("Vui lòng nhập Số chứng minh nhân dân người nhận vé", 2);
            return;
        }

        if (this.state.mobileNumber === '') {
            Toast.info("Vui lòng nhập Số điện thoại người nhận vé", 2);
            return;
        }

        if (this.state.email !== '') {
            if (!this.validateEmail(this.state.email)) {
                Toast.info("Email không đúng dịnh dạng", 2);
                return;
            }
        }

        if (this.state.feeDelivery) {
            if (this.state.provinceID <= 0) {
                Toast.info("Vui lòng nhập chọn Tỉnh/TP", 2);
                return;
            }
            if (this.state.districtID <= 0) {
                Toast.info("Vui lòng nhập chọn Quận/Huyện", 2);
                return;
            }
            if (this.state.wardID <= 0) {
                Toast.info("Vui lòng nhập chọn Xã/Phường", 2);
                return;
            }
            if (this.state.street === '') {
                Toast.info("Vui lòng nhập số nhà", 2);
                return;
            }
        }

        this.setState({ animating: true })
        if (this.state.data.productID === 2)
            this.props.onPayment(this.dataMax4d());
        else
            this.props.onPayment(this.datamega());
    }

    dataMax4d() {
        let data = {};
        let oderItem = [];


        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = 2;
        data.Quantity = this.state.data.systemMax4D.length;

        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé max 4D";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;
        // data.AddInfo = localStorage.getItem("param");

        for (let i = 0; i < this.state.data.systemMax4D.length; i++) {
            let item = {};
            item.ProductID = 2;
            item.DrawCode = this.state.data.systemMax4D[i].value;
            item.DrawDate = this.state.data.systemMax4D[i].text;
            item.Price = 0;
            if (this.state.data.aIsAmount && this.state.data.aIsNumber) {
                item.LineA = this.state.data.aNumber.join(",");
                item.PriceA = this.state.data.aAmount;
                item.Price = this.state.data.aAmount;
                item.SystemTypeA = this.state.data.typeItemA;
            }

            if (this.state.data.bIsAmount && this.state.data.bIsNumber) {
                item.LineB = this.state.data.bNumber.join(",");
                item.PriceB = this.state.data.bAmount;
                item.SystemTypeB = this.state.data.typeItemB;
                item.Price += this.state.data.bAmount;
            }

            if (this.state.data.cIsAmount && this.state.data.cIsNumber) {
                item.LineC = this.state.data.cNumber.join(",");
                item.PriceC = this.state.data.cAmount;
                item.SystemTypeC = this.state.data.typeItemC;
                item.Price += this.state.data.cAmount;
            }
            if (this.state.data.dIsAmount && this.state.data.dIsNumber) {
                item.LineD = this.state.data.dNumber.join(",");
                item.PriceD = this.state.data.dAmount;
                item.SystemTypeD = this.state.data.typeItemD;
                item.Price += this.state.data.dAmount;
            }
            if (this.state.data.eIsAmount && this.state.data.eIsNumber) {
                item.LineE = this.state.data.eNumber.join(",");
                item.PriceE = this.state.data.eAmount;
                item.SystemTypeE = this.state.data.typeItemE;
                item.Price += this.state.data.eAmount;
            }
            if (this.state.data.fIsAmount && this.state.data.fIsNumber) {
                item.LineF = this.state.data.fNumber.join(",");
                item.SystemTypeF = this.state.data.typeItemF;
                item.PriceF = this.state.data.fAmount;
                item.Price += this.state.data.fAmount;
            }
            oderItem.push(item);
        }
        data.Items = oderItem;
        // console.log(data)
        return data;
    }

    datamega() {
        let data = {};
        let oderItem = [];

        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.system.length;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé " + (this.state.data.productID === 1 ? "Mega 6/45" : "Power 6/55");
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;
        // data.AddInfo = localStorage.getItem("param");
        for (let i = 0; i < this.state.data.system.length; i++) {
            let item = {};
            item.ProductID = this.state.data.productID;
            item.DrawCode = this.state.data.system[i].value;
            item.DrawDate = this.state.data.system[i].text;
            item.Price = 0;
            if (this.state.data.aIsCheck) {
                item.LineA = this.state.data.aNumber.join(",");
                item.SystemA = this.state.data.bagitem;
                item.PriceA = this.state.data.price;
                item.Price = this.state.data.price;
            }

            if (this.state.data.bIsCheck) {
                item.LineB = this.state.data.bNumber.join(",");
                item.SystemB = this.state.data.bagitem;
                item.PriceB = this.state.data.price;
                item.Price += this.state.data.price;
            }

            if (this.state.data.cIsCheck) {
                item.LineC = this.state.data.cNumber.join(",");
                item.SystemC = this.state.data.bagitem;
                item.PriceC = this.state.data.price;
                item.Price += this.state.data.price;
            }
            if (this.state.data.dIsCheck) {
                item.LineD = this.state.data.dNumber.join(",");
                item.SystemD = this.state.data.bagitem;
                item.PriceD = this.state.data.price;
                item.Price += this.state.data.price;
            }
            if (this.state.data.eIsCheck) {
                item.LineE = this.state.data.eNumber.join(",");
                item.SystemE = this.state.data.bagitem;
                item.PriceE = this.state.data.price;
                item.Price += this.state.data.price;
            }
            if (this.state.data.fIsCheck) {
                item.LineF = this.state.data.fNumber.join(",");
                item.SystemF = this.state.data.bagitem;
                item.PriceF = this.state.data.price;
                item.Price += this.state.data.price;
            }
            oderItem.push(item);
        }
        data.Items = oderItem;
        // console.log(data)
        return data;
    }

    onChangeRa = (type) => {
        if (type === "A") {
            const totalAmount = this.state.amount;
            this.setState({ feePOS: true, feeDelivery: false, feeAmount: 0, totalAmount: totalAmount })
        }
        else {
            this.setState({ feePOS: false, feeDelivery: true });
            this.getFee(0, 0);
        }
    }

    getFee = (districID, wardID) => {
        let data = {};
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = districID === 0 ? this.state.districtID : districID;
        data.WardID = wardID === 0 ? this.state.wardID : wardID;
        // console.log(`data ${JSON.stringify(data)}`)
        this.props.onGetFee(data);
    }

    onChangeDistrict = (value) => {
        this.props.onGetWard(value);
        if (this.state.feeDelivery) {
            this.getFee(value, 0);
        }
    }

    onChangeWard = (value) => {
        if (this.state.feeDelivery) {
            this.getFee(0, value);
        }
    }


    renderDelivery() {
        if (this.state.feeDelivery) {
            return (
                <div>
                    <div style={{ color: "#FFF", marginTop: 12, textAlign: "center", padding: 6, fontSize: 18 }}>Địa chỉ giao vé</div>
                    <Picker
                        title="Chọn Tỉnh/TP"
                        extra="Tỉnh/TP"
                        data={this.state.provinceList}
                        cols={1}
                        className="forss"
                        okText="Chọn"
                        dismissText="Đóng"
                        disabled={false}
                        onChange={(v) => this.props.onGetDistrict(v[0])}
                        value={[this.state.provinceID]}
                        onOk={(v) => this.setState({ provinceID: v[0] })}>
                        <List.Item arrow="horizontal" >Tỉnh/TP</List.Item>
                    </Picker>
                    <Picker
                        title="Chọn Quận/Huyện"
                        extra="Quận/Huyện"
                        data={this.state.districtList}
                        cols={1}
                        className="forss"
                        okText="Chọn"
                        dismissText="Đóng"
                        disabled={false}
                        onChange={(v) => this.onChangeDistrict(v[0])}
                        value={[this.state.districtID]}
                        onOk={(v) => this.setState({ districtID: v[0] })}>
                        <List.Item arrow="horizontal" >Quận/Huyện</List.Item>
                    </Picker>
                    <Picker
                        title="Chọn Xã/Phường"
                        extra="Xã/Phường"
                        data={this.state.wardList}
                        cols={1}
                        className="forss"
                        okText="Chọn"
                        dismissText="Đóng"
                        disabled={false}
                        onChange={(v) => this.onChangeWard(v[0])}
                        value={[this.state.wardID]}
                        onOk={(v) => this.setState({ wardID: v[0] })}>
                        <List.Item arrow="horizontal" >Xã/Phường</List.Item>
                    </Picker>
                    <InputItem style={{ textAlign: "right" }} clear value={this.state.street} onChange={this.onChangeStreet} placeholder="Số nhà">Số nhà</InputItem>
                </div>
            );
        }
        else
            return <div></div>
    }

    render() {
        return (<div>
            <ActivityIndicator className={styles.spin} animating={this.state.animating} toast>
            </ActivityIndicator>
            <div>
                <div style={{ backgroundColor: "#FFF" }}>
                    <div style={{ backgroundColor: "#E8E8E8", padding: 8, fontSize: 18 }}>HÌNH THỨC NHẬN VÉ</div>
                    <div>
                        <Flex style={{ padding: '8px' }}>
                            <Flex.Item>
                                <div style={{ width: "50%", float: "left" }}>
                                    <Radio className={styles.my_radio} checked={this.state.feePOS} onChange={() => this.onChangeRa('A')}>
                                        <Text style={{ fontSize: 17, verticalAlign: "middle" }}>Đại lý giữ hộ</Text>
                                    </Radio></div>
                                <div style={{ width: "50%", float: "left" }}>
                                    <Radio disabled className={styles.my_radio} checked={this.state.feeDelivery} onChange={() => this.onChangeRa('B')}>
                                        <Text style={{ fontSize: 17, verticalAlign: "middle" }}>Giao vé</Text>
                                    </Radio>
                                </div>
                            </Flex.Item>
                        </Flex>



                    </div>
                </div>
                <div>
                    <div style={{ backgroundColor: "#E8E8E8", padding: 8, fontSize: 18 }}>NGƯỜI NHẬN</div>
                    <InputItem value={this.state.name} onChange={this.onChangeName} clear placeholder="Họ tên">Họ tên<Text style={{ color: "#E32E35" }}>*</Text></InputItem>
                    <InputItem type="number" value={this.state.pidNumber} onChange={this.onChangePIDNumber} clear placeholder="Chứng minh nhân dân">CMND<Text style={{ color: "#E32E35" }}>*</Text></InputItem>
                    <InputItem type="number" disabled={true} value={this.state.mobileNumber} onChange={this.onChangeMobileNumber} clear placeholder="Số điện thoại">Số ĐT<Text style={{ color: "#E32E35" }}>*</Text></InputItem>
                    <InputItem value={this.state.email} onChange={this.onChangeEmail} clear placeholder="Email">Email</InputItem>
                </div>

                <div style={{margin:8}}>
                    <InputItem
                        style={{ textAlign: "right", color: "#E32E35" }}
                        value={stringToNumberFormat(this.state.amount) + ' đ'}
                        onChange={this.onChangeName}
                        editable={false}
                    >Tiền vé</InputItem>

                    <div className="am-list-item am-input-item am-list-item-middle">
                        <div className="am-list-line">
                            <div style={{ width: 120 }} className="am-input-label am-input-label-5">
                                <div>Phí lưu vé</div>
                            </div>
                            <div className="am-input-control">
                                <Text onChange={this.onChangeName} style={{ float: "right", color: "#E32E35", fontSize: 17, fontFamily: "sans-serif" }}>
                                    {stringToNumberFormat(this.state.feeCollectAmount)} đ
                                    </Text>
                            </div>
                        </div>
                    </div>

                    <div className="am-list-item am-input-item am-list-item-middle">
                        <div className="am-list-line">
                            <div style={{ width: 120 }} className="am-input-label am-input-label-5">
                                <div>Tổng tiền</div>
                            </div>
                            <div className="am-input-control">
                                <Text onChange={this.onChangeName} style={{ float: "right", color: "#E32E35", fontSize: 17, fontFamily: "sans-serif" }}>
                                    {stringToNumberFormat(this.state.totalAmount)} đ
                                    </Text>
                            </div>
                        </div>
                    </div>
                    {/* <InputItem
                        style={{ textAlign: "right", color: "#E32E35",borderTop:"1px solid #E32E35" }}
                        value={stringToNumberFormat(this.state.totalAmount) + ' đ'}
                        onChange={this.onChangeName}
                        editable={false}
                    >Tổng tiền</InputItem> */}
                    <div className={styles2.primary_btn} style={{ marginTop: 10 }} onClick={() => this.onOk()}>Tiếp tục</div>
                </div>
                {/* {this.renderDelivery()} */}
                
            </div>

        </div>)
    }
}

export default Payment;