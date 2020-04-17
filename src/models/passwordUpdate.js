import { auService } from "../services/auService";
export default {
    namespace: 'passwordUpdate',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // const info = yield call(service.getPlayerByMobile,
            //     localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            // yield put({ type: 'save', info: info });
        },
        *update({ payload: data }, { call, put }) {
            const updatePass = yield call(auService.updatePass, data);
            yield put({ type: "save", updatePass: updatePass });
        },
       
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/updatepassword') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}