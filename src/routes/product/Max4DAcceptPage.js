import Max4DAccept from '../../components/max4d/Max4DAccept';
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
            pathname: "/max4d",
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

const Max4DAcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Max4DAccept);

export default Max4DAcceptPage;