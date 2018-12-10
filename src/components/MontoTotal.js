import React from 'react';

const MontoTotal = props => {
    return (
        <div className="monto-total">
            <span>Billetera</span>
            <span className="t-azul">
                <i className="fa fa-bitcoin"></i> {props.totalAmount}
            </span>
        </div>
    );
}

export default MontoTotal;
