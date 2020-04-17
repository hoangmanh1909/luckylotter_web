import request from "../utils/request";
import { API_HEADER, KEY_PEM, API_HEADER_PAY } from "../config";
import { Crypt } from "hybrid-crypto-js";
let crypt = new Crypt();

const header = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token")
};

function* orderAdd(data) {
  let data_temp = {
    MerchantID: 8,
    TransCategory: data.TransCategory,
    ProductID: data.ProductID,
    Quantity: data.Quantity,
    Price: data.Price,
    Fee: data.Fee,
    Amount: data.Amount,
    Desc: data.Desc,
    MobileNumber: data.MobileNumber,
    PIDNumber: data.PIDNumber,
    EmailAddress: data.EmailAddress,
    FullName: data.FullName,
    DeliveryType: data.DeliveryType,
    ProvinceID: data.ProvinceID,
    DistrictID: data.DistrictID,
    WardID: data.WardID,
    Street: data.Street,
    Items: data.Items,
    SourceChannel: data.SourceChannel,
    Signature: data.Signature.signature
  };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data_temp)));
  console.log('signature',signature);
  return yield request("LKLGW/Payment", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      CommandCode: "ADD_ORDER_V1",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })
  });
}
function* addOrderKeno(data) {
  let data_temp = {
    MerchantID: 8,
    TransCategory: data.TransCategory,
    ProductID: data.ProductID,
    Quantity: data.Quantity,
    Price: data.Price,
    Fee: data.Fee,
    Amount: data.Amount,
    Desc: data.Desc,
    MobileNumber: data.MobileNumber,
    PIDNumber: data.PIDNumber,
    EmailAddress: data.EmailAddress,
    FullName: data.FullName,
    DeliveryType: data.DeliveryType,
    ProvinceID: data.ProvinceID,
    DistrictID: data.DistrictID,
    WardID: data.WardID,
    Street: data.Street,
    ItemKeno: data.ItemKeno,
    SourceChannel: data.SourceChannel,
    Signature: data.Signature.signature
  };
  console.log(data_temp);
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data_temp)));
  console.log('signature',signature);
  console.log(JSON.stringify(data_temp));
  console.log(JSON.stringify({
    CommandCode: "ADD_ORDER_KENO",
    Time: "",
    Data: JSON.stringify(data_temp),
    Signature: signature.signature
  }));
  return yield request("LKLGW/Payment", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      CommandCode: "ADD_ORDER_KENO",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })
  });
}
function* addTrans(data) {
  let data_temp = {
    MobileNumber: data.MobileNumber,
    TransDetails: data.TransDetails,
    TransAmount: data.TransAmount,
    Fee: data.Fee,
    MerchantID: data.MerchantID,
    BankID: data.BankID,
    AccountNumber: data.AccountNumber,
    FullName: data.FullName,
    BranchName: data.BranchName,
    ChangeType: data.ChangeType
  };
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data_temp)));
  return yield request("LKLGW/Payment", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      CommandCode: "TRANS_PLAYER_WIN_ADD",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })

  });
}
function* orderSearch(data) {
  return yield request("Order/SearchOrder", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* ReportErrorOrder(data) {
  return yield request("Order/ReportErrorOrder", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* checkStatusOrder(data) {
  return yield request("Order/GetStatusByCode?OrderCode=" + data, {
    method: "GET",
    headers: API_HEADER
  });
}
function* GetOrderHistory(data) {
  return yield request(
    "Order/GetOrderHistory?mobileNumber=" +
    data.MobileNumber +
    "&merchantID=" +
    data.MerchantID +
    "&statusGroup=" +
    data.StatusGroup +
    "&pageIndex=" +
    data.PageIndex,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* AddReferral(data) {
  let data_temp = {
    MobileNumber: data.MobileNumber,
    TransDetails: data.TransDetails,
    TransAmount: data.TransAmount,
    Fee: data.Fee,
    MerchantID: data.MerchantID,
    BankID: data.BankID,
    AccountNumber: data.AccountNumber,
    FullName: data.FullName,
    BranchName: data.BranchName,
    WithdrawalType: data.WithdrawalType
  };
  console.log('data', data);
  let signature = JSON.parse(crypt.signature(KEY_PEM, JSON.stringify(data_temp)));
  return yield request("LKLGW/Payment", {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      CommandCode: "TRANS_PLAYER_REFERRAL",
      Time: "",
      Data: JSON.stringify(data_temp),
      Signature: signature.signature
    })
  });
}
export const payment = {
  orderAdd,
  orderSearch,
  addTrans,
  ReportErrorOrder,
  checkStatusOrder,
  GetOrderHistory,
  addOrderKeno,
  AddReferral
};
