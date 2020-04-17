import {player} from '../services/player';
import {dictionary} from '../services/dictionary';
export default {
    namespace: 'commissionManager',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const commissionList = yield call(player.getCommissionList,
                localStorage.getItem("mobileNumber"));
            yield put({ type: 'save', commissionList: commissionList});

        }

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/commissionManager') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}