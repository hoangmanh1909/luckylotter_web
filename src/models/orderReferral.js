import { auService } from "../services/auService";
export default {
    namespace: 'orderReferral',
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
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/orderreferral') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}