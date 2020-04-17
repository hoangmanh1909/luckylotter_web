import Max3DPlus from '../../components/max3dplus/Max3DPlus';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return {
        response : state.max3dplus.response,
        checkNumber: state.max3dplus.checkNumber,
        tutorialMax3DPlus: state.max3dplus.tutorialMax3DPlus,
        err:state.max3d.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(routerRedux.push({pathname : '/max3dplusaccept',payload:data}))
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        },
        onCheckDup:(data) => {
            dispatch({ type: 'max3dplus/check', payload: data })
        },
        onTutorial: message => {
            console.log('message', message);
            dispatch(
                routerRedux.push({ pathname: "/max3D-tutorial", message: message })
            );
        },
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Max3DPlus);