import Keno from "../../components/keno/Keno";
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
      // err:state.keno.err
      drawCodeKeno: state.keno.drawCodeKeno,
      tutorialKeno: state.keno.tutorialKeno,
      fee: state.keno.fee,
      err: state.payment.err
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      onAccept: data => {
        dispatch(routerRedux.push({ pathname: "/kenoaccept", payload: data }));
      },
      onBack: () => {
        dispatch(routerRedux.goBack());
      },
      onGetDrawCode: () => {
        dispatch({ type: "keno/getDrawCode" });
      },
      onTutorial: message => {
        dispatch(
          routerRedux.push({ pathname: "/keno-tutorial", message: message })
        );
      },
      onPayment: (data, fee) => {
        dispatch(
          routerRedux.replace({
            pathname: "/payment",
            payload: data,
            fee: fee
          })
        );
      },
      onGetFee: data => {
        dispatch({ type: "keno/getFee", payload: data });
      }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Keno);