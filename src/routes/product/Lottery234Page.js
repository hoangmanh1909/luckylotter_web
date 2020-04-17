import Lottery234 from "../../components/xsdt234/Lottery234";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  //console.log('state',state);
  return {
    drawCodeLottery234: state.lottery.drawCodeLottery234,
    err: state.lottery.err,
    fee: state.lottery.fee,
    tutorialLottery234: state.lottery.tutorialLottery234
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAccept: data => {      
      dispatch(routerRedux.push({ pathname: "/lottery-234-ac", payload: data }));
    },
    onBack: () => {
      dispatch(routerRedux.goBack());
    },
    onGetDrawCode: () => {
      dispatch({ type: "lottery/getDrawCode" });
    },
    onTutorial: message => {
      dispatch(
        routerRedux.push({ pathname: "/lottery-234-tutorial", message: message })
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
      dispatch({ type: "lottery/getFee", payload: data });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Lottery234);