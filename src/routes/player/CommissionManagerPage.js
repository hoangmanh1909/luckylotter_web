import CommissionManager from "../../components/player/CommissionManager";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.max4d.data)}`)
    return {
        commissionList: state.commissionManager.commissionList,
        err: state.commissionManager.err
    };
}


const mapDispatchToProps = (dispatch) => {
    return {

    };
}

const CommissionManagerPage = connect(mapStateToProps, mapDispatchToProps)(CommissionManager)

export default CommissionManagerPage;