import PaymentBank from '../../components/login/PaymentBank';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.paymentBank.err,
        banklist: state.paymentBank.banklist
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onHistoryCommission: (data) => {
            dispatch(routerRedux.push({ pathname: "/historycommission", payload :data }));
        },
        onPaymentBankDetail: (data) => {
            dispatch(routerRedux.push({ pathname: "/paymentbankdetail", payload: data}));
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBank);