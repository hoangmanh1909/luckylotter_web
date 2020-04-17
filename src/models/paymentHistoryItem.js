//import { payment } from "../services/payment";
import { service } from '../services/service';
import { auService } from "../services/auService";
export default {
  namespace: "paymentHistoryItem",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // const response = yield call(payment.getOrderItemByCode, "19052200003");
      //payload.data.OrderCode
      const response = yield call(
        auService.getOrderItemByCode,
        payload.data.OrderCode
      );
      yield put({ type: "save", response: response, ErrorOrder: "" });
    },
    *report({ payload: data }, { call, put }) {
      const ErrorOrder = yield call(service.ReportErrorOrder, data);
      yield put({ type: "save", ErrorOrder: ErrorOrder });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/payment-history-item") {
          dispatch({ type: "fetch", payload: history.location.payload });
        }
      });
    }
  }
};
