import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Modal, Alert, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importando ícones
import styles from "./styles";
// Importar o serviço de atualização de usuário (Assumindo que está correto)
// import { updateUsuario } from "../../services/usuarioService"; 

export default function Cadastro2({ navigation, route }) {
    // Simulação da função updateUsuario, substitua pela sua real
    const updateUsuario = async (userId, data) => {
        // console.log(`Atualizando usuário ${userId} com dados:`, data);
        // Simulação de delay de API
        return new Promise(resolve => setTimeout(resolve, 300));
    };

    const userId = route.params?.userId;
    const [form, setForm] = useState({
        cep: '', logradouro: '', complemento: '',
        bairro: '', cidade: '', estado: ''
    });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!userId) {
            Alert.alert("Erro", "ID de usuário não encontrado. Voltando ao início.");
            navigation.replace("Cadastro");
        }
    }, []);

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Lógica de busca de CEP
    useEffect(() => {
        const buscarCep = async () => {
            if (form.cep.length === 8) {
                try {
                    // Substituindo o fetch diretamente por uma função async/await
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
                        Alert.alert("Atenção", "CEP não encontrado ou inválido.");
                    }
                } catch {
                    Alert.alert("Erro", "Falha ao consultar CEP");
                }
            }
        };
        buscarCep();
    }, [form.cep]);

    const salvarDados = async () => {
        // O CEP deve ser preenchido para prosseguir
        if (!form.cep || form.cep.length < 8) {
            Alert.alert("Erro", "Preencha o CEP corretamente (8 dígitos).");
            return;
        }

        const payload = {
            cep: form.cep,
            logradouro: form.logradouro,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado
        };

        try {
            await updateUsuario(userId, payload);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                // Última tela do cadastro (Email/Senha)
                navigation.replace("Cadastro3", { userId });
            }, 700);
        } catch (e) {
            console.error("Erro ao atualizar usuário:", e.response?.data || e.message);
            Alert.alert("Erro", "Não foi possível salvar os dados. Verifique sua conexão ou servidor.");
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.form}>
                    <Text style={styles.title}>Endereço</Text>
                    
                    {/* CEP */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>CEP:</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="map-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={form.cep}
                                onChangeText={txt => handleChange('cep', txt.replace(/[^0-9]/g, '').substring(0, 8))}
                                placeholder="Apenas números (Ex: 01000000)"
                                placeholderTextColor="#94A3B8"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    {/* Logradouro */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Rua/Logradouro:</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="road-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={form.logradouro}
                                onChangeText={txt => handleChange('logradouro', txt)}
                                placeholder="Rua preenchida pelo CEP"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>
                    
                    {/* Complemento */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Complemento:</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="home-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={form.complemento}
                                onChangeText={txt => handleChange('complemento', txt)}
                                placeholder="Apto/Casa (opcional)"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>

                    {/* Bairro */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Bairro:</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="business-outline" size={20} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={form.bairro}
                                onChangeText={txt => handleChange('bairro', txt)}
                                placeholder="Bairro preenchido pelo CEP"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>
                    </View>

                    {/* Cidade / Estado - Usando row e inputWrapper para cada campo para manter o padrão */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.label}>Cidade / Estado:</Text>
                        <View style={styles.row}>
                            {/* Cidade */}
                            <View style={styles.halfInput}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={form.cidade}
                                        placeholder="Cidade"
                                        placeholderTextColor="#94A3B8"
                                        onChangeText={txt => handleChange('cidade', txt)}
                                    />
                                </View>
                            </View>
                            {/* Estado (UF) */}
                            <View style={[styles.halfInput, { flex: 0.4 }]}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={form.estado}
                                        placeholder="UF"
                                        placeholderTextColor="#94A3B8"
                                        onChangeText={txt => handleChange('estado', txt.toUpperCase())}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <Pressable style={styles.btn} onPress={salvarDados}>
                        <Text style={styles.btnText}>Continuar</Text>
                    </Pressable>
                </View>
            </ScrollView>
            
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Dados de endereço atualizados!</Text>
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}
