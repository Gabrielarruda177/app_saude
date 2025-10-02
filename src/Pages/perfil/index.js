import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    StatusBar, 
    ActivityIndicator,
    Modal, 
    TextInput, 
    Pressable,
    Alert, 
    Image // 🚨 NOVO: Importar Image para exibir a foto
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // 🚨 NOVO: Importar ImagePicker

// 1. IMPORTAR O SERVIÇO DE USUÁRIO
import { updateUsuario } from '../../services/usuarioService'; 
import styles from './styles'; 

// Chave onde as informações de login são armazenadas
const USER_AUTH_KEY = '@usuarioLogado'; 

// URL Padrão para o avatar
const DEFAULT_AVATAR_URL = 'https://via.placeholder.com/150/0077B6/FFFFFF?text=P'; 

// Dados iniciais (default)
const DADOS_USUARIO_DEFAULT = {
    id: null,
    nome: "Carregando...",
    email: "sem.email@monitorasaude.com", 
    peso: null,
    altura: null,
    tipo_sanguineo: null,
    foto: DEFAULT_AVATAR_URL, // 🚨 NOVO CAMPO
};

export default function Perfil({ navigation }) {
    const [profileData, setProfileData] = useState(DADOS_USUARIO_DEFAULT);
    const [loading, setLoading] = useState(true);
    
    // --- ESTADOS DO MODAL DE EDIÇÃO ---
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [tempNome, setTempNome] = useState('');
    const [tempPeso, setTempPeso] = useState('');
    const [tempAltura, setTempAltura] = useState('');
    const [tempTipoSanguineo, setTempTipoSanguineo] = useState('');
    const [tempFoto, setTempFoto] = useState(DEFAULT_AVATAR_URL); // 🚨 NOVO ESTADO
    // ---------------------------------

    // === 1. FUNÇÃO PARA CARREGAR DADOS INICIAIS DO ASYNCSTORAGE ===
    const loadProfileData = async () => {
        setLoading(true);
        try {
            const storedAuth = await AsyncStorage.getItem(USER_AUTH_KEY);
            if (storedAuth) {
                const { usuario } = JSON.parse(storedAuth);
                
                // Atualiza os dados do perfil com o que está no AsyncStorage
                const userData = {
                    ...usuario,
                    // Garante que foto não seja nula para exibir o avatar padrão
                    foto: usuario.foto || DEFAULT_AVATAR_URL 
                };
                
                setProfileData(userData); 
                
                // Prepara os estados temporários para edição
                setTempNome(userData.nome || '');
                setTempPeso(userData.peso ? String(userData.peso) : ''); 
                setTempAltura(userData.altura ? String(userData.altura) : '');
                setTempTipoSanguineo(userData.tipo_sanguineo || '');
                setTempFoto(userData.foto); // 🚨 NOVO
                
            } else {
                setProfileData(DADOS_USUARIO_DEFAULT);
                Alert.alert("Atenção", "Dados de autenticação não encontrados.");
            }
        } catch (error) {
            console.error("Erro ao carregar dados do perfil:", error);
            setProfileData(DADOS_USUARIO_DEFAULT);
            Alert.alert("Erro", "Falha ao carregar dados de autenticação.");
        } finally {
            setLoading(false);
        }
    };
    
    // Carrega dados na montagem do componente
    useEffect(() => {
        loadProfileData();
    }, [editModalVisible]);

    // === 2. FUNÇÃO PARA SELECIONAR IMAGEM (EXPO-IMAGE-PICKER) ===
    const pickImage = async () => {
        // Pedir permissão ao usuário
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Negada', 'É necessário permitir o acesso à galeria para selecionar uma foto.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5, // Reduzir a qualidade para upload mais rápido
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            // O URI retornado é o caminho local da imagem no dispositivo/emulador.
            // Em uma aplicação real, você faria o UPLOAD desta URI para um servidor aqui,
            // e receberia a URL pública de volta.
            
            const localUri = result.assets[0].uri;

            // 🚨 SIMULAÇÃO DE UPLOAD:
            // Por enquanto, vamos apenas salvar a URI local para exibição imediata
            // e enviar a URI local para o Laravel.
            // VOCÊ DEVE SUBSTITUIR ISSO POR UMA FUNÇÃO DE UPLOAD REAL!
            setTempFoto(localUri); 
            Alert.alert("Sucesso", "Foto selecionada! Lembre-se que o upload real para o servidor ainda precisa ser implementado.");
        }
    };

    // === 3. FUNÇÃO PARA SALVAR AS ALTERAÇÕES ===
    const handleSaveProfile = async () => {
        if (!profileData.id) {
            Alert.alert("Erro", "ID do usuário não encontrado para salvar.");
            return;
        }

        if (!tempNome || !tempPeso || !tempAltura) {
            Alert.alert("Atenção", "Por favor, preencha Nome, Peso e Altura.");
            return;
        }

        setLoading(true);
        
        // 🚨 VALOR DE FOTO: Aqui estamos enviando o URI local (tempFoto),
        // mas você deve enviar a URL PÚBLICA do seu servidor (S3, Firebase, ou seu próprio endpoint Laravel).
        const photoToSend = tempFoto === DEFAULT_AVATAR_URL ? null : tempFoto;

        const newProfileData = {
            nome: tempNome,
            peso: parseFloat(tempPeso.replace(',', '.')), 
            altura: parseFloat(tempAltura.replace(',', '.')),
            tipo_sanguineo: tempTipoSanguineo,
            foto: photoToSend, // 🚨 NOVO CAMPO INCLUÍDO
        };

        try {
            const result = await updateUsuario(profileData.id, newProfileData);

            if (result.success) { 
                
                // 1. Atualiza o estado local
                const updatedData = { ...profileData, ...newProfileData };
                setProfileData(updatedData);

                // 2. Atualiza o AsyncStorage para persistência local
                const updatedAuthData = { usuario: updatedData };
                await AsyncStorage.setItem(USER_AUTH_KEY, JSON.stringify(updatedAuthData));

                setEditModalVisible(false); // Fecha o modal
                Alert.alert("Sucesso", "Perfil atualizado com sucesso na API!");
            } else {
                Alert.alert("Erro", "Ocorreu um erro desconhecido ao salvar o perfil.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Erro de conexão com o servidor.";
            console.error("Erro ao atualizar:", error.response?.data || error);
            Alert.alert("Falha ao Salvar", errorMessage);
        } finally {
            setLoading(false);
        }
    };
    
    // Renderização de carregamento
    if (loading) {
        return (
            <View style={[styles.profileContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#023E8A" />
                <Text style={{ color: '#023E8A', marginTop: 10 }}>Carregando dados...</Text>
            </View>
        );
    }

    const { nome, email, peso, altura, tipo_sanguineo, foto } = profileData;

    // --- RENDERIZAÇÃO DA TELA DE PERFIL ---
    return (
        <View style={styles.profileContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#023E8A" />

            <View style={styles.profileNavbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.profileBackBtn}>
                    <Icon name="arrow-back-outline" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.profileNavTitle}>Meu Perfil</Text>
                <TouchableOpacity onPress={() => setEditModalVisible(true)} style={styles.profileEditBtn}>
                    <Icon name="create-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.profileContent}>
                <View style={styles.avatarContainer}>
                    {/* Exibe a foto do usuário ou o ícone padrão */}
                    {foto && foto !== DEFAULT_AVATAR_URL ? (
                        <Image source={{ uri: foto }} style={styles.profileImage} />
                    ) : (
                        <Icon name="person-circle-outline" size={120} color="#0077B6" />
                    )}
                    
                    <Text style={styles.profileName}>{nome}</Text>
                    <Text style={styles.profileEmail}>{email || "E-mail não informado"}</Text>
                </View>

                {/* O restante do infoCard e do ScrollView permanece o mesmo... */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Informações Biométricas</Text>
                    <View style={styles.infoRow}>
                        <Icon name="body-outline" size={20} color="#023E8A" style={styles.infoIcon} />
                        <Text style={styles.infoLabel}>Peso:</Text>
                        <Text style={styles.infoValue}>{peso ? `${peso} kg` : 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name="resize-outline" size={20} color="#023E8A" style={styles.infoIcon} />
                        <Text style={styles.infoLabel}>Altura:</Text>
                        <Text style={styles.infoValue}>{altura ? `${altura} m` : 'N/A'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name="water-outline" size={20} color="#023E8A" style={styles.infoIcon} />
                        <Text style={styles.infoLabel}>Tipo Sanguíneo:</Text>
                        <Text style={styles.infoValue}>{tipo_sanguineo || 'N/A'}</Text>
                    </View>
                </View>
                
                <TouchableOpacity 
                    style={styles.editProfileButton} 
                    onPress={() => setEditModalVisible(true)}
                >
                    <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
                    <Icon name="arrow-forward-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </ScrollView>

            {/* --- MODAL DE EDIÇÃO DO PERFIL --- */}
            <Modal visible={editModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContentEdit}>
                        <Text style={styles.modalTitleEdit}>Editar Informações</Text>
                        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 20 }}>
                            
                            {/* 🚨 NOVO: ÁREA DE EDIÇÃO DA FOTO */}
                            <Text style={styles.inputLabel}>Foto de Perfil:</Text>
                            <View style={styles.photoEditContainer}>
                                {tempFoto && tempFoto !== DEFAULT_AVATAR_URL ? (
                                    <Image source={{ uri: tempFoto }} style={styles.currentPhoto} />
                                ) : (
                                    <Icon name="camera-outline" size={60} color="#023E8A" />
                                )}
                                <TouchableOpacity onPress={pickImage} style={styles.selectPhotoButton}>
                                    <Text style={styles.selectPhotoButtonText}>
                                        {tempFoto === DEFAULT_AVATAR_URL ? 'Selecionar Foto' : 'Trocar Foto'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.inputLabel}>Nome Completo:</Text>
                            <TextInput
                                style={styles.inputField}
                                value={tempNome}
                                onChangeText={setTempNome}
                                placeholder="Digite seu nome"
                                placeholderTextColor="#999"
                            />
                            {/* ... (Os outros campos permanecem iguais) ... */}
                            <Text style={styles.inputLabel}>Peso (kg):</Text>
                            <TextInput
                                style={styles.inputField}
                                value={tempPeso}
                                onChangeText={setTempPeso}
                                keyboardType="numeric"
                                placeholder="Ex: 75.5"
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.inputLabel}>Altura (m):</Text>
                            <TextInput
                                style={styles.inputField}
                                value={tempAltura}
                                onChangeText={setTempAltura}
                                keyboardType="numeric"
                                placeholder="Ex: 1.75"
                                placeholderTextColor="#999"
                            />
                            
                            <Text style={styles.inputLabel}>Tipo Sanguíneo:</Text>
                            <TextInput
                                style={styles.inputField}
                                value={tempTipoSanguineo}
                                onChangeText={setTempTipoSanguineo}
                                placeholder="Ex: A+, O-"
                                placeholderTextColor="#999"
                            />

                        </ScrollView>

                        <View style={styles.modalButtonRowEdit}>
                            <Pressable 
                                style={[styles.modalBotaoEdit, styles.modalBotaoCancelarEdit]} 
                                onPress={() => setEditModalVisible(false)}
                            >
                                <Text style={styles.modalBotaoTextoEdit}>Cancelar</Text>
                            </Pressable>
                            
                            <Pressable 
                                style={[styles.modalBotaoEdit, styles.modalBotaoConfirmarEdit]} 
                                onPress={handleSaveProfile}
                                disabled={loading}
                            >
                                <Text style={styles.modalBotaoTextoEdit}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}