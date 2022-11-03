import {EventStreamRegistryType, EventStreamRegistryNode, Status} from "../../types/EventStreamRegistryType";
import {EventStreamRegistryMetadata, QueryParameter} from "../../types/TableInfo";
import {getNodeIds} from "./Utils";
import {nodeStatus} from "../Utils/SharedUtils";
import {sha1} from "object-hash"
import NodeCache from "node-cache"

const ID: string = "id";
const STATUS: string = "status";

/**
 * Filters nodes based on the query text.
 * @param {EventStreamRegistryType} eventStreamRegistry - the Event Stream Registry dataset
 * @param {string} queryText - query string used to filter nodes based on node characteristics
 * @param {EventStreamRegistryMetadata} metadataInfo - the set of numeric, string, and url of all node metadata fields
 * @return {string[]} - list of nodes that meet the parameters specified in the query text
 */

const QUERY_CACHE: NodeCache = new NodeCache();
const CACHE_TTL = 60*5;

export const filterNodesByQueryText = (eventStreamRegistry: EventStreamRegistryType,
                                       queryText: string,
                                       metadataInfo: EventStreamRegistryMetadata): string[] => {

    let parameters = getQueryParameters(queryText);
    let shaParams = sha1(parameters);

    let result: string[] | undefined = QUERY_CACHE.get(shaParams);
    if (result) return result;

    if (parameters.length === 0) {
        const filtered = getNodeIds(eventStreamRegistry);
        QUERY_CACHE.set(shaParams, filtered, CACHE_TTL);
        return filtered;
    }
    const filtered = filterNodes(eventStreamRegistry.nodes, parameters, metadataInfo);
    QUERY_CACHE.set(shaParams, filtered, CACHE_TTL);
    return filtered
};

/**
 * Retrieves query parameters based on query text
 * @param queryText - query string used to filter nodes based on node characteristics
 * @return QueryParameter[] - list of query parameters used to filter Event Stream Registry nodes
 */
const getQueryParameters = (queryText: string): QueryParameter[] => {
    return queryText.trim().toLowerCase().split(" ")
        .map(params => params.split(/(<=|>=|<|>|=)/))
        .filter(x => x[2] !== "" && x[2] !== undefined)
        .map((n) => {
            return {"key": n[0], "value": n[2], "operation": n[1]}
        });
};

/**
 * Filters a list of nodes based on the list of query parameters.
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @param {QueryParameter[]} parameters - a list of query parameters used to filter nodes
 * @param {EventStreamRegistryMetadata} metadataInfo - the set of numeric, string, and url of all node metadata fields
 * @return {string[]} - list of nodes that meet the parameters specified in the query text
 */
const filterNodes = (nodes: EventStreamRegistryNode[], parameters: QueryParameter[], metadataInfo: EventStreamRegistryMetadata): string[] => {
    let filteredById = filterById(nodes, parameters);
    let filteredByStatus = filterByStatus(nodes, parameters);
    let filteredByMetadata = filterByMetadata(nodes, parameters, metadataInfo);
    let filteredNodes = intersectSets([filteredById, filteredByStatus, filteredByMetadata]);
    return Array.from(filteredNodes).map(n => n.id);
};

/**
 * Filters nodes based on id.
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @param {QueryParameter[]} parameters - a list of query parameters used to filter nodes
 * @return {Set<EventStreamRegistryNode>} - a list of nodes that meet the id parameter, if specified in the query text
 */
const filterById = (nodes: EventStreamRegistryNode[], parameters: QueryParameter[]): Set<EventStreamRegistryNode> => {
    // Extract parameter for node id
    let id = parameters.find(param => param.key === ID);
    if (id === undefined) return new Set(nodes);
    return new Set(nodes.filter(node => node.id.includes(id?.value || "")));
};


/**
 * Filters nodes based on node status.
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @param {QueryParameter[]} parameters - a list of query parameters used to filter nodes
 * @return {Set<EventStreamRegistryNode>} - a list of nodes that meet the status parameter, if specified in the query text
 */
const NODE_STATUS_MAPPING: Map<string, number> = new Map<string, number>();
NODE_STATUS_MAPPING.set("GOOD", 1);
NODE_STATUS_MAPPING.set("BAD", 0);

const filterByStatus = (nodes: EventStreamRegistryNode[], parameters: QueryParameter[]): Set<EventStreamRegistryNode> => {
    let status = parameters.find(param => param.key === STATUS);
    if (status && Object.values(Status).includes(status.value.toUpperCase())) {
        let filteredNodes = nodes
            .filter(node => nodeStatus(node) === NODE_STATUS_MAPPING.get(status?.value.toUpperCase() || ""));
        if (filteredNodes.length > 0) return new Set(filteredNodes);
    }
    return new Set(nodes)
};

/**
 * Filters nodes based on metadata fields.
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @param {QueryParameter[]} parameters - a list of query parameters used to filter nodes
 * @param {EventStreamRegistryMetadata} metadataInfo - the set of numeric, string, and url fields of all node metadata fields
 * @return {Set<EventStreamRegistryNode>} - a list of nodes that meet the metadata parameters, if specified in the query text
 */
const filterByMetadata = (nodes: EventStreamRegistryNode[], parameters: QueryParameter[], metadataInfo: EventStreamRegistryMetadata): Set<EventStreamRegistryNode> => {

    // Extract parameters for metadata fields
    let filteredParameters = parameters.filter(p => ![ID, STATUS].includes(p.key));
    if (filteredParameters.length === 0) return new Set(nodes);

    const filterNodes = (nodes: EventStreamRegistryNode[], params: QueryParameter[], metadataInfo: EventStreamRegistryMetadata): EventStreamRegistryNode[] => {
        if (params.length === 0) return nodes;
        let param = params[0];
        params.shift();
        if (isNumericField(param.key, metadataInfo)) {
            let filtered = nodes
                .filter(n => n.metadata.hasOwnProperty(param.key))
                .filter(n => {
                    let nodeValue: number = Number(n.metadata[param.key].value);
                    let paramValue: number = Number(param.value);
                    switch (param.operation) {
                        case ("="):
                            return nodeValue === paramValue;
                        case ("<"):
                            return nodeValue < paramValue;
                        case ("<="):
                            return nodeValue <= paramValue;
                        case (">"):
                            return nodeValue > paramValue;
                        case (">="):
                            return nodeValue >= paramValue;
                        default:
                            return 0;
                    }
                });
            return filterNodes(filtered, params, metadataInfo)
        } else if (isStringField(param.key, metadataInfo)) {
            let filtered = nodes
                .filter(n => n.metadata.hasOwnProperty(param.key)
                    && String(n.metadata[param.key].value).toLowerCase().includes(param.value));
            return filterNodes(filtered, params, metadataInfo)
        } else {
            return filterNodes(nodes, params, metadataInfo)
        }
    };

    return new Set(filterNodes(nodes, filteredParameters, metadataInfo))
};

/**
 * Determines if a field is a numeric field
 * @param {string} field - the field name
 * @param {EventStreamRegistryMetadata} metadataInfo - the set of numeric, string, and url fields of all node metadata fields
 * @return {boolean} - returns true if field is a numeric field
 */
const isNumericField = (field: string, metadataInfo: EventStreamRegistryMetadata): boolean => {
    return metadataInfo.service.numeric.has(field) || metadataInfo.topic.numeric.has(field)
};

/**
 * Determines if a field is a string field
 * @param {string} field - the field name
 * @param {EventStreamRegistryMetadata} metadataInfo - the set of numeric, string, and url fields of all node metadata fields
 */
const isStringField = (field: string, metadataInfo: EventStreamRegistryMetadata): boolean => {
    return metadataInfo.service.string.has(field) || metadataInfo.topic.string.has(field)
};

/**
 * Finds the intersect of a list of Sets
 * @param {Set<any>[]} sets - a list of sets
 * @return {Set<any>} - the intersect of all sets
 */
const intersectSets = (sets: Set<any>[]): Set<any> => {
    const _intersectSets = (setOne: Set<any>, setTwo: Set<any>): Set<any> => {
        let _intersect = new Set();
        setTwo.forEach(e => setOne.has(e) && _intersect.add(e));
        return _intersect
    };

    return sets.reduce((x, y) => _intersectSets(x, y));
};

