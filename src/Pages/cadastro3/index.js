import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StatusBar } from "react-native";
import styles from "./styles";
import { updateUsuario } from "../../services/usuarioService";

export default function Cadastro3({ navigation, route }) {
    const userId = route.params?.userId;
    const [form, setForm] = useState({ email: "", senha: "", confirmaSenha: "" });
    const [modalVisible, setModalVisible] = useState(false);

    const salvarDados = async () => {
        if (!form.email || !form.senha || !form.confirmaSenha) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (form.senha !== form.confirmaSenha) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        try {
            await updateUsuario(userId, { email: form.email, senha: form.senha });
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigation.replace("Login");
            }, 700);
        } catch (e) {
            console.error("Erro ao finalizar cadastro:", e.response?.data || e.message);
            Alert.alert("Erro", "Não foi possível finalizar o cadastro");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.input} value={form.email} onChangeText={txt => setForm(prev => ({ ...prev, email: txt }))} keyboardType="email-address" autoCapitalize="none" />
                <Text style={styles.label}>Senha:</Text>
                <TextInput style={styles.input} value={form.senha} onChangeText={txt => setForm(prev => ({ ...prev, senha: txt }))} secureTextEntry />
                <Text style={styles.label}>Confirme a senha:</Text>
                <TextInput style={styles.input} value={form.confirmaSenha} onChangeText={txt => setForm(prev => ({ ...prev, confirmaSenha: txt }))} secureTextEntry />

                <TouchableOpacity style={styles.btn} onPress={salvarDados}>
                    <Text style={styles.btnText}>Finalizar Cadastro</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Cadastro concluído com sucesso!</Text>
                    </View>
                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}
