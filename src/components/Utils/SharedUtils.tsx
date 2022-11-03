import {Status, EventStreamRegistryNode, StatusColors} from "../../types/EventStreamRegistryType";

/**
 * Returns a color based on the metadata status
 * @param {Status} status - a metadata field status
 * @return {string} - a HTML color
 */
export const statusColor = (status?: Status): string => {
    switch (status) {
        case Status.BAD:
            return StatusColors.BAD;
        case Status.GOOD:
            return StatusColors.GOOD;
        default:
            return StatusColors.NO_STATUS
    }
};

/**
 * Returns the status of a node.
 * A node is healthy if the all metadata fields have a healthy or undefined status
 *
 * @param {EventStreamRegistryNode} node - a node
 * @return {string} - the node status - "GOOD" or "BAD"
 */
export const nodeStatus = (node: EventStreamRegistryNode): Status => {
    if (Object.values(node.metadata).length === 0) return Status.GOOD;
    return Object.values(node.metadata)
        .map(m => m.status == null ? Status.GOOD : m.status)
        .reduce((x, y) => x * y)
};

/**
 * Returns a color based on the status of a node.
 * A node is healthy if the all metadata fields have a healthy or undefined status
 *
 * @param {EventStreamRegistryNode} node - a node
 * @return {string} - a HTML color
 */
export const nodeColor = (node: EventStreamRegistryNode): string => {
    return statusColor(nodeStatus(node))
};

/**
 * Prettifies string values
 *
 * @param {string} text - an ugly string
 * @return {string} - a pretty string
 */
export const prettyString = (text: string): string => {
    return text.replace(/_/g, " ");
};
