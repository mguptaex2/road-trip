import PropTypes from 'prop-types'
import { useMemo, useState} from 'react';
import { MapConsumer, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'


function AddMarkerOnClick({ onClick }) {
    const [position, setPosition] = useState(null)
    useMapEvents({
      click(e) {
        onClick(e);
      },
    })
  
    return null
  }



  function RenderMarkers({ markersList = [] }) {
    const eventHandlers = useMemo(
        () => ({
          click() {
            console.log('testtestestestest')
          },
        }),
        [],
      )

    return markersList.map((item) => {
        return <Marker eventHandlers={eventHandlers} key={item[0]} position={item} />
    })
  }

function Map({ onLocationAdd }) {
    const [markerList, setMarkerList] = useState([]);

    function handleAddMarker(e){
        const {latlng : { lat, lng}} = e;
        setMarkerList((oldMarkerList) => ([ ...oldMarkerList, [lat, lng]]))
        onLocationAdd([lat, lng]);
    }


    return (
        <div>
            <MapContainer className="MapContainerRote" center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <TileLayer
                   url="https://mt0.mapmyindia.com/advancedmaps/v1/your_map_key_here/retina_map/{z}/{x}/{y}.png"
                /> */}
                
                <AddMarkerOnClick onClick={handleAddMarker} />
                <RenderMarkers markersList={markerList}/>
            </MapContainer>
        </div>
    )
}

Map.propTypes = {

}

export default Map

