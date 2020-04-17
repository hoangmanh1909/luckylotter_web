//import { playerWin } from '../services/playerWin';
import { auService } from "../services/auService";
export default {
    namespace: 'compareResult',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(auService.getOrderItemWin, payload.data.ID);
            yield put({ type: 'save', payload: response });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/compare-result') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }

}