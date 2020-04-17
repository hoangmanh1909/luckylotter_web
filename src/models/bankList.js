import { service } from '../services/service';
export default {
    namespace: 'BankList',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const banklist = yield call(service.getBankList);
            yield put({ type: "save", banklist: banklist, resAdd: "" });            
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/bank-list') {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    }

}