import * as React from 'react';
import {useEffect, useState} from 'react';

import debounce from "lodash.debounce"
import useConstant from "use-constant";

import EventStreamRegistryRouter from "./EventStreamRegistryRouter";

import {getNodeIds} from "./Utils";
import {getMetadataInfo} from "./UtilsMetadataInfo";
import {filterNodesByQueryText} from "./UtilsFilterNodes";

import {EventStreamRegistryType} from "../../types/EventStreamRegistryType"
import {EventStreamRegistryMetadata, View} from "../../types/TableInfo";

import "./EventStreamRegistryComponent.scss"
import Banner from "../Banner/Banner";


type EventStreamRegistryComponentProps = {
    eventStreamRegistry: EventStreamRegistryType,
}

/**
 * Renders the Event Stream Registry, a UI that provides observability and monitoring of
 * event-streaming infrastructures.
 * @see TODO - link to article
 * @version 0.0.1
 * @author Robert Manteghi
 *
 * @param {EventStreamRegistryType} eventStreamRegistry - The Event Stream Registry data
 * @return {void}
 */
function EventStreamRegistryComponent({eventStreamRegistry}: EventStreamRegistryComponentProps) {

    const [metadataInfo, setMetadataInfo] = useState<EventStreamRegistryMetadata>(() => getMetadataInfo(eventStreamRegistry));
    const [queryText, setQueryText] = useState("");
    const [filteredNodes, setFilteredNodes] = useState<string[]>(() => getNodeIds(eventStreamRegistry));
    const [view, setView] = useState<View>(View.GRAPH);

    useEffect(() => {
        const metadataInfo = getMetadataInfo(eventStreamRegistry);
        setMetadataInfo(metadataInfo)
    }, [eventStreamRegistry]);

    async function onQueryTextChange (e: React.ChangeEvent<HTMLInputElement>) {
        setQueryText(e.target.value);
        await updateBasedOnQueryText(e.target.value)
    }

    const updateBasedOnQueryText = useConstant(() =>
        debounce(queryText => {
            getViewFromQueryText(queryText);
            let filteredNodes = filterNodesByQueryText(eventStreamRegistry, queryText, metadataInfo);
            setFilteredNodes(filteredNodes)
        }, 500));

    const getViewFromQueryText = (queryText: string) => {
        let firstWord = queryText.split(" ")[0].toUpperCase();
        if (Object.keys(View).includes(firstWord)) {
            setView(View[firstWord as keyof typeof View])
        }
    };

    return (
        <div className={"event-registry"}>
            <Banner onQueryTextChange={onQueryTextChange} queryText={queryText} view={view} setView={setView}/>
            <EventStreamRegistryRouter filteredNodes={filteredNodes} eventStreamRegistry={eventStreamRegistry} metadataInfo={metadataInfo}
                                 view={view}/>
        </div>
    );
}

export default EventStreamRegistryComponent;
