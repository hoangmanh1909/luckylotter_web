import ChangeMerchant from '../../components/changePay/ChangeMerchant';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changeMerchant.err,
        listmerchant: state.changeMerchant.listmerchant
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeMerchantDetail: (data) => {
            dispatch(routerRedux.push({ pathname: "/changemerchantdetail", payload: data}));
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMerchant);