import * as React from "react";

import "./Legend.scss";


/**
 * Renders a legend for the Event Stream Registry graph
 * @constructor
 */
const Legend = () => {
    return (
        <div className="legend">
            <div>
                <span>TOPIC :</span>
                <i className="material-icons">fiber_manual_record</i>
            </div>
            <div>
                <span>SERVICE :</span>
                <i className="material-icons">crop_din</i>
            </div>
        </div>
    );
};

export default Legend;
