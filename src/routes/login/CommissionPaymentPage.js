import CommissionPayment from '../../components/login/CommissionPayment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.commissionPayment.err,
        response: state.commissionPayment.response,
        balance: state.commissionPayment.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onHistoryCommission: (data) => {
            dispatch(routerRedux.push({ pathname: "/historycommission", payload :data }));
        },
        onPaymentBank: () => {
            dispatch(routerRedux.push({ pathname: "/paymentbank"}));
        },
        onPaymentLuckylotter: () => {
            dispatch(routerRedux.push({ pathname: "/paymentluckylotter" }));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommissionPayment);