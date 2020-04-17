import MainV1 from "../components/MainV1";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    max4d: state.drawResult.max4d,
    mega: state.drawResult.mega,
    power: state.drawResult.power,
    max3d: state.drawResult.max3d,
    keno: state.drawResult.keno,
    lottery123: state.drawResult.lottery123,
    err: state.drawResult.err,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetResult: () => {
      dispatch({ type: "drawResult/getResult", payload: "" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainV1);
