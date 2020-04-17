import request from "../utils/request";
import { API_HEADER, KEY_PEM } from "../config";
import { Crypt } from "hybrid-crypto-js";
let crypt = new Crypt();
let date = new Date();
let now =
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

const header = {
  "Content-Type": "application/json",
};

//START - Dictionary

function* getProductAmount() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_GET_PRODUCT_AMOUNT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

// Lấy kỳ
function* getDrawMax4d() {
  let data = '{"Date":"' + now + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MAX4D_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getDrawMega645() {
  let data = '{"Date":"' + now + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MEGA_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getDrawPower() {
  let data = '{"Date":"' + now + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_POWER_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getDrawMax3D() {
  let data = '{"Date":"' + now + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MAX3D_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getDrawLottery123() {
  let data = '{"Date":"' + now + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_LOTTERY123_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

//Lấy kết quả
function* getKenoResult() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_KENO_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getMax4dResult() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MAX4D_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getPwResult() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_POWER_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getMegaResult() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MEGA_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getMax3DResult() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MAX3D_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getLottery123Result() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_LOTTERY_123_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

// Check
function* checkAddOrder(productID) {
  let data = { ProductID: productID };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_CHECK_CLOSE_TIME",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature,
    }),
  });
}
function* checkOutOfNumber(data) {
  let data_temp = {
    ProductID: data.ProductID,
    systemMax3D: data.systemMax3D,
    aNumber: data.aNumber,
    bNumber: data.bNumber,
    cNumber: data.cNumber,
    dNumber: data.dNumber,
    eNumber: data.eNumber,
    fNumber: data.fNumber,
  };
  let signature = JSON.parse(
    crypt.signature(KEY_PEM, JSON.stringify(data_temp))
  );
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_CHECK_OF_NUMBER",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature,
    }),
  });
}
function* checkOutOfNumberMax4D(data) {
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_CHECK_OF_NUMBER_4D",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature,
    }),
  });
}

function* getBankList() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_BANK",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

function* getListMerchant() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_MERCHANT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

// Lấy hướng dẫn

function* getReadRules() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_PAYMENT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getReadTerms() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TERM_OF_USE",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialPayment() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_PAYMENT",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialMax3D(widthImg) {
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_MAX3D",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialMax4D(widthImg) {
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_MAX4D",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialMega(widthImg) {
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_MEGA",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialPower(widthImg) {
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_POWER",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorialXSDT123(widthImg) {
  // console.log('widthImg',widthImg);
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_XSDT123",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
//END - Dictionary

//START - Keno
function* getDrawPeriod() {
  let data = "";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "DIC_KENO_DRAW",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* getTutorial(widthImg) {
  let data = '{"WidthImg":"' + widthImg + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "RUL_TUTORIAL_KENO",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
//END - Keno

//START - Login
function* playerLogin(data) {
  let data1 =
    '{"Password":"' +
    data.Password +
    '","DeviceCode":"","MobileNumber":"' +
    data.MobileNumber +
    '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_LOGIN",
      Time: "",
      Data: data1,
      Signature: signature.signature,
    }),
  });
}
function* updateInfo(data) {
  let data1 =
    '{"MobileNumber":"' +
    data.mobileNumber +
    '","Name":"' +
    data.name +
    '","PIDNumber":"' +
    data.pidNumber +
    '","Email":"' +
    data.email +
    '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_INFO_UPDATE",
      Time: "",
      Data: data1,
      Signature: signature.signature,
    }),
  });
}

function* registration(mobileNumber) {
  let data = '{"MerchantID":1,"MobileNumber":"' + mobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_REGISTER",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
function* verifyOTP(data) {
  let data1 =
    '{"OTP":"' + data.OTP + '","MobileNumber":"' + data.MobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_VERIFY_OTP",
      Time: "",
      Data: data1,
      Signature: signature.signature,
    }),
  });
}
function* addOTP(data) {
  let data1 = '{"MobileNumber":"' + data.MobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_OTP_ADD",
      Time: "",
      Data: data1,
      Signature: signature.signature,
    }),
  });
}
function* addPassword(data) {
  let data1 =
    '{"ID":' +
    data.ID +
    ',"Password":"' +
    data.password +
    '","MobileNumber":"' +
    data.MobileNumber +
    '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_PASSWORD_ADD",
      Time: "",
      Data: data1,
      Signature: signature.signature,
    }),
  });
}
function* missPassword(mobileNumber) {
  let data = '{"MobileNumber":"' + mobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ACC_PASSWORD_MISS",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}
//END - Login

//START - Payment

function* getToken() {
  let token_user = localStorage.getItem("token");
  let data = '{"TokenUser":"' + token_user + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "GET_TOKEN",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

// Lấy phí
function* getFee(data) {
  let data_temp = {
    ProductID: data.ProductID,
    MerchantID: data.MerchantID,
    Amount: data.Amount,
  };
  let signature = JSON.parse(
    crypt.signature(KEY_PEM, JSON.stringify(data_temp))
  );
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "FEE_PAY",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature,
    }),
  });
}

function* ReportErrorOrder(data) {
  let data_temp =
    '{"ReasonError":"' +
    data.ReasonError +
    '","order":{"OrderCode":"' +
    data.orderCode +
    '"}}';
  let signature = JSON.parse(
    crypt.signature(KEY_PEM, JSON.stringify(data_temp))
  );
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify({
      CommandCode: "ORDER_REPORT_ERROR",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature,
    }),
  });
}
//END - Payment

//START - PlayerWin

function* getFeeReward(data) {
  let data_temp =
    '{"MerchantID":"' +
    data.MerchantID +
    '","FeeType":"' +
    data.FeeType +
    '","Amount":"' +
    data.Amount +
    '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data_temp));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      CommandCode: "FEE_PAY_REWARD",
      Time: "",
      Data: data_temp,
      Signature: signature.signature,
    }),
  });
}

//END - PlayerWin

function* addTokenNotify(data) {
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/Service", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      CommandCode: "ADD_TOKEN_NOTIFY",
      Time: "",
      Data: data,
      Signature: signature.signature,
    }),
  });
}

export const service = {
  getProductAmount,
  getDrawMax4d,
  getDrawMega645,
  getDrawPower,
  getDrawMax3D,
  getDrawLottery123,
  getKenoResult,
  getMax4dResult,
  getPwResult,
  getMegaResult,
  getMax3DResult,
  getLottery123Result,
  checkAddOrder,
  checkOutOfNumber,
  checkOutOfNumberMax4D,
  getReadRules,
  getReadTerms,
  getDrawPeriod,
  getFee,
  getTutorial,
  getTutorialPayment,
  getTutorialMax3D,
  getTutorialMax4D,
  getTutorialMega,
  getTutorialPower,
  getTutorialXSDT123,
  playerLogin,
  updateInfo,
  registration,
  verifyOTP,
  addOTP,
  addPassword,
  missPassword,
  getToken,
  getFeeReward,
  ReportErrorOrder,
  getBankList,
  getListMerchant,
  addTokenNotify,
};
