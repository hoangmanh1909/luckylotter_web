import Main from "../components/Main";
import { connect } from "dva";
import { routerRedux } from "dva/router";
const mapStateToProps = state => {
  // console.log(state)
  return {
    response: state.main.payload,
    products: state.main.products,
    balance: state.main.balance,
    balanceWin: state.main.balanceWin,
    checkAddOrder: state.main.checkAddOrder,
    Terms: state.login.terms,
    Noti: state.main.Noti,
    drawCodeKeno: state.main.drawCodeKeno,
    //checkProductPilot: state.main.checkProductPilot,
    nextPeriod: state.main.nextPeriod,
    max4d: state.drawResult.max4d,
    mega: state.drawResult.mega,
    power: state.drawResult.power,
    max3d: state.drawResult.max3d,
    keno: state.drawResult.keno,
    lottery123: state.drawResult.lottery123,
    //history
    dataError: state.paymentHistory.dataError,
    success: state.paymentHistory.success,
    pending: state.paymentHistory.pending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onKeno: () => {
      dispatch(routerRedux.push({ pathname: "/keno" }));
    },
    onLottery: () => {
      dispatch(routerRedux.push({ pathname: "/lottery" }));
    },
    onMax4D: () => {
      dispatch(routerRedux.push({ pathname: "/max4d" }));
    },
    onMax3D: () => {
      dispatch(routerRedux.push({ pathname: "/max3d" }));
    },
    onMax3DPlus: () => {
      dispatch(routerRedux.push({ pathname: "/max3dplus" }));
    },
    onCheckAddOrder: (productID) => {
      dispatch({ type: "main/checkAddOrder", payload: productID });
    },
    onMega645: () => {
      dispatch(routerRedux.push({ pathname: "/mega645" }));
    },
    onPower655: () => {
      dispatch(routerRedux.push({ pathname: "/power655" }));
    },
    onHistory: () => {
      dispatch(routerRedux.push({ pathname: "/paymenthistory" }));
    },
    onWin: () => {
      dispatch(routerRedux.push({ pathname: "/win" }));
    },
    onDrawResult: () => {
      dispatch(routerRedux.push({ pathname: "/draw-result" }));
    },
    onLogin: (mode) => {
      dispatch(routerRedux.push({ pathname: "/login", payload: mode }));
    },
    onNextPeriod: (period) => {
      dispatch({ type: "main/nextPeriod", payload: period });
    },
    onPersonalInfo: () => {
      dispatch(routerRedux.push({ pathname: "/info" }));
    },
    onTerms: (mes) => {
      dispatch(
        routerRedux.push({
          pathname: "/terms",
          message: mes,
        })
      );
    },
    onGetResult: () => {
      dispatch({ type: "drawResult/getResult", payload: "" });
    },
    onGetPending: (productID) => {
      dispatch({
        type: "paymentHistory/getDataPending",
        payload: productID,
      });
    },
    onGetSuccess: (data) => {
      dispatch({
        type: "paymentHistory/getGetSuccess",
        payload: data,
      });
    },
    onGetError: () => {
      dispatch({
        type: "paymentHistory/getGetError",
      });
    },
    onItem: (data) => {
      dispatch(
        routerRedux.push({
          pathname: "./payment-history-item",
          payload: { data },
        })
      );
    },
    onItemKeno: (data) => {
      dispatch(
        routerRedux.push({
          pathname: "./item-keno",
          payload: { data },
        })
      );
    },
    onAddTokenNotify: (data) => {
      dispatch({
        type: "main/addTokenNotify",
        payload: data,
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
