import * as React from "react";
import {useState} from "react";

import Legend from "./Legend";
import EventStreamRegistryGraph from "./EventStreamRegistryGraph";
import NodeInformation from "./NodeInformation";

import {EventStreamRegistryNode, EventStreamRegistryType} from "../../types/EventStreamRegistryType";

import "./EventStreamRegistryGraphContainer.scss";
import Helper from "./Helper";


type GraphContainerProps = {
    filteredNodes: string[];
    eventStreamRegistry: EventStreamRegistryType;
};

/**
 * Renders the Event Stream Registry graph, a mathematical graph representing the connectedness of
 * services and nodes in the Event Stream Registry
 *
 * @param eventStreamRegistry - the Event Stream Registry dataset
 * @param {string[]} filteredNodes - list of nodes that meet the parameters specified in the query text
 * @constructor
 */
const EventStreamRegistryGraphContainer = ({eventStreamRegistry, filteredNodes}: GraphContainerProps) => {

    const [selectedNode, setSelectedNode] = useState<EventStreamRegistryNode|undefined>(undefined);
    return (
        <div className={"event-registry-graph"}>
            <Legend/>
            <Helper nodeSelected={selectedNode != null}/>
            {selectedNode ? <NodeInformation node={selectedNode}/> : null}
            <EventStreamRegistryGraph
                filteredNodes={filteredNodes}
                onSelectNode={setSelectedNode}
                eventStreamRegistry={eventStreamRegistry}/>
        </div>
    );
};

export default EventStreamRegistryGraphContainer;
