import BankList from "../../components/changePay/BankList";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    
    return {
      banklist: state.BankList.banklist,
      err: state.BankList.err
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBankList: () => {
            dispatch(routerRedux.push({ pathname: '/bank-list'}))
        }
    };
}

const BankListPage = connect(mapStateToProps, mapDispatchToProps)(BankList)

export default BankListPage;