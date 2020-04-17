import { auService } from "../services/auService";
import { payment } from "../services/payment";
export default {
    namespace: 'paymentLuckylotter',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            // const response = yield call(auService.getNumberReferral, localStorage.getItem("mobileNumber"));
            // yield put({ type: "save", response: response });

            const balance = yield call(auService.getBalanceByMobileNumber,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', balance: balance });
        },
        *add({ payload: data }, { call, put }) {
            const response = yield call(payment.AddReferral, data);
            console.log('response',response);
            yield put({ type: "save", response: response, payload: "" });  
          },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/paymentluckylotter') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}