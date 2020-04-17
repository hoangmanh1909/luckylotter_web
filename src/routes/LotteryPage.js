import Lottery from "../components/Lottery";
import { connect } from "dva";
import { routerRedux } from "dva/router";
const mapStateToProps = state => {
    return {
        err: state.lottery.err,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLottery123: () => {
            dispatch(routerRedux.push({ pathname: "/lottery-123" }));
        },
        onLottery234: () => {
            dispatch(routerRedux.push({ pathname: "/lottery-234" }));
        },
        onLottery235: () => {
            dispatch(routerRedux.push({ pathname: "/lottery-235" }));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lottery);
