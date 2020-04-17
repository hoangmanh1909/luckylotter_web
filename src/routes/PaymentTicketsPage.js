import PaymentTickets from '../components/PaymentTickets';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { isNullOrUndefined } from 'util';

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        response: state.paymenttickets.payload,
        // province: state.payment.province,
        // district: state.payment.district,
        // ward: state.payment.ward,
        // fee:state.payment.fee,
        checkProductPilot: state.paymenttickets.checkProductPilot,
        player:state.paymenttickets.player,
        kenoResponse: state.paymenttickets.kenoResponse,
        receiverMobile : state.paymenttickets.receiverMobile,
        err:state.paymentHistory.err
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPayment: (data) => {
            dispatch({ type: 'paymenttickets/add', payload: data })
        },
        onGetDistrict: (provinceID) => {
            dispatch({ type: 'paymenttickets/getDistrict', payload: provinceID })
        },
        onGetWard: (districtID) => {
            dispatch({ type: 'paymenttickets/getWard', payload: districtID })
        },
        onGetFee: (data) => {
            dispatch({ type: 'paymenttickets/getFee', payload: data })
        },
        onPaymentKeno: (data) => {
            dispatch({type: 'paymenttickets/addKeno', payload: data })
        },
        onCheckAddOrder: productID => {
          dispatch({ type: "main/checkAddOrder", payload: productID });
        },
        onGetReceiverMobile: receiverMobile => {
            dispatch({ type: 'paymenttickets/getReceiverMobile', payload: receiverMobile })
        },
        onGoBack: data => {
            dispatch(
              routerRedux.replace({
                pathname: "/keno",
                payload: data
              })
            );
        }
    };
}

const PaymentTicketsPage = connect(mapStateToProps, mapDispatchToProps)(PaymentTickets)

export default PaymentTicketsPage;