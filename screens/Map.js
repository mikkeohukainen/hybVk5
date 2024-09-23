import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState } from "react";
import MyModal from "../components/MyModal";
import { IconButton } from "react-native-paper";
import uuid from "react-native-uuid";

export default function Map(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const addMarker = (e) => {
    const coords = e.nativeEvent.coordinate;
    setMarkerPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      id: e.nativeEvent.id,
    });
    setModalVisible(true);
  };

  const saveMarkerTitle = (title) => {
    if (markerPosition) {
      props.setMarkers([
        ...props.markers,
        {
          id: uuid.v4(),
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
          title: title || "Untitled Marker",
        },
      ]);
      setMarkerPosition(null);
    }
  };

  const deleteMarker = () => {
    props.setMarkers(
      props.markers.filter((marker) => marker.id !== selectedMarkerId)
    );
    setSelectedMarkerId(null);
  };

  return (
    <>
      <MyModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSave={saveMarkerTitle}
      />

      <MapView
        style={styles.map}
        region={props.location}
        onLongPress={addMarker}
        mapType={props.mapType}
      >
        {props.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            onSelect={(e) => {
              setSelectedMarkerId(marker.id);
            }}
            onDeselect={() => setSelectedMarkerId(null)}
          />
        ))}
      </MapView>

      {selectedMarkerId && (
        <View style={styles.trashContainer}>
          <IconButton
            icon="trash-can-outline"
            size={36}
            color="red"
            onPress={deleteMarker}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  trashContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 5,
  },
});
