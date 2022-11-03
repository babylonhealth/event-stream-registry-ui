/**
 * The Event Stream Registry dataset.
 *
 * @param node - contains the set of services and topics in the Event Stream Registry.
 * @param links - defines the connectedness of the nodes.
 * @type {EventStreamRegistryType}
 */
export interface EventStreamRegistryType {
    nodes: EventStreamRegistryNode[],
    links: EventStreamRegistryLink[]
}

/**
 * A single Event Stream Registry node - either a topic or a service.
 *
 * @param id - the node id
 * @param type - the node type, either "SERVICE" or "TOPIC"
 * @param metadata - a map node metadata, the key is the metadata name, the value is a Metadata object
 * @param urls - a list of associated node urls
 * @type {EventStreamRegistryNode}
 * */
export interface EventStreamRegistryNode {
    id: string,
    type: NodeType,
    metadata: Record<string, Metadata>,
    urls: Url[],
}

/**
 * A metadata value.
 *
 * @param value - the metadata value
 * @param type - either 'NUMBER' or 'STRING', the metadata type, the type defines allowed filtering operations
 * @param url? - an associated url, renders values as links
 * @param status? - either 'GOOD' or 'BAD', indicates the "health" of a metric, e.g. a high consumer lag might be
 * consider 'unhealthy` of `BAD`, renders values `green` and `red`.
 * @type {Metadata}
 * */
export interface Metadata {
    "value": string | number,
    "type": MetadataType
    "url": string | undefined
    "status": Status | undefined
}

/**
 * An associated service or topic url.
 *
 * @param name - the name of the url, e.g. grafana
 * @param value - the url, e.g. https://my.grafana.co.uk/event-stream-dashboard/my-topic
 * @param icon? - a material ui icon to render urls, if null urls are rendered as 'launch' icon
 * @type {Url}
 * */
export interface Url {
    "name": string,
    "value": string,
    "icon": string | undefined
}

/**
 * Defines a link between two nodes
 *
 * @param source - the node id of the source
 * @param target - the node id of the target
 * @type {EventStreamRegistryLink}
 * */
export interface EventStreamRegistryLink {
    source: string,
    target: string,
}

export enum MetadataType {
    "NUMBER" = "NUMBER",
    "STRING" = "STRING"
}

export enum Status {
    "BAD",
    "GOOD",
}

export enum StatusColors {
    BAD = "#FF0000",
    GOOD = "#008000",
    NO_STATUS = "#000000",
}

export enum NodeType {
    "TOPIC" = "TOPIC",
    "SERVICE" = "SERVICE"
}
