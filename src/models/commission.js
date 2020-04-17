import { player } from '../services/player';
import { service } from '../services/service';
export default {
    namespace: 'commission',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            let mobileNumber = localStorage.getItem("mobileNumber");
            let merchantId = localStorage.getItem("merchant_id")
            const balance = yield call(player.getTransRefBalance,
                mobileNumber);
            yield put({ type: 'save', balance: balance});
            const detail =  yield call(player.GetDetail,
                mobileNumber, merchantId);
            yield put({ type: 'save', detail: detail}); 

            const info = yield call(service.getPlayerByMobile,
                localStorage.getItem("mobileNumber"), localStorage.getItem("merchant_id"));
            yield put({ type: 'save', info: info });
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/commission') {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}