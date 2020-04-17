import Lottery123 from "../../components/xsdt123/Lottery123";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    response: state.lottery123.response,
    err: state.lottery123.err,
    tutorialXSDT123: state.lottery123.tutorialXSDT123
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAccept: (data) => {
      console.log('data', data);
      dispatch(routerRedux.push({ pathname: "/lottery-123-ac", payload: data }))
    },
    onBack: () => {
      dispatch(routerRedux.goBack());
    },
    onTutorial: message => {
      console.log('message', message);
      dispatch(
        routerRedux.push({ pathname: "/lottery-tutorial", message: message })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lottery123);
