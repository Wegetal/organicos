import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainerDialog extends React.Component {
  render() {
    const { google } = this.props;

    return (
      <div>
        <Map containerStyle={{ height: "92%" }} google={google} zoom={14} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2ZE8vR7ldASe8ZegN-p8FOZYUJr-qbi4"
})(MapContainerDialog);
