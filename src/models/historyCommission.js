import { auService } from "../services/auService";
export default {
    namespace: 'historyCommission',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {
            const response = yield call(auService.getSearchReferral, localStorage.getItem("mobileNumber"));
            console.log('responser',response)
            yield put({ type: "save", response: response });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/historycommission') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}