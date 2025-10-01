import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Platform,
  FlatList, // Adicionado para a listagem
  Keyboard, // Adicionado para fechar o teclado
} from "react-native";
// Para um projeto real no Expo, estas importações são necessárias:
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Ionicons"; // Para ícones de listagem e modal

import styles from './styles';


// Componente para exibir um item da lista
const RemItem = ({ item }) => (
  <View style={styles.remedioItem}>
    <Icon name="medkit-outline" size={24} color={styles.remedioIcon.color} style={{marginRight: 10}} />
    <View style={styles.remedioDetails}>
      <Text style={styles.remedioTitle}>{item.remedio}</Text>
      <Text style={styles.remedioText}>Para: {item.nome}</Text>
      <Text style={styles.remedioText}>Doses: {item.doses}</Text>
    </View>
    {item.remedioImage && (
      <Image source={{ uri: item.remedioImage }} style={styles.remedioImagePreview} resizeMode="cover" />
    )}
  </View>
);


export default function Remedios() {
  const [nome, setNome] = useState("");
  const [remedio, setRemedio] = useState("");
  const [doses, setDoses] = useState("");
  
  const [remedioImage, setRemedioImage] = useState(null);
  
  const [listaRemedios, setListaRemedios] = useState([]); // Novo estado para a lista
  
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [modalType, setModalType] = useState('error'); // 'success' ou 'error'

  const salvarDados = () => {
    Keyboard.dismiss(); // Fecha o teclado ao salvar

    if (!nome || !remedio || !doses) {
      setMessage("Por favor, preencha todos os campos obrigatórios.");
      setModalType('error');
      setShowMessage(true);
      return;
    }

    const novoRemedio = {
      id: Date.now().toString(), // ID único
      nome: nome,
      remedio: remedio,
      doses: doses,
      remedioImage: remedioImage,
    };

    // Adiciona o novo remédio ao início da lista
    setListaRemedios(prevList => [novoRemedio, ...prevList]);

    // Limpa os campos após salvar
    setNome("");
    setRemedio("");
    setDoses("");
    setRemedioImage(null);

    // Exibe modal de sucesso
    setMessage("Remédio cadastrado com sucesso!");
    setModalType('success');
    setShowMessage(true);
  };

  const handleImagePicker = async (useCamera = false) => {
    // ESTA É A SUA LÓGICA ORIGINAL. ELA NÃO FOI ALTERADA.
    
    try {
        // Requer permissões
        const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraPerm = useCamera
          ? await ImagePicker.requestCameraPermissionsAsync()
          : { status: "granted" }; // Permissão de câmera só é necessária se for usar a câmera

        if (mediaPerm.status !== "granted" || cameraPerm.status !== "granted") {
          setMessage("Permissão de acesso negada. Não é possível acessar a câmera ou galeria.");
          setModalType('error');
          setShowMessage(true);
          return;
        }

        const result = useCamera
          ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
          : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 1 });

        if (result.canceled) return;

        const uri = result.assets[0].uri;
        setRemedioImage(uri);
        
        setMessage(`Imagem anexada com sucesso!`);
        setModalType('success');
        setShowMessage(true);

        // Salva imagem na galeria
        if (Platform.OS === "android" || Platform.OS === "ios") {
            // Nota: Este comando pode ser lento ou falhar se a URI não for válida
            await MediaLibrary.saveToLibraryAsync(uri);
            // Mensagem de sucesso aqui não é necessária, pois a primeira já avisou.
        }
        
    } catch (err) {
        // Se houver qualquer erro (incluindo falha de permissão ou falha de Expo API no Canvas)
        console.error("Erro ao selecionar ou salvar imagem:", err);
        setMessage("Erro ao interagir com câmera/galeria. (Este erro é esperado no ambiente Canvas/Web)");
        setModalType('error');
        setShowMessage(true);
    }
  };

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        {/* Box de Cadastro */}
        <View style={styles.box}>
          <Text style={styles.title}>Cadastro de Remédio</Text>

          <Text style={styles.label}>Nome (Para quem é?):</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: João Silva" />

          <Text style={styles.label}>Nome do Remédio:</Text>
          <TextInput style={styles.input} value={remedio} onChangeText={setRemedio} placeholder="Ex: Paracetamol 500mg" />

          <Text style={styles.label}>Doses/Frequência:</Text>
          <TextInput style={styles.input} value={doses} onChangeText={setDoses} placeholder="Ex: 2x ao dia, de 8/8h" />

          {/* Botões de Imagem */}
          <View style={styles.imageButtonsContainer}>
            <TouchableOpacity style={styles.galleryButton} onPress={() => handleImagePicker(false)}>
              <Icon name="image-outline" size={20} color={styles.buttonText.color} />
              <Text style={styles.buttonText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraButton} onPress={() => handleImagePicker(true)}>
              <Icon name="camera-outline" size={20} color={styles.buttonText.color} />
              <Text style={styles.buttonText}>Câmera</Text>
            </TouchableOpacity>
          </View>
          
          {remedioImage && (
            <View style={styles.imagePreviewContainer}>
              <Text style={styles.label}>Pré-visualização da Imagem:</Text>
              <Image source={{ uri: remedioImage }} style={styles.imagePreview} resizeMode="contain" />
              <TouchableOpacity onPress={() => setRemedioImage(null)}>
                <Text style={styles.removeImageText}>Remover Imagem</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.buttonSalvar} onPress={salvarDados}>
            <Text style={styles.buttonTextSalvar}>Salvar Remédio</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Remédios Cadastrados */}
        <View style={styles.listaBox}>
          <Text style={styles.listaTitle}>Meus Remédios ({listaRemedios.length})</Text>
          {listaRemedios.length === 0 ? (
            <Text style={styles.emptyListText}>Nenhum remédio cadastrado ainda.</Text>
          ) : (
            <FlatList
              data={listaRemedios}
              renderItem={({ item }) => <RemItem item={item} />}
              keyExtractor={item => item.id}
              scrollEnabled={false} // Desabilita o scroll da FlatList dentro do ScrollView
            />
          )}
        </View>

      </ScrollView>

      {/* Modal de Feedback */}
      <Modal transparent visible={showMessage} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, modalType === 'error' ? styles.modalBoxError : styles.modalBoxSuccess]}>
            <Icon 
              name={modalType === 'success' ? "checkmark-circle" : "alert-circle"} 
              size={40} 
              color={modalType === 'success' ? "#28A745" : "#DC3545"} 
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalText}>{message}</Text>
            <Pressable onPress={() => setShowMessage(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
