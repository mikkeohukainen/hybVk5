import Map from "./screens/Map";
import Settings from "./screens/Settings";
import { useState } from "react";
import { settings, icons } from "./myConstants/iconsAndColor";
import { PaperProvider } from "react-native-paper";
import MainAppBar from "./components/MainAppBar";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [icon, setIcon] = useState(icons.location_not_known);
  const [mapType, setMapType] = useState("standard");
  const [location, setLocation] = useState({
    latitude: 65.08,
    longitude: 25.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserPosition = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setIcon(icons.location_searching);
    try {
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setIcon(icons.location_found);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Map"
          screenOptions={{
            header: (props) => (
              <MainAppBar
                {...props}
                getUserPosition={getUserPosition}
                icon={icon}
                backgroundColor={settings.backgroundColor}
              />
            ),
          }}
        >
          <Stack.Screen name="Map">
            {() => <Map location={location} mapType={mapType} />}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {() => <Settings mapType={mapType} setMapType={setMapType} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
