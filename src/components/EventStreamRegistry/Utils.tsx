import {EventStreamRegistryType} from "../../types/EventStreamRegistryType";

/**
 * Returns the id of all nodes in the Event Stream Registry.
 * @param {EventStreamRegistryType} eventStreamRegistry - Event Stream Registry dataset
 * @return {string[]} - a list of node ids
 */
export const getNodeIds = (eventStreamRegistry: EventStreamRegistryType): string[] => eventStreamRegistry.nodes.map(n => n.id);
