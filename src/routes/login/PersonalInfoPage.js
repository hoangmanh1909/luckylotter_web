import PersonalInfo from "../../components/login/PersonalInfo";
import { connect } from "dva";
import { routerRedux } from "dva/router";

const mapStateToProps = state => {
  return {
    // balance: state.personalInfo.balance,
    response:state.personalInfo.response,
    err: state.personalInfo.err,
    info: state.personalInfo.info,
    balance: state.personalInfo.balance
    
  };
};

const mapDispatchToProps = dispatch => {
  //addReferral;
  return {
    onMain: () => {
      dispatch(routerRedux.replace({ pathname: "./" }));
    },
    onAddReferral: data => {
      dispatch({ type: "personalInfo/addReferral", payload: data });
    },
    onUpdateInfo: () => {
      dispatch(routerRedux.push({ pathname: "/updateinfo" }));
    },
    onGetCommission: () => {
      dispatch(routerRedux.push({ pathname: "/commission" }));
    },
    onCommissionManage: () => {
      dispatch(routerRedux.push({ pathname: "/commissionManager" }));
    },
    onLogout: () => {
      dispatch(routerRedux.push({ pathname: "./" }));
    },
    onUpdatePassword: () => {
      dispatch(routerRedux.push({ pathname: "/updatepassword" }));
    },
    onAddMoney: () => {
      dispatch(routerRedux.push({ pathname: "/add-money" }));
    },
    onAddTransPlayerWin: () => {
      dispatch(routerRedux.push({ pathname: "/win" }));
    },
    onReferral: () => {
      dispatch(routerRedux.push({ pathname: "/referral"}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
