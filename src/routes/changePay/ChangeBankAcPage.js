import ChangeBankAccept from '../../components/changePay/ChangeBankAccept';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(state);
    return { 
        resAdd: state.changeBankAc.resAdd,
        err:state.changeBankAc.err
    }
    // return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOK: (data) => {
            dispatch({ type: 'changeBankAc/add', payload: data })
        },
        onWin: () => {
            dispatch(routerRedux.push({pathname : '/win'}))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBankAccept);