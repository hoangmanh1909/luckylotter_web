import React from "react";
import {
    WingBlank,
    Text,
    InputItem,
    Button,
    ActivityIndicator,
    Toast,
    Radio,
    Flex,
    Picker,
    List,
    WhiteSpace,
    Modal
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import styles from "./Payment.css";
import { ColorCarousel } from "../utils/ColorBase";
import { stringToNumberFormat } from "../utils/Helper";
import styles2 from "./Main.less";
import { API_KEY, SOURCE_CHANNEL } from "../config";
import CryptoJS from "crypto-js";

class PaymentTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            name: "",
            namereceiver: "",
            pidNumber: "",
            mobileNumber: "",
            receiverMobileNumber: "",
            note: "",
            email: "",
            emailreceiver: "",
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
            street: "",
            feeCollectAmount: 0,
            token: localStorage.getItem("token"),
            redirectUrl: "",
            modalSuccess: false,
            drawCodeKeno: 0,
            productID: 0,
            show: 0,
        };
    }

    componentWillMount() {
        if (this.props.location.payload !== undefined) {
            let amount;
            if (this.props.location.payload.productID === 2) {
                amount = this.props.location.payload.amountPayment;
            } else if (
                this.props.location.payload.productID === 6 &&
                this.props.location.payload.tabIndex == 2
            )
                amount = this.props.location.payload.totalAmountParity;
            else amount = this.props.location.payload.totalAmount;
            const dataPay = this.props.location.payload;

            let value;
            if (
                this.props.location.payload.productID === 2 ||
                this.props.location.payload.productID === 4 ||
                this.props.location.payload.productID === 5
            ) {
                value = this.checkNumber(dataPay);
                this.setState({ show: 2 });
            } else if (
                this.props.location.payload.productID === 6 ||
                this.props.location.payload.productID === 7 ||
                this.props.location.payload.productID === 9
            ) {
                value = this.checkNumberKeno(dataPay);
                this.setState({ show: 1 });
            } else {
                value = this.checkNumberMegaNPower(dataPay);
                this.setState({ show: 2 });
            }
            const feeCollectAmount = this.props.location.fee;
            const totalAmount = amount + feeCollectAmount;
            this.setState({
                data: value,
                amount: amount,
                totalAmount: totalAmount,
                mobileNumber: localStorage.getItem("mobileNumber"),
                feeCollectAmount: feeCollectAmount
            });
        }

    }

    componentDidUpdate() {
        // console.log(this.state.provinceList)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (
            nextProps.kenoResponse !== undefined &&
            nextProps.kenoResponse.data !== undefined
        ) {
            this.setState({ animating: false });
            if (nextProps.kenoResponse.data.Code === "00") {
                this.setState({
                    redirectUrl: nextProps.kenoResponse.data.Value,
                    modalSuccess: true,
                    animating: false
                });
                if (nextProps.kenoResponse.data.Message !== "") {
                    this.setState({
                        drawCodeKeno: nextProps.kenoResponse.data.Message
                    });
                }
            } else {
                Toast.info(nextProps.kenoResponse.data.Message, 2);
            }
        }

        if (
            nextProps.response !== undefined &&
            nextProps.response.data !== undefined
        ) {
            this.setState({ animating: false });
            if (nextProps.response.data.Code === "00") {
                window.location.href = nextProps.response.data.Value;
            } else {
                Toast.info(nextProps.response.data.Message, 2);
            }
        }

        if (nextProps.player !== undefined && nextProps.player.data !== undefined) {
            if (nextProps.player.data.Code === "00") {
                const value = nextProps.player.data.Value;
                this.setState({
                    name: value.Name,
                    pidNumber: value.PIdNumber,
                    email: value.EmailAddress
                });
            }
        }

        if (nextProps.receiverMobile !== undefined && nextProps.receiverMobile.data !== undefined) {
            if (nextProps.receiverMobile.data.Code === "00") {
                const value = nextProps.receiverMobile.data.Value;
                this.setState({
                    namereceiver: value.Name,
                    emailreceiver: value.EmailAddress
                });
            }
            else {
                Toast.info("Không tìm thấy thông tin phù hợp. Vui lòng kiểm tra lại và chắc chắn rằng người được bạn tặng vé cũng đã từng mua vé qua ứng dụng của chúng tôi.")
            }
        }

        if (nextProps.err !== undefined) {
            Toast.info("Lỗi kết nối hệ thống", 5);
        }

    }

    checkNumber = (value = {}) => {
        if (!value.aIsNumber) {
            if (value.bIsNumber && value.bIsAmount) {
                value.aIsAmount = value.bIsAmount;
                value.aIsNumber = value.bIsNumber;
                value.aNumber = value.bNumber;
                value.aAmount = value.bAmount;
                value.typeItemA = value.typeItemB;

                value.bIsAmount = false;
                value.bIsNumber = false;
                value.typeItemB = 0;
            } else {
                if (value.cIsNumber && value.cIsAmount) {
                    value.aIsAmount = value.cIsAmount;
                    value.aIsNumber = value.cIsNumber;
                    value.aNumber = value.cNumber;
                    value.aAmount = value.cAmount;
                    value.typeItemA = value.typeItemC;

                    value.cIsAmount = false;
                    value.cIsNumber = false;
                    value.typeItemC = 0;
                } else {
                    if (value.dIsNumber && value.dIsAmount) {
                        value.aIsAmount = value.dIsAmount;
                        value.aIsNumber = value.dIsNumber;
                        value.aNumber = value.dNumber;
                        value.aAmount = value.dAmount;
                        value.typeItemA = value.typeItemD;

                        value.dIsAmount = false;
                        value.dIsNumber = false;
                        value.typeItemD = 0;
                    } else {
                        if (value.eIsNumber && value.eIsAmount) {
                            value.aIsAmount = value.eIsAmount;
                            value.aIsNumber = value.eIsNumber;
                            value.aNumber = value.eNumber;
                            value.aAmount = value.eAmount;
                            value.typeItemA = value.typeItemE;

                            value.eIsAmount = false;
                            value.eIsNumber = false;
                            value.typeItemE = 0;
                        } else {
                            if (value.fIsNumber && value.fIsAmount) {
                                value.aIsAmount = value.fIsAmount;
                                value.aIsNumber = value.fIsNumber;
                                value.aNumber = value.fNumber;
                                value.aAmount = value.fAmount;
                                value.typeItemA = value.typeItemF;

                                value.fIsAmount = false;
                                value.fIsNumber = false;
                                value.typeItemF = 0;
                            }
                        }
                    }
                }
            }
        }

        if (!value.bIsNumber) {
            if (value.cIsNumber && value.cIsAmount) {
                value.bIsAmount = value.cIsAmount;
                value.bIsNumber = value.cIsNumber;
                value.bNumber = value.cNumber;
                value.bAmount = value.cAmount;
                value.typeItemB = value.typeItemC;

                value.cIsAmount = false;
                value.cIsNumber = false;
                value.typeItemC = 0;
            } else {
                if (value.dIsNumber && value.dIsAmount) {
                    value.bIsAmount = value.dIsAmount;
                    value.bIsNumber = value.dIsNumber;
                    value.bNumber = value.dNumber;
                    value.bAmount = value.dAmount;
                    value.typeItemB = value.typeItemD;

                    value.dIsAmount = false;
                    value.dIsNumber = false;
                    value.typeItemD = 0;
                } else {
                    if (value.eIsNumber && value.eIsAmount) {
                        value.bIsAmount = value.eIsAmount;
                        value.bIsNumber = value.eIsNumber;
                        value.bNumber = value.eNumber;
                        value.bAmount = value.eAmount;
                        value.typeItemB = value.typeItemE;

                        value.eIsAmount = false;
                        value.eIsNumber = false;
                        value.typeItemE = 0;
                    } else {
                        if (value.fIsNumber && value.fIsAmount) {
                            value.bIsAmount = value.fIsAmount;
                            value.bIsNumber = value.fIsNumber;
                            value.bNumber = value.fNumber;
                            value.bAmount = value.fAmount;
                            value.typeItemB = value.typeItemF;

                            value.fIsAmount = false;
                            value.fIsNumber = false;
                            value.typeItemF = 0;
                        }
                    }
                }
            }
        }

        if (!value.cIsNumber) {
            if (value.dIsNumber && value.dIsAmount) {
                value.cIsAmount = value.dIsAmount;
                value.cIsNumber = value.dIsNumber;
                value.cNumber = value.dNumber;
                value.cAmount = value.dAmount;
                value.typeItemC = value.typeItemD;

                value.dIsAmount = false;
                value.dIsNumber = false;
                value.typeItemD = 0;
            } else {
                if (value.eIsNumber && value.eIsAmount) {
                    value.cIsAmount = value.eIsAmount;
                    value.cIsNumber = value.eIsNumber;
                    value.cNumber = value.eNumber;
                    value.cAmount = value.eAmount;
                    value.typeItemC = value.typeItemE;

                    value.eIsAmount = false;
                    value.eIsNumber = false;
                    value.typeItemE = 0;
                } else {
                    if (value.fIsNumber && value.fIsAmount) {
                        value.cIsAmount = value.fIsAmount;
                        value.cIsNumber = value.fIsNumber;
                        value.cNumber = value.fNumber;
                        value.cAmount = value.fAmount;
                        value.typeItemC = value.typeItemF;

                        value.fIsAmount = false;
                        value.fIsNumber = false;
                        value.typeItemF = 0;
                    }
                }
            }
        }

        if (!value.dIsNumber) {
            if (value.eIsNumber && value.eIsAmount) {
                value.dIsAmount = value.eIsAmount;
                value.dIsNumber = value.eIsNumber;
                value.dNumber = value.eNumber;
                value.dAmount = value.eAmount;
                value.typeItemD = value.typeItemE;

                value.eIsAmount = false;
                value.eIsNumber = false;
                value.typeItemE = 0;
            } else {
                if (value.fIsNumber && value.fIsAmount) {
                    value.dIsAmount = value.fIsAmount;
                    value.dIsNumber = value.fIsNumber;
                    value.dNumber = value.fNumber;
                    value.dAmount = value.fAmount;
                    value.typeItemD = value.typeItemF;

                    value.fIsAmount = false;
                    value.fIsNumber = false;
                    value.typeItemF = 0;
                }
            }
        }

        if (!value.eIsNumber) {
            if (value.fIsNumber && value.fIsAmount) {
                value.eIsAmount = value.fIsAmount;
                value.eIsNumber = value.fIsNumber;
                value.eNumber = value.fNumber;
                value.eAmount = value.fAmount;
                value.typeItemE = value.typeItemF;

                value.fIsAmount = false;
                value.fIsNumber = false;
                value.typeItemF = 0;
            }
        }
        return value;
    };

    checkNumberMax3D = (value = {}) => {
        if (value.aIsNumber === false && value.aIsAmount === true) {
            if (value.bIsAmount === true) {
                value.aIsAmount = value.bIsAmount;
                value.aIsNumber = value.bIsNumber;
                value.aNumber = value.bNumber;
                value.aAmount = value.bAmount;

                value.bIsAmount = false;
                value.bIsNumber = false;
            } else {
                if (value.cIsAmount) {
                    value.aIsAmount = value.cIsAmount;
                    value.aIsNumber = value.cIsNumber;
                    value.aNumber = value.cNumber;
                    value.aAmount = value.cAmount;

                    value.cIsAmount = false;
                    value.cIsNumber = false;
                } else {
                    if (value.dIsAmount) {
                        value.aIsAmount = value.dIsAmount;
                        value.aIsNumber = value.dIsNumber;
                        value.aNumber = value.dNumber;
                        value.aAmount = value.dAmount;

                        value.dIsAmount = false;
                        value.dIsNumber = false;
                    } else {
                        if (value.eIsAmount) {
                            value.aIsAmount = value.eIsAmount;
                            value.aIsNumber = value.eIsNumber;
                            value.aNumber = value.eNumber;
                            value.aAmount = value.eAmount;

                            value.eIsAmount = false;
                            value.eIsNumber = false;
                        } else {
                            if (value.fIsAmount) {
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

        if (value.bIsNumber === false && value.bIsAmount === true) {
            if (value.cIsAmount) {
                value.bIsAmount = value.cIsAmount;
                value.bIsNumber = value.cIsNumber;
                value.bNumber = value.cNumber;
                value.aAmount = value.cAmount;

                value.cIsAmount = false;
                value.cIsNumber = false;
            } else {
                if (value.dIsAmount) {
                    value.bIsAmount = value.dIsAmount;
                    value.bIsNumber = value.dIsNumber;
                    value.bNumber = value.dNumber;
                    value.bAmount = value.dAmount;

                    value.dIsAmount = false;
                    value.dIsNumber = false;
                } else {
                    if (value.eIsAmount) {
                        value.bIsAmount = value.eIsAmount;
                        value.bIsNumber = value.eIsNumber;
                        value.bNumber = value.eNumber;
                        value.bAmount = value.eAmount;

                        value.eIsAmount = false;
                        value.eIsNumber = false;
                    } else {
                        if (value.fIsAmount) {
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

        if (value.cIsNumber === false && value.cIsAmount === true) {
            if (value.dIsAmount) {
                value.cIsAmount = value.dIsAmount;
                value.cIsNumber = value.dIsNumber;
                value.cNumber = value.dNumber;
                value.cAmount = value.dAmount;

                value.dIsAmount = false;
                value.dIsNumber = false;
            } else {
                if (value.eIsAmount) {
                    value.cIsAmount = value.eIsAmount;
                    value.cIsNumber = value.eIsNumber;
                    value.cNumber = value.eNumber;
                    value.cAmount = value.eAmount;

                    value.eIsAmount = false;
                    value.eIsNumber = false;
                } else {
                    if (value.fIsAmount) {
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

        if (value.dIsNumber === false && value.dIsAmount === true) {
            if (value.eIsAmount) {
                value.dIsAmount = value.eIsAmount;
                value.dIsNumber = value.eIsNumber;
                value.dNumber = value.eNumber;
                value.dAmount = value.eAmount;

                value.eIsAmount = false;
                value.eIsNumber = false;
            } else {
                if (value.fIsAmount) {
                    value.dIsAmount = value.fIsAmount;
                    value.dIsNumber = value.fIsNumber;
                    value.dNumber = value.fNumber;
                    value.dAmount = value.fAmount;

                    value.fIsAmount = false;
                    value.fIsNumber = false;
                }
            }
        }

        if (value.eIsNumber === false && value.eIsAmount === true) {
            if (value.fIsAmount) {
                value.eIsAmount = value.fIsAmount;
                value.eIsNumber = value.fIsNumber;
                value.eNumber = value.fNumber;
                value.eAmount = value.fAmount;

                value.fIsAmount = false;
                value.fIsNumber = false;
            }
        }
        return value;
    };

    checkNumberMegaNPower = (value = {}) => {
        if (!value.aIsCheck) {
            if (value.bIsCheck) {
                value.aIsCheck = value.bIsCheck;
                value.aNumber = value.bNumber;
                value.bIsCheck = false;
            } else {
                if (value.cIsCheck) {
                    value.aIsCheck = value.cIsCheck;
                    value.aNumber = value.cNumber;
                    value.cIsCheck = false;
                } else {
                    if (value.dIsCheck) {
                        value.aIsCheck = value.dIsCheck;
                        value.aNumber = value.dNumber;
                        value.dIsCheck = false;
                    } else {
                        if (value.eIsCheck) {
                            value.aIsCheck = value.eIsCheck;
                            value.aNumber = value.eNumber;
                            value.eIsCheck = false;
                        } else {
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
            } else {
                if (value.dIsCheck) {
                    value.bIsCheck = value.dIsCheck;
                    value.bNumber = value.dNumber;
                    value.dIsCheck = false;
                } else {
                    if (value.eIsCheck) {
                        value.bIsCheck = value.eIsCheck;
                        value.bNumber = value.eNumber;
                        value.eIsCheck = false;
                    } else {
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
            } else {
                if (value.eIsCheck) {
                    value.cIsCheck = value.eIsCheck;
                    value.cNumber = value.eNumber;
                    value.eIsCheck = false;
                } else {
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
            } else {
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
    };

    checkNumberKeno = (value = {}) => {
        if (!value.aIsCheck) {
            if (value.bIsCheck) {
                value.aIsCheck = value.bIsCheck;
                value.aNumber = value.bNumber;
                value.aAmount = value.bAmount;
                value.bIsCheck = false;
            } else {
                if (value.cIsCheck) {
                    value.aIsCheck = value.cIsCheck;
                    value.aNumber = value.cNumber;
                    value.aAmount = value.cAmount;
                    value.cIsCheck = false;
                } else {
                    if (value.dIsCheck) {
                        value.aIsCheck = value.dIsCheck;
                        value.aNumber = value.dNumber;
                        value.aAmount = value.dAmount;
                        value.dIsCheck = false;
                    } else {
                        if (value.eIsCheck) {
                            value.aIsCheck = value.eIsCheck;
                            value.aNumber = value.eNumber;
                            value.aAmount = value.eAmount;
                            value.eIsCheck = false;
                        } else {
                            if (value.fIsCheck) {
                                value.aIsCheck = value.fIsCheck;
                                value.aNumber = value.fNumber;
                                value.aAmount = value.fAmount;
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
                value.bAmount = value.cAmount;
                value.cIsCheck = false;
            } else {
                if (value.dIsCheck) {
                    value.bIsCheck = value.dIsCheck;
                    value.bNumber = value.dNumber;
                    value.bAmount = value.dAmount;
                    value.dIsCheck = false;
                } else {
                    if (value.eIsCheck) {
                        value.bIsCheck = value.eIsCheck;
                        value.bNumber = value.eNumber;
                        value.bAmount = value.eAmount;
                        value.eIsCheck = false;
                    } else {
                        if (value.fIsCheck) {
                            value.bIsCheck = value.fIsCheck;
                            value.bNumber = value.fNumber;
                            value.bAmount = value.fAmount;
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
                value.cAmount = value.dAmount;
                value.dIsCheck = false;
            } else {
                if (value.eIsCheck) {
                    value.cIsCheck = value.eIsCheck;
                    value.cNumber = value.eNumber;
                    value.cAmount = value.eAmount;
                    value.eIsCheck = false;
                } else {
                    if (value.fIsCheck) {
                        value.cIsCheck = value.fIsCheck;
                        value.cNumber = value.fNumber;
                        value.cAmount = value.fAmount;
                        value.fIsCheck = false;
                    }
                }
            }
        }

        if (!value.dIsCheck) {
            if (value.eIsCheck) {
                value.dIsCheck = value.eIsCheck;
                value.dNumber = value.eNumber;
                value.dAmount = value.eAmount;
                value.eIsCheck = false;
            } else {
                if (value.fIsCheck) {
                    value.dIsCheck = value.fIsCheck;
                    value.dNumber = value.fNumber;
                    value.dAmount = value.fAmount;
                    value.fIsCheck = false;
                }
            }
        }

        if (!value.eIsCheck) {
            if (value.fIsCheck) {
                value.eIsCheck = value.fIsCheck;
                value.eNumber = value.fNumber;
                value.eAmount = value.fAmount;
                value.fIsCheck = false;
            }
        }
        return value;
    };

    provinceClick() {
        this.props.onSelectProvince(this.props);
    }

    onChangeName = value => {
        this.setState({ name: value });
    };

    onChangeNameReceiver = value => {
        this.setState({ namereceiver: value });
    };

    onChangePIDNumber = value => {
        this.setState({ pidNumber: value });
    };

    onChangeMobileNumber = value => {
        this.setState({ mobileNumber: value });
    };

    onChangeReceiverMobileNumber = value => {
        this.setState({ receiverMobileNumber: value });
        if (value.length == 10) {
            this.props.onGetReceiverMobile(value)
        }
    };

    onChangeEmail = value => {
        this.setState({ email: value });
    };

    onChangeEmailReceiver = value => {
        this.setState({ emailreceiver: value });
    };

    onChangeNoteReceiver = value => {
        if (value.length < 50) {
            this.setState({ note: value });
        }
    };

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    onChangeStreet = value => {
        this.setState({ street: value });
    };

    onOk = () => {
        if (this.state.name === "") {
            Toast.info("Vui lòng nhập Họ tên người nhận vé", 2);
            return;
        }

        if (this.state.pidNumber === "") {
            Toast.info("Vui lòng nhập Số chứng minh nhân dân người nhận vé", 2);
            return;
        }

        if (this.state.mobileNumber === "") {
            Toast.info("Vui lòng nhập Số điện thoại người tặng vé", 2);
            return;
        }

        if (this.state.receiverMobileNumber === "") {
            Toast.info("Vui lòng nhập Số điện thoại người nhận vé", 2);
            return;
        }

        if (this.state.mobileNumber === this.state.receiverMobileNumber) {
            Toast.info("Không thể tặng vé cho chính mình", 2);
            return;
        }

        // if (this.state.email !== '') {
        //     if (!this.validateEmail(this.state.email)) {
        //         Toast.info("Email không đúng dịnh dạng", 2);
        //         return;
        //     }
        // }

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
            if (this.state.street === "") {
                Toast.info("Vui lòng nhập số nhà", 2);
                return;
            }
        }

        this.setState({ animating: true });
        if (this.state.data.productID === 2) {
            this.props.onPayment(this.dataMax4d());
        } else if (this.state.data.productID === 4) {
            this.props.onPayment(this.dataMax3d());
        } else if (this.state.data.productID === 5) {
            this.props.onPayment(this.dataMax3dPlus());
        } else if (this.state.data.productID === 6) {
            if (this.state.data.tabIndex == 1)
                this.props.onPaymentKeno(this.dataPayment());
            else this.props.onPaymentKeno(this.dataKenoParity());
        } else if (this.state.data.productID === 7) {
            if (this.state.data.tabIndex == 1)
                this.props.onPayment(this.dataLottery123());
            else this.props.onPayment(this.dataKenoParity());
        } else if (this.state.data.productID === 9) {
            if (this.state.data.tabIndex == 1)
                this.props.onPayment(this.dataLottery235());
            else this.props.onPayment(this.dataKenoParity());
        }else {
            this.props.onPayment(this.datamega());
        }
    };

    dataPayment() {
        let data = {};
        let oderItem = [];
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.systemKeno;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé Keno";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;

        let item = {};
        item.ProductID = this.state.data.productID;
        item.ItemType = this.state.data.tabIndex;
        item.Price = 0;
        if (this.state.data.aIsCheck) {
            item.LineA = this.state.data.aNumber.join(",");
            item.SystemA = this.state.data.aNumber.length;
            item.PriceA = this.state.data.aAmount;
            item.Price = this.state.data.aAmount;
        }

        if (this.state.data.bIsCheck) {
            item.LineB = this.state.data.bNumber.join(",");
            item.SystemB = this.state.data.bNumber.length;
            item.PriceB = this.state.data.bAmount;
            item.Price += this.state.data.bAmount;
        }

        if (this.state.data.cIsCheck) {
            item.LineC = this.state.data.cNumber.join(",");
            item.SystemC = this.state.data.cNumber.length;
            item.PriceC = this.state.data.cAmount;
            item.Price += this.state.data.cAmount;
        }
        if (this.state.data.dIsCheck) {
            item.LineD = this.state.data.dNumber.join(",");
            item.SystemD = this.state.data.dNumber.length;
            item.PriceD = this.state.data.dAmount;
            item.Price += this.state.data.dAmount;
        }
        if (this.state.data.eIsCheck) {
            item.LineE = this.state.data.eNumber.join(",");
            item.SystemE = this.state.data.eNumber.length;
            item.PriceE = this.state.data.eAmount;
            item.Price += this.state.data.eAmount;
        }
        if (this.state.data.fIsCheck) {
            item.LineF = this.state.data.fNumber.join(",");
            item.SystemF = this.state.data.fNumber.length;
            item.PriceF = this.state.data.fAmount;
            item.Price += this.state.data.fAmount;
        }

        data.ItemKeno = item;

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    dataKenoParity() {
        let data = {};
        let oderItem = [];
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.systemKenoParity;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé Keno";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;

        let item = {};
        item.ProductID = this.state.data.productID;
        item.Price = 0;
        item.ItemType = this.state.data.tabIndex;
        if (this.state.data.aIsCheckO) {
            item.LineA = this.state.data.isEvenNumberA ? 1 : 2;
            item.PriceA = this.state.data.aAmountO;
            item.Price = this.state.data.aAmountO;
        }
        else if (!this.state.data.aIsCheckO) {
            if (this.state.data.bIsCheckO) {
                item.LineA = this.state.data.isEvenNumberB ? 1 : 2;
                item.PriceA = this.state.data.bAmountO;
                item.Price = this.state.data.bAmountO;
                this.state.data.bAmountO = 0;
                this.state.data.isEvenNumberB = false;
                this.state.data.isOddNumberB = false;
                this.state.data.bIsCheckO = false;
            }
            else {
                if (this.state.data.cIsCheckO) {
                    item.LineA = this.state.data.isEvenNumberC ? 1 : 2;
                    item.PriceA = this.state.data.cAmountO;
                    item.Price = this.state.data.cAmountO;
                    this.state.data.cAmountO = 0;
                    this.state.data.isEvenNumberC = false;
                    this.state.data.isOddNumberC = false;
                    this.state.data.cIsCheckO = false;
                }
                else {
                    if (this.state.data.dIsCheckO) {
                        item.LineA = this.state.data.isBigNumberA ? 3 : 4;
                        item.PriceA = this.state.data.dAmountO;
                        item.Price = this.state.data.dAmountO;
                        this.state.data.dAmountO = 0;
                        this.state.data.isBigNumberA = false;
                        this.state.data.isSmallNumberA = false;
                        this.state.data.dIsCheckO = false;
                    }
                    else {
                        if (this.state.data.eIsCheckO) {
                            item.LineA = this.state.data.isBigNumberB ? 3 : 4;
                            item.PriceA = this.state.data.eAmountO;
                            item.Price = this.state.data.eAmountO;
                            this.state.data.eAmountO = 0;
                            this.state.data.isBigNumberB = false;
                            this.state.data.isSmallNumberB = false;
                            this.state.data.eIsCheckO = false;
                        }
                        else {
                            if (this.state.data.fIsCheckO) {
                                item.LineA = this.state.data.isBigNumberC ? 3 : 4;
                                item.PriceA = this.state.data.fAmountO;
                                item.Price = this.state.data.fAmountO;
                                this.state.data.fAmountO = 0;
                                this.state.data.isBigNumberC = false;
                                this.state.data.isSmallNumberC = false;
                                this.state.data.fIsCheckO = false;
                            }
                        }
                    }
                }
            }
        }
        if (this.state.data.bIsCheckO) {
            item.LineB = this.state.data.isEvenNumberB ? 1 : 2;
            item.PriceB = this.state.data.bAmountO;
            item.Price += this.state.data.bAmountO;
        }
        else if (!this.state.data.bIsCheckO) {
            if (this.state.data.cIsCheckO) {
                item.LineB = this.state.data.isEvenNumberC ? 1 : 2;
                item.PriceB = this.state.data.cAmountO;
                item.Price += this.state.data.cAmountO;
                this.state.data.cAmountO = 0;
                this.state.data.isEvenNumberC = false;
                this.state.data.isOddNumberC = false;
                this.state.data.cIsCheckO = false;
            }
            else {
                if (this.state.data.dIsCheckO) {
                    item.LineB = this.state.data.isBigNumberA ? 3 : 4;
                    item.PriceB = this.state.data.dAmountO;
                    item.Price += this.state.data.dAmountO;
                    this.state.data.dAmountO = 0;
                    this.state.data.isBigNumberA = false;
                    this.state.data.isSmallNumberA = false;
                    this.state.data.dIsCheckO = false;
                }
                else {
                    if (this.state.data.eIsCheckO) {
                        item.LineB = this.state.data.isBigNumberB ? 3 : 4;
                        item.PriceB = this.state.data.eAmountO;
                        item.Price += this.state.data.eAmountO;
                        this.state.data.eAmountO = 0;
                        this.state.data.isBigNumberB = false;
                        this.state.data.isSmallNumberB = false;
                        this.state.data.eIsCheckO = false;
                    }
                    else {
                        if (this.state.data.fIsCheckO) {
                            item.LineB = this.state.data.isBigNumberC ? 3 : 4;
                            item.PriceB = this.state.data.fAmountO;
                            item.Price += this.state.data.fAmountO;
                            this.state.data.fAmountO = 0;
                            this.state.data.isBigNumberC = false;
                            this.state.data.isSmallNumberC = false;
                            this.state.data.fIsCheckO = false;
                        }
                    }
                }
            }
        }
        if (this.state.data.cIsCheckO) {
            item.LineC = this.state.data.isEvenNumberC ? 1 : 2;
            item.PriceC = this.state.data.cAmountO;
            item.Price += this.state.data.cAmountO;
        }
        else if (!this.state.data.cIsCheckO) {
            if (this.state.data.dIsCheckO) {
                item.LineC = this.state.data.isBigNumberA ? 3 : 4;
                item.PriceC = this.state.data.dAmountO;
                item.Price += this.state.data.dAmountO;
                this.state.data.dAmountO = 0;
                this.state.data.isBigNumberA = false;
                this.state.data.isSmallNumberA = false;
                this.state.data.dIsCheckO = false;
            }
            else {
                if (this.state.data.eIsCheckO) {
                    item.LineC = this.state.data.isBigNumberB ? 3 : 4;
                    item.PriceC = this.state.data.eAmountO;
                    item.Price += this.state.data.eAmountO;
                    this.state.data.eAmountO = 0;
                    this.state.data.isBigNumberB = false;
                    this.state.data.isSmallNumberB = false;
                    this.state.data.eIsCheckO = false;
                }
                else {
                    if (this.state.data.fIsCheckO) {
                        item.LineC = this.state.data.isBigNumberC ? 3 : 4;
                        item.PriceC = this.state.data.fAmountO;
                        item.Price += this.state.data.fAmountO;
                        this.state.data.fAmountO = 0;
                        this.state.data.isBigNumberC = false;
                        this.state.data.isSmallNumberC = false;
                        this.state.data.fIsCheckO = false;
                    }
                }
            }
        }
        if (this.state.data.dIsCheckO) {
            item.LineD = this.state.data.isBigNumberA ? 3 : 4;
            item.PriceD = this.state.data.dAmountO;
            item.Price += this.state.data.dAmountO;
        }
        else if (!this.state.data.dIsCheckO) {
            if (this.state.data.eIsCheckO) {
                item.LineD = this.state.data.isBigNumberB ? 3 : 4;
                item.PriceD = this.state.data.eAmountO;
                item.Price += this.state.data.eAmountO;
                this.state.data.eAmountO = 0;
                this.state.data.isBigNumberB = false;
                this.state.data.isSmallNumberB = false;
                this.state.data.eIsCheckO = false;
            }
            else {
                if (this.state.data.fIsCheckO) {
                    item.LineD = this.state.data.isBigNumberC ? 3 : 4;
                    item.PriceD = this.state.data.fAmountO;
                    item.Price += this.state.data.fAmountO;
                    this.state.data.fAmountO = 0;
                    this.state.data.isBigNumberC = false;
                    this.state.data.isSmallNumberC = false;
                    this.state.data.fIsCheckO = false;
                }
            }
        }
        if (this.state.data.eIsCheckO) {
            item.LineE = this.state.data.isBigNumberB ? 3 : 4;
            item.PriceE = this.state.data.eAmountO;
            item.Price += this.state.data.eAmountO;
        }
        else if (!this.state.data.eIsCheckO) {
            if (this.state.data.fIsCheckO) {
                item.LineE = this.state.data.isBigNumberC ? 3 : 4;
                item.PriceE = this.state.data.fAmountO;
                item.Price += this.state.data.fAmountO;
                this.state.data.fAmountO = 0;
                this.state.data.isBigNumberC = false;
                this.state.data.isSmallNumberC = false;
                this.state.data.fIsCheckO = false;
            }
        }
        if (this.state.data.fIsCheckO) {
            item.LineF = this.state.data.isBigNumberC ? 3 : 4;
            item.PriceF = this.state.data.fAmountO;
            item.Price += this.state.data.fAmountO;
        }
        data.ItemKeno = item;

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    dataLottery123() {
        let data = {};
        let oderItem = [];
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.system;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé điện toán 123";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;

        let items = [];

        for (let i = 0; i < this.state.data.system; i++) {
            console.log(this.state.data.systemInit, i);
            let item = {};
            item.DrawCode = this.state.data.systemInit[i].DrawCode;
            item.DrawDate = this.state.data.systemInit[i].DrawDate;

            item.ProductID = this.state.data.productID;
            item.Price = 0;

            if (this.state.data.aIsCheck) {
                item.LineA = this.state.data.aNumber.join(",");
                item.PriceA = this.state.data.aAmount;
                item.Price = this.state.data.aAmount;
            }

            if (this.state.data.bIsCheck) {
                item.LineB = this.state.data.bNumber.join(",");
                item.PriceB = this.state.data.bAmount;
                item.Price += this.state.data.bAmount;
            }

            if (this.state.data.cIsCheck) {
                item.LineC = this.state.data.cNumber.join(",");
                item.PriceC = this.state.data.cAmount;
                item.Price += this.state.data.cAmount;
            }

            if (this.state.data.dIsCheck) {
                item.LineD = this.state.data.dNumber.join(",");
                item.PriceD = this.state.data.dAmount;
                item.Price += this.state.data.dAmount;
            }

            if (this.state.data.eIsCheck) {
                item.LineE = this.state.data.eNumber.join(",");
                item.PriceE = this.state.data.eAmount;
                item.Price += this.state.data.eAmount;
            }

            items.push(item);
        }
        data.Items = items;

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    dataLottery235() {
        let data = {};
        let oderItem = [];
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.system;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé xổ số điện toán Loto 235";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;

        let items = [];

        for (let i = 0; i < this.state.data.system; i++) {
            console.log(this.state.data.systemInit, i);
            let item = {};
            item.DrawCode = this.state.data.systemInit[i].DrawCode;
            item.DrawDate = this.state.data.systemInit[i].DrawDate;

            item.ProductID = this.state.data.productID;
            item.Price = 0;

            if (this.state.data.aIsCheck) {
                item.LineA = this.state.data.aNumber.join(",");
                item.PriceA = this.state.data.aAmount;
                item.Price = this.state.data.aAmount;
            }

            if (this.state.data.bIsCheck) {
                item.LineB = this.state.data.bNumber.join(",");
                item.PriceB = this.state.data.bAmount;
                item.Price += this.state.data.bAmount;
            }

            if (this.state.data.cIsCheck) {
                item.LineC = this.state.data.cNumber.join(",");
                item.PriceC = this.state.data.cAmount;
                item.Price += this.state.data.cAmount;
            }

            if (this.state.data.dIsCheck) {
                item.LineD = this.state.data.dNumber.join(",");
                item.PriceD = this.state.data.dAmount;
                item.Price += this.state.data.dAmount;
            }

            if (this.state.data.eIsCheck) {
                item.LineE = this.state.data.eNumber.join(",");
                item.PriceE = this.state.data.eAmount;
                item.Price += this.state.data.eAmount;
            }

            items.push(item);
        }
        data.Items = items;

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    dataMax3dPlus() {
        let data = {};
        let oderItem = [];
        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = 5;
        data.Quantity = this.state.data.systemMax3D.length;

        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé max 3D +";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;
        // data.AddInfo = localStorage.getItem("param");

        for (let i = 0; i < this.state.data.systemMax3D.length; i++) {
            let item = {};
            item.ProductID = 5;
            item.DrawCode = this.state.data.systemMax3D[i].value;
            item.DrawDate = this.state.data.systemMax3D[i].text;
            item.Price = 0;
            if (this.state.data.aIsAmount && this.state.data.aIsNumber) {
                item.LineA =
                    this.state.data.aNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.aNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceA = this.state.data.aAmount;
                item.Price = this.state.data.aAmount;
                item.SystemTypeA = this.state.data.typeItemA;
            }

            if (this.state.data.bIsAmount && this.state.data.bIsNumber) {
                item.LineB =
                    this.state.data.bNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.bNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceB = this.state.data.bAmount;
                item.SystemTypeB = this.state.data.typeItemB;
                item.Price += this.state.data.bAmount;
            }

            if (this.state.data.cIsAmount && this.state.data.cIsNumber) {
                item.LineC =
                    this.state.data.cNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.cNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceC = this.state.data.cAmount;
                item.SystemTypeC = this.state.data.typeItemC;
                item.Price += this.state.data.cAmount;
            }
            if (this.state.data.dIsAmount && this.state.data.dIsNumber) {
                item.LineD =
                    this.state.data.dNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.dNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceD = this.state.data.dAmount;
                item.SystemTypeD = this.state.data.typeItemD;
                item.Price += this.state.data.dAmount;
            }
            if (this.state.data.eIsAmount && this.state.data.eIsNumber) {
                item.LineE =
                    this.state.data.eNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.eNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceE = this.state.data.eAmount;
                item.SystemTypeE = this.state.data.typeItemE;
                item.Price += this.state.data.eAmount;
            }
            if (this.state.data.fIsAmount && this.state.data.fIsNumber) {
                item.LineF =
                    this.state.data.fNumber
                        .join("")
                        .toString()
                        .slice(0, 3) +
                    "," +
                    this.state.data.fNumber
                        .join("")
                        .toString()
                        .slice(3, 6);
                item.PriceF = this.state.data.fAmount;
                item.SystemTypeF = this.state.data.typeItemF;
                item.Price += this.state.data.fAmount;
            }
            oderItem.push(item);
        }
        data.Items = oderItem;
        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();

        return data;
    }

    dataMax3d() {
        let data = {};
        let oderItem = [];

        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 1;
        data.ProductID = 4;
        data.Quantity = this.state.data.systemMax3D.length;

        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc = "Mua vé max 3D";
        data.MobileNumber = this.state.mobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;
        // data.AddInfo = localStorage.getItem("param");

        for (let i = 0; i < this.state.data.systemMax3D.length; i++) {
            let item = {};
            item.ProductID = 4;
            item.DrawCode = this.state.data.systemMax3D[i].value;
            item.DrawDate = this.state.data.systemMax3D[i].text;
            item.Price = 0;
            if (this.state.data.aIsAmount && this.state.data.aIsNumber) {
                item.LineA = this.state.data.aNumber.join("");
                item.PriceA = this.state.data.aAmount;
                item.Price = this.state.data.aAmount;
                item.SystemTypeA = this.state.data.typeItemA;
            }

            if (this.state.data.bIsAmount && this.state.data.bIsNumber) {
                item.LineB = this.state.data.bNumber.join("");
                item.PriceB = this.state.data.bAmount;
                item.SystemTypeB = this.state.data.typeItemB;
                item.Price += this.state.data.bAmount;
            }

            if (this.state.data.cIsAmount && this.state.data.cIsNumber) {
                item.LineC = this.state.data.cNumber.join("");
                item.PriceC = this.state.data.cAmount;
                item.SystemTypeC = this.state.data.typeItemC;
                item.Price += this.state.data.cAmount;
            }
            if (this.state.data.dIsAmount && this.state.data.dIsNumber) {
                item.LineD = this.state.data.dNumber.join("");
                item.PriceD = this.state.data.dAmount;
                item.SystemTypeD = this.state.data.typeItemD;
                item.Price += this.state.data.dAmount;
            }
            if (this.state.data.eIsAmount && this.state.data.eIsNumber) {
                item.LineE = this.state.data.eNumber.join("");
                item.PriceE = this.state.data.eAmount;
                item.SystemTypeE = this.state.data.typeItemE;
                item.Price += this.state.data.eAmount;
            }
            if (this.state.data.fIsAmount && this.state.data.fIsNumber) {
                item.LineF = this.state.data.fNumber.join("");
                item.PriceF = this.state.data.fAmount;
                item.SystemTypeF = this.state.data.typeItemF;
                item.Price += this.state.data.fAmount;
            }
            oderItem.push(item);
        }
        data.Items = oderItem;

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();

        return data;
    }

    dataMax4d() {
        let data = {};
        let oderItem = [];

        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
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
        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    datamega() {
        let data = {};
        let oderItem = [];

        data.SourceChannel = CryptoJS.SHA256(SOURCE_CHANNEL)
            .toString()
            .toUpperCase();
        data.MerchantID = localStorage.getItem("merchant_id");
        data.TransCategory = 2;
        data.ProductID = this.state.data.productID;
        data.Quantity = this.state.data.system.length;
        data.Price = this.state.amount;
        data.Fee = this.state.feeAmount + this.state.feeCollectAmount;
        data.Amount = this.state.totalAmount;
        data.FullName = this.state.name;
        data.Desc =
            "Mua vé " +
            (this.state.data.productID === 1 ? "Mega 6/45" : "Power 6/55");
        data.MobileNumber = this.state.mobileNumber;
        data.ReceiverMobileNumber = this.state.receiverMobileNumber;
        data.DeliveryType = this.state.feePOS ? "S" : "D";
        data.PIDNumber = this.state.pidNumber;
        data.EmailAddress = this.state.email;
        data.ProvinceID = this.state.provinceID;
        data.DistrictID = this.state.districtID;
        data.WardID = this.state.wardID;
        data.Street = this.state.street;
        data.Note = this.state.note;
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

        data.Signature = CryptoJS.SHA256(
            API_KEY +
            data.SourceChannel +
            data.MobileNumber +
            data.Quantity +
            data.Amount +
            data.FullName +
            data.PIDNumber +
            this.state.token
        ).toString();
        return data;
    }

    onChangeRa = type => {
        if (type === "A") {
            const totalAmount = this.state.amount;
            this.setState({
                feePOS: true,
                feeDelivery: false,
                feeAmount: 0,
                totalAmount: totalAmount
            });
        } else {
            this.setState({ feePOS: false, feeDelivery: true });
            this.getFee(0, 0);
        }
    };

    onChangeDistrict = value => {
        this.props.onGetWard(value);
        if (this.state.feeDelivery) {
            this.getFee(value, 0);
        }
    };

    onChangeWard = value => {
        if (this.state.feeDelivery) {
            this.getFee(0, value);
        }
    };

    renderDelivery() {
        if (this.state.feeDelivery) {
            return (
                <div>
                    <div
                        style={{
                            backgroundColor: ColorCarousel,
                            color: "#FFF",
                            marginTop: 12,
                            textAlign: "center",
                            padding: 6,
                            fontSize: 18
                        }}
                    >
                        Địa chỉ giao vé
          </div>
                    <Picker
                        title="Chọn Tỉnh/TP"
                        extra="Tỉnh/TP"
                        data={this.state.provinceList}
                        cols={1}
                        className="forss"
                        okText="Chọn"
                        dismissText="Đóng"
                        disabled={false}
                        onChange={v => this.props.onGetDistrict(v[0])}
                        value={[this.state.provinceID]}
                        onOk={v => this.setState({ provinceID: v[0] })}
                    >
                        <List.Item arrow="horizontal">Tỉnh/TP</List.Item>
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
                        onChange={v => this.onChangeDistrict(v[0])}
                        value={[this.state.districtID]}
                        onOk={v => this.setState({ districtID: v[0] })}
                    >
                        <List.Item arrow="horizontal">Quận/Huyện</List.Item>
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
                        onChange={v => this.onChangeWard(v[0])}
                        value={[this.state.wardID]}
                        onOk={v => this.setState({ wardID: v[0] })}
                    >
                        <List.Item arrow="horizontal">Xã/Phường</List.Item>
                    </Picker>
                    <InputItem
                        style={{ textAlign: "right" }}
                        clear
                        value={this.state.street}
                        onChange={this.onChangeStreet}
                        placeholder="Số nhà"
                    >
                        Số nhà
          </InputItem>
                </div>
            );
        } else return <div></div>;
    }

    renderModalSuccess = () => {
        return (
            <div>
                <Modal
                    visible={this.state.modalSuccess}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose("modalSuccess")}
                    style={{ width: "100%", marginLeft: 16, marginRight: 16 }}
                >
                    <div style={{ height: 250 }}>
                        <div
                            style={{
                                textAlign: "center",
                                ,
                                fontWeight: "bold",
                                color: "#1dbcbb",
                                fontSize: 18
                            }}
                        >
                            Thông báo
            </div>

                        <div
                            style={{
                                fontSize: "12pt",
                                ,
                                marginBottom: 0,
                                textAlign: "left"
                            }}
                        >
                            Kỳ QSMT dự kiến:{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {this.state.drawCodeKeno}
                            </span>
                        </div>
                        <p
                            style={{
                                fontSize: "12pt",
                                ,
                                marginBottom: 20,
                                color: "#E32E35",
                                marginTop: 2,
                                textAlign: "left"
                            }}
                        >
                            Lưu ý: Do thời gian QSMT của sản phẩm Keno ngắn nên Kỳ QSMT thực
                            tế in trên vé có thể khác so với kỳ QSMT dự kiến. Kỳ QSMT thực tế
                            là kỳ gần nhất sau khi Quý khách hàng thanh toán thành công
            </p>
                        <div className={styles2.primary_btn}>
                            <div
                                onClick={() => this.onRedirect()}
                                style={{
                                    color: "white",
                                    width: "100%",
                                    fontSize: 15,
                                    
                                }}
                            >
                                Đồng ý
              </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    };

    renderDrawCode(drawCode, length) {
        let returnString = "";
        // console.log(drawCode);
        for (let i = 0; i < length; i++) {
            let stringDrawCode = drawCode.toString().padStart(7, "0");
            returnString = returnString + " " + "#" + stringDrawCode + " ";
            drawCode = drawCode + 1;
        }
        return returnString;
    }

    onClose = key => () => {
        this.setState({
            [key]: false
        });
    };

    onRedirect = () => {
        window.location.href = this.state.redirectUrl;
    };

    render() {
        return (
            <div>
                <ActivityIndicator
                    className={styles.spin}
                    animating={this.state.animating}
                    toast
                ></ActivityIndicator>
                {this.renderModalSuccess()}
                <WingBlank>
                    <div style={{ backgroundColor: "#FFF" }}>
                        <div
                            style={{
                                backgroundColor: "#E8E8E8",
                                marginTop: 12,
                                padding: 8,
                                color: "rgb(37, 56, 84)",
                                
                            }}
                        >
                            HÌNH THỨC NHẬN VÉ
            </div>
                        <div>
                            <Flex style={{ padding: "15px" }}>
                                <Flex.Item>
                                    <div style={{ width: "50%", float: "left" }}>
                                        <Radio
                                            className={styles.my_radio}
                                            checked={this.state.feePOS}
                                            onChange={() => this.onChangeRa("A")}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    verticalAlign: "middle",
                                                    ,
                                                    color: "rgb(37, 56, 84)"
                                                }}
                                            >
                                                Đại lý giữ hộ
                      </Text>
                                        </Radio>
                                    </div>
                                    <div style={{ width: "50%", float: "left" }}>
                                        <Radio
                                            disabled
                                            className={styles.my_radio}
                                            checked={this.state.feeDelivery}
                                            onChange={() => this.onChangeRa("B")}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    verticalAlign: "middle",
                                                    ,
                                                    color: "rgb(37, 56, 84)"
                                                }}
                                            >
                                                Giao vé
                      </Text>
                                        </Radio>
                                    </div>
                                </Flex.Item>
                            </Flex>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                backgroundColor: "#E8E8E8",
                                marginTop: 12,
                                padding: 8,
                                color: "rgb(37, 56, 84)",
                                
                            }}
                        >
                            THÔNG TIN NGƯỜI ĐẶT VÉ
            </div>
                        <InputItem
                            value={this.state.name}
                            onChange={this.onChangeName}
                            clear
                            placeholder="Nhập họ tên"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Họ tên
              </Text>
                            <Text style={{ color: "red" }}>*</Text>
                        </InputItem>
                        <InputItem
                            value={this.state.pidNumber}
                            onChange={this.onChangePIDNumber}
                            clear
                            placeholder="Nhập số CMND"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                CMND
              </Text>
                            <Text style={{ color: "red" }}>*</Text>
                        </InputItem>
                        <InputItem
                            type="number"
                            disabled={true}
                            value={this.state.mobileNumber}
                            onChange={this.onChangeMobileNumber}
                            clear
                            placeholder="Nhập số điện thoại"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Số ĐT
              </Text>
                            <Text style={{ color: "red" }}>*</Text>
                        </InputItem>
                        <InputItem
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            clear
                            placeholder="Nhập email"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Email
              </Text>
                        </InputItem>
                    </div>
                    {this.renderDelivery()}
                    <WhiteSpace></WhiteSpace>

                    <div>
                        <div
                            style={{
                                backgroundColor: "#E8E8E8",
                                padding: 8,
                                color: "rgb(37, 56, 84)",
                                
                            }}
                        >
                            THÔNG TIN NGƯỜI NHẬN VÉ
          </div>
                        <InputItem
                            type="number"
                            value={this.state.receiverMobileNumber}
                            onChange={this.onChangeReceiverMobileNumber}
                            clear
                            placeholder="Nhập số điện thoại"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Số ĐT
            </Text>
                            <Text style={{ color: "red" }}>*</Text>
                        </InputItem>
                        <InputItem
                            disabled={true}
                            value={this.state.namereceiver}
                            onChange={this.onChangeNameReceiver}
                            clear
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Họ tên
            </Text>
                        </InputItem>
                        <InputItem
                            disabled={true}
                            value={this.state.emailreceiver}
                            onChange={this.onChangeEmailReceiver}
                            clear
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Email
            </Text>
                        </InputItem>
                        <InputItem
                            clear
                            value={this.state.note}
                            onChange={this.onChangeNoteReceiver}
                            placeholder="Tối đa 50 ký tự"
                            style={{
                                textAlign: "right",
                                ,
                                color: "rgb(37, 56, 84)"
                            }}
                        >
                            <Text
                                style={{ , color: "rgb(37, 56, 84)" }}
                            >
                                Lời nhắn
            </Text>
                        </InputItem>
                    </div>
                    {this.renderDelivery()}
                    <WhiteSpace></WhiteSpace>

                    <div
                        className="am-list-item am-input-item am-list-item-middle"
                        style={{ minHeight: "30px", height: "30px" }}
                    >
                        <div className="am-list-line">
                            <div
                                style={{ width: 120 }}
                                className="am-input-label am-input-label-5"
                            >
                                <div
                                    style={{ color: "rgb(37, 56, 84)",  }}
                                >
                                    Tiền vé
                </div>
                            </div>
                            <div className="am-input-control">
                                <Text
                                    onChange={this.onChangeName}
                                    style={{
                                        float: "right",
                                        color: "rgb(37, 56, 84)",
                                        
                                    }}
                                >
                                    {stringToNumberFormat(this.state.amount)} đ
                </Text>
                            </div>
                        </div>
                    </div>
                    <div
                        className="am-list-item am-input-item am-list-item-middle"
                        style={{ minHeight: "30px", height: "30px" }}
                    >
                        <div className="am-list-line">
                            <div
                                style={{ width: 120 }}
                                className="am-input-label am-input-label-5"
                            >
                                <div
                                    style={{ color: "rgb(37, 56, 84)",  }}
                                >
                                    Phí lưu vé
                </div>
                            </div>
                            <div className="am-input-control">
                                <Text
                                    onChange={this.onChangeName}
                                    style={{
                                        float: "right",
                                        color: "rgb(37, 56, 84)",
                                        
                                    }}
                                >
                                    {stringToNumberFormat(this.state.feeCollectAmount)} đ
                </Text>
                            </div>
                        </div>
                    </div>

                    <div className="am-list-item am-input-item am-list-item-middle">
                        <div
                            className="am-list-line"
                            style={{ borderTop: "1px solid rgb(252, 24, 22)" }}
                        >
                            <div
                                style={{ width: 120 }}
                                className="am-input-label am-input-label-5"
                            >
                                <div
                                    style={{
                                        color: "rgb(252, 24, 22)",
                                        fontWeight: "bold",
                                        
                                    }}
                                >
                                    TỔNG TIỀN
                </div>
                            </div>
                            <div className="am-input-control">
                                <Text
                                    onChange={this.onChangeName}
                                    style={{
                                        float: "right",
                                        color: "rgb(255, 0, 0)",
                                        ,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {stringToNumberFormat(this.state.totalAmount)} đ
                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="am-list-line  am-input-item am-list-item-middle">
                        <div
                            style={{
                                ,
                                color: "red",
                                textAlign: "center",
                                fontSize: 12,
                                marginTop: 10
                            }}
                        >
                            Thông tin này sẽ được ghi vào trực tiếp trên mặt sau của vé.
            </div>
                        <div
                            style={{
                                ,
                                color: "red",
                                textAlign: "center",
                                fontSize: 12
                            }}
                        >
                            Quý khách vui lòng kiểm tra lại để đảm bảo tính chính xác của
                            thông tin.
            </div>
                    </div>

                    {this.state.show == 1 ? (
                        <div style={{ marginTop: 8 }}>
                            <Flex>
                                <Button
                                    onClick={() => {
                                        this.props.onGoBack(this.props.location.payload);
                                    }}
                                    style={{
                                        width: "50%",
                                        marginRight: 4,
                                        height: "40px",
                                        lineHeight: "40px"
                                    }}
                                    type="warning"
                                >
                                    <Text>Chọn lại</Text>
                                </Button>
                                <div
                                    onClick={() => {
                                        this.onOk();
                                    }}
                                    style={{
                                        width: "50%",
                                        marginLeft: 4,
                                        height: "40px",
                                        lineHeight: "40px"
                                    }}
                                    className={styles2.primary_btn}
                                >
                                    <Text>Thanh toán</Text>
                                </div>
                            </Flex>
                        </div>
                    ) : (
                            <div></div>
                        )}

                    {this.state.show == 2 ? (
                        <div
                            className={styles2.primary_btn}
                            style={{
                                marginTop: 10,
                                ,
                                height: "38px",
                                lineHeight: "38px"
                            }}
                            onClick={() => this.onOk()}
                        >
                            <Text style={{  }}>TIẾP TỤC</Text>
                        </div>
                    ) : (
                            <div></div>
                        )}

                </WingBlank>
            </div>
        );
    }
}

export default PaymentTickets;
