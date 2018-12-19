import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import withAuth from "../../reusable/withAuth";
import * as MapManager from "../../../firebase/map";
import MapContainer from "../../reusable/maps";
import FeiraDialog from "../../reusable/dialog";
import CreateFeiraDialog from "../../reusable/createFeira";
class MapPage extends React.Component {
  componentDidMount() {
    const { setUserLocation } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
    this.loadMarkers();
  }
  loadMarkers = () => {
    const { setLoadedMarker } = this.props;
    MapManager.loadMarkers().then(markers =>
      markers.forEach(marker => setLoadedMarker({ [marker.id]: marker.data() }))
    );
  };
  render() {
    const {
      pos,
      markers,
      setActiveMarker,
      activeMarker,
      user,
      create,
      openCreateModal
    } = this.props;
    return (
      <div>
        {!pos && (
          <MapContainer
            type={!!user ? user.type : null}
            setActiveMarker={setActiveMarker}
            openCreateModal={openCreateModal}
            markers={markers}
          />
        )}
        {pos && (
          <MapContainer
            type={!!user ? user.type : null}
            setActiveMarker={setActiveMarker}
            openCreateModal={openCreateModal}
            markers={markers}
            pos={pos}
          />
        )}
        {activeMarker && <FeiraDialog />}
        {create && <CreateFeiraDialog pos={pos} />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  pos: state.mapState.userLocation,
  markers: state.mapState.markers,
  user: state.userState.user,
  activeMarker: state.mapState.activeMarker,
  create: state.mapState.create
});
const mapDispatchToProps = dispatch => ({
  setUserLocation: userLocation =>
    dispatch({ type: "SET_CURRENT_USER_LOCATION", userLocation }),
  setLoadedMarker: marker => dispatch({ type: "SET_LOADED_MARKERS", marker }),
  setActiveMarker: marker => dispatch({ type: "SET_ACTIVE_MARKER", marker }),
  openCreateModal: value =>
    dispatch({ type: "CREATE_FEIRA_DIALOG_STATE", value })
});
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuth
)(MapPage);
