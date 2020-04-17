import { service } from "../services/service";
export default {
    namespace: 'changeBank',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {

            const banklist = yield call(service.getBankList);
            yield put({ type: "save", banklist: banklist });  
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/changebank') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}