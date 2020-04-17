import Max3DAccept from "../../components/max3d/Max3DAccept";
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
          pathname: "/max3d",
          payload: data
        })
      );
    },
    onPayment: (data,fee) => {
      dispatch(
        routerRedux.replace({
          pathname: "/payment",
          payload: data,
          fee : fee
        })
      );
    },
    onGetFee: data => {
      dispatch({ type: "payment/getFee", payload: data });
    }
  };
};

const Max3DAcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Max3DAccept);

export default Max3DAcceptPage;
