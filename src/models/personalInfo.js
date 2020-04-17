import { auService } from "../services/auService";
export default {
  namespace: "personalInfo",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const info = yield call(
        auService.getPlayerByMobile,
        localStorage.getItem("mobileNumber"),
        localStorage.getItem("merchant_id")
      );
      yield put({ type: "save", info: info });

      const balance = yield call(
        auService.getBalanceByMobileNumber,localStorage.getItem("mobileNumber"));
        console.log('banlace' , balance);
        
      yield put({ type: "save", balance: balance });
    },
    *addReferral({ payload: data }, { call, put }) {
      const response = yield call(auService.addReferral, data);
      console.log('response',response);
      yield put({ type: "save", response: response });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/info") {
          dispatch({ type: "fetch", payload: history.location.payload });
        }
      });
    }
  }
};
