import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import styles from './style';


export default function Remedios() {
  const [nome, setNome] = useState("");
  const [remedio, setRemedio] = useState("");
  const [doses, setDoses] = useState("");

  const [remedioImage, setRemedioImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const salvarDados = () => {
    if (!nome || !remedio || !doses) {
      setMessage("Por favor, preencha todos os campos.");
      setShowMessage(true);
      return;
    }

    console.log("Nome:", nome);
    console.log("Remédio:", remedio);
    console.log("Doses:", doses);
    alert("Dados salvos com sucesso!");
  };

  const handleImagePicker = async (useCamera = false) => {
    // Requer permissões
    const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPerm = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : { status: "granted" };

    if (mediaPerm.status !== "granted" || cameraPerm.status !== "granted") {
      setMessage("Permissão de acesso negada.");
      setShowMessage(true);
      return;
    }

    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    setRemedioImage(uri);

    // Salva imagem na galeria
    try {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        await MediaLibrary.saveToLibraryAsync(uri);
        alert("Imagem salva na galeria!");
      }
    } catch (err) {
      console.error("Erro ao salvar imagem:", err);
      setMessage("Erro ao salvar imagem na galeria.");
      setShowMessage(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal de alerta */}
      <Modal transparent visible={showMessage} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable onPress={() => setShowMessage(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.box}>
        <Text style={styles.title}>Cadastro de Remédio</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />

        <Text style={styles.label}>Remédio:</Text>
        <TextInput style={styles.input} value={remedio} onChangeText={setRemedio} placeholder="Digite o nome do remédio" />

        <Text style={styles.label}>Doses:</Text>
        <TextInput style={styles.input} value={doses} onChangeText={setDoses} placeholder="Ex: 2x ao dia" />

        <TouchableOpacity style={styles.button} onPress={salvarDados}>
          <Text style={styles.buttonTextSalvar}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={() => handleImagePicker(false)}>
          <Text style={styles.buttonText}>Carregar Imagem da Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={() => handleImagePicker(true)}>
          <Text style={styles.buttonText}>Abrir Câmera</Text>
        </TouchableOpacity>

        {remedioImage && (
          <Image source={{ uri: remedioImage }} style={styles.imagePreview} resizeMode="cover" />
        )}
      </View>
    </View>
  );
}

