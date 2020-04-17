//import { login } from "../services/login";
//import { dictionary } from "../services/dictionary";
import { service } from '../services/service';

export default {
  namespace: "login",
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const terms = yield call(service.getReadTerms);
      yield put({
        type: "save",
        terms: terms,
        addOTP: "",
        registration: "",
        missPassword: "",
        verifyOTP: "",
        addPassword: ""
      });
    },
    *onLogin({ payload: data }, { call, put }) {
      const responseLogin = yield call(service.playerLogin, data);
      yield put({ type: "save", responseLogin: responseLogin });
    },
    *onAddOTP({ payload: data }, { call, put }) {
      const addOTP = yield call(service.addOTP, data);
      yield put({ type: "save", addOTP: addOTP, verifyOTP: "" });
    },
    *onRegistration({ payload: mobileNumber }, { call, put }) {
      const registration = yield call(service.registration, mobileNumber);
      yield put({ type: "save", registration: registration });
    },
    *onMissPassword({ payload: mobileNumber }, { call, put }) {
      const missPassword = yield call(service.missPassword, mobileNumber);
      yield put({ type: "save", missPassword: missPassword });
    },
    *onVerifyOTP({ payload: data }, { call, put }) {
      const verifyOTP = yield call(service.verifyOTP, data);
      yield put({ type: "save", verifyOTP: verifyOTP });
    },
    *onAddPassword({ payload: data }, { call, put }) {
      let request = {};
      request.MobileNumber = data.MobileNumber;
      request.ID = data.ID;
      request.Password = data.password;

      const addPassword = yield call(service.addPassword, data);
      yield put({ type: "save", addPassword: addPassword });
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/" && history.location.payload === undefined) {
          dispatch({ type: "fetch" });
        }
      });
    }
  }
};
