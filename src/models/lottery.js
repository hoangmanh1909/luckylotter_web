import { service } from "../services/service";
export default {
  namespace: "lottery",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
    //   const width = window.innerWidth - 24;
    //   const response = yield call(service.getDrawLottery123);
    //   // console.log('response',response);
    //   yield put({ type: "save", response: response });

    //   const tutorialXSDT123 = yield call(service.getTutorialXSDT123, width);
    //   // console.log('tutorialXSDT123',tutorialXSDT123);
    //   yield put({ type: "save", tutorialXSDT123: tutorialXSDT123 ,fee:"" });  
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/lottery" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
