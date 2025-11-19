import React, { useState, useEffect, useRef } from "react";
import {
    View, Text, TextInput, Pressable, ScrollView, Modal,
    StatusBar, KeyboardAvoidingView, Platform, Animated
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { updateUsuario } from "../../services/usuarioService";
import styles from "./styles";

export default function Cadastro2({ navigation, route }) {
    const userId = route.params?.userId;
    const [form, setForm] = useState({
        cep: '', logradouro: '', numero: '',
        complemento: '', bairro: '', cidade: '', estado: ''
    });
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

    // Lógica de busca de CEP
    useEffect(() => {
        const buscarCep = async () => {
            if (form.cep.length === 8) {
                setForm(prev => ({
                    ...prev,
                    logradouro: "", complemento: "", bairro: "", cidade: "", estado: "",
                }));
                try {
                    const res = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
                    const data = await res.json();
                    if (!data.erro) {
                        setForm(prev => ({
                            ...prev,
                            logradouro: data.logradouro || "",
                            complemento: data.complemento || "",
                            bairro: data.bairro || "",
                            cidade: data.localidade || "",
                            estado: data.uf || "",
                        }));
                    } else {
                        mostrarModal("CEP não encontrado ou inválido.", 'error');
                    }
                } catch {
                    mostrarModal("Falha ao consultar CEP. Verifique sua conexão.", 'error');
                }
            }
        };
        buscarCep();
    }, [form.cep]);

    const animarPress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(salvarDados);
    };

    const salvarDados = async () => {
        if (!form.cep || form.cep.length < 8) {
            mostrarModal("Preencha o CEP corretamente com 8 dígitos.", 'error');
            return;
        }
        if (!form.numero.trim()) {
            mostrarModal("O campo número é obrigatório.", 'error');
            return;
        }

        const payload = {
            cep: form.cep,
            logradouro: form.logradouro,
            numero: form.numero,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado
        };

        try {
            await updateUsuario(userId, payload);
            mostrarModal("Endereço salvo com sucesso!", 'success');
            setTimeout(() => {
                setModalVisible(false);
                navigation.replace("Cadastro3", { userId });
            }, 1500);
        } catch (e) {
            console.error("Erro ao atualizar usuário:", e.response?.data || e.message);
            mostrarModal("Não foi possível salvar os dados. Tente novamente.", 'error');
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
                        <Ionicons name="location" size={80} color="#FFF" />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Seu Endereço</Text>
                        <Text style={styles.subtitle}>Informe onde você mora</Text>

                        {/* CEP */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>CEP</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="map-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.cep}
                                    onChangeText={txt => handleChange('cep', txt.replace(/[^0-9]/g, '').substring(0, 8))}
                                    placeholder="Apenas números"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                    maxLength={8}
                                />
                            </View>
                        </View>

                        {/* Logradouro */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Logradouro</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="road-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.logradouro}
                                    onChangeText={txt => handleChange('logradouro', txt)}
                                    placeholder="Rua preenchida pelo CEP"
                                    placeholderTextColor="#9CA3AF"
                                    editable={false} // Bloqueia edição manual
                                />
                            </View>
                        </View>

                        {/* Número e Complemento */}
                        <View style={styles.row}>
                            <View style={[styles.fieldContainer, { flex: 2, marginRight: 10 }]}>
                                <Text style={styles.label}>Número</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="home-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        value={form.numero}
                                        onChangeText={txt => handleChange('numero', txt)}
                                        placeholder="Nº"
                                        placeholderTextColor="#9CA3AF"
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                            <View style={[styles.fieldContainer, { flex: 3 }]}>
                                <Text style={styles.label}>Complemento</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={form.complemento}
                                        onChangeText={txt => handleChange('complemento', txt)}
                                        placeholder="Opcional"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Bairro */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Bairro</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="business-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.bairro}
                                    onChangeText={txt => handleChange('bairro', txt)}
                                    placeholder="Bairro preenchido pelo CEP"
                                    placeholderTextColor="#9CA3AF"
                                    editable={false}
                                />
                            </View>
                        </View>

                        {/* Cidade / Estado */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Cidade / Estado</Text>
                            <View style={styles.row}>
                                <View style={styles.halfInput}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            value={form.cidade}
                                            placeholder="Cidade"
                                            placeholderTextColor="#9CA3AF"
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.halfInput, { flex: 0.4, marginLeft: 10 }]}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={[styles.input, { textAlign: 'center' }]}
                                            value={form.estado}
                                            placeholder="UF"
                                            placeholderTextColor="#9CA3AF"
                                            editable={false}
                                            maxLength={2}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Botão Continuar */}
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Pressable style={styles.btn} onPress={animarPress}>
                                <Text style={styles.btnText}>Continuar</Text>
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