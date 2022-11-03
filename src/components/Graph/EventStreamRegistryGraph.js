import React, {useEffect} from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {nodeColor} from "../Utils/SharedUtils";
import {NodeType} from "../../types/EventStreamRegistryType";


function EventStreamRegistryGraph(props) {

    const {useRef, useState} = React;
    const fgRef = useRef();

    const data = props.eventStreamRegistry;
    const filteredNodes = props.filteredNodes;
    const onSelectNode = props.onSelectNode;

    const LINK_COLOR = `#000000`;
    const FONT_COLOR = '#000000';
    const FONT_SIZE = '7px';
    const FONT_FAMILY = 'Courier New';

    const NO_DEPS = {"upstream": [], "downstream": []};
    const NO_SELECTED_NODE = undefined;

    const [selectedNode, setSelectNode] = useState(NO_SELECTED_NODE);
    const [dependencies, setDependencies] = useState(NO_DEPS);

    useEffect(() => {
        const fg = fgRef.current;
        fg.d3Force('center', null);
        // fg.d3Force('collide', d3.forceCollide(30));
        // fg.d3Force('charge').strength(-50);
        fg.d3Force('charge').distanceMax(500);
    }, []);

    useEffect(() => {
        deselectNode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNodes]);

    const deselectNode = () => {
        onSelectNode(NO_SELECTED_NODE);
        setSelectNode(NO_SELECTED_NODE);
        setDependencies(NO_DEPS);
    };

    const selectNode = (node) => {
        onSelectNode(node);
        setSelectNode(node);

        const dependencies = getDependencies(node);
        setDependencies(dependencies);
    };

    const getDependencies = (node) => {
        const downstream = "downstream";
        const upstream = "upstream";
        const getDependencies = (node, dependencies, depType) => {
            const isRoot = dependencies.length === 0;
            if (dependencies.includes(node)) return;
            dependencies.push(node);
            data.links.filter(d => d.source === node && depType === downstream)
                .forEach(d => getDependencies(d.target, dependencies, depType));
            data.links.filter(d => d.target === node && depType === upstream)
                .forEach(d => getDependencies(d.source, dependencies, depType));
            if (isRoot) return dependencies.filter(n => n.id !== node.id)
        };

        const downstreamDeps = getDependencies(node, [], downstream);
        const upstreamDeps = getDependencies(node, [], upstream);
        return {"upstream": upstreamDeps, "downstream": downstreamDeps};
    };

    const fixNode = node => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    };

    const drawCloseSymbol = (ctx, node) => {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(node.x - 3, node.y - 3);
        ctx.lineTo(node.x + 3, node.y + 3);
        ctx.moveTo(node.x - 3, node.y + 3);
        ctx.lineTo(node.x + 3, node.y - 3);
        ctx.closePath();
        ctx.stroke();
    }

    const drawServiceNode = (ctx, node, color) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        if (node === selectedNode) {
            ctx.fillRect(node.x - 6, node.y - 6, 12, 12);
            drawCloseSymbol(ctx, node);
        } else {
            ctx.strokeRect(node.x - 2, node.y - 2, 4, 4);
        }
    };

    const getTopicRadius = (node) => {
        if (node === selectedNode) return 8;
        return 3;
    };

    const drawTopicNode = (ctx, node, color) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, getTopicRadius(node), 0, 2 * Math.PI);
        ctx.fill();
        if (node === selectedNode) drawCloseSymbol(ctx, node);
    };

    const drawText = (node, ctx, color) => {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        if (node === selectedNode) {
            ctx.font = `${"10px"} ${FONT_FAMILY}`;
            ctx.fillText(node.id, node.x + 10, node.y - 10);
        } else {
            ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;
            ctx.fillText(node.id, node.x + 5, node.y - 5);
        }
    };

    const nodeOpacity = (node) => {
        if (node === selectedNode) return 1;
        if (dependencies.downstream.includes(node)) return 1;
        if (dependencies.upstream.includes(node)) return 0.2;
        if (selectedNode) return 0;
        if (filteredNodes.includes(node.id)) return 1;
        return 0.2;
    };

    const getLinkOpacity = (node) => {
        if (node.source === selectedNode) return 0.9;
        if (dependencies.downstream.includes(node.target) && dependencies.downstream.includes(node.source)) return 0.9;
        if (node.target === selectedNode) return 0.1;
        if (dependencies.upstream.includes(node.source) && dependencies.upstream.includes(node.target)) return 0.1;
        if (selectedNode) return 0;
        if (!filteredNodes.includes(node.target.id) && !filteredNodes.includes(node.source.id)) return 0;
        return 0.1;
    };

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const getRgbaColor = (hexColor, opacity) => {
        let rgb = hexToRgb(hexColor);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
    };

    const onHover = (node) => {
        if (node) {
            node.show_name = true;
        }
    };

    return <ForceGraph2D
        ref={fgRef}
        onNodeClick={node => {
            fixNode(node);
            node === selectedNode ? deselectNode() : selectNode(node)
        }}
        onNodeHover={node => onHover(node)}
        graphData={data}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={0.80}
        linkWidth={0.3}
        nodeRelSize={20}
        linkDirectionalParticles={0}
        nodeCanvasObject={(node, ctx) => {
            const color = getRgbaColor(nodeColor(node), nodeOpacity(node));
            const fontColor = getRgbaColor(FONT_COLOR, nodeOpacity(node));
            if (node.type === NodeType.SERVICE) drawServiceNode(ctx, node, color);
            if (node.type === NodeType.TOPIC) drawTopicNode(ctx, node, color);
            if (node.show_name) drawText(node, ctx, fontColor);
        }}
        onNodeDragEnd={node => fixNode(node)}
        linkColor={e => getRgbaColor(LINK_COLOR, getLinkOpacity(e))}
    />;
}

export default EventStreamRegistryGraph;
