import CommissionDetail from '../../components/login/CommissionDetail';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.commissionDetail.err,
        response: state.commissionDetail.response,
        balance: state.commissionDetail.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onComissionPayment: () => {
            dispatch(routerRedux.push({ pathname: "/commissionpayment" }));
        },
        onComissionMonth: () => {
            dispatch(routerRedux.push({ pathname: "/commissionmonth" }));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommissionDetail);