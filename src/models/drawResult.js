//import { dictionary } from '../services/dictionary';
import { service } from '../services/service';
export default {
  namespace: "drawResult",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log(payload);
    },
    *getResult({ payload }, { call, put }) {
      const max4d = yield call(service.getMax4dResult);
      yield put({ type: "save", max4d: max4d });

      const mega = yield call(service.getMegaResult);
      yield put({ type: "save", mega: mega });

      const power = yield call(service.getPwResult);
      yield put({ type: "save", power: power });

      const max3d = yield call(service.getMax3DResult);
      yield put({ type: "save", max3d: max3d });

      const lottery123 = yield call(service.getLottery123Result);
      yield put({ type: "save", lottery123: lottery123 });

      const keno = yield call(service.getKenoResult);
      yield put({ type: "save", keno: keno });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/draw-result") {
          dispatch({ type: "fetch", payload: history.location.payload });
        }
      });
    },
  },
};