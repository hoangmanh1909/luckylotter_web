import React from 'react';
import styles from './drawResult.css';
import { stringToNumberFormat, getWeekdays } from '../../utils/Helper';
import moment from 'moment';
import RedBox from 'redbox-react';

class Lottery234Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lottery_234: []
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.result);
    if (this.state.lottery_234.length === 0 && nextProps.result != null) {
      this.setState({ lottery_234: nextProps.result });
    }
  }
  componentDidMount() {
    // console.log(this.props.result);
    if (this.state.lottery_234.length === 0 && this.props.result != null) {
      this.setState({ lottery_234: this.props.result });
    }
  }
  renderResult(){
    if(this.state.lottery_234.length > 0){
      return(
        <div>
          {this.state.lottery_234.map((item, index, data) => {
            let arrayResult = [];
            let strResult,strResult1,strResult2;
            let arrayLine = [];
            let strLine,strLine1,strLine2;
            let countTrung = 0;
            let countLan = 0;
            let temp = [];
            const lineA = item.LineA;
            const lineB = item.LineB;
            const lineC = item.LineC;
            const lineD = item.LineD;
            const lineE = item.LineE;
            arrayLine.push(lineA);
            arrayLine.push(lineB);
            arrayLine.push(lineC);
            arrayLine.push(lineD);
            arrayLine.push(lineE);
            strLine = arrayLine.toString();
            strLine1 = strLine.split(",");
            const ResultDB = item.ResultDB;
            const ResultST = item.ResultST;
            const ResultND = item.ResultND;
            const ResultRD = item.ResultRD;
            const ResultTH = item.ResultTH;
            const ResultVE = item.ResultVE;
            const ResultIX = item.ResultIX;
            const ResultEN = item.ResultEN;
            arrayResult.push(ResultDB);
            arrayResult.push(ResultST);
            arrayResult.push(ResultND);
            arrayResult.push(ResultRD);
            arrayResult.push(ResultTH);
            arrayResult.push(ResultVE);
            arrayResult.push(ResultIX);
            arrayResult.push(ResultEN);
            strResult = arrayResult.toString();
            console.log(strResult);
            strResult1 = strResult.split(",");
            console.log(strResult1);
            for(let i = 0; i < strResult1.length; i++){
              strResult2 = strResult1[i].substr(-2);
              for(let j = 0; j < strLine1.length; j++){
                strLine2 = strLine1[j].substr(-2);
                if(strLine2 === strResult2){
                  countTrung += 1;
                  console.log("So lan trung "+ countTrung + " " + temp.push(strResult1[i]));
                  
                }
              } 
            }
            return (
              <div>
                {temp[0]}
                {temp[1]}
                {temp[2]}
              </div>
            );
            
          })}
        </div>
      );
    }
  }
  renderView() {
    if (this.state.lottery_234.length > 0) {
      return (
        <div>
          {this.state.lottery_234.map((item, index, data) => {
            // const date = new Date(item.DrawDate);
            // const number = item.DrawResult.split(",");
            const dateParts = item.DrawDate.split("/");
            const date = new Date(
              dateParts[2],
              dateParts[1] - 1,
              dateParts[0]
            );
            console.log(item);
            const ResultDB = item.ResultDB;
            const ResultST = item.ResultST;
            const ResultND = item.ResultND.split(",");
            const ResultRD = item.ResultRD.split(",");
            const ResultTH = item.ResultTH.split(",");
            const ResultVE = item.ResultVE.split(",");
            const ResultIX = item.ResultIX.split(",");
            const ResultEN = item.ResultEN.split(",");
            const ResultSI = item.ResultSI;
            return (
              <div key={index}>
                <div>
                  <div className={styles.format_table}>
                    <div className={styles.result}>
                      <img className={styles.logo_lottery} src={require("../../assets/lottery.png")} alt=""></img>
                    </div>
                    <table className={styles.table_center}>
                      <caption align="bottom">Ký hiệu trúng ĐB: {ResultSI}, {`${getWeekdays(date.getDay())}, ${item.DrawDate}`} </caption>
                      <tbody>
                        <tr>
                          <td width="20%" rowSpan={1} style={{ borderRight: '0.1rem solid #cacccd', backgroundColor: '#f1f1f1', borderTopLeftRadius: '1rem' }}>Đặc biệt</td>
                          <td style={{color:'black' ,fontSize: '1.7rem', background: '#f1f1f1', fontWeight: 'bold', borderTopRightRadius: '1rem' }} colSpan={13} >{ResultDB}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#d1d3d4' }}>Giải nhất</td>
                          <td style={{ backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={13}>{ResultST}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#f1f1f1' }}>Giải nhì</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={8}>{ResultND[0]}</td>
                          <td style={{ backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={8}>{ResultND[1]}</td>
                        </tr>
                        <tr>
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#d1d3d4' }} rowSpan={2}>Giải ba</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[0]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[1]}</td>
                          <td style={{ backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[2]}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[3]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[4]}</td>
                          <td style={{ backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultRD[5]}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#f1f1f1' }}>Giải tư</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={4}>{ResultTH[0]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={4}>{ResultTH[1]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={4}>{ResultTH[2]}</td>
                          <td style={{ backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={4}>{ResultTH[3]}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#d1d3d4' }} rowSpan={2}>Giải năm</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[0]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[1]}</td>
                          <td style={{ backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[2]}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[3]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[4]}</td>
                          <td style={{ backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={5}>{ResultVE[5]}</td>
                        </tr>
                        <tr >
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#f1f1f1' }}>Giải sáu</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={5}>{ResultIX[0]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={5}>{ResultIX[1]}</td>
                          <td style={{ backgroundColor: '#f1f1f1', fontSize: '1.4rem' }} colSpan={5}>{ResultIX[2]}</td>
                        </tr>
                        <tr>
                          <td style={{ borderRight: '1px solid #cacccd', backgroundColor: '#d1d3d4', borderBottomLeftRadius: '1rem' }}>Giải bảy</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={4}>{ResultEN[0]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={4}>{ResultEN[1]}</td>
                          <td style={{ borderRight: '1px solid #7e8896', backgroundColor: '#d1d3d4', fontSize: '1.4rem' }} colSpan={4}>{ResultEN[2]}</td>
                          <td style={{ backgroundColor: '#d1d3d4', borderBottomRightRadius: '1rem', fontSize: '1.4rem' }} colSpan={4}>{ResultEN[3]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return;
  }
  render() {
    return (
      <div style={{ background: "#EEEEEE", paddingTop: 2 }}>
        {this.renderView()}
        {this.renderResult()}
      </div>
    );
  }
}
export default Lottery234Result;