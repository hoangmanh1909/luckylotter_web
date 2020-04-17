import Payment from '../components/Payment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
  return {
    response: state.payment.payload,
    checkStatusOrder: state.payment.checkStatusOrder,
    player: state.payment.player,
    kenoResponse: state.payment.kenoResponse,
    terms: state.payment.terms,
    token: state.payment.token,
    err: state.paymentHistory.err
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPayment: data => {
      dispatch({ type: "payment/add", payload: data });
    },
    onGetDistrict: provinceID => {
      dispatch({ type: "payment/getDistrict", payload: provinceID });
    },
    onGetWard: districtID => {
      dispatch({ type: "payment/getWard", payload: districtID });
    },
    onGetFee: data => {
      dispatch({ type: "payment/getFee", payload: data });
    },
    onPayResult: data => {
      dispatch(
        routerRedux.replace({ pathname: "/PaymentResult", payload: data })
      );
    },
    onCheckStatus: orderCode => {
      dispatch({ type: "payment/checkStatusOrder", payload: orderCode });
    },
    onPaymentKeno: data => {
      dispatch({ type: "payment/addKeno", payload: data });
    },
    onTerms: mes => {
      dispatch(
        routerRedux.push({
          pathname: "/terms",
          message: mes
        })
      );
    },
    onLogin: mode => {
      dispatch(
        routerRedux.push({
          pathname: "/login",
          payload: mode
        })
      );
    },
    onGoBack: data => {
      dispatch(
        routerRedux.replace({
          pathname: "/keno",
          payload: data
        })
      );
    },
    onPaymentHistory: () => {
      dispatch(routerRedux.replace({ pathname: "/paymenthistory" }));
    }
  };
}

const PaymentPage = connect(mapStateToProps, mapDispatchToProps)(Payment)

export default PaymentPage;