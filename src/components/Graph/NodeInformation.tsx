import * as React from "react";
import "./NodeInformation.scss"
import {EventStreamRegistryNode, StatusColors} from "../../types/EventStreamRegistryType";
import NodeInformationRow from "./NodeInformationRow";
import NodeInformationLink from "./NodeInformationLink";
import {prettyString, statusColor} from "../Utils/SharedUtils";


type NodeInformationProps = {
    node: EventStreamRegistryNode
}

/**
 * Renders node information
 * @param {EventStreamRegistryNode} node - an Event Stream Registry
 * @constructor
 */
const NodeInformation = ({node}: NodeInformationProps) => {
    return (
        <div className={"node-information"}>
            <NodeInformationRow fieldKey={"ID"} value={node.id} color={StatusColors.NO_STATUS}/>
            {Object.entries(node.metadata)
                .map((n, i) =>
                    <NodeInformationRow key={i}
                                        fieldKey={prettyString(n[0]).toUpperCase()}
                                        url={n[1].url}
                                        value={String(n[1].value)}
                                        color={statusColor(n[1].status)}/>)}
            {node.urls.map((n, i) =>
                <NodeInformationLink key={i}
                                     fieldKey={prettyString(n.name).toUpperCase()}
                                     value={n.value}/>)}
        </div>
    )
};

export default NodeInformation;
