import Mega645 from "../../components/mega/Mega645";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.max4d.data)}`)
    // console.log(state.main.payload.data);
    return {
        response : state.mega645.response,
        err:state.mega645.err,
        tutorialMega: state.mega645.tutorialMega,
        // responseMain : state.main.payload.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(routerRedux.push({pathname : '/mega645accept',payload:data}))
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        },
        onTutorial: message => {
            console.log('message', message);
            dispatch(
                routerRedux.push({ pathname: "/mega-tutorial", message: message })
            );
        },
    };
}

const Mega645Page = connect(mapStateToProps,mapDispatchToProps)(Mega645)

export default Mega645Page;