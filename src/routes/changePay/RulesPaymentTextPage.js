import RulesPaymentText from "../../components/changePay/RulesPaymentText";
import { connect } from "dva";
import { routerRedux } from 'dva/router';

const mapDispatchToProps = (dispatch) => {
    return {
        onViettel: (balance) => {
            dispatch(routerRedux.replace({ pathname: '/viettel', balance: balance }))
        }
    };
}

const RulesPaymentTextPage = connect(null,mapDispatchToProps)(RulesPaymentText);

export default RulesPaymentTextPage;
