import React, { Component } from 'react';

import Resumen from './Resumen';
import MontoTotal from './MontoTotal';
import Loading from './Loading';
import Formulario from './Formulario';

export default class SendBtc extends Component {

    state = {
        totalAmount: 2000,
        address: '',
        amount: '',
        fee: parseFloat((Math.random() / 1000).toFixed(5)),
        errorAddress: {
            error: false,
            msg: ''
        },
        errorAmount: {
            error: false,
            msg: ''
        },
        envios: []
    }

    checkForm = (addressBtc, amount) => { //checkea errores del formulario
        // checkerrores
        if (addressBtc !== 'address correcto') {
            setTimeout(() => {
                this.setState({
                    errorAddress: {
                        error: true,
                        msg: 'address incorrecto'
                    }
                })
            }, 500)
            return false
        } else if (amount > this.state.totalAmount) {
            console.error('no puede exceder su monto')
            this.setState({
                errorAmount: {
                    error: true,
                    msg: 'no puede exceder su monto'
                }
            })
            return false
        } else if (amount === 0 || this.state.amount === ''){
            console.error('ingrese un monto')
            this.setState({
                errorAmount: {
                    error: true,
                    msg: 'ingrese un monto'
                }
            })
            return false
        } else {
            return true
        }
    }

    sendBitcoin = data => { //envia bitcoin
        this.setState({
            loading: true
        })

        setTimeout(() => {
          this.setState( prevState => ({
            address: '',
            amount: '',
            errorAddress: {
                error: false,
                msg: ''
            },
            errorAmount: {
                error: false,
                msg: ''
            },
            envios: [...prevState.envios, data],
            totalAmount: (prevState.totalAmount - data.amount).toFixed(5),
            loading: false
          }))
        }, 1500)
    }
    
    handleOnSubmit = e => { // trae los datos del form, los checkea y envia
        e.preventDefault();
        let addressBtc = this.state.address;
        let amount = parseFloat(this.state.amount);

        if (this.checkForm(addressBtc, amount)) {
            let data = {
                addressBtc,
                amount: amount + this.state.fee,
                totalAmount: this.state.totalAmount - (amount + this.state.fee)
            }
            this.sendBitcoin(data)
        } else {
            return
        }
    }

    handleOnChange = e => { //maneja los values con el state
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {  
        
        console.log(this.state)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <MontoTotal totalAmount={this.state.totalAmount}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        { !this.state.loading ?
                            <Formulario
                                handleOnSubmit={this.handleOnSubmit}
                                handleOnChange={this.handleOnChange}
                                address={this.state.address}
                                amount={this.state.amount}
                                errorAmount={this.state.errorAmount}
                                errorAddress={this.state.errorAddress}
                                fee={this.state.fee}
                                /> :
                            <Loading/> }
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        { this.state.envios.length === 0 ?
                            <div className="box">
                                <h4 className="text-center">No hay envios recientes</h4>
                            </div> :
                            
                            this.state.envios.map( (envio, index) => {
                                return (
                                    <Resumen
                                        key={index}
                                        address={envio.addressBtc}
                                        amount={envio.amount}
                                        totalAmount={envio.totalAmount}/>
                                    )
                            })
                        }
                    </div>

                    
                </div>
            </div>
        )
    }
}
