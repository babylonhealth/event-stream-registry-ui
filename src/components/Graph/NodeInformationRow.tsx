import * as React from "react";

import "./NodeInformation.scss";

type NodeInformationRowProps = {
    fieldKey: string,
    value: string,
    color: string
    url?: string
}

/**
 * Renders a metadata field for a node
 * @param fieldKey - the metadata key
 * @param value - the metadata key
 * @param color - the color based on the node status
 * @param url - the metadata url
 * @constructor
 */
const NodeInformationRow = ({fieldKey, value, color, url}: NodeInformationRowProps) => {
    return (
        <div className={"row"}>
            <div className={"key"}>
                <p>{fieldKey}</p>
            </div>
            <div className={"value"}>
                {url ?
                    <a target="_blank" rel="noopener noreferrer" href={url}>{value}</a>
                    :
                    <p style={{color: color}}>{value}</p>
                }
            </div>
        </div>
    )
};

export default NodeInformationRow;
