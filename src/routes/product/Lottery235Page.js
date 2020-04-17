import Lottery235 from "../../components/xsdt235/Lottery235";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    drawCodeLottery235: state.lottery235.drawCodeLottery235,
    err: state.lottery235.err,
    fee: state.lottery235.fee,
    tutorialLottery235: state.lottery235.tutorialLottery235
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAccept: data => {
      dispatch(
        routerRedux.push({ pathname: "/lottery-235-ac", payload: data })
       // routerRedux.push({ pathname: "/payment", payload: data })
      );
    },
    onTutorial: message => {
      dispatch(
        routerRedux.push({ pathname: "/lottery-235-tutorial", message: message })
      );
    },
    onGetDrawCode: () => {
      dispatch({ type: "lottery/getDrawCode" });
    },
    onBack: () => {
      dispatch(routerRedux.goBack());
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
      dispatch({ type: "lottery235/getFee", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lottery235);
