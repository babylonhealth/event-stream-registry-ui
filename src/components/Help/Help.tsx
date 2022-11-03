import * as React from "react";

import {EventStreamRegistryMetadata} from "../../types/TableInfo";
import "./Help.scss"
import {ReactNode} from "react";

type HelpProps = {
    metadataInfo: EventStreamRegistryMetadata,
}

type BulletPointItemProps = {
    title: ReactNode,
    desc: ReactNode,
}

type CompositionProps = {
    children: ReactNode,
}


const BulletPointItem = ({title, desc}: BulletPointItemProps) => {
    return (
        <li>
            <dl>{title}</dl>
            <dt>{desc}
            </dt>
        </li>
    )
};

const BulletPointList = ({children}: CompositionProps) => {
    return (
        <ul>
            {children}
        </ul>
    )
};

const HelpContainer = ({children}: CompositionProps) => {
    return (
        <div className={"box"}>
            {children}
        </div>
    )
};

const Help = ({metadataInfo}: HelpProps) => {
    return (
        <div className={"help"}>

            <HelpContainer>
                <p>The Event Stream Registry UI is a tool for observing and monitoring event-streams.</p>
            </HelpContainer>

            <HelpContainer>
                <h1>VIEW COMMANDS</h1>
                <p>There are four views of the Event Stream Registry UI</p>
                <BulletPointList>
                    <BulletPointItem
                        title={<>GRAPH</>}
                        desc={<>Node graph diagram showing the connectedness of services and topics in the Event
                            Registry</>}/>
                    <BulletPointItem
                        title={<>TOPICS</>}
                        desc={<>Table of Event Stream Registry topic information</>}/>
                    <BulletPointItem
                        title={<>SERVICES</>}
                        desc={<>Table of Event Stream Registry service information</>}/>
                    <BulletPointItem
                        title={<>HELP</>}
                        desc={<>Information on how to use the Event Stream Registry</>}/>
                </BulletPointList>
                <p>You can switch view using the search bar by typing `topics`, `services`, `graph` and `help` or the buttons in the top right corner.</p>
            </HelpContainer>

            <HelpContainer>
                <h1>SEARCH PARAMETERS</h1>
                <p>The search bar can be used to filter <b>TOPICS</b> and <b>SERVICES</b>.</p>
                <BulletPointList>
                    <BulletPointItem
                        title={<>status=bad</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> in an unhealthy state</>}/>
                    <BulletPointItem
                        title={<>status=good</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> in a healthy state</>}/>
                    <BulletPointItem
                        title={<>id=dfh</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> where id is not null and id contains <i>"dfh"</i></>}/>
                    <BulletPointItem
                        title={<>partitions=6</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> where partitions is not null and partitions equals
                            6</>}/>
                    <BulletPointItem
                        title={<>offset&gt;100</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> where offset is not null and offset is greater
                            than 100</>}/>
                </BulletPointList>
                <p>You can also filter by multiple fields. When filtering by multiple fields the operations are
                    conjugated.</p>
                <BulletPointList>
                    <BulletPointItem
                        title={<>offset&gt;100 partition=6</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> where offset is not null and offset is greater
                            than 100 AND where partitions is not null and partitions is equal to 6 </>}/>
                    <BulletPointItem
                        title={<>id=dfh status=bad</>}
                        desc={<>Get <b>TOPICS</b> and <b>SERVICES</b> in an unhealthy state <b>AND</b> where id is not
                            null and id contains "dfh"</>}/>
                </BulletPointList>
                <p>The following operations are available for each field type:</p>
                <BulletPointList>
                    <BulletPointItem
                        title={<>NUMERIC FIELD</>}
                        desc={<> <b>=
                            &nbsp;&nbsp;&lt;
                            &nbsp;&nbsp;&lt;=
                            &nbsp;&nbsp;&gt;
                            &nbsp;&nbsp;&gt;=
                        </b></>}/>
                    <BulletPointItem
                        title={<>STRING FIELD</>}
                        desc={<><b>=</b>
                            &nbsp;&nbsp;&nbsp;
                            <span><i>evaluted as contains, i.e. id=abc equates to the string `abc` is contained within
                                the id</i></span></>}/>
                </BulletPointList>
                <p>You can only filter by known fields. The list of known fields is shown below. </p>
            </HelpContainer>

            <HelpContainer>
                <div className={"fields"}>
                    <h1>TOPIC FIELDS</h1>
                    <div className={"node-type"}>
                        <h3>NUMERIC</h3>
                        <BulletPointList>
                            {Array.from(metadataInfo.topic.numeric).map((field, i) => <li key={i}
                                                                                          className={"field"}>{field}</li>)}
                        </BulletPointList>
                    </div>
                    <div className={"node-type left"}>
                        <h3>STRING</h3>
                        <BulletPointList>
                            <li className={"field"}>{"id"}</li>
                            {Array.from(metadataInfo.topic.string).map((field, i) =>
                                <li key={i}className={"field"}>{field}</li>)}
                        </BulletPointList>
                    </div>
                </div>
                <div className={"fields right"}>
                    <h1>SERVICE FIELDS</h1>
                    <div className={"node-type"}>
                        <h3>NUMERIC</h3>
                        <BulletPointList>
                            {Array.from(metadataInfo.service.numeric).map((field, i) =>
                                <li key={i} className={"field"}>{field}</li>)}
                        </BulletPointList>
                    </div>
                    <div className={"node-type"}>
                        <h3>STRING</h3>
                        <BulletPointList>
                            <li>{"id"}</li>
                            {Array.from(metadataInfo.service.string).map((field, i) => <li key={i}
                                                                                           className={"field"}>{field}</li>)}
                        </BulletPointList>
                    </div>
                </div>
            </HelpContainer>
        </div>
    )
};

export default Help;
