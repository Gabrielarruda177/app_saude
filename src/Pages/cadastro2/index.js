import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StatusBar } from "react-native";
import styles from "./styles";
import { updateUsuario } from "../../services/usuarioService";

export default function Cadastro2({ navigation, route }) {
    const userId = route.params?.userId;
    const [form, setForm] = useState({
        peso: '',
        altura: '',
        tipo_sanguineo: '',
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
    });
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!userId) {
            Alert.alert("Erro", "ID de usuário não encontrado.");
            navigation.replace("Cadastro");
        }
    }, [userId]);

    useEffect(() => {
        const buscarCep = async () => {
            if (form.cep.length === 8) {
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
                    }
                } catch (e) {
                    Alert.alert("Erro", "Falha ao consultar CEP");
                }
            }
        };
        buscarCep();
    }, [form.cep]);

    const salvarDados = async () => {
        if (!form.peso || !form.altura || !form.tipo_sanguineo || !form.cep) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        const payload = {
            peso: parseFloat(form.peso),
            altura: parseFloat(form.altura),
            tipo_sanguineo: form.tipo_sanguineo,
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
                navigation.replace("Cadastro3", { userId });
            }, 700);
        } catch (e) {
            console.error("Erro ao atualizar usuário:", e.response?.data || e.message);
            Alert.alert("Erro", "Não foi possível salvar os dados");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Peso (kg):</Text>
                <TextInput style={styles.input} value={form.peso} onChangeText={txt => setForm(prev => ({ ...prev, peso: txt }))} keyboardType="numeric" />
                <Text style={styles.label}>Altura (cm):</Text>
                <TextInput style={styles.input} value={form.altura} onChangeText={txt => setForm(prev => ({ ...prev, altura: txt }))} keyboardType="numeric" />
                <Text style={styles.label}>Tipo sanguíneo:</Text>
                <TextInput style={styles.input} value={form.tipo_sanguineo} onChangeText={txt => setForm(prev => ({ ...prev, tipo_sanguineo: txt }))} placeholder="Ex: O+, A-, B+" autoCapitalize="characters" />
                <Text style={styles.label}>CEP:</Text>
                <TextInput style={styles.input} value={form.cep} onChangeText={txt => setForm(prev => ({ ...prev, cep: txt }))} keyboardType="numeric" maxLength={8} />
                <Text style={styles.label}>Logradouro:</Text>
                <TextInput style={styles.input} value={form.logradouro} editable={false} />
                <Text style={styles.label}>Complemento:</Text>
                <TextInput style={styles.input} value={form.complemento} editable={false} />
                <Text style={styles.label}>Bairro:</Text>
                <TextInput style={styles.input} value={form.bairro} editable={false} />
                <Text style={styles.label}>Cidade:</Text>
                <TextInput style={styles.input} value={form.cidade} editable={false} />
                <Text style={styles.label}>Estado:</Text>
                <TextInput style={styles.input} value={form.estado} editable={false} />

                <TouchableOpacity style={styles.btn} onPress={salvarDados}>
                    <Text style={styles.btnText}>Continuar</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Dados atualizados com sucesso!</Text>
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}
