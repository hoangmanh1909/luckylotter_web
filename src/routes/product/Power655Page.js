import Power655 from '../../components/power/Power655';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    console.log('state',state);
    return {
        response : state.power655.response,
        err:state.power655.err,
        tutorialPower: state.power655.tutorialPower,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAccept: (data) => {
            dispatch(
              routerRedux.replace({
                pathname: "/mega645accept",
                payload: data
              })
            );
        },
        onBack:()=> {
            dispatch(routerRedux.goBack())
        },
        onTutorial: message => {
            console.log('message', message);
            dispatch(
                routerRedux.push({ pathname: "/power-tutorial", message: message })
            );
        },
    };
}

const Power655Page = connect(mapStateToProps,mapDispatchToProps)(Power655)

export default Power655Page;