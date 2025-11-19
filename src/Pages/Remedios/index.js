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
  Keyboard,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from 'expo-notifications'; // <--- IMPORTANTE
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';

// Componente para cada remédio (só mudei para mostrar os horários)
const RemItem = ({ item, onDelete }) => (
  <View style={styles.remedioCard}>
    <View style={styles.remedioHeader}>
      <View style={styles.remedioIconContainer}>
        <Icon name="medical" size={24} color="#5B21B6" />
      </View>
      <View style={styles.remedioInfo}>
        <Text style={styles.remedioNome}>{item.remedio}</Text>
        <Text style={styles.remedioPaciente}>Para: {item.nome}</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Icon name="trash" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>

    <View style={styles.remedioBody}>
      <View style={styles.remedioDetail}>
        <Icon name="time" size={18} color="#6B7280" />
        <Text style={styles.remedioDetailText}>
          {item.horarios.join(', ')} {/* Mostra os horários salvos */}
        </Text>
      </View>

      {item.remedioImage && (
        <Image 
          source={{ uri: item.remedioImage }} 
          style={styles.remedioImage} 
          resizeMode="cover" 
        />
      )}
    </View>
  </View>
);

export default function Remedios() {
  const [nome, setNome] = useState("");
  const [remedio, setRemedio] = useState("");
  // Mudei de 'doses' para 'horarios' e agora é um array!
  const [horarios, setHorarios] = useState([""]); 
  const [remedioImage, setRemedioImage] = useState(null);
  const [listaRemedios, setListaRemedios] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [fadeAnim] = useState(new Animated.Value(0));

  // --- A FUNÇÃO MÁGICA DAS NOTIFICAÇÕES ---
  const agendarNotificacoes = async (remedioData) => {
    for (const horario of remedioData.horarios) {
      const [hour, minute] = horario.split(':');
      
      // Agenda para se repetir todos os dias no horário especificado
      const trigger = {
        hour: parseInt(hour),
        minute: parseInt(minute),
        repeats: true,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Hora do Remédio!",
          body: `Está na hora de tomar ${remedioData.remedio}`,
          sound: 'default', // Som padrão
          vibrate: [0, 250, 250, 250], // Padrão de vibração: liga, desliga, liga, desliga
        },
        trigger,
      });
    }
  };

  const salvarDados = () => {
    Keyboard.dismiss();

    // Validação para garantir que os campos e pelo menos um horário foram preenchidos
    if (!nome || !remedio || horarios.some(h => !h.trim())) {
      setMessage("Por favor, preencha todos os campos e adicione pelo menos um horário.");
      setModalType('error');
      setShowMessage(true);
      return;
    }

    const novoRemedio = {
      id: Date.now().toString(),
      nome: nome.trim(),
      remedio: remedio.trim(),
      horarios: horarios.filter(h => h.trim() !== ""), // Remove horários vazios
      remedioImage: remedioImage,
    };

    setListaRemedios(prevList => [novoRemedio, ...prevList]);

    // Limpa campos
    setNome("");
    setRemedio("");
    setHorarios([""]); // Reseta para um campo de horário vazio
    setRemedioImage(null);

    setMessage("Remédio cadastrado e notificação agendada!");
    setModalType('success');
    setShowMessage(true);

    // Chama a função para agendar a notificação
    agendarNotificacoes(novoRemedio);

    // Anima a lista
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const deletarRemedio = (id) => {
    setListaRemedios(prevList => prevList.filter(item => item.id !== id));
    setMessage("Remédio removido com sucesso!");
    setModalType('success');
    setShowMessage(true);
  };

  // ... Sua função handleImagePicker permanece exatamente a mesma ...
  const handleImagePicker = async (useCamera = false) => {
    try {
      const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPerm = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : { status: "granted" };

      if (mediaPerm.status !== "granted" || cameraPerm.status !== "granted") {
        setMessage("Permissão de acesso negada.");
        setModalType('error');
        setShowMessage(true);
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
        : await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
            allowsEditing: true, 
            quality: 1 
          });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      setRemedioImage(uri);
      
      setMessage("Imagem anexada com sucesso!");
      setModalType('success');
      setShowMessage(true);
    } catch (err) {
      console.error("Erro ao selecionar imagem:", err);
      setMessage("Erro ao acessar câmera/galeria.");
      setModalType('error');
      setShowMessage(true);
    }
  };

  // --- Funções para controlar os campos de horário ---
  const adicionarCampoHorario = () => {
    setHorarios([...horarios, ""]);
  };

  const atualizarHorario = (index, value) => {
    const novosHorarios = [...horarios];
    novosHorarios[index] = value;
    setHorarios(novosHorarios);
  };

  const removerCampoHorario = (index) => {
    if (horarios.length > 1) {
      setHorarios(horarios.filter((_, i) => i !== index));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Icon name="medkit" size={40} color="#FFF" />
          </View>
          <Text style={styles.title}>Meus Remédios</Text>
          <Text style={styles.subtitle}>Gerencie sua medicação</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Cadastrar Remédio</Text>

          {/* Nome do Paciente */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Para quem é?</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person" size={20} color="#5B21B6" />
              <TextInput 
                style={styles.input} 
                value={nome} 
                onChangeText={setNome} 
                placeholder="Ex: João Silva"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Nome do Remédio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Remédio</Text>
            <View style={styles.inputWrapper}>
              <Icon name="medical" size={20} color="#5B21B6" />
              <TextInput 
                style={styles.input} 
                value={remedio} 
                onChangeText={setRemedio} 
                placeholder="Ex: Paracetamol 500mg"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* --- NOVA SEÇÃO DE HORÁRIOS --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Horários</Text>
            {horarios.map((horario, index) => (
              <View key={index} style={styles.horarioContainer}>
                <View style={styles.inputWrapper}>
                  <Icon name="time" size={20} color="#5B21B6" />
                  <TextInput 
                    style={styles.input} 
                    value={horario}
                    onChangeText={(value) => atualizarHorario(index, value)}
                    placeholder="08:00"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                {horarios.length > 1 && (
                  <TouchableOpacity onPress={() => removerCampoHorario(index)} style={styles.removeButton}>
                    <Icon name="remove-circle" size={24} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity onPress={adicionarCampoHorario} style={styles.addButton}>
              <Icon name="add-circle" size={24} color="#5B21B6" />
              <Text style={styles.addButtonText}>Adicionar Horário</Text>
            </TouchableOpacity>
          </View>
          
          {/* Botões de Imagem */}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Foto do Remédio (opcional)</Text>
            <View style={styles.imageButtons}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => handleImagePicker(false)}
                activeOpacity={0.7}
              >
                <Icon name="images" size={22} color="#5B21B6" />
                <Text style={styles.imageButtonText}>Galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.imageButton}
                onPress={() => handleImagePicker(true)}
                activeOpacity={0.7}
              >
                <Icon name="camera" size={22} color="#5B21B6" />
                <Text style={styles.imageButtonText}>Câmera</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Preview da Imagem */}
          {remedioImage && (
            <View style={styles.imagePreviewCard}>
              <Image 
                source={{ uri: remedioImage }} 
                style={styles.imagePreview} 
                resizeMode="cover" 
              />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setRemedioImage(null)}
              >
                <Icon name="close-circle" size={20} color="#EF4444" />
                <Text style={styles.removeImageText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Botão Salvar */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={salvarDados}
            activeOpacity={0.8}
          >
            <Icon name="checkmark-circle" size={22} color="#FFF" />
            <Text style={styles.saveButtonText}>Salvar Remédio</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Remédios */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Cadastrados</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{listaRemedios.length}</Text>
            </View>
          </View>

          {listaRemedios.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="folder-open-outline" size={60} color="#D1D5DB" />
              <Text style={styles.emptyText}>Nenhum remédio cadastrado</Text>
              <Text style={styles.emptySubtext}>
                Cadastre seu primeiro remédio acima
              </Text>
            </View>
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              {listaRemedios.map((item) => (
                <RemItem 
                  key={item.id} 
                  item={item} 
                  onDelete={deletarRemedio}
                />
              ))}
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={showMessage} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[
              styles.modalIconContainer,
              { backgroundColor: modalType === 'success' ? '#D1FAE5' : '#FEE2E2' }
            ]}>
              <Icon 
                name={modalType === 'success' ? "checkmark-circle" : "alert-circle"} 
                size={50} 
                color={modalType === 'success' ? "#10B981" : "#EF4444"} 
              />
            </View>
            <Text style={styles.modalTitle}>
              {modalType === 'success' ? 'Sucesso!' : 'Atenção'}
            </Text>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable 
              style={styles.modalButton} 
              onPress={() => setShowMessage(false)}
            >
              <Text style={styles.modalButtonText}>Entendi</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}