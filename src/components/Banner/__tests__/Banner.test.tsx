import React from 'react'
import {cleanup, render} from '@testing-library/react'
import Banner from '../Banner'
import {View} from "../../../types/TableInfo";

afterEach(cleanup);

it('should take a snapshot', () => {
    const {asFragment} = render(<Banner queryText={""} setView={jest.fn} onQueryTextChange={jest.fn()} view={View.GRAPH}/>);
    // @ts-ignore
    expect(asFragment(<Banner queryText={""} setView={jest.fn} onQueryTextChange={jest.fn()} view={View.GRAPH}/>))
        .toMatchSnapshot()
});
