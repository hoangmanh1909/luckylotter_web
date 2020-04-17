import { service } from '../services/service';
export default {
  namespace: "keno",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const width = window.innerWidth - 24;
      const drawCodeKeno = yield call(service.getDrawPeriod);
      yield put({ type: "save", drawCodeKeno: drawCodeKeno ,fee:"" });
      
      const tutorialKeno = yield call(service.getTutorial, width);
      yield put({ type: "save", tutorialKeno: tutorialKeno ,fee:"" });      
    },
    *getDrawCode({}, { call, put }) {
      const drawCodeKeno = yield call(service.getDrawPeriod);
      yield put({ type: "save", drawCodeKeno: drawCodeKeno ,fee:""});
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(service.getFee, data);
      yield put({ type: "save", fee: response });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/keno" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};