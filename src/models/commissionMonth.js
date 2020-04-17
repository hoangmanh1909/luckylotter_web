import { auService } from "../services/auService";
export default {
    namespace: 'commissionMonth',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const response = yield call(auService.getOrderReferral, localStorage.getItem("mobileNumber"));
            console.log('response',response);
            
            yield put({ type: "save", response: response });
            
            // const balance = yield call(auService.getBalanceByMobileNumber,
            //     localStorage.getItem("mobileNumber"));
            // yield put({ type: 'save', balance: balance });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/commissionmonth') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}