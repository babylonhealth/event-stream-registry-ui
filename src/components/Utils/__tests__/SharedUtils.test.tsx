import {nodeColor, nodeStatus, prettyString, statusColor} from "../SharedUtils";
import {EventStreamRegistryNode, MetadataType, NodeType, Status, StatusColors} from "../../../types/EventStreamRegistryType";

describe('pretty-string tests', () => {

    it('replaces all underscores with spaces', () => {
        expect(prettyString("value_with_underscores")).toEqual("value with underscores")
    });
});


describe('status-color tests', () => {

    it('good node status returns good status color', () => {
        expect(statusColor(Status.GOOD)).toEqual(StatusColors.GOOD)
    });

    it('bad node status returns bad status color', () => {
        expect(statusColor(Status.BAD)).toEqual(StatusColors.BAD)
    });

    it('undefined node status returns undefined status color', () => {
        expect(statusColor(undefined)).toEqual(StatusColors.NO_STATUS)
    });
});


describe('nodeStatus tests', () => {

    let node: EventStreamRegistryNode = {
            'id': 'topic1',
            'type': NodeType.TOPIC,
            'metadata': {
                "field1": {
                    "value": 0,
                    "type": MetadataType.NUMBER,
                    "url": undefined,
                    "status": undefined
                },
                "field2": {
                    "value": 0,
                    "type": MetadataType.NUMBER,
                    "url": undefined,
                    "status": undefined
                },
            },
            'urls': []
        };

    it('should return 1 if all statuses are undefined', () => {
        node.metadata['field1'].status = undefined;
        node.metadata['field2'].status = undefined;
        expect(nodeStatus(node)).toEqual(1)
    });

    it('should return 1 if all statuses are good and undefined', () => {
        node.metadata['field1'].status = Status.GOOD;
        node.metadata['field2'].status = undefined;
        expect(nodeStatus(node)).toEqual(1)
    });

    it('should return 1 if all statuses are good', () => {
        node.metadata['field1'].status = Status.GOOD;
        node.metadata['field2'].status = Status.GOOD;
        expect(nodeStatus(node)).toEqual(1)
    });

    it('should return 0 if any statuses is bad', () => {
        node.metadata['field1'].status = Status.BAD;
        node.metadata['field2'].status = Status.GOOD;
        expect(nodeStatus(node)).toEqual(0)
    });

    it('should return 1 if metadata is empty', () => {
        node.metadata = {};
        expect(nodeStatus(node)).toEqual(1)
    });
});

describe('nodeColor tests', () => {

    let node: EventStreamRegistryNode = {
        'id': 'topic1',
        'type': NodeType.TOPIC,
        'metadata': {
            "field1": {
                "value": 0,
                "type": MetadataType.NUMBER,
                "url": undefined,
                "status": undefined
            },
            "field2": {
                "value": 0,
                "type": MetadataType.NUMBER,
                "url": undefined,
                "status": undefined
            },
        },
        'urls': []
    };

    it('should return "green" if all statuses are undefined', () => {
        node.metadata['field1'].status = undefined;
        node.metadata['field2'].status = undefined;
        expect(nodeColor(node)).toEqual("#008000")
    });

    it('should return "green" if all statuses are good and undefined', () => {
        node.metadata['field1'].status = Status.GOOD;
        node.metadata['field2'].status = undefined;
        expect(nodeColor(node)).toEqual("#008000")
    });

    it('should return "green" if all statuses are good', () => {
        node.metadata['field1'].status = Status.GOOD;
        node.metadata['field2'].status = Status.GOOD;
        expect(nodeColor(node)).toEqual("#008000")
    });

    it('should return "red" if any statuses is bad', () => {
        node.metadata['field1'].status = Status.BAD;
        node.metadata['field2'].status = Status.GOOD;
        expect(nodeColor(node)).toEqual("#FF0000")
    });
});
