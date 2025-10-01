import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Modal, Animated, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Importando ícones
import styles from './styles';
import { loginUsuario } from "../../services/usuarioService"; // Certifique-se de que este caminho está correto

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const mostrarModalErro = (mensagem) => {
        setMensagemModal(mensagem);
        setModalVisible(true);
    };

    const mostrarModalSucesso = (mensagem) => {
        setMensagemModal(mensagem);
        setModalVisible(true);
    };

    const animarPress = () => {
        if (!email.trim() || !senha.trim()) {
            // Alterado de Alert.alert para Modal
            mostrarModalErro('Preencha email e senha.');
            return;
        }
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(recuperarDados);
    };

    const recuperarDados = async () => {
        try {
            // Supondo que você tem o serviço de login implementado
            const res = await loginUsuario(email, senha); 
            if (res && res.success) {
                await AsyncStorage.setItem("usuarioLogado", JSON.stringify(res.usuario));
                mostrarModalSucesso("Login realizado com sucesso!");
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.replace("Home");
                }, 700);
            } else {
                mostrarModalErro("Email ou senha incorretos.");
            }
        } catch (e) {
            console.error("Erro no login:", e);
            mostrarModalErro("Erro ao conectar ao servidor.");
        }
    };

    return (
        <View style={styles.container}>
            
            {/* Imagem do GIF no topo - Usando o estilo 'logoImage' corrigido */}
            <Image 
                source={require('../../../assets/coracao.gif')} 
                style={styles.logoImage} // *** CORRIGIDO AQUI: USANDO logoImage ***
                resizeMode="contain" 
            />

            <View style={styles.form}>
                <Text style={styles.title}>Bem-vindo(a)!</Text>
                
                {/* Email */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input} 
                            value={email} 
                            onChangeText={setEmail} 
                            keyboardType="email-address" 
                            autoCapitalize="none"
                            placeholder="seu.email@exemplo.com"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                {/* Senha */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Senha:</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input} 
                            value={senha} 
                            onChangeText={setSenha} 
                            secureTextEntry 
                            placeholder="••••••••"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>
                
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Pressable style={styles.btn} onPress={animarPress}>
                        <Text style={styles.btnText}>Entrar</Text>
                    </Pressable>
                </Animated.View>

                {/* Link Cadastre-se */}
                <Text style={styles.linkTextContainer}>
                    Não tem conta?{' '}
                    <Text 
                        style={styles.linkText} 
                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        Cadastre-se
                    </Text>
                </Text>

            </View>

            {/* Modal de Erro/Aviso usando estilos consistentes */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{mensagemModal}</Text>
                        {/* Apenas mostra o botão se a mensagem não for de sucesso/redirecionamento automático */}
                        {mensagemModal !== "Login realizado com sucesso!" && (
                            <Pressable style={styles.modalBotao} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalBotaoTexto}>OK</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}
