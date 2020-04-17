import Referral from '../../components/login/Referral';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        info: state.referral.info,
        err: state.referral.err,
        response: state.referral.response,
        balance: state.referral.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onComissionPayment: () => {
            dispatch(routerRedux.push({ pathname: "/commissionpayment"}));
        },
        onNumberReferral: () => {
            dispatch(routerRedux.push({ pathname: "/numberreferral" }));
        },
        onOrderReferral: () => {
            dispatch(routerRedux.push({ pathname: "/orderreferral" }));
        },
        onCommissionDetail: () => {
            dispatch(routerRedux.push({ pathname: "/commissiondetail" }));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Referral);