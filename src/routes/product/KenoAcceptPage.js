import KenoAccept from '../../components/keno/KenoAccept';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const mapStateToProps = state => {
  return {
    fee: state.payment.fee,
    err: state.payment.err
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      onGoBack: data => {
        dispatch(
          routerRedux.replace({
            pathname: "/keno",
            payload: data
          })
        );
      },
     
      onPayment: (data, fee) => {
        dispatch(
          routerRedux.replace({
            pathname: "/payment",
            payload: data,
            fee: fee
          })
        );
      },
      onGetFee: data => {
        dispatch({ type: "payment/getFee", payload: data });
      }
    };
}

const KenoAcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(KenoAccept);

export default KenoAcceptPage;