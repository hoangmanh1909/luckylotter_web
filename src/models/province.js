import { dictionary } from '../services/dictionary';

export default {
  namespace: 'province',
  state: [],
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(dictionary.getProvince);
      yield put({ type: 'save', payload: response });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/province') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

}