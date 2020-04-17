import {lottery} from '../services/lottery'
export default {
  namespace: "lottery235",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const width = window.innerWidth - 24;
      // console.log("aaa",this.state);

      const drawCodeLottery235 = yield call(lottery.getLottery235Draw);
      yield put({ type: "save", drawCodeLottery235: drawCodeLottery235, fee:""});
    //  console.log("aaa",response);

      const tutorialLottery235 = yield call(lottery.getTutorialLottery235, width);
      yield put({ type: "save", tutorialLottery235: tutorialLottery235, fee:"" });
      
    },
    *getDrawCode({}, { call, put }) {
      const drawCodeLottery235 = yield call(lottery.getLottery235Draw);
      yield put({ type: "save", drawCodeLottery235: drawCodeLottery235 ,fee:""});
    },
    *getFee({ payload: data }, { call, put }) {
      const response = yield call(lottery.getFee, data);
      yield put({ type: "save", fee: response });
    }
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/lottery-235" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};