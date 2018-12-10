import React from 'react';
import { shallow } from 'enzyme';
import MontoTotal from './MontoTotal';

describe('montoTotal', () => {
    const montoTotal = shallow(<MontoTotal/>)
    
    it('renders properly ', () => {
        expect(montoTotal).toMatchSnapshot()
    });
})