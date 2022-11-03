import * as React from "react";
import {nodeColor, prettyString, statusColor} from "../Utils/SharedUtils";

import {Metadata, EventStreamRegistryNode, Url} from "../../types/EventStreamRegistryType";

import "./EventStreamRegistryTable.scss"


const NO_METADATA = "";
const NO_ICON = "launch";
const STATUS_ICON = "circle";

type IdCellProps = {
    id: string
}

type MetadataCellProps = {
    metadata?: Metadata
}

type StatusCellProps = {
    node: EventStreamRegistryNode
}

type UrlCellProps = {
    url?: Url
}

type MetadataHeaderProps = {
    name: string
}

/**
 * Renders the header for the id column
 * @constructor
 */
const IdHeader = () => <th scope="col" className={"id"}/>;

/**
 * Renders the header for the status column
 * @constructor
 */
const StatusHeader = () => <th scope="col" className={"status"}/>;

/**
 * Renders a header for the url columns
 * @constructor
 */
const UrlHeader = () => <th scope="col" className={"url"}/>;

/**
 * Renders a header for the metadata columns
 * @param {string} name - the name of the column
 * @constructor
 */
const MetadataHeader = ({name}: MetadataHeaderProps) =>
    <th scope="col" className={"metadata"}>{prettyString(name)}</th>;

/**
 * Renders a cell for the id field
 * @param {string} id - the node id
 * @constructor
 */
const IdCell = ({id}: IdCellProps) => <td className={"id"}>{id}</td>;

/**
 * Renders a cell for the node status field
 * @param {EventStreamRegistryNode} node - an Event Stream Registry node
 * @constructor
 */
const StatusCell = ({node}: StatusCellProps) =>
    <td className={"status"}>
        <span style={{color: nodeColor(node)}} className="material-icons icon">{STATUS_ICON}</span>
    </td>;

/**
 * Renders a cell for a metadata field
 * @param {Metadata?} metadata - a metadata field of an Event Stream Registry node
 * @constructor
 */
const MetadataCell = ({metadata}: MetadataCellProps) =>
    <td className={"metadata"} style={{color: statusColor(metadata?.status)}}>
        {metadata?.url
            ? <a href={metadata.url} target="_blank" rel="noopener noreferrer">{metadata.value}</a>
            : String(metadata ? metadata?.value : NO_METADATA)
        }
        <span className={"tooltip"}>{String(metadata ? metadata?.value : NO_METADATA)}</span>
    </td>;

/**
 * Renders a cell for a url field
 * @param {Url?} url - a url field of an Event Stream Registry node
 * @constructor
 */
const UrlCell = ({url}: UrlCellProps) =>
    <td className={"url"}>
        {url
            ?
            <>
                <a href={url.value || ""} target="_blank" rel="noopener noreferrer">
                    <span className="material-icons icon">{url.icon ? url.icon : NO_ICON}</span>
                </a>
                <span className={"tooltip"}>{prettyString(url.name)}</span>
            </>
            : null
        }
    </td>;

export {UrlHeader, MetadataHeader, StatusHeader, IdHeader, IdCell, StatusCell, MetadataCell, UrlCell};
