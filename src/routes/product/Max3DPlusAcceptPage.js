import Max3DPlusAccept from '../../components/max3dplus/Max3DPlusAccept';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = state => {
  return {
    fee: state.payment.fee,
    err: state.payment.err
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onGoBack: data => {
        dispatch(
          routerRedux.replace({
            pathname: "/max3dplus",
            payload: data
          })
        );
      },
      onPayment: (data,fee) => {
        dispatch(
          routerRedux.replace({
            pathname: "/payment",
            payload: data,
            fee:fee
          })
        );
      },
      onGetFee: data => {
        dispatch({ type: "payment/getFee", payload: data });
      }
    };
}

const Max3DPlusAcceptPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Max3DPlusAccept);

export default Max3DPlusAcceptPage;