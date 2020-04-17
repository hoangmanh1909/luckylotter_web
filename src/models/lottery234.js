import {lottery} from '../services/lottery'
import {keno} from '../services/keno'
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
      const width = window.innerWidth - 24;
      
      const drawCodeLottery234 = yield call(lottery.getLottery234Draw);
      yield put({ type: "save", drawCodeLottery234: drawCodeLottery234 ,fee:"" });

      const tutorialLottery234 = yield call(lottery.getTutorialLottery234, width);
      yield put({ type: "save", tutorialLottery234: tutorialLottery234, fee:"" });
     // console.log("aaa",tutorialLottery234);
    },
    *getDrawCode({}, { call, put }) {
      const drawCodeLottery234 = yield call(lottery.getLottery234Draw);
      yield put({ type: "save", drawCodeLottery234: drawCodeLottery234 ,fee:""});
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(lottery.getFee, data);
      yield put({ type: "save", fee: response });
    }
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/lottery-234" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};