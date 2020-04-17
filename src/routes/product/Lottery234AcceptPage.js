import Lottery234Accept from "../../components/xsdt234/Lottery234Accept";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    fee: state.payment.fee,
    err: state.payment.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
     onGoBack: data => {
        dispatch(
          routerRedux.replace({
            pathname: "/lottery-234",
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
    }
};
const Lottery234AcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lottery234Accept);
export default Lottery234AcceptPage;
