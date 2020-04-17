import ResultPayment from '../components/ResultPayment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// let url;
// if(localStorage.getItem("check") === null){
//     url = ""
// }else {
//     url = JSON.parse(localStorage.getItem("check")).search;
// }
const mapDispatchToProps = (dispatch) => {
    return {
        onMain: () => {
            //dispatch(routerRedux.replace({ pathname: './'}))
            window.location.assign('./');
        }
    };
}

const ResultPage = connect(null,mapDispatchToProps)(ResultPayment)

export default ResultPage;