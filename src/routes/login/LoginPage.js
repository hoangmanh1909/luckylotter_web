import Login from "../../components/login/Login";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    terms: state.login.terms,
    responseLogin: state.login.responseLogin,
    err: state.login.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMain: () => {
      dispatch(routerRedux.replace({ pathname: "/" }));
    },
    onPayment: () => {
      dispatch(routerRedux.replace({ pathname: "/payment" }));
    },
    onRegistration: mode => {
      dispatch(routerRedux.push({ pathname: "/register", payload: mode }));
    },
    onMissPassword: mode => {
      dispatch(routerRedux.push({ pathname: "/miss-password", payload: mode }));
    },
    onLogin: data => {
      dispatch({ type: "login/onLogin", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
