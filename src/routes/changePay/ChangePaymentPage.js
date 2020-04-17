import ChangePayment from '../../components/changePay/ChangePayment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changePayment.err,
        response: state.changePayment.response,
        balance: state.changePayment.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onHistoryCommission: (data) => {
            dispatch(routerRedux.push({ pathname: "/historycommission", payload :data }));
        },
        onChangeLuckylotter: () => {
            dispatch(routerRedux.push({ pathname: "/changeluckylotter"}));
        },
        onChangeMerchant: () => {
            dispatch(routerRedux.push({ pathname: "/changemerchant" }));
        },
        onChangeBank: () => {
            dispatch(routerRedux.push({ pathname: "/changebank" }));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePayment);