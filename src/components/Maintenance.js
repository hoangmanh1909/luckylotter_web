import React from 'react';

class Maintenance extends React.Component{
    state = {

    }
    render(){
        return (<div style={{fontFamily:"Helvetica"}}>
        <img
            style={{ height: "200px", width: "350px", marginLeft:"12px", marginTop:"150px"}}
            src={require("../assets/he thong bao tri.png")}
            alt=""
          />
          <h1 style={{textAlign:"center"}}>Hệ thống đang bảo trì</h1>
          <h3 style={{textAlign:"center"}}>Quý khách vui lòng quay lại sau khi Lucky Lotter hoàn tất bảo trì</h3>
          </div>
          
          )
    }
}

export default Maintenance;