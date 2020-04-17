import NumberReferral from '../../components/login/NumberReferral';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        err: state.numberReferral.err,
        response: state.numberReferral.response
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NumberReferral);