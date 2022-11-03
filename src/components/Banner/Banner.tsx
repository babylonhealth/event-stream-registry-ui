import * as React from "react";
import {View} from "../../types/TableInfo";
import {Dispatch} from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";

type BannerProps = {
    queryText: string,
    onQueryTextChange: (x: React.ChangeEvent<HTMLInputElement>) => void
    view: View,
    setView: Dispatch<React.SetStateAction<View>>
}

/**
 * Renders a banner that contains the search bar and butons which allows the user to
 * to filter nodes and change the Event Stream Registry view
 * @param {string} text - the input text
 * @param {(x) => void} onQueryTextChange - the action triggered on a change of the input
 * @param {View} view - the current Event Stream Registry view
 * @param {Dispatch<React.SetStateAction<View>>} setView - callback that sets the state of view
 * @constructor
 */
const Banner = ({queryText, onQueryTextChange, view, setView}: BannerProps) =>
    <nav>
        <SearchBar onTextChange={onQueryTextChange} text={queryText}/>
        <Buttons view={view} setView={setView}/>
    </nav>;

export default Banner;
