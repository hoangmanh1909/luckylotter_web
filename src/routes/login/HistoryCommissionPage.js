import HistoryCommission from '../../components/login/HistoryCommission';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.historyCommission.err,
        response: state.historyCommission.response
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCommission);