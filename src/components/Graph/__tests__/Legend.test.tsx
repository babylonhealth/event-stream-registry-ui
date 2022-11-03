import React from 'react'
import {cleanup, render} from '@testing-library/react'
import Legend from '../Legend'

afterEach(cleanup);

it('should take a snapshot', () => {
    const {asFragment} = render(<Legend />);

    // @ts-ignore
    expect(asFragment(<Legend />)).toMatchSnapshot()
});
