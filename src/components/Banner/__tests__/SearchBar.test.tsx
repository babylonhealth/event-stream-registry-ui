import React from 'react'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'
import SearchBar from "../SearchBar";

afterEach(cleanup);

it('should take a snapshot', () => {
    const {asFragment} = render(<SearchBar text={""} onTextChange={jest.fn()}/>);

    // @ts-ignore
    expect(asFragment(<SearchBar text={""} onTextChange={jest.fn()}/>)).toMatchSnapshot()
});

it('should set button clicked based on view', () => {
    const onTextChange = jest.fn();
    render(<SearchBar text={""} onTextChange={onTextChange}/>);
    const input = screen.getByLabelText("search-bar")
    expect(input.placeholder).toBe("SEARCH... (or type help)");
    fireEvent.click(input, {target: {value: "blah"}});
    expect(input.value).toBe("blah");
});
