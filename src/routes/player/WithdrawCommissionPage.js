import WithdrawCommission from '../../components/player/WithdrawCommission';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        info: state.withdrawCommission.info,
        balance: state.withdrawCommission.balance,
        bank: state.withdrawCommission.bank,
        err: state.withdrawCommission.err,
        fee: state.withdrawCommission.fee
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFee: data => {
            dispatch({ type: "withdrawCommission/fee", payload: data });
          },
          onOK: data => {
            dispatch(
              routerRedux.replace({ pathname: "/confirmWithdrawCom", payload: { data } })
            );
          },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawCommission);