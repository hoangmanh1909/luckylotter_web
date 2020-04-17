import Lottery123Accept from "../../components/xsdt123/Lottery123Accept";
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
          pathname: "/lottery-123",
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lottery123Accept);
