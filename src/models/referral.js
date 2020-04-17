import { auService } from "../services/auService";
export default {
    namespace: 'referral',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const info = yield call(auService.getPlayerByMobile,
                localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            yield put({ type: 'save', info: info });

            const balance = yield call(auService.getBalanceByMobileNumber,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', balance: balance });

            const response = yield call(auService.getCommission, localStorage.getItem("mobileNumber"));
            yield put({ type: "save", response: response });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/referral') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}