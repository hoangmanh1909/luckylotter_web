import CreatedPassword from "../../components/login/CreatedPassword";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    addPassword: state.login.addPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMain: () => {
      dispatch(routerRedux.replace({ pathname: "/main" }));
    },
    onPayment: () => {
      dispatch(routerRedux.replace({ pathname: "/payment" }));
    },
    onAddPassword: data => {
      dispatch({ type: "login/onAddPassword", payload: data });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatedPassword);
