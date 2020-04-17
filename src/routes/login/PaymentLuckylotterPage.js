import PaymentLuckylotter from '../../components/login/PaymentLuckylotter';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.paymentLuckylotter.err,
        response: state.paymentLuckylotter.response,
        balance: state.paymentLuckylotter.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOK: data => {
            dispatch({ type: "paymentLuckylotter/add", payload: data });
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './' }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentLuckylotter);