import CommissionMonth from '../../components/login/CommissionMonth';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.commissionMonth.err,
        response: state.commissionMonth.response,
        balance: state.commissionMonth.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommissionMonth);