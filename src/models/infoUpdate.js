import {service} from '../services/service';
import { auService } from "../services/auService";
export default {
    namespace: 'infoUpdate',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const info = yield call(auService.getPlayerByMobile,
            localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            yield put({ type: 'save', info: info, updateInf: "" });
        },
        *update({ payload: data }, { call, put }) {
            const updateInf = yield call(service.updateInfo, data);
            yield put({ type: "save", updateInf: updateInf });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/updateinfo') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}