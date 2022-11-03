import {EventStreamRegistryType, MetadataType, NodeType, Status} from "../../../types/EventStreamRegistryType";
import {filterNodesByQueryText} from "../UtilsFilterNodes";
import {EventStreamRegistryMetadata} from "../../../types/TableInfo";


describe('filter by id tests', () => {

    const eventStreamRegistry: EventStreamRegistryType = {
        'nodes': [
            {
                'id': 'topic1',
                'type': NodeType.TOPIC,
                'metadata': {},
                'urls': []
            },
            {
                'id': 'topic2',
                'type': NodeType.TOPIC,
                'metadata': {},
                'urls': []
            },
            {
                'id': 'service1',
                'type': NodeType.SERVICE,
                'metadata': {},
                'urls': []
            }
        ],
        'links': []
    };

    const metadataInfo: EventStreamRegistryMetadata = {
        'topic': {
            'numeric': new Set(),
            'string': new Set(),
            'url': new Set(),
        },
        'service': {
            'numeric': new Set(),
            'string': new Set(),
            'url': new Set(),
        }
    };

    it('should return a list of all topics and services ids that contain the id string', () => {
        let queryText = "id=1";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(['topic1', 'service1']);
    });

    it('should return an empty list topics or services ids if id string does not match', () => {
        let queryText = "id=nomatch";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual([]);
    });

    it('should return all topics or services ids if id string is empty', () => {
        let queryText = "id=";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1", "topic2", "service1"]);
    });

    it('should ignore case sensitivity', () => {
        let queryText = "ID=TOPIC1";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1"]);
    });
});

describe('filter by status tests', () => {

    const eventStreamRegistry: EventStreamRegistryType = {
        'nodes': [
            {
                'id': 'topic1',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.GOOD
                    }
                },
                'urls': []
            },
            {
                'id': 'topic2',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 1,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.BAD
                    }
                },
                'urls': []
            },
            {
                'id': 'service1',
                'type': NodeType.SERVICE,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": undefined
                    }
                },
                'urls': []
            }
        ],
        'links': []
    };

    const metadataInfo: EventStreamRegistryMetadata = {
        'topic': {
            'numeric': new Set(),
            'string': new Set(),
            'url': new Set(),
        },
        'service': {
            'numeric': new Set(),
            'string': new Set(),
            'url': new Set(),
        }
    };

    it('should return a list of all topics and services with a good or undefined status', () => {
        let queryText = "status=good";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(['topic1', 'service1']);
    });

    it('should return a list of topics or services ids with a bad status', () => {
        let queryText = "status=bad";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic2"]);
    });

    it('should return a full list of topics or services ids is status value is not known', () => {
        let queryText = "status=noknown";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1", "topic2", "service1"]);
    });

    it('should ignore case sensitivity', () => {
        let queryText = "STATUS=BAD";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic2"]);
    });
});

describe('filter by metadata tests', () => {

    const eventStreamRegistry: EventStreamRegistryType = {
        'nodes': [
            {
                'id': 'topic1',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.GOOD
                    },
                    "string_metadata_field": {
                        "value": "abc",
                        "type": MetadataType.STRING,
                        "url": undefined,
                        "status": undefined
                    },
                },
                'urls': []
            },
            {
                'id': 'topic2',
                'type': NodeType.TOPIC,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 1,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": Status.BAD
                    },
                    "string_metadata_field": {
                        "value": "cde",
                        "type": MetadataType.STRING,
                        "url": undefined,
                        "status": undefined
                    },
                },
                'urls': []
            },
            {
                'id': 'service1',
                'type': NodeType.SERVICE,
                'metadata': {
                    "numeric_metadata_field": {
                        "value": 0,
                        "type": MetadataType.NUMBER,
                        "url": undefined,
                        "status": undefined
                    },
                    "string_metadata_field": {
                        "value": "abh",
                        "type": MetadataType.STRING,
                        "url": undefined,
                        "status": undefined
                    },
                    "another_string_metadata_field": {
                        "value": "ijk",
                        "type": MetadataType.STRING,
                        "url": undefined,
                        "status": undefined
                    },
                },
                'urls': []
            }
        ],
        'links': []
    };

    const metadataInfo: EventStreamRegistryMetadata = {
        'topic': {
            'numeric': new Set(["numeric_metadata_field"]),
            'string': new Set(["string_metadata_field"]),
            'url': new Set(),
        },
        'service': {
            'numeric': new Set(["numeric_metadata_field"]),
            'string': new Set(["string_metadata_field", "another_string_metadata_field"]),
            'url': new Set(),
        }
    };

    it('should return a list of topic and service ids with equal numeric metadata value', () => {
        let queryText = "numeric_metadata_field=0";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(['topic1', 'service1']);
    });

    it('should return a list of topic and service ids with a matching metadata field greater than or equal to numeric metadata value', () => {
        let queryText = "numeric_metadata_field>=0";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1", "topic2", "service1"]);
    });

    it('should return a list of topic and service ids with a matching metadata field greater than numeric metadata value', () => {
        let queryText = "numeric_metadata_field>0";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic2"]);
    });

    it('should return a list of topic and service ids with a matching metadata field less than numeric metadata value', () => {
        let queryText = "numeric_metadata_field<1";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(['topic1', 'service1']);
    });

    it('should return a list of topic and service ids with a matching metadata field less than or equal to numeric metadata value', () => {
        let queryText = "numeric_metadata_field<=1";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1", "topic2", "service1"]);
    });

    it('should return a list of topic and service ids with matching metadata field contains string metadata value', () => {
        let queryText = "string_metadata_field=ab";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1",  "service1"]);
    });

    it('should remove all nodes taht do not have a known metadata field', () => {
        let queryText = "another_string_metadata_field=i";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["service1"]);
    });

    it('should ignore operation if metadata field is not known', () => {
        let queryText = "unknown_metadata_field=i";
        let result = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
        expect(result).toEqual(["topic1", "topic2", "service1"]);
    });
});
