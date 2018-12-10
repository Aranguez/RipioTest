import React from 'react';

const Resumen = props => {
    return (
        <div className="box">
            <span>Enviado a</span><br/>
            <span className="t-azul"><b>{ props.address }</b></span>
            <hr/>
            <p><b>Enviado</b> <span className="t-rojo">{ props.amount }</span></p>
            <p><b>Billetera</b> { props.totalAmount }</p>
        </div>
    );
}

export default Resumen;
