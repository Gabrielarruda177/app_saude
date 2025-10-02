import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "./styles";
import { updateUsuario } from "../../services/usuarioService"; // agora usando o serviço real

export default function Cadastro3({ navigation, route }) {
const userId = route.params?.userId;
const [form, setForm] = useState({ email: "", senha: "", confirmaSenha: "" });
const [modalVisible, setModalVisible] = useState(false);

const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
};

const salvarDados = async () => {
    if (!form.email || !form.senha || !form.confirmaSenha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
    }

    if (form.senha.length < 6) {
        Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
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
    <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.form}>
                <Text style={styles.title}>Finalize seu Cadastro</Text>

                {/* Email */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={form.email}
                            onChangeText={txt => handleChange('email', txt)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Digite seu email"
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
                            value={form.senha}
                            onChangeText={txt => handleChange('senha', txt)}
                            secureTextEntry
                            placeholder="Crie sua senha"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                {/* Confirme a senha */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Confirme a senha:</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={form.confirmaSenha}
                            onChangeText={txt => handleChange('confirmaSenha', txt)}
                            secureTextEntry
                            placeholder="Confirme sua senha"
                            placeholderTextColor="#94A3B8"
                        />
                    </View>
                </View>

                <Pressable style={styles.btn} onPress={salvarDados}>
                    <Text style={styles.btnText}>Finalizar Cadastro</Text>
                </Pressable>
            </View>
        </ScrollView>

        <Modal transparent visible={modalVisible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Cadastro concluído com sucesso!</Text>
                </View>
            </View>
        </Modal>
        <StatusBar style="auto" />
    </KeyboardAvoidingView>
);

}
