import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/customButton";

const NoteCard = ({
  item,
  setCurrentPage,
  setSelectedNote,
  showDeleteConfirmation,
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text>{item.desc}</Text>
    <View style={styles.buttons}>
      <CustomButton
        backgroundColor="#FFC300"
        color="#151D3B"
        text="Ubah"
        fontSize={12}
        width={100}
        onPress={() => {
          setSelectedNote(item);
          setCurrentPage("edit");
        }}
      />
      <CustomButton
        backgroundColor="#D82148"
        color="#fff"
        text="Hapus"
        fontSize={12}
        width={100}
        onPress={() => showDeleteConfirmation(item)}
      />
    </View>
  </View>
);

const Home = ({ noteList, setCurrentPage, setSelectedNote, deleteNote }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const showDeleteConfirmation = (note) => {
    setNoteToDelete(note);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    deleteNote(noteToDelete.id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        backgroundColor="#DDD"
        color="#203239"
        text="Tambahkan Note"
        width="100%"
        onPress={() => {
          setCurrentPage("add");
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={noteList}
        renderItem={({ item }) => (
          <NoteCard
            item={item}
            setCurrentPage={setCurrentPage}
            setSelectedNote={setSelectedNote}
            showDeleteConfirmation={showDeleteConfirmation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Apakah Anda yakin ingin menghapus note ini?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#D82148" }]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Hapus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#DDD" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    padding: 10,
    marginVertical: 15,
    borderColor: "#DDD",
    borderWidth: 2,
    borderRadius: 5,
  },
  cardTitle: {
    fontWeight: "600",
    color: "#203239",
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;