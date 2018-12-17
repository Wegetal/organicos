import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button, Icon, Tooltip } from "@material-ui/core";
import marker from "./marker.png";
export class MapContainer extends React.Component {
  onMarkerClick = markerId => {
    const { markers, setActiveMarker } = this.props;
    setActiveMarker({ [markerId]: markers[markerId] });
  };
  render() {
    const { pos, google, markers, type, openCreateModal } = this.props;

    return (
      <div>
        <Map
          containerStyle={{ height: "92%" }}
          google={google}
          zoom={14}
          {...(pos ? { initialCenter: pos } : null)}
        >
          {markers &&
            Object.keys(markers).map(markerId => (
              <Marker
                key={markerId}
                title={markers[markerId].data}
                position={markers[markerId].location}
                onClick={() => {
                  this.onMarkerClick(markerId);
                }}
                icon={{
                  url: marker,
                  scaledSize: new google.maps.Size(36, 46)
                }}
              />
            ))}
        </Map>
        {type === "produtor" && (
          <Tooltip title="Criar Feira">
            <Button
              onClick={() => openCreateModal("open")}
              style={{ position: "absolute", bottom: "25px", left: "25px" }}
              variant="fab"
              mini
            >
              <Icon>add_location</Icon>
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2ZE8vR7ldASe8ZegN-p8FOZYUJr-qbi4"
})(MapContainer);
