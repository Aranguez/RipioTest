import React from 'react';

import Error from './Error';

const Formulario = props => {
    return (
        <form onSubmit={props.handleOnSubmit} id="form">
            <div className="row">
                <div className="col-xs-12"> 
                    <input
                        className="input"
                        placeholder="Address btc"
                        name="address"
                        value={props.address} 
                        onChange={props.handleOnChange}/>
                    { props.errorAddress.error && <Error errorMsg={props.errorAddress.msg}/> }
                </div>
            </div>
            <div className="row">
                <div className="col-xs-8">
                    <input
                        className="input"
                        placeholder="Cantidad a enviar"
                        name="amount"
                        value={props.amount}
                        onChange={props.handleOnChange}/>
                    { props.errorAmount.error && <Error errorMsg={props.errorAmount.msg}/> }
                </div>
                <div className="col-xs-4">
                    <small>Fee: {props.fee}</small>
                </div>
                
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="button btn-azul submit"
                        type="submit">Enviar</button>
                </div>
            </div>
        </form>
    );
}

export default Formulario;
