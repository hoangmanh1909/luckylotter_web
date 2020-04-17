import request from '../utils/request';
import { API_HEADER, KEY_PEM } from '../config';
import { Crypt } from "hybrid-crypto-js";
let crypt = new Crypt();
let date = new Date();
let now = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();


function* getProvince() {
    return yield request('api/Province/GetAll', {
        method: 'GET',
        headers: API_HEADER
    })
}
function* getDistrictByProvinceID(provinceID) {
    return yield request('api/District/GetByProvinceID?ProvinceID=' + provinceID, {
        method: 'GET',
        headers: API_HEADER
    })
}
function* getWardByDistrictID(districtID) {
    return yield request('api/Ward/GetWardByDistrictID?DistrictId=' + districtID, {
        method: 'GET',
        headers: API_HEADER
    })
}


function* getProduct() {
    return yield request('api/product/GetAll', {
        method: 'GET',
        headers: API_HEADER
    })
}

//Winner notification
function* WinnerNoification(MobileNumber) {
    return yield request("api/Notification/WebviewWinner?MobileNumber=" + MobileNumber, {
        method: 'GET',
        headers: API_HEADER
    });
}



export const dictionary = {
    getProvince,
    getDistrictByProvinceID,
    getWardByDistrictID,
    getProduct,
    WinnerNoification
};