import UpdateInfo from '../../components/player/UpdateInfo';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { 
        info: state.infoUpdate.info,
        err:state.infoUpdate.err,
        updateInf: state.infoUpdate.updateInf
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePersonalInfo: (data) => {
            dispatch({ type: 'infoUpdate/update', payload: data })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);