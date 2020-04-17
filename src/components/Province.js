import React from 'react';
import { SearchBar, ListView,Text} from 'antd-mobile';
import 'antd-mobile/lib/search-bar/style/css';
import 'antd-mobile/lib/list-view/style/css';

class Province extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
            picker: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows([]),
            value: '',
        }
    }

    // componentWillMount() {
    //     console.log(this.props)
    //     this.setState({ picker: this.state.picker.cloneWithRows(this.props.province), pickerValue: this.props.province })
    // }

    componentWillReceiveProps(nextprops) {
        if (nextprops.province.data.ListValue !== undefined) {
        this.setState({ picker: this.state.picker.cloneWithRows(nextprops.province) })
        }
    }

    onSearchBar = query => {
        const arr =  Object.keys(this.props.province).map(i => this.props.province[i]);
    
        const query_arr = arr.filter((el) => {
            return el.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.setState({ pickerValue: query_arr });
        this.setState({picker :this.state.picker.cloneWithRows(query_arr)})
        this.setState({ value: query });
        // console.log(query)
        // console.log(this.state.value);
    }

    onaccetp = (value) =>{
        this.props.onSelect(this.props.location.payload,value);
    }

    render() {
        const row = el => {
            // console.log(el)
            return (
                <Text style={{display:"block"}} onClick={() => this.onaccetp(el.value)}>{el.value}</Text>
            );
        };
        return (
            <div>
                <SearchBar placeholder={this.state.value} onChange={this.onSearchBar.bind(this)} value={this.state.value} />
                {/* <InputItem onChange={this.onSearchBar()}></InputItem> */}
                <div>
                    <ListView
                        dataSource={this.state.picker}
                        renderRow={row}
                        pageSize={4}
                        useBodyScroll
                        scrollRenderAheadDistance={500}
                        onEndReachedThreshold={10} />
                </div>
            </div>
        );
    }
};

export default Province;