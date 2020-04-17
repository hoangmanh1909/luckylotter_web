import { dictionary } from "../services/dictionary";
import { player } from "../services/player";
import { service } from "../services/service";
export default {
  namespace: "withdrawCommission",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      let mobileNumber = localStorage.getItem("mobileNumber");
      const info = yield call(
        service.getPlayerByMobile,
        mobileNumber,
        localStorage.getItem("merchant_id")
      );
      yield put({ type: "save", info: info, fee: "" });

      const balance = yield call(player.getTransRefBalance, mobileNumber);
      yield put({ type: "save", balance: balance });

      const bank = yield call(dictionary.getBank);
      yield put({ type: "save", bank: bank });
    },
    *fee({ payload: data }, { call, put }) {
      const value = {};
      value.MobileNumber = data.MobileNumber;
      value.MerchantID = data.MerchantID;
      value.Type = data.WithdrawalType;
      value.Amount = data.TransAmount;

      const fee = yield call(player.getFee, value);

      yield put({ type: "save", fee: fee });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/withdrawCommission") {
          dispatch({ type: "fetch", payload: history.location.payload });
        }
      });
    }
  }
};
