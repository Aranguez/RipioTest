import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('loading', () => {
    const loading = shallow(<Loading/>)
    
    it('renders properly ', () => {
        expect(loading).toMatchSnapshot()
    });
})