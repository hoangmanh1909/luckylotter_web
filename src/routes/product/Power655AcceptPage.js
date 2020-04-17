import Power655Accept from '../../components/power/Power655Accept';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
const mapStateToProps = state => {
  return {
    fee: state.paymenttickets.fee,
    err: state.paymenttickets.err
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      onGoBack: data => {
        dispatch(
          routerRedux.push({
            pathname: "/mega645",
            payload: data
          })
        );
      },
      onGoBackPW: data => {
        dispatch(
          routerRedux.push({
            pathname: "/power655",
            payload: data
          })
        );
      },
      onPayment: (data, fee) => {
        dispatch(
          routerRedux.replace({
            pathname: "/paymenttickets",
            payload: data,
            fee: fee
          })
        );
      },
      onGetFee: data => {
        dispatch({ type: "paymenttickets/getFee", payload: data });
      }
    };
}

const Power655AcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Power655Accept);

export default Power655AcceptPage;