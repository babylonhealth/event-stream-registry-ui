export type MetadataFields = {
    numeric: Set<string>,
    string: Set<string>,
    url: Set<string>
}

export type EventStreamRegistryMetadata = {
    topic: MetadataFields,
    service: MetadataFields
}
export type QueryParameter = {
    key: string,
    value: string
    operation: string
}
export enum View {
    "GRAPH"= "GRAPH",
    "SERVICES"= "SERVICES",
    "TOPICS"= "TOPICS",
    "HELP"= "HELP"
}

