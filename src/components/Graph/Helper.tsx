import * as React from "react";
import {useEffect, useState} from "react";

import "./Helper.scss";

type HelperProps = {
    nodeSelected: boolean
}

/**
 * Renders a helpful text for the Event Stream Registry graph
 * @constructor
 */
const HELPER_MESSAGE: string  = "Try clicking a node..";

const Helper = ({nodeSelected}: HelperProps) => {

    const [nodeClicked, setNodeClicked] = useState<boolean>(false);

    useEffect(() => {
        if (nodeSelected) setNodeClicked(nodeSelected)
    }, [nodeSelected]);
    
    return (
        <div className="helper">
            {!nodeClicked ? <p>{HELPER_MESSAGE}</p> : null}
        </div>
    );
};

export default Helper;
