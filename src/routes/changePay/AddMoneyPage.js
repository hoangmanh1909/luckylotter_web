import AddMoney from "../../components/changePay/AddMoney";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    response: state.AddMoney.payload,
    paymentRules: state.AddMoney.paymentRules,
    balance: state.AddMoney.balance,
    tutorialPayment: state.AddMoney.tutorialPayment,
    err: state.AddMoney.err
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onBankList: () => {
      dispatch(routerRedux.push({ pathname: '/bank-list' }))
    },
    onTutorial: message => {
      console.log('message', message);
      dispatch(
        routerRedux.push({ pathname: "/payment-tutorial", message: message })
      );
    },
  };
}

const AddMoneyPage = connect(mapStateToProps, mapDispatchToProps)(AddMoney)

export default AddMoneyPage;