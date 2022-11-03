import * as React from "react";

import EventStreamRegistryTable from "../Table/EventStreamRegistryTable";
import EventStreamRegistryGraphContainer from "../Graph/EventStreamRegistryGraphContainer";
import Help from "../Help/Help"

import {EventStreamRegistryType, NodeType} from "../../types/EventStreamRegistryType";
import {EventStreamRegistryMetadata, View} from "../../types/TableInfo";

type EventStreamRegistryRouterProps = {
    eventStreamRegistry: EventStreamRegistryType,
    metadataInfo: EventStreamRegistryMetadata,
    filteredNodes: string[],
    view: View
}


/**
 * Renders the relevant Event Stream Registry component based on the set [View]{@link View}.
 * @param {EventStreamRegistryType} eventStreamRegistry - the Event Stream Registry data
 * @param {EventStreamRegistryMetadata} metadataInfo -  - the set of numeric, string, and url of all SERVICE and TOPIC metadata fields
 * @param {string[]} filteredNodes - a list of node ids that meet the parameters specified by the query text
 * @param {View} view - the Event Stream Registry view to render
 * @constructor
 */
const EventStreamRegistryRouter = ({eventStreamRegistry, metadataInfo, filteredNodes, view}: EventStreamRegistryRouterProps) => {
    const filterNodes =  (nodeType: NodeType) => eventStreamRegistry.nodes.filter(n => n.type === nodeType)
        .filter(n => filteredNodes.includes(n.id) );

    switch (view) {
        case View.TOPICS:
            return <EventStreamRegistryTable
                nodes={filterNodes(NodeType.TOPIC)}
                tableInfo={metadataInfo.topic}/>;
        case View.SERVICES:
            return <EventStreamRegistryTable
                nodes={filterNodes(NodeType.SERVICE)}
                tableInfo={metadataInfo.service}/>;
        case View.HELP:
            return<Help metadataInfo={metadataInfo}/>;
        default:
            return <EventStreamRegistryGraphContainer
                filteredNodes={filteredNodes}
                eventStreamRegistry={eventStreamRegistry}
            />
    }
};

export default React.memo(EventStreamRegistryRouter);
