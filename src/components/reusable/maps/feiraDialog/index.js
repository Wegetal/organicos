import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import marker from "../marker.png";
export class MapContainerDialog extends React.Component {
  render() {
    const { google, handleClick, location, pos } = this.props;

    return (
      <div>
        <Map
          onClick={handleClick}
          containerStyle={{ height: "30%", width: "80%", margin: "15px 10px" }}
          google={google}
          initialCenter={pos}
          zoom={14}
        >
          {location && (
            <Marker
              title={"localização da feira"}
              position={location}
              icon={{
                url: marker,
                scaledSize: new google.maps.Size(36, 46)
              }}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2ZE8vR7ldASe8ZegN-p8FOZYUJr-qbi4"
})(MapContainerDialog);
