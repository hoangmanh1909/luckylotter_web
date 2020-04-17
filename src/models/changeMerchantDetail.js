import { auService } from "../services/auService";
import { payment } from "../services/payment";
export default {
    namespace: 'changeMerchantDetail',
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
        *add({ payload: data }, { call, put }) {
            const response = yield call(payment.addTrans, data);
            console.log('response', response);
            yield put({ type: "save", response: response, payload: "" });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/changemerchantdetail') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}