import React from "react";
import styles from "./drawResult.css";
import { stringToNumberFormat, getWeekdays } from "../../utils/Helper";
import moment from "moment";

class Max3DResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      max3d: []
    };
  }

  componentDidMount() {
    if (this.state.max3d.length === 0) {
      this.setState({ max3d: this.props.result });
    }
  }

  renderView() {
    if (this.state.max3d.length > 0) {
      return (
        <div>
          {this.state.max3d.map((item, index, data) => {
            // const date = new Date(item.DrawDate);
            const dateParts = item.DrawDate.split("/");
            const date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
            const resultSt = item.ResultST.split(",");
            const resultNd = item.ResultND.split(",");
            const resultRd = item.ResultRD.split(",");
            const resultEnc = item.ResultENC.split(",");
            return (
              <div key={index}>
                <div className={styles.list_item}>
                   
                  <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div
                   className={styles.img_max3d}>
                  <img
                    className={styles.logo_max3d}
                    src={require("../../assets/max3d.png")}
                    alt=""
                  />
                      <div
                        style={{
                          
                          height: 10,
                          alignSelf: "center",
                         fontSize: 15
                        }}
                      >Kết quả quay thưởng</div>
                    <img
                    className={styles.logo_max3dplus}
                    src={require("../../assets/max3dcong.png")}
                    alt=""
                  />  
                    </div>
                  <div className={styles.text_header}>
                      {/* Giải nhất */}
                    </div>
                    <div className={styles.result_max3d}>
                        <div style={{paddingRight: 15, textAlign:"center", }}>Giải nhất<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>1 Triệu</p></div>
                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[0].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_st_max3d}
                      >
                        {resultSt[1].toString().substr(2, 1)}
                      </div>
                      <div style={{paddingLeft: 15, textAlign:"center", }}>Giải nhất<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>1 Tỷ</p></div>
                    </div>
                  </div>

                  <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div className={styles.text_header}>
                      {/* Giải nhì */}
                    </div>
                    <div className={styles.result_max4d}>
                    <div style={{paddingRight: 20, textAlign:"center", }}>Giải nhì<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>350k</p></div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[0].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[1].toString().substr(2, 1)}
                      </div>
                      <div style={{paddingLeft: 15, textAlign:"center", }}>Giải nhì<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>40 Triệu</p></div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[2].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[2].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[2].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[3].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[3].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_nd_max3d}
                      >
                        {resultNd[3].toString().substr(2, 1)}
                      </div>
                    </div>
                  </div>

                  <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div className={styles.text_header}>
                      {/* Giải ba */}
                    </div>
                    <div className={styles.result_max4d}>
                    <div style={{paddingRight: 24, textAlign:"center", }}>Giải ba<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>210k</p></div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[0].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[1].toString().substr(2, 1)}
                      </div>
                      <div style={{paddingLeft: 15, textAlign:"center", }}>Giải ba<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>10 Triệu</p></div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[2].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[2].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[2].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[3].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[3].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[3].toString().substr(2, 1)}
                      </div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[4].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[4].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[4].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[5].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[5].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_rd_max3d}
                      >
                        {resultRd[5].toString().substr(2, 1)}
                      </div>
                    </div>
                    
                  </div>

                  <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div className={styles.text_header}>
                      {/* Giải khuyến khích */}
                    </div>
                    <div className={styles.result_max4d}>
                    <div style={{paddingRight: 15, textAlign:"center", }}>Giải tư<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>100k</p></div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[0].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[0].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[0].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[1].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[1].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[1].toString().substr(2, 1)}
                      </div>
                      <div style={{paddingLeft: 15, textAlign:"center", }}>Giải tư<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>5 triệu</p></div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[2].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[2].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[2].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[3].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[3].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[3].toString().substr(2, 1)}
                      </div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[4].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[4].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[4].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[5].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[5].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[5].toString().substr(2, 1)}
                      </div>
                    </div>
                    <div className={styles.result_max4d}>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[6].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[6].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[6].toString().substr(2, 1)}
                      </div>

                      <div
                        style={{
                          width: 15,
                          height: 22,
                          alignSelf: "center",
                          margin: "0px 4px"
                        }}
                      />

                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[7].toString().substr(0, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[7].toString().substr(1, 1)}
                      </div>
                      <div
                        className={styles.text_number_circle_enc_max3d}
                      >
                        {resultEnc[7].toString().substr(2, 1)}
                      </div>
                    </div>

                  </div>
                  {/* Giải năm */}
                  <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div className={styles.result_max3d}>
                        <div style={{paddingRight: 0, textAlign:"center", paddingTop: 12, width: 235, fontSize: 12, paddingBottom: 12}}>(Max3D+) trúng 2 bộ số bất kỳ trong 20 bộ số của giải Nhất, Nhì, Ba và Tư</div>
                      <div style={{paddingLeft: 15, textAlign:"center", paddingTop: 8}}>Giải năm<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>1 Triệu</p></div>
                    </div>
                    </div>
                        {/* Giải sáu */}
                        <div style={{borderBottom:"1px solid rgb(106, 109, 114)"}}>
                  <div className={styles.result_max3d}>
                        <div style={{paddingRight: 0, textAlign:"center", paddingTop: 12, width: 235, fontSize: 12, paddingBottom: 12}}>(Max3D+) trúng 1 trong 2 bộ số của giải Nhất</div>
                      <div style={{paddingLeft: 15, textAlign:"center", paddingTop: 8}}>Giải sáu<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>150k</p></div>
                    </div>
                    </div>
                        {/* Giải bảy */}
                        <div>
                  <div className={styles.result_max3d}>
                        <div style={{paddingRight: 0, textAlign:"center", paddingTop: 12, width: 235, fontSize: 12, paddingBottom: 20}}>(Max3D+) trúng 1 bộ số bất kỳ trong 18 bộ số của giải Nhì, Ba, và Tư trừ 2 bộ giải nhất</div>
                      <div style={{paddingLeft: 15, textAlign:"center", paddingTop: 8}}>Giải bảy<p style={{marginTop: 0, marginBottom: 0, fontWeight:"bold"}}>40k</p></div>
                    </div>
                    </div>
                  <div
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      margin: "4px 0px"
                    }}
                  >
                    {`Kỳ quay #${item.DrawCode}. ${getWeekdays(
                      date.getDay()
                    )}, ${item.DrawDate}`}
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
export default Max3DResult;
