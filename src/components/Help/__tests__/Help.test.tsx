import React from 'react'
import {cleanup, render} from '@testing-library/react'
import Help from '../Help'
import {EventStreamRegistryMetadata} from "../../../types/TableInfo";

afterEach(cleanup);

it('Help snapshot test', () => {
    const metadataInfo: EventStreamRegistryMetadata = {
        "topic": {
            "numeric": new Set(["t_num_1", "t_num_2"]),
            "string": new Set(["t_str_1"]),
            "url": new Set(["u_1"]),
        },
        "service": {
            "numeric": new Set(["s_num_1", "s_num_2"]),
            "string": new Set(),
            "url": new Set(),
        },
    };

    const {asFragment} = render(<Help metadataInfo={metadataInfo}/>);

    // @ts-ignore
    expect(asFragment(<Help />)).toMatchSnapshot()
});
