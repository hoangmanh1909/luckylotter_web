//import { dictionary } from '../services/dictionary';
import { service } from '../services/service';
export default {
    namespace: 'max3dplus',
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
            yield put({ type: 'save', response: response,checkNumber : "" });

            const tutorialMax3DPlus = yield call(service.getTutorialMax3D, width);
            yield put({ type: "save", tutorialMax3DPlus: tutorialMax3DPlus ,fee:"" });  
        },
        *check({ payload: data }, { call, put }) {
            const checkNumber = yield call(service.checkOutOfNumber, data);
            yield put({ type: "save", checkNumber: checkNumber });
          }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/max3dplus' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}