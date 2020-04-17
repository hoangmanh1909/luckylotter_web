//import { payment } from "../services/payment";
import { auService } from "../services/auService";

export default {
  namespace: "paymentHistory",
  state: [],
  reducers: {
    save(state, action) {
      // console.log(action)
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload: data }, { call, put }) {
      // data = {};
      // data.MobileNumber = localStorage.getItem("mobileNumber");
      // data.MerchantID = localStorage.getItem("merchant_id");
      // const response = yield call(payment.orderSearch,data);
      // yield put({ type: 'save', payload: response });
    },
    *getDataPending({ payload: productID }, { call, put }) {
      let data = {};
      data.Status = "P";
      data.ProductID = productID;
      data.MobileNumber = localStorage.getItem("mobileNumber");
      data.MerchantID = localStorage.getItem("merchant_id");
      const pending = yield call(auService.GetOrderPendingError, data);
      yield put({ type: "save", pending: pending, success: "", dataError: "" });
    },
    *getGetSuccess({ payload: value }, { call, put }) {
      let data = {};
      data.TabIndex = value.TabIndex;
      data.PageIndex = value.PageIndex;
      data.MobileNumber = localStorage.getItem("mobileNumber");
      data.MerchantID = localStorage.getItem("merchant_id");
      const success = yield call(auService.GetOrderSuccess, data);
      yield put({ type: "save", success: success, pending: "", dataError: "" });
    },
    *getGetError({ payload: pageIndex }, { call, put }) {
      let data = {};
      data.Status = "E";
      data.ProductID = 0;
      data.MobileNumber = localStorage.getItem("mobileNumber");
      data.MerchantID = localStorage.getItem("merchant_id");
      const dataError = yield call(auService.GetOrderPendingError, data);
      yield put({
        type: "save",
        dataError: dataError,
        pending: "",
        success: ""
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/paymenthistory") {
          dispatch({ type: "fetch", payload: query });
        }
      });
    }
  }
};
