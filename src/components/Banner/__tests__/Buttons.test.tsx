import React from 'react'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import Buttons, {GRAPH_ICON, HELP_ICON, SERVICE_TABLE_ICON, TOPIC_TABLE_ICON} from '../Buttons'
import {View} from "../../../types/TableInfo";

afterEach(cleanup);

it('should take a snapshot', () => {
    const mockOnClick = jest.fn();

    const {asFragment} = render(<Buttons setView={mockOnClick} view={View.GRAPH}/>);

    // @ts-ignore
    expect(asFragment(<Buttons setView={mockOnClick} view={View.GRAPH}/>)).toMatchSnapshot()
});

it('should set button clicked based on view', () => {
    render(<Buttons setView={jest.fn()} view={View.GRAPH}/>);
    expect(screen.getByText(GRAPH_ICON)).toHaveClass("clicked");
    expect(screen.getByText(SERVICE_TABLE_ICON)).not.toHaveClass("clicked");
    expect(screen.getByText(TOPIC_TABLE_ICON)).not.toHaveClass("clicked");
    expect(screen.getByText(HELP_ICON)).not.toHaveClass("clicked");
});

it('onClick test', () => {
    let handleClick = jest.fn();
    render(<Buttons setView={handleClick} view={View.GRAPH}/>);
    fireEvent.click(screen.getByText(TOPIC_TABLE_ICON));
    expect(handleClick).toBeCalledWith(View.TOPICS);
    expect(handleClick).toBeCalledTimes(1);
});
