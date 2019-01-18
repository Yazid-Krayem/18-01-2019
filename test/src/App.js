import React, { Component } from 'react';
import io from 'socket.io-client';


class App extends Component {
  state = {
    isConnected:false
  }
  socket = null

  componentDidMount(){

    this.socket = io('http://codicoda.com:8000');

    this.socket.on('connect', () => {
      this.setState({isConnected:true})
    })
    this.socket.on('pong!',()=>{
      console.log('the server answered!')
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
      <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}
              <button onClick={()=>this.socket.emit('ping!')}>ping</button>

      
      
      </div>
      
      );
  }
}

export default App;
