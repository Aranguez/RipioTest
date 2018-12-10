import React, { Component } from 'react';

//componentes
import Formulario from './Formulario';

class SendBtcApp extends Component {
  
    render() {
      return (
        <div className="container"> 
            <Formulario/>
        </div>
      );
    }
}

export default SendBtcApp;