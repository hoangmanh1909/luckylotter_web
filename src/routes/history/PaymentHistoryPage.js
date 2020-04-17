import PaymentHistory from "../../components/history/PaymentHistory";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  // console.log(`state ${JSON.stringify(state)}`)
  return {
    dataError: state.paymentHistory.dataError,
    success: state.paymentHistory.success,
    pending: state.paymentHistory.pending,
    err: state.paymentHistory.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPending: productID => {
      dispatch({
        type: "paymentHistory/getDataPending",
        payload : productID
      });
    },
    onGetSuccess: data => {
      dispatch({
        type: "paymentHistory/getGetSuccess",
        payload: data
      });
    },
    onGetError: () => {
      dispatch({
        type: "paymentHistory/getGetError"
      });
    },
    onItem: data => {
      dispatch(
        routerRedux.push({
          pathname: "./payment-history-item",
          payload: { data }
        })
      );
    },
    onItemKeno: data => {
      dispatch(
        routerRedux.push({
          pathname: "./item-keno",
          payload: { data }
        })
      );
    }
  };
};

const PaymentHistoryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentHistory);

export default PaymentHistoryPage;
