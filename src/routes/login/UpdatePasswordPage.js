import UpdatePassword from '../../components/login/UpdatePassword';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {    
    return { 
        // info: state.passwordUpdate.info,
        err:state.passwordUpdate.err,
        updatePass: state.passwordUpdate.updatePass
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePassword: (data) => {
            dispatch({ type: 'passwordUpdate/update', payload: data })
        },
        onBack: () => {
            dispatch(routerRedux.goBack());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);