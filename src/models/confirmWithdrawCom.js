import {payment} from '../services/payment';
export default {
    namespace: 'confirmWithdrawCom',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            yield put({ type: 'save',resAdd:""});
        },
        *add({ payload: data }, { call, put }) {
            const response = yield call(payment.addTrans, data);
            yield put({ type: 'save', resAdd: response });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/confirmWithdrawCom') {
                    dispatch({ type: 'fetch',payload: history.location.payload});
                }
            });
        },
    }
    
}