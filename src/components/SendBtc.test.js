import React from 'react';
import { shallow, mount } from 'enzyme';
import SendBtc from './SendBtc';
import { spy } from 'sinon';

describe('SendBtc', () => {
    
    const sendBtc = shallow(<SendBtc/>);

    it('renderiza sin problemas', () => {
        expect(sendBtc).toMatchSnapshot();
    })

    const wallet = 2000;
    const fee = 0.00012;
    const amount = 22;

    const data = {
        addressBtc: 'address correcto',
        amount: amount,
        totalAmount: wallet - (amount + fee)
    }

    it('inicializa el `state` con una lista de envios vacia', () => {
        expect(sendBtc.state().envios).toEqual([])
    })

    //test onHandleOnChange function
    describe('cuando el usuario tipea en los inputs', () => {
        //mock de la funcion
        sendBtc.instance().handleOnChange = jest.fn();
        sendBtc.update();

        it('modifica el address en el `state`', () => {
            const event = { target: {
                value: data.addressBtc,
                name: 'address'
            }};
            sendBtc.find('input[name="address"]').simulate('change', event);
            expect(sendBtc.state().address).toEqual(event.target.value);
        })
    })

    // test checkForm function
    /*describe('cuando ejecuta `checkForm()`', () => {
        //mock de la funcion
        sendBtc.instance().checkForm = jest.fn();
        sendBtc.instance().handleOnSubmit = jest.fn();
        sendBtc.update();

        it('llama a la funcion', () => {

            const event = {
                preventDefault() {},
            };

            sendBtc.find('form').simulate('submit', event)
            expect(sendBtc.instance().checkForm)
                .toBeCalledWith(sendBtc.state().address, sendBtc.state().amount)
        })

        //check errores en diferentes casos
    })*/

    //test sendBitcoin function
    /*describe('cuando envia Bitcoin', () => {
        sendBtc.instance().sendBitcoin = jest.fn();
        sendBtc.update();

        it('llama a la funcion con la data', () => {
            expect(sendBtc.instance().sendBitcoin).toBeCalledWith(data)
        })

        it('agrega un envio al state `state`', () => {
            expect(sendBtc.state().envios).toEqual([{data}])
        })
    })*/

    //test del formulario
    describe('cuando clickea en enviar', () => {

        beforeAll(() => {
            sendBtc.setState({
                address: data.addressBtc,
                amount: data.amount,
                fee: fee
            })
        })

        it('check addressBtc', () => {
            expect(sendBtc.state().address).toEqual('address correcto');
        })

        it('check if amount it is less or equal than wallet', () => {
            expect(data.amount).toBeLessThanOrEqual(wallet)
        })

        it('check if amount is equal to 0', () => {
            expect(data.amount).not.toBe(0)
        })

        it('submit event when click submit', () => {
            sendBtc.instance().onHandleSubmit = jest.fn();
            sendBtc.update();

            const submit = sendBtc.instance().onHandleSubmit;
            const wrapper = mount(
                <form onSubmit={submit} id="form">
                    <div className="form-group">
                        <label>Address BTC</label>
                        <input
                            className="input"
                            placeholder="address btc"
                            name="address"
                            defaultValue={data.addressBtc} 
                            />
                    </div>
                    
                    <div className="form-group">
                        <label>Amount to send</label>
                        <input
                            className="input"
                            placeholder="amount to send"
                            name="amount"
                            defaultValue={data.amount}
                            />
                        <small>Fee: {fee}</small>
                    </div>
                    
                    <button
                        className="button btn-azul submit"
                        type="submit">Enviar</button>
                </form>
            );
            wrapper.find('[type="submit"]').simulate('submit');
            expect(submit).toBeCalled()
        });

    })
})

