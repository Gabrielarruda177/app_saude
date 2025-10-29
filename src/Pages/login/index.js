import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, Animated, StatusBar, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { loginUsuario } from "../../services/usuarioService";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');
    const [tipoModal, setTipoModal] = useState('error'); 
    
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const mostrarModal = (mensagem, tipo = 'error') => {
        setMensagemModal(mensagem);
        setTipoModal(tipo);
        setModalVisible(true);
    };

    const animarPress = () => {
        if (!email.trim() || !senha.trim()) {
            mostrarModal('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!email.includes('@')) {
            mostrarModal('Por favor, insira um email válido.', 'error');
            return;
        }

        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(recuperarDados);
    };

    const recuperarDados = async () => {
        try {
            const res = await loginUsuario(email, senha); 
            if (res && res.success) {
                await AsyncStorage.setItem("usuarioLogado", JSON.stringify(res.usuario));
                mostrarModal("Login realizado com sucesso!", 'success');
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.replace("Home");
                }, 1000);
            } else {
                mostrarModal("Email ou senha incorretos.", 'error');
            }
        } catch (e) {
            console.error("Erro no login:", e);
            mostrarModal("Erro ao conectar ao servidor.", 'error');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />
            
            {/* Background Decorativo */}
            <View style={styles.backgroundTop} />
            <View style={styles.backgroundCircle1} />
            <View style={styles.backgroundCircle2} />

            <Animated.View 
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                {/* Logo/Ícone */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="heart-circle" size={80} color="#FFF" />
                    </View>
                </View>

                {/* Card de Login */}
                <View style={styles.card}>
                    <Text style={styles.title}>Bem-vindo(a)!</Text>
                    <Text style={styles.subtitle}>Entre na sua conta</Text>
                    
                    {/* Email */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="mail" size={20} color="#5B21B6" style={styles.inputIcon} />
                            <TextInput 
                                style={styles.input} 
                                value={email} 
                                onChangeText={setEmail} 
                                keyboardType="email-address" 
                                autoCapitalize="none"
                                placeholder="seu.email@exemplo.com"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    {/* Senha */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed" size={20} color="#5B21B6" style={styles.inputIcon} />
                            <TextInput 
                                style={styles.input} 
                                value={senha} 
                                onChangeText={setSenha} 
                                secureTextEntry={!senhaVisivel}
                                placeholder="••••••••"
                                placeholderTextColor="#9CA3AF"
                            />
                            <Pressable 
                                onPress={() => setSenhaVisivel(!senhaVisivel)}
                                style={styles.eyeButton}
                            >
                                <Ionicons 
                                    name={senhaVisivel ? "eye-off" : "eye"} 
                                    size={20} 
                                    color="#6B7280" 
                                />
                            </Pressable>
                        </View>
                    </View>
                    
                    {/* Botão Entrar */}
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Pressable style={styles.btn} onPress={animarPress}>
                            <Text style={styles.btnText}>Entrar</Text>
                        </Pressable>
                    </Animated.View>

                    {/* Link Cadastre-se */}
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkTextNormal}>Não tem conta? </Text>
                        <Pressable onPress={() => navigation.navigate('Cadastro')}>
                            <Text style={styles.linkText}>Cadastre-se</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Rodapé */}
                <Text style={styles.footer}>MonitoraSaúde © 2024</Text>
            </Animated.View>

            {/* Modal */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <Animated.View style={styles.modalContent}>
                        <View style={[
                            styles.modalIcon,
                            { backgroundColor: tipoModal === 'success' ? '#D1FAE5' : '#FEE2E2' }
                        ]}>
                            <Ionicons 
                                name={tipoModal === 'success' ? "checkmark-circle" : "alert-circle"} 
                                size={50} 
                                color={tipoModal === 'success' ? "#10B981" : "#EF4444"} 
                            />
                        </View>
                        <Text style={styles.modalTitle}>
                            {tipoModal === 'success' ? 'Sucesso!' : 'Atenção'}
                        </Text>
                        <Text style={styles.modalText}>{mensagemModal}</Text>
                        {tipoModal !== 'success' && (
                            <Pressable 
                                style={styles.modalBotao} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalBotaoTexto}>Entendi</Text>
                            </Pressable>
                        )}
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}