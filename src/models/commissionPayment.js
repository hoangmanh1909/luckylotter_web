import { auService } from "../services/auService";
export default {
    namespace: 'commissionPayment',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const response = yield call(auService.getCommission, localStorage.getItem("mobileNumber"));
            yield put({ type: "save", response: response });

            const balance = yield call(auService.getBalanceByMobileNumber,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', balance: balance });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/commissionpayment') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}