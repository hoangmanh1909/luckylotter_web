import ItemKeno from "../../components/history/ItemKeno";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    response: state.itemKenoHistory.response,
    err: state.itemKenoHistory.err,
    ErrorOrder: state.itemKenoHistory.ErrorOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCompareResult: data => {
      dispatch(
        routerRedux.push({
          pathname: "./compare-result",
          payload: { data }
        })
      );
    },
    onPlayerWin: data => {
      dispatch(
        routerRedux.replace({
          pathname: "./win"
        })
      );
    },
    getOrderItem: code => {
      dispatch({ type: "itemKenoHistory/getOrderItem", payload: code });
    },
    onReport: data => {
      dispatch({ type: "paymentHistoryItem/report", payload: data });
    }
  };
};

const ItemKenoPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemKeno);

export default ItemKenoPage;
