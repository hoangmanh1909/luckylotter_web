import PlayerWin from "../../components/changePay/PlayerWin";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const mapStateToProps = (state) => {
    // console.log(`state ${JSON.stringify(state.max4d.data)}`)
    return {
      response: state.playerWin.payload,
      paymentRules: state.playerWin.paymentRules,
      err: state.playerWin.err
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        onViettel: (balance) => {
            dispatch(routerRedux.push({ pathname: '/viettel', balance: balance }))
        },
        onBank: (balance) => {
            dispatch(routerRedux.push({ pathname: '/bank', balance: balance }))
        },
        onRules: (mes,balance) => {
            dispatch(
              routerRedux.push({
                pathname: "/rules",
                message: mes,
                balance:balance
              })
            );
        },
        onComissionPayment: () => {
          dispatch(routerRedux.push({ pathname: "/changepayment"}));
      },
    };
}

const PlayerWinPage = connect(mapStateToProps, mapDispatchToProps)(PlayerWin)

export default PlayerWinPage;