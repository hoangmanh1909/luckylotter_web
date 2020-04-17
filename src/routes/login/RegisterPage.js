import Register from "../../components/login/Register";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {  
  return {
    terms: state.login.terms,
    registration: state.login.registration,
    err:state.login.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegistration: mobileNumber => {
      dispatch({ type: "login/onRegistration", payload: mobileNumber });
    },
    onNext: data => {
      dispatch(
        routerRedux.replace({ pathname: "/register-accept", payload: data })
      );
    },
    onTerms: mes => {
      dispatch(
        routerRedux.push({
          pathname: "/terms",
          message: mes
        })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
