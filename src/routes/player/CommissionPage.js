import Commission from "../../components/player/Commission";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.max4d.data)}`)
    return {
        balance: state.commission.balance,
        detail: state.commission.detail,
        info: state.commission.info,
        err: state.commission.err
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        onWithdrawCommission: () => {
            dispatch(routerRedux.push({pathname:'/withdrawCommission'}))
        },
        onUpdateInfo: () => {
            dispatch(routerRedux.replace({ pathname: '/updateinfo'}))
        },
    };
}

const CommissionPage = connect(mapStateToProps, mapDispatchToProps)(Commission)

export default CommissionPage;