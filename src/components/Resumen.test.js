import React from 'react';
import { shallow } from 'enzyme';
import Resumen from './Resumen';

describe('resumen', () => {
    const resumen = shallow(<Resumen/>)
    
    it('renders properly ', () => {
        expect(resumen).toMatchSnapshot()
    });
})