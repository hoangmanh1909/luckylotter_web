import { service } from '../services/service';
export default {
    namespace: 'max4d',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const width = window.innerWidth - 24;
            const response = yield call(service.getDrawMax4d);
            yield put({ type: 'save', response: response, checkNumber: "" });

            const tutorialMax4D = yield call(service.getTutorialMax4D, width);
            console.log('tutorialMax4D',tutorialMax4D);
            yield put({ type: "save", tutorialMax4D: tutorialMax4D}); 
        },
        *check({ payload: data }, { call, put }) {
            const checkNumber = yield call(service.checkOutOfNumberMax4D, data);
            yield put({ type: "save", checkNumber: checkNumber });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/max4d' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch' });
                }
            });
        },
    }

}