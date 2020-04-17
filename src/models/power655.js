import { service } from '../services/service';
export default {
    namespace: 'power655',
    state: [],
    reducers: {
        save(state, action) {
            return { ...state, ...action };
        }
    },
    effects: {
        *fetch({payload},{ call, put }) {
            const width = window.innerWidth - 24;
            const response = yield call(service.getDrawPower);
            console.log('response',response)
            yield put({ type: 'save', response: response});

            const tutorialPower = yield call(service.getTutorialPower, width);
            yield put({ type: "save", tutorialPower: tutorialPower}); 
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/power655' && history.location.payload === undefined) {
                    dispatch({ type: 'fetch'});
                }
            });
        },
    }
}