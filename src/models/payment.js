import { payment } from "../services/payment";
import { service } from '../services/service';
import { auService } from "../services/auService";

export default {
  namespace: "payment",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      if (localStorage.getItem("mobileNumber") != null) {
        const player = yield call(
          auService.getPlayerByMobile,
          localStorage.getItem("mobileNumber"),
          localStorage.getItem("merchant_id")
        );
        yield put({
          type: "save",
          player: player,
          payload: "",
          checkStatusOrder: ""
        });
      }  
      const terms = yield call(service.getReadTerms);
      yield put({ type: "save", terms: terms }); 
      
      // const token = yield call(service.getToken);
      // yield put({ type: "save", token: token }); 
      
    },
    *add({ payload: data }, { call, put }) {
      const response = yield call(payment.orderAdd, data);
      yield put({ type: "save", payload: response });  
    },
    *checkStatusOrder({ payload: orderCode }, { call, put }) {
      const checkStatusOrder = yield call(payment.checkStatusOrder, orderCode);
      yield put({
        type: "save",
        checkStatusOrder: checkStatusOrder,
        payload: ""
      });
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(service.getFee, data);
      yield put({ type: "save", fee: response });
    },
    *addKeno({ payload: data }, { call, put }) {
      const kenoResponse = yield call(payment.addOrderKeno, data);
      console.log('kenoResponse',kenoResponse);
      yield put({ type: "save", kenoResponse: kenoResponse });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/payment") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
