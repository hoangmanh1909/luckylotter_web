import { service } from '../services/service';
export default {
    namespace: 'AddMoney',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const width = window.innerWidth - 24;
            // let mobileNumber = localStorage.getItem("mobileNumber");
            // const response = yield call(service.getByMobileNumber, mobileNumber);
            // yield put({ type: 'save', payload: response });

            // const balance = yield call(service.getBalanceByMobileNumber, mobileNumber);
            // yield put({ type: "save", balance: balance });

            const tutorialPayment = yield call(service.getTutorialPayment, width);
            yield put({ type: "save", tutorialPayment: tutorialPayment });
        },
        *fee({ payload: data }, { call, put }) {

        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/add-money' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    }

}