import ChangeLuckylotter from '../../components/changePay/ChangeLuckylotter';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changeLuckylotter.err,
        response: state.changeLuckylotter.response,
        balance: state.changeLuckylotter.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOK: data => {
            dispatch({ type: "changeLuckylotter/add", payload: data });
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './' }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLuckylotter);