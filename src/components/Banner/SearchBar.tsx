import * as React from "react";

import "./SearchBar.scss"


type SearchBarProps = {
    text: string,
    onTextChange: (x: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Renders a search bar that allows users to filter nodes and change the Event Stream Registry view
 * @param {string} text - the input text
 * @param {(x) => void} onTextChange - the action triggered on a change of the input
 * @constructor
 */
const SearchBar = ({text, onTextChange}: SearchBarProps) =>
        <input type="text"
               value={text}
               placeholder="SEARCH... (or type help)"
               spellCheck={false}
               autoFocus
               aria-label={"search-bar"}
               onChange={onTextChange}/>;

export default SearchBar;
