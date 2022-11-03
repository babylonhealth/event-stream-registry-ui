import {getNodeIds} from "../Utils";
import {EventStreamRegistryType, NodeType} from "../../../types/EventStreamRegistryType";


describe('getNodeIds tests', () => {

    const eventStreamRegistry: EventStreamRegistryType = {
        'nodes': [
            {
                'id': '1',
                'type': NodeType.TOPIC,
                'metadata': {},
                'urls': []
            },
            {
                'id': '2',
                'type': NodeType.TOPIC,
                'metadata': {},
                'urls': []
            }
        ],
        'links': []
    };

    it('returns a list of node ids', () => {
        expect(getNodeIds(eventStreamRegistry)).toEqual(['1', '2'])
    });
});

