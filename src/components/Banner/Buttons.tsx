import * as React from "react";

import {View} from "../../types/TableInfo";
import {Dispatch} from "react";

import "./Buttons.scss"


type ButtonProps = {
    icon: string,
    clicked: boolean,
    view: View,
    setView: Dispatch<React.SetStateAction<View>>
}

type ButtonsProps = {
    view: View,
    setView: Dispatch<React.SetStateAction<View>>
}

export const GRAPH_ICON = "bubble_chart";
export const TOPIC_TABLE_ICON = "fiber_manual_record";
export const SERVICE_TABLE_ICON = "crop_din";
export const HELP_ICON = "help_outline";
/**
 * Renders buttons that allows users to change the Event Stream Registry view
 * @param {View} view - the current Event Stream Registry view
 * @param {Dispatch<React.SetStateAction<View>>} setView - callback that sets the state of view
 * @constructor
 */
const Buttons = ({view, setView}: ButtonsProps) =>
    <div className={"buttons"}>
        <Button icon={GRAPH_ICON} clicked={view === View.GRAPH} view={View.GRAPH} setView={setView}/>
        <Button icon={TOPIC_TABLE_ICON} clicked={view === View.TOPICS} view={View.TOPICS} setView={setView}/>
        <Button icon={SERVICE_TABLE_ICON} clicked={view === View.SERVICES} view={View.SERVICES} setView={setView}/>
        <Button icon={HELP_ICON} clicked={view === View.HELP} view={View.HELP} setView={setView}/>
    </div>;

/**
 * Renders single button
 *
 * @param {string} icon - the material-ui icon
 * @param {boolean} clicked - determines is button is in clicked state, used in setting the className
 * @param {View} view - Event Stream Registry view associated with this button
 * @param {Dispatch<React.SetStateAction<View>>} setView - callback that sets the state of view
 * @constructor
 */
const Button = ({icon, clicked, view, setView}: ButtonProps) =>
    <span className={"material-icons" + (clicked ? " clicked" : "")}
          onClick={() => setView(view)}>{icon}
    </span>;

export default Buttons;
