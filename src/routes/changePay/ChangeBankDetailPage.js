import ChangeBankDetail from '../../components/changePay/ChangeBankDetail';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changeBankDetail.err,
        response: state.changeBankDetail.response,
        balance: state.changeBankDetail.balance
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOK: data => {
            dispatch({ type: "changeBankDetail/add", payload: data });
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBankDetail);