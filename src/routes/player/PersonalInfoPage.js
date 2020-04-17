import PersonalInfo from '../../components/player/PersonalInfo';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        balance: state.personalInfo.balance,
        err:state.personalInfo.err,
        info: state.personalInfo.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMain: () => {
            dispatch(routerRedux.replace({ pathname: './'}))
        },
        onUpdateInfo: () => {
            dispatch(routerRedux.push({ pathname: '/updateinfo'}))
        },
        onGetCommission: () => {
            dispatch(routerRedux.push({ pathname: "/commission" }));
        },
        onCommissionManage: () => {
            dispatch(
              routerRedux.push({ pathname: "/commissionManager" })
            );
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
