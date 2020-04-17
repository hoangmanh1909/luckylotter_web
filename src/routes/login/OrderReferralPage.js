import OrderReferral from '../../components/login/OrderReferral';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.orderReferral.err,
        response: state.orderReferral.response
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderReferral);