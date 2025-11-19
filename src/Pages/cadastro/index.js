import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TextInput, Pressable, Modal,
    StatusBar, ScrollView, KeyboardAvoidingView, Platform, Animated
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { createUsuario } from "../../services/usuarioService";
import styles from './styles';

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Não sei'];

const formatDataNasc = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 2 && cleaned.length <= 4) {
        cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
    } else if (cleaned.length > 4) {
        cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) + '/' + cleaned.substring(4, 8);
    }
    return cleaned;
};

const parseAndValidateDate = (dateString) => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts.map(p => parseInt(p, 10));
        if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= new Date().getFullYear()) {
            const monthStr = month.toString().padStart(2, '0');
            const dayStr = day.toString().padStart(2, '0');
            return `${year}-${monthStr}-${dayStr}`;
        }
    }
    return null;
};

export default function Cadastro({ navigation }) {
    const [form, setForm] = useState({
        nome: '',
        data_nasc: '',
        peso: '',
        altura: '',
        tipo_sanguineo: TIPOS_SANGUINEOS[0]
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
    }, []);

    const mostrarModal = (mensagem, tipo = 'error') => {
        setMensagemModal(mensagem);
        setTipoModal(tipo);
        setModalVisible(true);
    };

    const handleChange = (name, value) => {
        if (name === 'data_nasc') {
            value = formatDataNasc(value);
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const animarPress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(salvarDados);
    };

    const salvarDados = async () => {
        const dataIso = parseAndValidateDate(form.data_nasc);

        if (!form.nome.trim()) {
            mostrarModal('Por favor, preencha seu nome.', 'error');
            return;
        }
        if (!dataIso) {
            mostrarModal('Data de nascimento inválida. Use o formato DD/MM/AAAA.', 'error');
            return;
        }
        if (!form.peso || parseFloat(form.peso) <= 0) {
            mostrarModal('Por favor, insira um peso válido.', 'error');
            return;
        }
        if (!form.altura || parseFloat(form.altura) <= 0) {
            mostrarModal('Por favor, insira uma altura válida.', 'error');
            return;
        }

        const payload = {
            nome: form.nome,
            data_nasc: dataIso,
            peso: parseFloat(form.peso.replace(',', '.')),
            altura: parseFloat(form.altura.replace(',', '.')),
            tipo_sanguineo: form.tipo_sanguineo,
            cep: null, logradouro: null, complemento: null,
            bairro: null, cidade: null, estado: null,
            email: "", senha: ""
        };

        try {
            const res = await createUsuario(payload);
            const userId = res.id;
            if (!userId) {
                mostrarModal("Não foi possível obter o ID do usuário.", 'error');
                return;
            }
            mostrarModal("Dados pessoais salvos com sucesso!", 'success');
            setTimeout(() => {
                setModalVisible(false);
                navigation.replace("Cadastro2", { userId });
            }, 1500);
        } catch (e) {
            console.error("Erro no cadastro:", e.response?.data || e.message);
            mostrarModal('Não foi possível salvar os dados no servidor.', 'error');
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
                        <Ionicons name="heart-circle" size={80} color="#FFF" />
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Criar Conta</Text>
                        <Text style={styles.subtitle}>Preencha seus dados básicos</Text>
                        
                        {/* Nome */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Nome Completo</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.nome}
                                    onChangeText={txt => handleChange('nome', txt)}
                                    placeholder="Digite seu nome completo"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>
                        </View>

                        {/* Data de Nascimento */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Data de Nascimento</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="calendar-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.data_nasc}
                                    onChangeText={txt => handleChange('data_nasc', txt)}
                                    placeholder="DD/MM/AAAA"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                            </View>
                        </View>

                        {/* Peso */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Peso (kg)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="fitness-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.peso}
                                    onChangeText={txt => handleChange('peso', txt)}
                                    placeholder="Ex: 75.5"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Altura */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Altura (m)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="body-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={form.altura}
                                    onChangeText={txt => handleChange('altura', txt)}
                                    placeholder="Ex: 1.75"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Tipo Sanguíneo */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Tipo Sanguíneo</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="water-outline" size={20} color="#5B21B6" style={styles.inputIcon} />
                                <Picker
                                    selectedValue={form.tipo_sanguineo}
                                    onValueChange={(itemValue) => handleChange('tipo_sanguineo', itemValue)}
                                    style={styles.picker}
                                    mode="dropdown"
                                >
                                    {TIPOS_SANGUINEOS.map((tipo) => (
                                        <Picker.Item key={tipo} label={tipo} value={tipo} />
                                    ))}
                                </Picker>
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