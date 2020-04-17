import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';


// 1. Initialize
const app = dva({
    history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/max3d').default);
app.model(require('./models/max3dplus').default);
app.model(require("./models/login").default);
app.model(require('./models/main').default);
app.model(require('./models/max4d').default);
app.model(require('./models/mega645').default);
app.model(require('./models/power655').default);
app.model(require('./models/lottery').default);
app.model(require('./models/lottery123').default);
app.model(require('./models/payment').default);
app.model(require('./models/paymentHistory').default);
app.model(require('./models/paymentHistoryItem').default);
app.model(require("./models/itemKenoHistory").default);
app.model(require('./models/playerWin').default);
app.model(require('./models/changeBank').default);
app.model(require('./models/drawResult').default);
app.model(require('./models/changeVT').default);
app.model(require('./models/changeBankDetail').default);
app.model(require('./models/changeLuckylotter').default);
app.model(require('./models/changeMerchant').default);
app.model(require('./models/changeMerchantDetail').default);
app.model(require('./models/compareResult').default);
app.model(require('./models/keno').default);
app.model(require('./models/personalInfo').default);
app.model(require('./models/referral').default);
app.model(require('./models/numberReferral').default);
app.model(require('./models/orderReferral').default);
app.model(require('./models/commissionDetail').default);
app.model(require('./models/commissionMonth').default);
app.model(require('./models/commissionPayment').default);
app.model(require('./models/changePayment').default);
app.model(require('./models/historyCommission').default);
app.model(require('./models/paymentBank').default);
app.model(require('./models/paymentBankDetail').default);
app.model(require('./models/paymentLuckylotter').default);
app.model(require('./models/infoUpdate').default);
app.model(require('./models/passwordUpdate').default);
app.model(require('./models/addMoney').default);
app.model(require('./models/bankList').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
