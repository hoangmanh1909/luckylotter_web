import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import MainPage from "./routes/MainPage";
import Max4DPage from "./routes/product/Max4DPage";
import Max4DAcceptPage from "./routes/product/Max4DAcceptPage";
import Max3DPage from "./routes/product/Max3DPage";
import Max3DAcceptPage from "./routes/product/Max3DAcceptPage";
import Mega645Page from "./routes/product/Mega645Page";
import Mega645AcceptPage from "./routes/product/Mega645AcceptPage";
import PaymentPage from "./routes/PaymentPage";
import ErrorPage from "./routes/ErrorPage";
import ResultPage from "./routes/ResultPage";
import Power655Page from "./routes/product/Power655Page";
import PaymentHistoryPage from "./routes/history/PaymentHistoryPage";
import PaymentHistoryItemPage from "./routes/history/PaymentHistoryItemPage";
import PlayerWinPage from "./routes/changePay/PlayerWinPage";
import ChangeBankPage from "./routes/changePay/ChangeBankPage";
import ChangeViettelPayPage from "./routes/changePay/ChangeViettelPayPage";
import DrawResultPage from "./routes/DrawResultPage";
import ChangeViettelPayAcPage from "./routes/changePay/ChangeViettelPayAcPage";
import ChangeBankDetailPage from "./routes/changePay/ChangeBankDetailPage";
import CompareResultPage from "./routes/history/CompareResultPage";
import RulesPaymentTextPage from "./routes/changePay/RulesPaymentTextPage";
import TermsTextPage from "./routes/TermsTextPage";
import MaintenancePage from "./routes/MaintenancePage";
import Max3DPlusPage from "./routes/product/Max3DPlusPage";
import Max3DPlusAcceptPage from "./routes/product/Max3DPlusAcceptPage";
import LoginPage from "./routes/login/LoginPage";
import RegisterPage from "./routes/login/RegisterPage";
import RegisterAcceptPage from "./routes/login/RegisterAcceptPage";
import CreatedPasswordPage from "./routes/login/CreatedPasswordPage";
import MissPasswordPage from "./routes/login/MissPasswordPage";
import KenoPage from "./routes/product/KenoPage";
import KenoAcceptPage from "./routes/product/KenoAcceptPage";
import ItemKenoPage from "./routes/history/ItemKenoPage";
import KenoTutorialPage from "./routes/product/KenoTutorialPage";
import Max3DTutorialPage from "./routes/product/Max3DTutorialPage";
import Max4DTutorialPage from "./routes/product/Max4DTutorialPage";
import MegaTutorialPage from "./routes/product/MegaTutorialPage";
import PowerTutorialPage from "./routes/product/PowerTutorialPage";
import PaymentTutorialPage from "./routes/changePay/PaymentTutorialPage";
import PersonalInfoPage from './routes/login/PersonalInfoPage';
import ReferralPage from './routes/login/ReferralPage';
import CommissionPaymentPage from './routes/login/CommissionPaymentPage';
import ChangePaymentPage from './routes/changePay/ChangePaymentPage';
import ChangeLuckylotterPage from './routes/changePay/ChangeLuckylotterPage';
import ChangeMerchantPage from './routes/changePay/ChangeMerchantPage';
import ChangeMerchantDetailPage from './routes/changePay/ChangeMerchantDetailPage';
import HistoryCommissionPage from './routes/login/HistoryCommissionPage';
import NumberReferralPage from './routes/login/NumberReferralPage';
import OrderReferralPage from './routes/login/OrderReferralPage';
import CommissionDetailPage from './routes/login/CommissionDetailPage';
import UpdateInfoPage from './routes/login/UpdateInfoPage';
import UpdatePasswordPage from './routes/login/UpdatePasswordPage';
import AddMoneyPage from './routes/changePay/AddMoneyPage';
import BankListPage from './routes/changePay/BankListPage';
import LotteryPage from "./routes/LotteryPage";
import Lottery123Page from "./routes/product/Lottery123Page";
import Lottery123AcceptPage from "./routes/product/Lottery123AcceptPage";
import Lottery123TutorialPage from "./routes/product/Lottery123TutorialPage";
import Lottery234Page from "./routes/product/Lottery234Page";
import Lottery234AcceptPage from "./routes/product/Lottery234AcceptPage";
import Lottery234TutorialPage from "./routes/product/Lottery234TutorialPage";
import Lottery235Page from "./routes/product/Lottery235Page";
import Lottery235AcceptPage from "./routes/product/Lottery235AcceptPage";
import Lottery235TutorialPage from "./routes/product/Lottery235TutorialPage";
import PaymentLuckylotterPage from './routes/login/PaymentLuckylotterPage';
import PaymentBankPage from './routes/login/PaymentBankPage';
import PaymentBankDetailPage from './routes/login/PaymentBankDetailPage';
import CommissionMonthPage from './routes/login/CommissionMonthPage';
import MainV1Page from "./routes/MainV1Page";
import { API_HEADER } from "./config";
import qs from "query-string-es5";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import request from "./utils/request";
import ChangeBankDetail from "./components/changePay/ChangeBankDetail";

const hash = crypto.createHash("sha256");

let isAuthenticated = true;
let message = "Không có quyền truy cập";

function PrivateRoute({ component: Component, ...rest }) {
  isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/error" }} />
        )
      }
    />
  );
}

function RouterConfig({ history }) {  
  let param = qs.parse(history.location.search);
  localStorage.setItem("merchant_id", 4);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/error" exact render={() => <ErrorPage message={message} />} />
        <Route path="/keno" exact component={KenoPage} />
        <Route path="/kenoaccept" exact component={KenoAcceptPage} />
        <Route path="/keno-tutorial" exact component={KenoTutorialPage} />
        <Route path="/max3D-tutorial" exact component={Max3DTutorialPage} />
        <Route path="/max4D-tutorial" exact component={Max4DTutorialPage} />
        <Route path="/mega-tutorial" exact component={MegaTutorialPage} />
        <Route path="/power-tutorial" exact component={PowerTutorialPage} />
        <Route path="/payment-tutorial" exact component={PaymentTutorialPage} />
        <Route path="/lottery-tutorial" exact component={Lottery123TutorialPage} />
        <Route path="/lottery" exact component={LotteryPage} />
        <Route path="/lottery-123" exact component={Lottery123Page} />
        <Route path="/lottery-123-ac" exact component={Lottery123AcceptPage} />
        <Route path="/lottery-234" exact component={Lottery234Page} />
        <Route path="/lottery-234-ac" exact component={Lottery234AcceptPage} />
        <Route path="/lottery-234-tutorial" exact component={Lottery234TutorialPage} />
        <Route path="/lottery-235" exact component={Lottery235Page} />
        <Route path="/lottery-235-ac" exact component={Lottery235AcceptPage} />
        <Route path="/lottery-235-tutorial" exact component={Lottery235TutorialPage} />
        <Route path="/max4d" exact component={Max4DPage} />
        <Route path="/max4daccept" exact component={Max4DAcceptPage} />
        <Route path="/mega645" exact component={Mega645Page} />
        <Route path="/mega645accept" exact component={Mega645AcceptPage} />
        <Route path="/payment" exact component={PaymentPage} />
        <Route path="/power655" exact component={Power655Page} />
        <Route path="/max3d" exact component={Max3DPage} />
        <Route path="/max3daccept" exact component={Max3DAcceptPage} />
        <Route path="/max3dplus" exact component={Max3DPlusPage} />
        <Route path="/max3dplusaccept" exact component={Max3DPlusAcceptPage} />
        <Route path="/info" component={PersonalInfoPage} />
        <Route path="/updateinfo" component={UpdateInfoPage} />
        <Route path="/referral" component={ReferralPage} />
        <Route path="/commissionpayment" component={CommissionPaymentPage} />
        <Route path="/changepayment" component={ChangePaymentPage} />
        <Route path="/changeluckylotter" component={ChangeLuckylotterPage} />
        <Route path="/historycommission" component={HistoryCommissionPage} />
        <Route path="/numberreferral" component={NumberReferralPage} />
        <Route path="/orderreferral" component={OrderReferralPage} />
        <Route path="/commissiondetail" component={CommissionDetailPage} />
        <Route path="/commissionmonth" component={CommissionMonthPage} />
        <Route path="/paymentluckylotter" component={PaymentLuckylotterPage} />
        <Route path="/paymentbank" component={PaymentBankPage} />
        <Route path="/paymentbankdetail" component={PaymentBankDetailPage} />
        <Route path="/updatepassword" component={UpdatePasswordPage} />
        <Route path="/add-money" component={AddMoneyPage} />
        <Route path="/bank-list" component={BankListPage} />
        <PrivateRoute path="/paymenthistory" exact component={PaymentHistoryPage} />
        <PrivateRoute path="/payment-history-item" exact component={PaymentHistoryItemPage} />
        <PrivateRoute path="/item-keno" component={ItemKenoPage} />
        <Route path="/PaymentResult" component={ResultPage} />
        <PrivateRoute path="/win" component={PlayerWinPage} />
        <PrivateRoute path="/viettel" component={ChangeViettelPayPage} />
        <PrivateRoute path="/viettel-ac" component={ChangeViettelPayAcPage} />
        <PrivateRoute path="/changebank" component={ChangeBankPage} />
        <PrivateRoute path="/changebankdetail" component={ChangeBankDetailPage} />
        <PrivateRoute path="/changemerchant" component={ChangeMerchantPage} />
        <PrivateRoute path="/changemerchantdetail" component={ChangeMerchantDetailPage} />
        <Route path="/draw-result" component={DrawResultPage} />
        <PrivateRoute path="/compare-result" component={CompareResultPage} />
        <PrivateRoute path="/rules" component={RulesPaymentTextPage} />
        <Route path="/terms" component={TermsTextPage} />
        <PrivateRoute path="/maintenance" component={MaintenancePage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/register-accept" component={RegisterAcceptPage} />
        <Route path="/created-password" component={CreatedPasswordPage} />
        <Route path="/miss-password" component={MissPasswordPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
