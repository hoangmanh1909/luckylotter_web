import { service } from "../services/service";
export default {
    namespace: 'paymentBank',
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

            const banklist = yield call(service.getBankList);
            yield put({ type: "save", banklist: banklist });  
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/paymentbank') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}