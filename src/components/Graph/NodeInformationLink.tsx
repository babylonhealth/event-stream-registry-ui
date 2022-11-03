import * as React from "react";
import "./NodeInformation.scss";


type NodeInformationLinkProps = {
    fieldKey: string,
    value: string,
}

/**
 * Renders a url field for a node
 * @param {string} fieldKey - the url key
 * @param {string} value - the url
 * @constructor
 */
const NodeInformationLink = ({fieldKey, value}: NodeInformationLinkProps) => {
    return (
        <div className={"row"}>
            <div className={"key"}>
                <a href={value} target="_blank" rel="noopener noreferrer"><p>{fieldKey}</p></a>
            </div>
        </div>
    )
};

export default NodeInformationLink;
