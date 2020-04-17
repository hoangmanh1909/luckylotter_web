import ConfirmWithdrawCom from "../../components/player/ConfirmWithdrawCom";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        resAdd: state.confirmWithdrawCom.resAdd,
        err:state.confirmWithdrawCom.err}
    // return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOK: (data) => {
            dispatch({ type: 'confirmWithdrawCom/add', payload: data })
        },
        onDone: () => {
            dispatch(routerRedux.replace({pathname : '/info'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmWithdrawCom);