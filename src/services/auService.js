import request from "../utils/request";
import { KEY_PEM } from "../config";
import { Crypt } from "hybrid-crypto-js";
let crypt = new Crypt();
let date = new Date();
let now =
  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

const header = () => {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

function* updatePass(data) {
  // console.log("header", header);
  let data1 =
    '{"MobileNumber":"' +
    localStorage.getItem("mobileNumber") +
    '","PasswordOld":"' +
    data.PasswordOld +
    '","PasswordNew":"' +
    data.PasswordNew +
    '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data1));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ACC_PASSWORD_UPDATE",
      Time: "",
      Data: data1,
      Signature: signature.signature
    })
  });
}

function* getPlayerByMobile(mobileNumber, merchantID) {
  let data = {
    MerchantID: merchantID,
    MobileNumber: mobileNumber
  };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ACC_GET_BY_MOBILE_NUMBER",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getBalanceByMobileNumber(mobileNumber) {
  let data = '{"MobileNumber":"' + mobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ACC_BALANCE",
      Time: "",
      Data: data,
      Signature: signature.signature
    })
  });
}

function* getOrderItemKeno(code) {
  let data = {
    Code: code
  };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ORDER_KENO_ITEM",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}
function* GetOrderPendingError(data) {
  let data_temp = {
    MobileNumber: data.MobileNumber,
    MerchantID: data.MerchantID,
    ProductID: data.ProductID,
    Status: data.Status
  };
  let signature = JSON.parse(
    crypt.signature(KEY_PEM, JSON.stringify(data_temp))
  );
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ORDER_PENDDING_N_ERROR",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })
  });
}
function* GetOrderSuccess(data) {
  let data_temp = {
    MobileNumber: data.MobileNumber,
    MerchantID: data.MerchantID,
    TabIndex: data.TabIndex,
    PageIndex: data.PageIndex
  };
  let signature = JSON.parse(
    crypt.signature(KEY_PEM, JSON.stringify(data_temp))
  );
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ORDER_SUCCESS",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })
  });
}

function* getOrderItemByCode(orderCode) {
  let data = {
    Code: orderCode
  };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ORDER_ITEM",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getOrderItemWin(itemID) {
  let data = '{"OrderItemID":' + itemID + "}";
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ORDER_ITEM_RESULT",
      Time: "",
      Data: data,
      Signature: signature.signature
    })
  });
}

function* addReferral(data) {
  console.log('JSON.stringify(data)',data);
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "ADD_REFERRAL",
      Time: "",
      Data: data,
      Signature: signature.signature
    })
  });
}

function* getByMobileNumber(mobileNumber) {
  let data = '{"MobileNumber":"' + mobileNumber + '"}';
  let signature = JSON.parse(crypt.signature(KEY_PEM, data));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "TPW_GET_BY_MOBILE_NUMBER",
      Time: "",
      Data: data,
      Signature: signature.signature
    })
  });
}

function* getCommission(mobileNumber) {
  let data = {
    MobileNumber : mobileNumber
  }
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "COMMISSION",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getNumberReferral(mobileNumber) {
  let data = {
    MobileNumber : mobileNumber
  }
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "NUMBER_REFERRAL",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getOrderReferral(mobileNumber) {
  let data = {
    MobileNumber : mobileNumber
  }
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "COMMISSION_DETAIL",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getCommissionDetail(mobileNumber) {
  let data = {
    MobileNumber : mobileNumber
  }
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "COMMISSIONV1",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

function* getSearchReferral(mobileNumber) {
  let data = {
    MobileNumber : mobileNumber
  }
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data)));
  return yield request("LKLGW/AuService", {
    method: "POST",
    headers: header(),
    body: JSON.stringify({
      CommandCode: "SEARCH_REFERRAL",
      Time: "",
      Data: JSON.stringify(data),
      Signature: signature.signature
    })
  });
}

export const auService = {
  getPlayerByMobile,
  updatePass,
  getBalanceByMobileNumber,
  getOrderItemKeno,
  GetOrderPendingError,
  getOrderItemByCode,
  GetOrderSuccess,
  getOrderItemWin,
  addReferral,
  getByMobileNumber,
  getCommission,
  getNumberReferral,
  getOrderReferral,
  getCommissionDetail,
  getSearchReferral
};
