import Mega645Accept from '../../components/mega/Mega645Accept';
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
          routerRedux.push({
            pathname: "/mega645",
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

const Mega645AcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mega645Accept);

export default Mega645AcceptPage;