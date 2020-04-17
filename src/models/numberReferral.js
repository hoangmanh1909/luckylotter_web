import { auService } from "../services/auService";
export default {
    namespace: 'numberReferral',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const response = yield call(auService.getNumberReferral, localStorage.getItem("mobileNumber"));
            yield put({ type: "save", response: response });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/numberreferral') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}