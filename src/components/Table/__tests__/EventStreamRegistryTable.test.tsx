import React from 'react'
import {cleanup, render} from '@testing-library/react'
import {MetadataFields} from "../../../types/TableInfo";
import EventStreamRegistryTable from "../EventStreamRegistryTable";
import {EventStreamRegistryNode, MetadataType, NodeType, Status} from "../../../types/EventStreamRegistryType";

afterEach(cleanup);

it('should take a snapshot', () => {

    const nodes: EventStreamRegistryNode[] = [
            {
                'id': 'topic1',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field_with_status_and_url": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": "www.example.co.uk",
                        "status": Status.GOOD
                    },
                    "numeric_metadata_field_with_status": {
                        "value": 1,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.BAD
                    },
                    "numeric_metadata_field_with_url": {
                        "value": 2,
                        "type": MetadataType.NUMBER,
                        "url": "www.example.co.uk",
                        "status": undefined
                    },
                    "string_metadata_field_with_status_and_url": {
                        "value": "0",
                        "type": MetadataType.STRING,
                        "url": "www.example.co.uk",
                        "status": Status.GOOD
                    },
                    "string_metadata_field_with_status": {
                        "value": "1",
                        "type": MetadataType.STRING,
                        "url": undefined,
                        "status": Status.BAD
                    },
                    "string_metadata_field_with_url": {
                        "value": "2",
                        "type": MetadataType.STRING,
                        "url": "www.example.co.uk",
                        "status": undefined
                    },
                },
                'urls': [
                    {
                        "name": "url_with_icon",
                        "value": "www.bablontech.co.uk",
                        "icon": "special_icon",
                    },
                    {
                        "name": "url_without_icon",
                        "value": "www.bablontech.co.uk",
                        "icon": undefined,
                    },
                ]
            },
            {
                'id': 'topic2',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field_with_status_and_url": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": "www.example.co.uk",
                        "status": Status.GOOD
                    },
                    "numeric_metadata_field_with_status": {
                        "value": 1,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.BAD
                    },
                    "numeric_metadata_field_with_url": {
                        "value": 2,
                        "type": MetadataType.NUMBER,
                        "url": "www.example.co.uk",
                        "status": undefined
                    }
                },
                'urls': []
            }
        ]
    ;

    const tableInfo: MetadataFields = {
        'numeric': new Set(["numeric_metadata_field"]),
        'string': new Set(["string_metadata_field"]),
        'url': new Set(),
    };

    const {asFragment} = render(<EventStreamRegistryTable nodes={nodes} tableInfo={tableInfo}/>);
    // @ts-ignore
    expect(asFragment(<EventStreamRegistryTable nodes={nodes} tableInfo={tableInfo}/>)).toMatchSnapshot()
});
