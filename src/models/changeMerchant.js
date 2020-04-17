import { service } from "../services/service";
export default {
    namespace: 'changeMerchant',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload: data }, { call, put }) {

            const listmerchant = yield call(service.getListMerchant);
            console.log(listmerchant);
            
            yield put({ type: "save", listmerchant: listmerchant });  
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/changemerchant') {
                    dispatch({ type: 'fetch', payload: history.location.payload });
                }
            });
        },
    }
}