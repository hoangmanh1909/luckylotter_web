import ChangeViettelPay from "../../components/changePay/ChangeViettelPay";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
  return {
    fee: state.playerWin.fee,
    response: state.playerWin.data,
    err: state.playerWin.err
  }
  // return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOK: data => {
    console.log('a',data);
    
      dispatch(
        routerRedux.replace({ pathname: "/viettel-ac", payload: { data } })
      );
    },
    onFee: data => {
      dispatch({ type: "playerWin/fee", payload: data });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeViettelPay);