//import { dictionary } from '../services/dictionary';
import { service } from '../services/service';
export default {
    namespace: 'mega645',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const width = window.innerWidth - 24;
            const response = yield call(service.getDrawMega645);
            yield put({ type: 'save', response: response });

            const tutorialMega = yield call(service.getTutorialMega, width);
            console.log('tutorialMega',tutorialMega)
            yield put({ type: "save", tutorialMega: tutorialMega}); 
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/mega645' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
    
}