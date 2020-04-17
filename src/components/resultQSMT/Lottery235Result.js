import React from "react";
import styles from "./drawResult.css";
import { stringToNumberFormat, getWeekdays } from "../../utils/Helper";
import moment from "moment";

class Lottery235Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lottery_235: []
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.result);
    if (this.state.lottery_235.length === 0 && nextProps.result != null) {
      this.setState({ lottery_235: nextProps.result });
    }
  }
  componentDidMount() {
    // console.log(this.props.result);
    if (this.state.lottery_235.length === 0 && this.props.result != null) {
      this.setState({ lottery_235: this.props.result });
    }
  }
  // Render_DB = () => {
  //   {
  //     this.state.lottery_235.map((item, index, data) => {
  //       const dateParts = item.DrawDate.split("/");
  //       const date = new Date(
  //         dateParts[2],
  //         dateParts[1] - 1,
  //         dateParts[0]
  //       );
  //       const ResultDB = item.ResultDB;
  //       const ResultST = item.ResultST;
  //       const ResultND = item.ResultND.split(",");
  //       const ResultRD = item.ResultRD.split(",");
  //       const ResultTH = item.ResultTH.split(",");
  //       const ResultVE = item.ResultVE.split(",");
  //       const ResultIX = item.ResultIX.split(",");
  //       const ResultEN = item.ResultEN.split(",");
  //       const ResultSI = item.ResultSI;
  //       const LineA = 89;//item.LineA;
  //       const LineB = item.LineB;
  //       const LineC = item.LineC;
  //       const LineD = item.LineD;
  //       const LineE = item.LineE;
  //       const LineAStatus = "A";//item.LineAStatus;
  //       const LineBStatus = item.LineBStatus;
  //       const LineCStatus = item.LineCStatus;
  //       const LineDStatus = item.LineDStatus;
  //       const LineEStatus = item.LineEStatus;

  //       if (LineA.length === 2) {
  //         if (LineAStatus === "A") {
  //           console.log("aa", item.ResultDB)
  //           return (
  //             // <div style={{ color: '#1B5E20', fontSize: '1.7rem', background: '#f1f1f1', fontWeight: 'bold', borderTopRightRadius: '1rem' }}
  //             //    >{item.ResultDB}</div>
  //             <div><p>abc</p></div>

  //           );
  //         }
  //       }
  //     }
  //     )
  //   }
  // };

  renderView() {
    if (this.state.lottery_235.length > 0) {
      return (
        <div>
          {this.state.lottery_235.map((item, index, data) => {
            const dateParts = item.DrawDate.split("/");
            const date = new Date(
              dateParts[2],
              dateParts[1] - 1,
              dateParts[0]
            );
            const ResultDB = item.ResultDB;
            const ResultST = item.ResultST;
            const ResultND = item.ResultND.split(",");
            const ResultRD = item.ResultRD.split(",");
            const ResultTH = item.ResultTH.split(",");
            const ResultVE = item.ResultVE.split(",");
            const ResultIX = item.ResultIX.split(",");
            const ResultEN = item.ResultEN.split(",");
            const ResultSI = item.ResultSI;
            const LineA = item.LineA;
            const LineB = item.LineB;
            const LineC = item.LineC;
            const LineD = item.LineD;
            const LineE = item.LineE;
            const LineAStatus = item.LineAStatus;
            const LineBStatus = item.LineBStatus;
            const LineCStatus = item.LineCStatus;
            const LineDStatus = item.LineDStatus;
            const LineEStatus = item.LineEStatus;


            return (
              <div key={index}>
                <div>
                  <div className={styles.format_table}>
                    <div className={styles.result}>
                      <img className={styles.logo_lottery} src={require("../../assets/lottery.png")} alt=""></img>
                    </div>
                    <table className={styles.table_center}>
                      <caption align="bottom" style={{ marginTop: '0.4rem' }}>Ký hiệu trúng ĐB: {ResultSI}, {`${getWeekdays(date.getDay())}, ${item.DrawDate}`} </caption>
                      <tbody>
                        <tr>
                          <td width="20%" rowSpan={1} style={{ borderRight: '0.1rem solid #cacccd', backgroundColor: '#f1f1f1', borderTopLeftRadius: '1rem' }}>Đặc biệt</td>

                          <td style={{ color: '#ff1a1a', fontSize: '1.7rem', background: '#f1f1f1', fontWeight: 'bold', borderTopRightRadius: '1rem' }} colSpan={13} >{ResultDB}</td>


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

      </div>
    );
  }
}
export default Lottery235Result;
