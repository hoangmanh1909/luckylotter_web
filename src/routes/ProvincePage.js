import Province from '../components/Province';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    return { province: state.province};
  }

  const mapDispatchToProps = (dispatch) => {
    return {    
      onSelect : (his,value) => {
        dispatch(routerRedux.push({pathname:'./payment',payload:his,value}))
      }
    };
}

const ProvincePage = connect(mapStateToProps,mapDispatchToProps)(Province)

export default ProvincePage;