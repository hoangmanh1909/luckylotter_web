import { paymenttickets } from "../services/paymenttickets";
import { service } from "../services/service";
export default {
  namespace: "paymenttickets",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const player = yield call(
        service.getPlayerByMobile,
        localStorage.getItem("mobileNumber"),
        localStorage.getItem("merchant_id")
      );
      yield put({ type: "save", player: player, payload: "" });
    },
    *add({ payload: data }, { call, put }) {
      const response = yield call(paymenttickets.orderAdd, data);
      yield put({ type: "save", payload: response });
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(paymenttickets.getFee, data);
      yield put({ type: "save", fee: response });
    },
    *addKeno({ payload: data }, { call, put }) {
      const kenoResponse = yield call(paymenttickets.addOrderKeno, data);
      yield put({ type: "save", kenoResponse: kenoResponse });
    },
    *getReceiverMobile({ payload: data }, { call, put }) {
      const receiverplayer = yield call(service.getPlayerByMobile, data, localStorage.getItem("merchant_id"));
      yield put({ type: "save", receiverMobile: receiverplayer, payload: "" });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === "/paymenttickets") {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
