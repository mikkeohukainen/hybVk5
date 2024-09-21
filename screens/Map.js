import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState } from "react";

export default function Map(props) {
  const [marker, setMarker] = useState(null);

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarker(coords);
  };

  return (
    <MapView
      style={styles.map}
      region={props.location}
      onLongPress={showMarker}
      mapType={props.mapType}
    >
      {marker && (
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title="My Marker"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
