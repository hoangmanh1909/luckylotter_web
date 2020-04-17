import React from 'react';
import { SearchBar, ListView, ListItem, List } from 'antd-mobile';
import 'antd-mobile/lib/search-bar/style/css'

    const data = [{
        value: 'bj',
        label: '北京市',
      }, {
        value: 'zj',
        label: '浙江省',
      }, {
        value: 'gd',
        label: '广东省',
      }, {
        value: 'hn',
        label: '海南省',
      }, {
        value: 'cq',
        label: '重庆市',
      }, {
        value: 'sc',
        label: '四川省',
      }]

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
      pickerValue: [],
    }
  }

  // componentDidMount() {
  //   console.log("test")
  //   this.setState({ picker: this.state.picker.cloneWithRows(data)})
  // }

  componentWillReceiveProps(nextprops) {
    // console.log("province.data.Code:" + JSON.stringify(nextprops.province.data.ListValue));
    // if (nextprops.province.data.ListValue !== undefined) {
        this.setState({ picker: this.state.picker.cloneWithRows(data)})}
    

  render() {
    return (
      <div>
        <SearchBar placeholder="pp" />
        <List>
            <ListView
                dataSource={this.state.picker}
                // renderHeader={() => <div>
                //     <div>ListView + PullToRefresh + SwipeAction</div>
                // </div>}
                // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                //     {this.state.isLoading ? 'Loading...' : 'Loaded'}
                // </div>)}
                renderRow={(rowData, sectionID, rowID) => {
                    return (
                        <ListItem >
                            {rowData.value}
                        </ListItem>
                        // <div key={rowID} style={{ padding: 10 }}>
                        //     <div
                        //         style={{
                        //             lineHeight: '50px',
                        //             color: '#888',
                        //             fontSize: 18,
                        //             borderBottom: '1px solid #F6F6F6',
                        //         }}><Button type="ghost" onClick={this.clickItem(this)}>{rowData.Name}</Button></div>
                        // </div>
                    );
                }}
            // renderSeparator={(sectionID, rowID) => (
            //     <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
            // )}
            // initialListSize={10}
            // pageSize={5}
            // scrollRenderAheadDistance={200}
            // scrollEventThrottle={20}
            // onEndReached={this.clickItem}
            // onEndReachedThreshold={10}
            style={{
                height: document.body.clientHeight,
            }}
            // contentContainerStyle={{ position: 'relative' }}
            // scrollerOptions={{ scrollbars: true }}
            /></List>
      </div>
    );
  }
}

// Example.propTypes = {
// };

export default Example;
