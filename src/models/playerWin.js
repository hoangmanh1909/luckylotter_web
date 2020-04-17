//import { playerWin } from '../services/playerWin';
import { auService } from "../services/auService";
import { service } from '../services/service';
export default {
    namespace: 'playerWin',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            let mobileNumber = localStorage.getItem("mobileNumber");
            const response = yield call(auService.getByMobileNumber, mobileNumber);
            console.log('response',response);
            yield put({ type: 'save', payload: response });

            const paymentRules = yield call(service.getReadRules);
            yield put({ type: 'save', paymentRules: paymentRules });

        },
        *fee({ payload: data }, { call, put }) {
            const value = {};
            value.MerchantID = 1;
            value.Amount = data.TransAmount;
            value.FeeType = data.ChangeType;

            const fee = yield call(service.getFeeReward, value);
            yield put({ type: "save", fee: fee });
            
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/win') {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}