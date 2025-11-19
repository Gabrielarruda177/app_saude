import React, { useState, useEffect, useRef } from "react";
import {
    View, Text, TextInput, Pressable, Modal,
    StatusBar, ScrollView, KeyboardAvoidingView, Platform, Animated
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { updateUsuario } from "../../services/usuarioService";
import styles from "./styles";

export default function Cadastro3({ navigation, route }) {
    const userId = route.params?.userId;
    const [form, setForm] = useState({ email: "", senha: "", confirmaSenha: "" });
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
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

        if (!userId) {
            mostrarModal("ID de usuário não encontrado. Voltando ao início.", 'error');
            setTimeout(() => navigation.replace("Cadastro"), 2000);
        }
    }, [userId]);

    const mostrarModal = (mensagem, tipo = 'error') => {
        setMensagemModal(mensagem);
        setTipoModal(tipo);
        setModalVisible(true);
    };

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const animarPress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(salvarDados);
    };

    const salvarDados = async () => {
        if (!form.email.trim() || !form.senha.trim() || !form.confirmaSenha.trim()) {
            mostrarModal("Por favor, preencha todos os campos.", 'error');
            return;
        }

        if (!form.email.includes('@')) {
            mostrarModal("Por favor, insira um email válido.", 'error');
            return;
        }

        if (form.senha.length < 6) {
            mostrarModal("A senha deve ter no mínimo 6 caracteres.", 'error');
            return;
        }

        if (form.senha !== form.confirmaSenha) {
            mostrarModal("As senhas não coincidem.", 'error');
            return;
        }

        try {
            await updateUsuario(userId, { email: form.email, senha: form.senha });
            mostrarModal("Cadastro finalizado com sucesso!", 'success');
            setTimeout(() => {
                setModalVisible(false);
                navigation.replace("Login");
            }, 2000);
        } catch (e) {
            console.error("Erro ao finalizar cadastro:", e.response?.data || e.message);
            mostrarModal("Não foi possível finalizar o cadastro. Tente novamente.", 'error');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" backgroundColor="#5B21B6" />

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
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="shield-checkmark" size={80} color="#FFF" />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Acesso ao Sistema</Text>
                        <Text style={styles.subtitle}>Crie suas credenciais de login</Text>

                        {/* Email */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.email}
                                    onChangeText={txt => handleChange('email', txt)}
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
                                    value={form.senha}
                                    onChangeText={txt => handleChange('senha', txt)}
                                    secureTextEntry={!senhaVisivel}
                                    placeholder="Crie sua senha"
                                    placeholderTextColor="#9CA3AF"
                                />
                                <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.eyeButton}>
                                    <Ionicons name={senhaVisivel ? "eye-off" : "eye"} size={20} color="#6B7280" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Confirme a senha */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Confirmar Senha</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.confirmaSenha}
                                    onChangeText={txt => handleChange('confirmaSenha', txt)}
                                    secureTextEntry={!confirmaSenhaVisivel}
                                    placeholder="Confirme sua senha"
                                    placeholderTextColor="#9CA3AF"
                                />
                                <Pressable onPress={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)} style={styles.eyeButton}>
                                    <Ionicons name={confirmaSenhaVisivel ? "eye-off" : "eye"} size={20} color="#6B7280" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Botão Finalizar */}
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Pressable style={styles.btn} onPress={animarPress}>
                                <Text style={styles.btnText}>Finalizar Cadastro</Text>
                            </Pressable>
                        </Animated.View>
                    </View>
                </ScrollView>

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
        </KeyboardAvoidingView>
    );
}