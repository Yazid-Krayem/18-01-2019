import React, { Component } from 'react';
import io from 'socket.io-client';


class App extends Component {
  state = {
    isConnected:false,
    id:null

  }
  socket = null
  
  


  componentDidMount(){

    this.socket = io('http://codicoda.com:8000');

    this.socket.on('connect', () => {
      this.setState({isConnected:true})
    })

    //pong
    this.socket.on('pong!',()=>{
      console.log('the server answered!')
    })
    this.socket.on('pong!',(additionalStuff)=>{
      console.log('server answered!', additionalStuff)
    })

    //id status
    this.socket.on('youare',(answer)=>{
      this.setState({id:answer.id})
    })
  
  
    

    this.socket.on('disconnect', () => {
      this.setState({isConnected:false})
    })

    /** this will be useful way, way later **/
    this.socket.on('room', old_messages => console.log(old_messages))


  }

  componentWillUnmount(){
    this.socket.close()
    this.socket = null
  }

  render() {
    return (
      <div className="main">
      <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
      {/* add: */}
      <div>id: {this.state.id}</div>
      <button onClick={()=>this.socket.emit('ping!')}>ping</button>
      {/* and also add: */}
      <button onClick={()=>this.socket.emit('whoami')}>Who am I?</button>

      </div>
      
      
      
      );
  }
}

export default App;
