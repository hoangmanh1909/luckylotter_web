import React from 'react';

class Error extends React.Component{
    state = {
        message : "404 Error"
    }
    componentWillMount(){
        if(this.props.message !== undefined){
            this.setState({message : this.props.message})
        }
    }
    render(){
        return (<h2 style={{color:"red"}}>{this.state.message}</h2>)
    }
}

export default Error;