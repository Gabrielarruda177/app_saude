    import React, { useState } from 'react';
    import { View, Text, TextInput, Pressable, Modal, Alert, StatusBar } from 'react-native';
    import { createUsuario } from "../../services/usuarioService";
    import styles from './styles';

    export default function Cadastro({ navigation }) {
        const [nome, setNome] = useState('');
        const [modalVisible, setModalVisible] = useState(false);

        const salvarDados = async () => {
            if (nome.trim() === '') {
                Alert.alert('Erro', 'Por favor, preencha o nome!');
                return;
            }

            const payload = {
                nome,
                peso: null,
                altura: null,
                tipo_sanguineo: null,
                cep: null,
                logradouro: null,
                complemento: null,
                bairro: null,
                cidade: null,
                estado: null,
                email: "",
                senha: ""
            };

            try {
                const res = await createUsuario(payload);
                const userId = res.id;

                if (!userId) {
                    Alert.alert("Erro", "Não foi possível obter o ID do usuário.");
                    return;
                }

                setModalVisible(true);
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.replace("Cadastro2", { userId });
                }, 600);
            } catch (e) {
                console.error("Erro no cadastro:", e.response?.data || e.message);
                Alert.alert('Erro', 'Não foi possível salvar os dados no servidor.');
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.text}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                    />

                    <Pressable onPress={salvarDados} style={styles.btn}>
                        <Text style={styles.btnText}>Continuar</Text>
                    </Pressable>
                </View>

                <Modal transparent visible={modalVisible} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Cadastro inicial realizado!</Text>
                        </View>
                    </View>
                </Modal>
                <StatusBar style="auto" />
            </View>
        );
    }
