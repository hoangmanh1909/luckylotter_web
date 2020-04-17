import PaymentHistoryItem from "../../components/history/PaymentHistoryItem";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  // console.log(state)
  return {
    response: state.paymentHistoryItem.response,
    err: state.paymentHistory.err,
    ErrorOrder: state.paymentHistoryItem.ErrorOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCompareResult: data => {
      dispatch(
        routerRedux.replace({
          pathname: "./compare-result",
          payload: { data }
        })
      );
    },
    onPlaywin: data => {
      dispatch(
        routerRedux.replace({
          pathname: "./win"
        })
      );
    },
    onReport:(data) => {
        dispatch({ type: 'paymentHistoryItem/report', payload: data })
    }
  };
};

const PaymentHistoryItemPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentHistoryItem);

export default PaymentHistoryItemPage;
