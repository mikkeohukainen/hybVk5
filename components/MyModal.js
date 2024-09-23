import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { ToastAndroid } from "react-native";

export default function MyModal({ visible, onDismiss, onSave }) {
  const [text, setText] = useState("");

  const handleSave = () => {
    ToastAndroid.show("Marker saved.", ToastAndroid.SHORT);
    onSave(text);
    setText("");
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "space-between",
          borderRadius: 20,
          elevation: 5,
          padding: 20,
        }}
        style={{
          margin: 50,
          height: "50%",

          top: "20%",
        }}
      >
        <Text variant="headlineSmall">Add a marker</Text>
        <TextInput
          label="Marker name"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={handleSave} mode="contained">
          Save
        </Button>
      </Modal>
    </Portal>
  );
}
