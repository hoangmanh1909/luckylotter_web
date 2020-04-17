import ChangeBank from '../../components/changePay/ChangeBank';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.changeBank.err,
        banklist: state.changeBank.banklist
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeBankDetail: (data) => {
            dispatch(routerRedux.push({ pathname: "/changebankdetail", payload: data}));
        },
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBank);