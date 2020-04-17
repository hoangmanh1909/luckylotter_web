import PaymentBankDetail from '../../components/login/PaymentBankDetail';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.paymentBankDetail.err,
        response: state.paymentBankDetail.response,
        balance: state.paymentBankDetail.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOK: data => {
            dispatch({ type: "paymentBankDetail/add", payload: data });
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBankDetail);