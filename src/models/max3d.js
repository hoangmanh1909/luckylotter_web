//import { dictionary } from '../services/dictionary';
import { service } from '../services/service';
export default {
    namespace: 'max3d',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const width = window.innerWidth - 24;
            const response = yield call(service.getDrawMax3D);
            yield put({ type: 'save', response: response, checkNumber : "" });

            const tutorialMax3D = yield call(service.getTutorialMax3D, width);
            console.log('tutorialMax3D',tutorialMax3D);
            yield put({ type: "save", tutorialMax3D: tutorialMax3D ,fee:"" });  
        },
        *check({ payload: data }, { call, put }) {
            const checkNumber = yield call(service.checkOutOfNumber, data);
            yield put({ type: "save", checkNumber: checkNumber });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/max3d' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}