import ChangeMerchantDetail from '../../components/changePay/ChangeMerchantDetail';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changeMerchantDetail.err,
        response: state.changeMerchantDetail.response,
        balance: state.changeMerchantDetail.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOK: data => {
            dispatch({ type: "changeMerchantDetail/add", payload: data });
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMerchantDetail);