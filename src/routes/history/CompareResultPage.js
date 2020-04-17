import CompareResult from '../../components/history/CompareResult';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        response: state.compareResult.data,
        err:state.drawResult.err}
    return {}
}

export default connect(mapStateToProps, null)(CompareResult);