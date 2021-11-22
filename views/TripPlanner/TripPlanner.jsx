import PropTypes from 'prop-types'
import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Map = dynamic(() => import('./Map'), { ssr: false });

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
        <Quote quote={quote} index={index} key={quote.id} />
    ));
});
const grid = 8;
// const QuoteItem = styled.div`
//   width: 200px;
//   border: 1px solid grey;
//   margin-bottom: ${grid}px;
//   background-color: lightblue;
//   padding: ${grid}px;
// `;

function Quote({ quote, index }) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {provided => (
                <div
                    className="Quote__Item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {quote.content}
                </div>
            )}
        </Draggable>
    );
}
const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
    const custom = {
      id: `id-${k}`,
      content: `Quote ${k}`
    };
  
    return custom;
  });
function TripPlanner(props) {
    const [markerList, setMarkerList] = useState([]);
    const [state, setState] = useState({ quotes: [] });

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index
        );

        setState({ quotes });
    }

    function handleAddMarker(location) {
        const _quotes = [ ...state.quotes ];
        _quotes.push({ id: `id-${_quotes.length}`, content: location })

        setState({ quotes: _quotes });
        // setMarkerList((oldMarkerList) => [...oldMarkerList, location])
    }
    return (
        <div className="RoutePlannerWrapper">

            <div className="RoutePlanner container">
                <div className="row">
                    <div className="col-4">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="list">
                                {provided => (
                                    <div className="DroppableContainer" ref={provided.innerRef} {...provided.droppableProps}>
                                        <QuoteList quotes={state.quotes} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div className="col-6">
                        <Map locationMarkers={markerList} onLocationAdd={handleAddMarker} />
                    </div>
                </div>
            </div>
        </div>
    )
}

TripPlanner.propTypes = {

}

export default TripPlanner

