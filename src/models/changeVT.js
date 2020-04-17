//import {playerWin} from '../services/playerWin';
import {payment} from '../services/payment';
import { service } from '../services/service';
export default {
    namespace: 'changeVT',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            // const data = {};
            // data.MerchantID = payload.data.MerchantID;
            // data.Amount = payload.data.TransAmount;
            // data.FeeType = payload.data.ChangeType;
            
            // console.log(data)
            // const fee = yield call(playerWin.getFee,data);
            yield put({ type: 'save',resAdd:""});
            const token = yield call(service.getToken);
            yield put({ type: "save", token: token }); 
            
        },
        *add({ payload: data }, { call, put }) {
            const response = yield call(payment.addTrans, data);
            yield put({ type: 'save', payload: response });            
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/viettel-ac') {
                    // console.log(history)
                    dispatch({ type: 'fetch',payload: history.location.payload});
                }
            });
        },
    }
    
}