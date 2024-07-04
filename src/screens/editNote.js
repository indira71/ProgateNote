import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../components/customButton";

const EditNote = ({ note, setCurrentPage, editNote }) => {
  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.desc);

  const handleSave = () => {
    editNote(note.id, title, desc);
    setCurrentPage("home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
        multiline
      />
      <CustomButton
        backgroundColor="#FFC300"
        color="#151D3B"
        text="Simpan"
        fontSize={16}
        width="100%"
        onPress={handleSave}
      />
      <CustomButton
        backgroundColor="#DDD"
        color="#203239"
        text="Batal"
        fontSize={16}
        width="100%"
        onPress={() => setCurrentPage("home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditNote;