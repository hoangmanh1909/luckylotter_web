import RegisterAccept from "../../components/login/RegisterAccept";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    verifyOTP: state.login.verifyOTP,
    addOTP: state.login.addOTP,
    err:state.login.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyOTP: data => {
      dispatch({ type: "login/onVerifyOTP", payload: data });
    },
    onAddOTP: data => {
      dispatch({ type: "login/onAddOTP", payload: data });
    },
    onNext: data => {
      dispatch(
        routerRedux.replace({ pathname: "/created-password", payload: data })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterAccept);
