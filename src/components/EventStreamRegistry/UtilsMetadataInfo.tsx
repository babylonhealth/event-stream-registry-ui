import {EventStreamRegistryType, MetadataType, EventStreamRegistryNode, NodeType} from "../../types/EventStreamRegistryType";

import {MetadataFields, EventStreamRegistryMetadata} from "../../types/TableInfo";


/**
 * Extracts metadata information from all nodes in the Event Stream Registry dataset.
 * This metadata information is used construct other components.
 *
 * @param {EventStreamRegistryType} eventStreamRegistry - Event Stream Registry dataset
 * @return {EventStreamRegistryMetadata} - the set of numeric, string, and url metadata fields for all SERVICE and TOPIC nodes
 */
export const getMetadataInfo = (eventStreamRegistry: EventStreamRegistryType): EventStreamRegistryMetadata => {
    const services = eventStreamRegistry.nodes.filter(node => node.type === NodeType.SERVICE);
    const topics = eventStreamRegistry.nodes.filter(node => node.type === NodeType.TOPIC);
    return {
        "service": getNodesMetadata(services),
        "topic": getNodesMetadata(topics)
    };
};

/**
 * Extracts the string, numeric and url metadata fields for a set of nodes
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @return {MetadataFields} - the set of all numeric, string and url metadata fields in the set of nodes
 */
const getNodesMetadata = (nodes: EventStreamRegistryNode[]): MetadataFields => {
    let numericFields = new Set<string>();
    let stringFields = new Set<string>();
    let urlFields = new Set<string>();

    nodes.forEach(node => {
        Object.entries(node.metadata).forEach(e =>
            e[1].type === MetadataType.NUMBER ? numericFields.add(e[0])
                : e[1].type === MetadataType.STRING ? stringFields.add(e[0])
                : console.error(
                    "%s contains metadata field %s has type %s. Allowed types are - %s",
                    node.id, e[0], e[1].type, Object.values(MetadataType).join(", ")
                ));

        node.urls.forEach(url => urlFields.add(url.name))

    });
    return {
        "numeric": numericFields,
        "string": stringFields,
        "url": urlFields,
    }
};
