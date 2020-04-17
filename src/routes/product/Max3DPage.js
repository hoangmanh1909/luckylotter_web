import Max3D from '../../components/max3d/Max3D';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        response: state.max3d.response,
        checkNumber: state.max3d.checkNumber,
        tutorialMax3D: state.max3d.tutorialMax3D,
        err: state.max3d.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(routerRedux.push({ pathname: '/max3daccept', payload: data }))
        },
        onBack: () => {
            dispatch(routerRedux.goBack())
        },
        onCheckDup: (data) => {
            dispatch({ type: 'max3d/check', payload: data })
        },
        onTutorial: message => {
            console.log('message', message);
            dispatch(
                routerRedux.push({ pathname: "/max3D-tutorial", message: message })
            );
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Max3D);