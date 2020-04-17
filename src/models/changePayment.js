import { auService } from "../services/auService";
export default {
    namespace: 'changePayment',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const balance = yield call(auService.getBalanceByMobileNumber,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', balance: balance });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/changepayment') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}