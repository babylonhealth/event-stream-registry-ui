import * as React from "react";

import {IdHeader, MetadataHeader, StatusHeader, UrlHeader, IdCell, MetadataCell, StatusCell, UrlCell} from "./EventStreamRegistryTableCell";

import {MetadataFields} from "../../types/TableInfo";
import {EventStreamRegistryNode} from "../../types/EventStreamRegistryType";

import "./EventStreamRegistryTable.scss"


type EventStreamRegistryTableProps = {
    nodes: EventStreamRegistryNode[]
    tableInfo: MetadataFields
}

/**
 * Renders a html table of node information.
 * The EventStreamRegistry table implements either TOPIC nodes or SERVICE nodes.
 *
 * @param {EventStreamRegistryNode[]} nodes - a list of nodes
 * @param {MetadataFields} tableInfo - the set of numeric, string, and url of either SERVICE or TOPIC metadata fields
 */
const EventStreamRegistryTable = ({nodes, tableInfo}: EventStreamRegistryTableProps) => {

    const numericFields: string[] = Array.from(tableInfo.numeric);
    const stringFields: string[] = Array.from(tableInfo.string);
    const urlFields: string[] = Array.from(tableInfo.url);

    return (
        <div className="event-registry-table">
            <table>
                <thead>
                <tr>
                    <IdHeader/>
                    <StatusHeader/>
                    {urlFields.map((field, i) => <UrlHeader key={i}/>)}
                    {stringFields.map((field, i) => <MetadataHeader key={i} name={field}/>)}
                    {numericFields.map((field, i) => <MetadataHeader key={i} name={field}/>)}
                </tr>
                </thead>
                <tbody>
                {nodes
                    .sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
                    .map((node, i) =>
                        <tr key={i}>
                            <IdCell id={node.id}/>
                            <StatusCell node={node}/>
                            {urlFields.map((field, j) =>
                                <UrlCell key={j} url={node.urls.find(l => l.name === field)}/>)}
                            {stringFields.map((field, j) =>
                                <MetadataCell key={j} metadata={node.metadata[field]}/>)}
                            {numericFields.map((field, j) =>
                                <MetadataCell key={j} metadata={node.metadata[field]}/>)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EventStreamRegistryTable;
