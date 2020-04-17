import MissPassword from "../../components/login/MissPassword";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    missPassword: state.login.missPassword,
    err: state.login.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMissPassword: mobileNumber => {
      dispatch({ type: "login/onMissPassword", payload: mobileNumber });
    },
    onNext: data => {
      dispatch(
        routerRedux.replace({ pathname: "/register-accept", payload: data })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MissPassword);
